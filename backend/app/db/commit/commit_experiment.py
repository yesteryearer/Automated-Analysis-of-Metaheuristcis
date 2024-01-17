"""
Experiment Data Commitment Module

This module contains functions to handle the storage of experiment data in the database.

Functions:
1. commit_experiment_data:
    - Manages the overall process of committing experiment data to the database.
    - Parameters: experiment_name, experiment_table, experiment_data, experiment_description.
    - Uses context management for the database connection and handles transactions.
    - Calls helper functions for creating experiments and processing experiment data.
    - Provides logging for debugging and error handling.

2. get_or_create_experiment:
    - Retrieves or creates an experiment record in the database.
    - Parameters: db (database object), experiment_name, experiment_data, experiment_description.
    - Uses SQL queries to check for an existing experiment or create a new one.

3. get_all_from_table:
    - Retrieves all records from a specified table and column.
    - Parameters: db (database object), table_name, column1 (ID column), column2 (name column).
    - Returns a dictionary mapping names to IDs.

4. get_or_create:
    - Retrieves an ID for a given name or creates a new record if it doesn't exist.
    - Parameters: db, table_name, column1 (ID column), column2 (name column), name, id_map (mapping of names to IDs).
    - Used for managing references to algorithms and benchmarks.

5. process_experiment_data:
    - Processes and commits individual rows of experiment data.
    - Parameters: db, experiment_id, algorithm_id_map, benchmark_id_map, table_data.
    - Iterates through the table data, calling `update_or_insert_data` for each cell.

6. update_or_insert_data:
    - Updates or inserts a single data cell into the experiment_data table.
    - Parameters: db, experiment_id, algorithm_id, benchmark_id, cell (data value).
    - Checks for existing data and decides whether to update or insert.

Usage:
- These functions are collectively used to process and store detailed experiment data in the database.
- They ensure that data is not only stored but also linked properly to relevant experiments, algorithms, and benchmarks.

Example:
commit_experiment_data('Experiment Name', experiment_table, experiment_data, 'Experiment Description')
"""

import logging
from contextlib import closing
from app.db.database import Database
from psycopg2.extras import Json 

logging.basicConfig(level=logging.DEBUG)

def commit_experiment_data(experiment_name, experiment_table, experiment_data, experiment_description):
    with closing(Database()) as db:
        db.begin_transaction()
        try:
            experiment_id = get_or_create_experiment(db, experiment_name, experiment_data, experiment_description)
            algorithm_id_map = get_all_from_table(db, "algorithms", "algorithm_id", "algorithm_name")
            benchmark_id_map = get_all_from_table(db, "benchmarks", "benchmark_id", "benchmark_name")
            process_experiment_data(db, experiment_id, algorithm_id_map, benchmark_id_map, experiment_table)
            db.commit()
            logging.info("Data committed successfully.")
        except Exception as e:
            db.rollback()
            logging.error(f"Error processing experiment data: {e}")
            raise e

def get_or_create_experiment(db, experiment_name, experiment_data, experiment_description):
    query = "SELECT experiment_id FROM experiments WHERE experiment_name = %s"
    db.execute_query(query, (experiment_name,))
    experiment_id = db.cur.fetchone()
    if experiment_id is None or len(experiment_id) == 0:
        query = "INSERT INTO experiments (experiment_name, experiment_data, experiment_description) VALUES (%s, %s, %s) RETURNING experiment_id"
        db.execute_query(query, (experiment_name, Json(experiment_data), experiment_description))
        experiment_id = db.cur.fetchone()[0]
    else:
        experiment_id = experiment_id[0]
    return experiment_id


def get_all_from_table(db, table_name, column1, column2):
    query = f"SELECT {column1}, {column2} FROM {table_name}"
    db.execute_query(query)
    rows = db.cur.fetchall()
    return {name: id_ for id_, name in rows}

def get_or_create(db, table_name, column1, column2, name, id_map):
    id_ = id_map.get(name)
    if id_ is None:
        query = f"INSERT INTO {table_name} ({column2}) VALUES (%s) RETURNING {column1}"
        db.execute_query(query, (name,))
        id_ = db.cur.fetchone()[0]
        id_map[name] = id_
    return id_

def process_experiment_data(db, experiment_id, algorithm_id_map, benchmark_id_map, table_data):
    for _, row in enumerate(table_data[1:], start=1):
        algorithm_name = row[0]
        algorithm_id = get_or_create(db, "algorithms", "algorithm_id", "algorithm_name", algorithm_name, algorithm_id_map)
        
        for col_idx, cell in enumerate(row[1:], start=1):
            benchmark_name = table_data[0][col_idx]
            benchmark_id = get_or_create(db, "benchmarks", "benchmark_id", "benchmark_name", benchmark_name, benchmark_id_map)
            update_or_insert_data(db, experiment_id, algorithm_id, benchmark_id, cell)

def update_or_insert_data(db, experiment_id, algorithm_id, benchmark_id, cell):
    query = "SELECT COUNT(*) FROM experiment_data WHERE experiment_id = %s AND algorithm_id = %s AND benchmark_id = %s"
    db.execute_query(query, (experiment_id, algorithm_id, benchmark_id))
    count = db.cur.fetchone()[0]
    if count > 0:
        query = "UPDATE experiment_data SET value = %s WHERE experiment_id = %s AND algorithm_id = %s AND benchmark_id = %s"
    else:
        query = "INSERT INTO experiment_data (value, experiment_id, algorithm_id, benchmark_id) VALUES (%s, %s, %s, %s)"
    db.execute_query(query, (cell, experiment_id, algorithm_id, benchmark_id))