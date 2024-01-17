"""
Search Blueprint for Flask Application

This script establishes the 'search' Blueprint, which facilitates search operations within the Flask application.

Features:
- Implements an API endpoint to perform search queries in the database.
- Handles POST requests with search parameters such as search type and search string.
- Supports different search types, including searching all records, experiments, or analyses.
- Executes database queries based on the provided search parameters and returns the results.
- Uses PostgreSQL's ILIKE for case-insensitive search.
- Provides robust error handling for database query errors.

Endpoint:
- '/api/search': Accepts POST requests for searching the database based on given criteria.

Usage:
This Blueprint should be registered in the Flask app to enable search-related routes.

Example:
from app import app
app.register_blueprint(search)
"""

from flask import Blueprint, request, jsonify
from app.db.database import Database
import logging
import psycopg2

logging.basicConfig(level=logging.DEBUG)

search = Blueprint('search', __name__)

@search.route('/api/search', methods=['POST'])
def search_database():
    payload = request.get_json()
    search_type = payload.get('searchType')
    search_string = payload.get('searchString', '')

    with Database() as db:
        try:
            results = {}

            if search_type == "all":
                db.execute_query("SELECT * FROM experiments")
                experiments_results = db.cur.fetchall()
                results['experiments'] = [dict(result) for result in experiments_results]

                db.execute_query("SELECT * FROM analyses")
                analyses_results = db.cur.fetchall()
                results['analyses'] = [dict(result) for result in analyses_results]
            else:

                if search_type == "experiments" or search_type == "default":
                    query = "SELECT * FROM experiments WHERE experiment_name ILIKE %s"
                    db.execute_query(query, ('%' + search_string + '%',))
                    experiments_results = db.cur.fetchall()
                    results['experiments'] = [dict(result) for result in experiments_results]

                if search_type == "analyses" or search_type == "default":
                    query = "SELECT * FROM analyses WHERE analysis_name ILIKE %s"
                    db.execute_query(query, ('%' + search_string + '%',))
                    analyses_results = db.cur.fetchall()
                    results['analyses'] = [dict(result) for result in analyses_results]

            return jsonify(results), 200

        except psycopg2.Error as error:
            logging.exception("Search error")
            return jsonify({"error": str(error)}), 500