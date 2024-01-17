"""
Pairwise Analysis Request Handler

This function processes 'pairwise analysis' requests within the Flask application.

Features:
- Transforms experiment data from the payload into a NumPy array for detailed analysis.
- Extracts key details from the payload, including experiment name, selected rows, alpha value, and analysis type.
- Checks that exactly two rows are selected for the pairwise analysis, returning an error if not.
- Determines the optimization mode (minimize or maximize) based on the payload.
- Validates the experiment data using the 'validate_and_return' function.
- Performs pairwise analysis using 'perform_pairwise_analysis', focusing on two selected data sets.
- Assembles and returns detailed analysis results, including Wilcoxon table, critical values table, and descriptive text.

Parameters:
- payload: The JSON payload from the API request, containing necessary details for the analysis.

Returns:
- A dictionary containing the pairwise analysis results, or an error response if the validation checks fail.

Usage:
This function is intended to be used for processing pairwise analysis requests in the API.

Example:
result = request_pairwise_analysis(payload)
if isinstance(result, dict):
    Process and handle the returned analysis results
"""
from flask import jsonify
from app.api.api_utils import validate_and_return
from app.util.conversion.experiment_conversion import convert_experiment_data_to_numpy
from app.services.analysis import perform_pairwise_analysis
from app.constants.optimization_mode import OptimizationMode

def request_pairwise_analysis(payload):
    result = []

    experiment_data = convert_experiment_data_to_numpy(payload['experimentData'])
    experiment_name = payload['experimentName']
    selected_rows = payload['selectedRows']
    alpha = float(payload['alpha'])
    analysis_type = payload['analysisType']
    experiment_description = payload['experimentDescription']

    optimization_mode = OptimizationMode.MINIMIZE if payload['optimizationMode'] == 'minimize' else OptimizationMode.MAXIMIZE

    error_response = validate_and_return(experiment_data)
    if error_response is not None:
        return error_response
    
    if len(selected_rows) != 2:
        return jsonify({"error": "Invalid number of selected rows for pairwise analysis. Exactly two rows should be selected."}), 400

    algorithm1_data = experiment_data[selected_rows[0]].tolist()
    algorithm2_data = experiment_data[selected_rows[1]].tolist()

    wilcoxon_table, critical_values_table, description = perform_pairwise_analysis(algorithm1_data, algorithm2_data, optimization_mode, alpha)

    result = {"experimentName": experiment_name,
              "analysisType": analysis_type,
              "analysisName": f"{experiment_name}_{analysis_type}" ,
              "analysisData": wilcoxon_table, 
              "cTable": critical_values_table, 
              "description": description, 
              "alpha": alpha,
              "experimentDescription": experiment_description,
            }

    return result
