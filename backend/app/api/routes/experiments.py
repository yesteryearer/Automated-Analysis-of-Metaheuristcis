"""
Experiments Blueprint for Flask Application

This script defines the 'experiments' Blueprint for handling experiment-related requests in the Flask application.

Features:
- Provides an API endpoint for creating new experiment entries.
- Processes POST requests with experiment data including name, data, and description.
- Utilizes utility functions for data validation, conversion, and duplication checks.
- Commits validated and processed experiment data to the database.
- Includes robust error handling for validation failures and database operations.

Endpoint:
- '/api/experiments': Accepts POST requests for creating new experiments.

Usage:
The Blueprint 'experiments' is registered to the Flask app to handle experiment-related routes.

Example:
from app import app
app.register_blueprint(experiments)
"""

from flask import Blueprint, request, jsonify
from app.db.database import Database
from app.util.validation.experiment_validation import validate_table_data
from app.util.conversion.experiment_conversion import convert_experiment_data_to_numpy
from app.db.commit.commit_experiment import commit_experiment_data
from app.db.helpers.check_duplicate import check_duplicate_field
from app.api.api_utils import validate_and_return

experiments = Blueprint('experiments', __name__)

@experiments.route('/api/experiments', methods=['POST'])
def create_experiment():
    payload = request.get_json()
    
    experiment_name = payload['experimentName']
    experiment_data = payload['experimentData']
    experiment_table = experiment_data['experimentTable']
    experiment_description = payload['experimentDescription']
 
    experiment_table = convert_experiment_data_to_numpy(experiment_table)

    error_response = validate_and_return(experiment_table)

    if error_response is not None:
        return error_response

    with Database() as db:
        if check_duplicate_field(db.conn, experiment_name, 'experiment_name', 'experiments'):
            return jsonify({"error": "Duplicate experiment name in database."}), 400

        try:
            commit_experiment_data(experiment_name, experiment_table, experiment_data, experiment_description)
        except Exception as error:
            return jsonify({"error": str(error)}), 400

    return jsonify({"message": "Experiment data saved successfully."}), 201