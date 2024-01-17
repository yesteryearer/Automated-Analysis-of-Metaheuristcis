"""
All Analysis Request Handler

This function manages the processing of 'all analysis' requests within the Flask application.

Features:
- Converts experiment data from the payload to a NumPy array for analysis.
- Extracts and processes necessary information like alpha value, analysis type, experiment name, and description.
- Determines the optimization mode (minimize or maximize) based on the payload.
- Validates the experiment data using 'validate_and_return' function.
- Calls 'perform_all_analysis' to execute the required analysis.
- Assembles and returns the analysis results including tables, descriptions, and plot data.

Parameters:
- payload: The JSON payload from the API request containing experiment and analysis details.

Returns:
- A dictionary with the analysis results, or an error response if validation fails.

Usage:
This function is called when handling 'all analysis' requests from the API.

Example:
result = request_all_analysis(payload)
if isinstance(result, dict):
    Process analysis results
"""
from flask import jsonify
from app.api.api_utils import validate_and_return
from app.util.conversion.experiment_conversion import convert_experiment_data_to_numpy
from app.services.analysis import perform_all_analysis
from app.constants.optimization_mode import OptimizationMode
import logging

logging.basicConfig(level=logging.DEBUG)

def request_all_analysis(payload):
    result = []
    alpha = float(payload['alpha'])
    analysis_type = payload['analysisType']

    experiment_data = convert_experiment_data_to_numpy(payload['experimentData'])
    experiment_name = payload['experimentName']
    experiment_description = payload['experimentDescription']

    optimization_mode = OptimizationMode.MINIMIZE if payload['optimizationMode'] == 'minimize' else OptimizationMode.MAXIMIZE

    error_response = validate_and_return(experiment_data)
    if error_response is not None:
        return error_response
    
    experiment_data = experiment_data[1:, :]

    ranks_table, table, description, cd_plot_data = perform_all_analysis(experiment_data, optimization_mode, alpha)
    
    result = {"experimentName": experiment_name,
              "analysisType": analysis_type,
              "analysisName": f"{experiment_name}_{analysis_type}",
              "analysisData": table,
              "ranksTable": ranks_table,
              "description": description,
              "cdPlotData": cd_plot_data,
              "alpha": alpha,
              "experimentDescription": experiment_description,
    }

    return result
