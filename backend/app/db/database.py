"""
Database Connection Handler

This class manages the database connections and operations for the Flask application.

Features:
- Initializes and maintains a database connection using psycopg2.
- Fetches database connection details from environment variables with default fallbacks.
- Implements context management to ensure proper opening and closing of database connections.
- Provides methods for executing queries, handling transactions, and managing commits and rollbacks.

Usage:
- Create an instance of the Database class to interact with the PostgreSQL database.
- Use context management (with statement) to automatically handle connection closing.
- Call provided methods for various database operations like executing queries and managing transactions.

Logging:
- Uses logging to report successful connections, errors, and closing of database connections.

Example:
with Database() as db:
    db.execute_query("SELECT * FROM table")
    results = db.cur.fetchall()
"""

import os
import psycopg2
import psycopg2.extras
import logging

logger = logging.getLogger(__name__)

class Database:

    def __init__(self):
        db_host = os.environ.get('POSTGRES_HOST', 'db')
        db_port = os.environ.get('POSTGRES_PORT', '5432')
        db_name = os.environ.get('POSTGRES_DB', 'aamh_database')
        db_user = os.environ.get('POSTGRES_USER', 'aamh_user')
        db_password = os.environ.get('POSTGRES_PASSWORD', 'aamh_password')

        self.conn = None
        self.get_conn(db_host, db_port, db_name, db_user, db_password)
        self.cur = self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        self.close()

    def get_conn(self, host, port, dbname, user, password):
        try:
            self.conn = psycopg2.connect(
                host=host,
                port=port,
                dbname=dbname,
                user=user,
                password=password
            )
            logger.info('Database connection established successfully')
        except psycopg2.Error as e:
            logger.error(f"Error connecting to the database: {e}")
            raise e

    def close(self):
        if self.conn is not None:
            self.conn.close()
            logger.info("Database connection closed.")

    def execute_query(self, query, params=None):
        try:
            self.cur.execute(query, params)
        except psycopg2.Error as e:
            logger.error(f"Error executing query: {e}")
            raise e

    def commit(self):
        try:
            self.conn.commit()
        except psycopg2.Error as e:
            logger.error(f"Error committing transaction: {e}")
            raise e

    def begin_transaction(self):
        self.conn.autocommit = False

    def rollback(self):
        self.conn.rollback()
