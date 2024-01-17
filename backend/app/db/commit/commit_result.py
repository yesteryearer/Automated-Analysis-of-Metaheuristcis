"""
Analysis Data Commitment and Retrieval

This module contains functions to commit analysis results to the database and retrieve or create analysis records.

Functions:
1. commit_result_data:
    - Commits analysis results to the database.
    - Parameters: experiment_name, analysis_name, test_type, result_data, experiment_description, analysis_notes.
    - Utilizes the 'Database' class for database operations and handles transactions.
    - Logs the process and errors, and performs a rollback in case of exceptions.

2. get_or_create_analysis:
    - Retrieves an existing analysis record or creates a new one if it does not exist.
    - Parameters: db (database object), analysis_name, experiment_name, test_type, result_data, experiment_description, analysis_notes.
    - Checks for an existing analysis by name and either returns its ID or creates a new record and returns the new ID.
    - Executes necessary SQL queries to interact with the 'analyses' table.

Usage:
- These functions are primarily used for processing and storing analysis results in the database, ensuring data integrity and proper transaction management.

Example:
commit_result_data('Experiment1', 'Analysis1', 'TestType', result_data, 'Experiment Description', 'Analysis Notes')
"""

import logging
from contextlib import closing
from app.db.database import Database
from psycopg2.extras import Json 

logging.basicConfig(level=logging.DEBUG)

def commit_result_data(experiment_name, analysis_name, test_type, result_data, experiment_description, analysis_notes):
    with closing(Database()) as db:
        db.begin_transaction()
        try:
            analysis_id = get_or_create_analysis(db, analysis_name, experiment_name, test_type, result_data, experiment_description, analysis_notes)
            db.commit()
            logging.info(f"Data for analysis_id {analysis_id} committed successfully.")
        except Exception as e:
            db.rollback()
            logging.error(f"Error processing analysis data: {e}")
            raise e

def get_or_create_analysis(db, analysis_name, experiment_name, test_type, result_data, experiment_description, analysis_notes):
    query = "SELECT analysis_id FROM analyses WHERE analysis_name = %s"
    db.execute_query(query, (analysis_name,))
    analysis_id = db.cur.fetchone()
    
    if analysis_id is None:
        query = """
        INSERT INTO analyses (analysis_name, experiment_name, test_type, result_data, experiment_description, analysis_notes) 
        VALUES (%s, %s, %s, %s, %s, %s) RETURNING analysis_id
        """

        db.execute_query(query, (analysis_name, experiment_name, test_type, Json(result_data), experiment_description, analysis_notes))
        analysis_id = db.cur.fetchone()[0]
    else:
        analysis_id = analysis_id[0]

    return analysis_id