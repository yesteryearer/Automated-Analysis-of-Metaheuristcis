"""
Control Analysis Request Handler

This function is responsible for processing 'control analysis' requests within the Flask application.

Features:
- Converts experiment data from the payload to a NumPy array for analysis.
- Extracts essential information such as alpha value, analysis type, experiment name, and description.
- Validates the number of selected rows for control analysis, ensuring exactly one row is selected.
- Determines the optimization mode (minimize or maximize) based on the payload.
- Validates the experiment data using the 'validate_and_return' function.
- Calls 'perform_control_analysis' to execute the required control analysis.
- Constructs and returns the analysis results including tables, descriptions, and plot data.

Parameters:
- payload: The JSON payload from the API request containing experiment and analysis details.

Returns:
- A dictionary with the analysis results, or an error response if validation fails.

Usage:
This function is called when handling 'control analysis' requests from the API.

Example:
result = request_control_analysis(payload)
if isinstance(result, dict):
    Process analysis results
"""
from flask import jsonify
from app.api.api_utils import validate_and_return
from app.util.conversion.experiment_conversion import convert_experiment_data_to_numpy
from app.services.analysis import perform_control_analysis
from app.constants.optimization_mode import OptimizationMode

def request_control_analysis(payload):
    result = []
    alpha = float(payload['alpha'])
    analysis_type = payload['analysisType']

    experiment_data = convert_experiment_data_to_numpy(payload['experimentData'])
    experiment_name = payload['experimentName']
    experiment_description = payload['experimentDescription']

    if not len(payload['selectedRows']) == 1:
        return jsonify({"error": "Invalid number of selected rows for control analysis. Exactly one row should be selected."}), 400

    selected_row = payload['selectedRows'][0] - 1
    optimization_mode = OptimizationMode.MINIMIZE if payload['optimizationMode'] == 'minimize' else OptimizationMode.MAXIMIZE

    error_response = validate_and_return(experiment_data)
    if error_response is not None:
        return error_response
    
    experiment_data = experiment_data[1:, :]

    ranks_table, table, description, cd_plot_data = perform_control_analysis(experiment_data, selected_row, optimization_mode, alpha)
    
    result = {"experimentName": experiment_name,
              "experimentDescription": experiment_description,
              "analysisType": analysis_type,
              "analysisName": f"{experiment_name}_{analysis_type}" , 
              "analysisData": table,
              "ranksTable": ranks_table, 
              "description": description, 
              "cdPlotData": cd_plot_data,
              "alpha": alpha, 
              "analysisType": "control"}

    return result
