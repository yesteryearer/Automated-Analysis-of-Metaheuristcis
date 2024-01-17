"""
Analysis Blueprint for Flask Application

This script defines the analysis Blueprint for handling different types of analysis requests in the Flask application.

Features:
- Defines routes for pairwise, control, and all analysis types.
- Implements an 'analyse' function that processes the analysis requests based on the analysis type.
- Utilizes specific functions for each analysis type to handle the computation.
- Includes error handling for invalid analysis types and exceptions during analysis processing.
- Uses JSON for request and response data format.

Logging:
- Configures logging at DEBUG level for detailed information during development and debugging.

Usage:
The Blueprint 'analysis' is registered to the Flask app to handle routes under '/api/analysis'.

Example:
from app import app
app.register_blueprint(analysis)
"""

from flask import Blueprint, request, jsonify
from app.api.routes.analysis_types.pairwise_analysis import request_pairwise_analysis
from app.api.routes.analysis_types.control_analysis  import request_control_analysis
from app.api.routes.analysis_types.all_analysis  import request_all_analysis
import logging

logging.basicConfig(level=logging.DEBUG)
analysis = Blueprint('analysis', __name__)

def analyse(payload):
    analysis_type = payload['analysisType']

    try:
        if analysis_type == 'pairwise':
            result = request_pairwise_analysis(payload)
        elif analysis_type == 'control':
            result = request_control_analysis(payload)
        elif analysis_type == 'all':
            result = request_all_analysis(payload)
        else:
            raise ValueError(f"Invalid analysis type: {analysis_type}")
    except Exception as e:
        return jsonify({"error": f"An error occurred while executing {analysis_type}: {str(e)}"}), 500

    return jsonify({"message": f"{analysis_type} executed successfully.", "result": result}), 201

@analysis.route('/api/analysis/pairwise', methods=['POST'])
def pairwise_analysis():
    payload = request.get_json()
    return analyse(payload)


@analysis.route('/api/analysis/control', methods=['POST'])
def control_analysis():
    payload = request.get_json()
    return analyse(payload)


@analysis.route('/api/analysis/all', methods=['POST'])
def all_analysis():
    payload = request.get_json()
    return analyse(payload)