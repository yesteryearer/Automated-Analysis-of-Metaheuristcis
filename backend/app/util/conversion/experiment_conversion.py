"""
Experiment Data Conversion to NumPy Array

This function converts a list of lists (representing experiment data) into a NumPy array.

Functionality:
- Determines the dimensions of the input data (rows and columns).
- Creates an empty NumPy array with the same dimensions.
- Iteratively fills the NumPy array with the corresponding data from the input list.
- The function is flexible to handle any data type as it uses 'dtype=object'.

Parameters:
- data: A list of lists where each sublist represents a row of experiment data.

Returns:
- A NumPy array representation of the input experiment data.

Usage:
- This function is primarily used for converting data into a format suitable for further processing or analysis in the application.
- Particularly useful when the data needs to be manipulated or processed using NumPy's array operations.

Example:
experiment_data_list = [[...], [...], ...]
numpy_array = convert_experiment_data_to_numpy(experiment_data_list)
"""

import numpy as np

def convert_experiment_data_to_numpy(data):
    rows, cols = len(data), len(data[0])
    numpy_array = np.empty((rows, cols), dtype=object)

    for i in range(rows):
        for j in range(cols):
            numpy_array[i, j] = data[i][j]

    return numpy_array
