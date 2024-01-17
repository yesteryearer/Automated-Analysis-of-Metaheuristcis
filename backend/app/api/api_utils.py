"""
Data Validation Function for Experiments

This function is designed to validate experiment data in the Flask application.

Features:
- Utilizes a custom validation function 'validate_table_data' to check the integrity and format of experiment data.
- Handles the validation process for the data received from API requests.
- Catches any ValueError raised during validation and returns an error response.
- Returns None if the data passes validation, indicating no errors.

Usage:
This function is called to validate experiment data before processing it further (e.g., storing it in the database).

Example:
validation_response = validate_and_return(experiment_data)
if validation_response:
    # Handle error response
"""

from flask import jsonify
from app.util.validation.experiment_validation import validate_table_data

def validate_and_return(experiment_data):
    try:
        validate_table_data(experiment_data)
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    return None
