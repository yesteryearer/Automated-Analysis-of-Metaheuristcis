"""
Results Blueprint for Flask Application

This script sets up the 'results' Blueprint to manage the recording of analysis results in the Flask application.

Features:
- Provides an API endpoint for submitting analysis results.
- Handles POST requests containing analysis name, experiment name, result data, and additional details.
- Performs validation to ensure all required fields are provided in the request payload.
- Checks for duplicate analysis names in the database to avoid conflicts.
- Commits the analysis results to the database, handling any database-related exceptions.

Endpoint:
- '/api/results': Accepts POST requests for saving analysis results.

Logging:
- Configures logging at DEBUG level for detailed logging, useful for development and debugging.

Usage:
The Blueprint 'results' should be registered to the Flask app to manage results-related routes.

Example:
from app import app
app.register_blueprint(results)
"""

from flask import Blueprint, request, jsonify
from app.db.database import Database
from app.db.commit.commit_result import commit_result_data
from app.db.helpers.check_duplicate import check_duplicate_field
import logging
logging.basicConfig(level=logging.DEBUG)

results = Blueprint('results', __name__)

@results.route('/api/results', methods=['POST'])
def create_analysis():
    payload = request.get_json()

    analysis_name = payload.get('analysisName')
    experiment_name = payload.get('experimentName')
    analysis_data = payload.get('analysisResult')
    test_type = payload.get('analysisType')
    experiment_description = payload.get('experimentDescription')
    analysis_notes = payload.get('analysisNotes')

    if not all([analysis_name, experiment_name, analysis_data, test_type]):
        return jsonify({"error": "Missing required fields in payload"}), 400

    with Database() as db:
        if check_duplicate_field(db.conn, analysis_name, 'analysis_name', 'analyses'):
            return jsonify({"error": "Duplicate analysis name in database."}), 400

        try:
            commit_result_data(analysis_name=analysis_name, 
                               experiment_name=experiment_name, 
                               test_type=test_type, 
                               result_data=analysis_data, 
                               experiment_description=experiment_description, 
                               analysis_notes=analysis_notes)
        except Exception as error:
            return jsonify({"error": str(error)}), 400

    return jsonify({"message": "Analysis data saved successfully."}), 201