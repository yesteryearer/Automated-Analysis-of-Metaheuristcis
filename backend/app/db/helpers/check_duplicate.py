"""
Duplicate Field Checker

This function checks for duplicate entries in a specified field within a database table.

Parameters:
- conn: The database connection object.
- field_value: The value to be checked for duplication.
- field_name: The name of the field in which duplication is to be checked.
- table: The name of the database table to check for duplicates.

Returns:
- True if a duplicate entry is found, False otherwise.

Raises:
- psycopg2.Error: Raises an exception if there is an error executing the query.

Usage:
This function is used to ensure the uniqueness of data in database operations, particularly before inserting new records.

Example:
with Database() as db:
    is_duplicate = check_duplicate_field(db.conn, 'example_value', 'field_name', 'table_name')
    if is_duplicate:
        # Handle duplicate scenario
"""

import psycopg2

def check_duplicate_field(conn, field_value, field_name, table):
    try:
        cur = conn.cursor()
        query = f"SELECT COUNT(*) FROM {table} WHERE {field_name} = %s"
        cur.execute(query, (field_value,))
        count = cur.fetchone()[0]

        if count > 0:
            return True

        return False

    except psycopg2.Error as e:
        print(f"Error checking duplicate field value: {e}")
        raise e


