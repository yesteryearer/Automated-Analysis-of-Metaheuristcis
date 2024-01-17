"""
Table Data Validator

This function validates the format and content of a data table used in the application.

Validation Rules:
- The cell at [0][0] (top-left corner) must be empty.
- The first row (excluding the first cell) should contain headers with alphanumeric characters or specific symbols (-, _, *, $, #).
- The first column (excluding the first cell) should contain row headers fitting the same criteria as above.
- All other cells should contain numeric values, ensuring they can be processed as part of analyses.

Parameters:
- data: A 2D NumPy array representing the table data to be validated.

Returns:
- True if the validation passes without any errors.

Raises:
- ValueError: If any of the validation rules are violated, with a message indicating the specific issue and cell location.

Usage:
- Call this function to validate data tables before processing or storing them in the database.
- Ensures that the table data adheres to a consistent format, facilitating reliable analysis and processing.

Example:
try:
    validate_table_data(data)
except ValueError as e:
    print(f"Validation error: {e}")
"""

import re

def validate_table_data(data):
    if data[0, 0]:
        raise ValueError("Cell [0][0] must be empty.")

    rows, cols = data.shape

    for j in range(1, cols):
        if not data[0, j] or not re.match("^[a-zA-Z0-9\-_*#$]+$", data[0, j]):
            raise ValueError(f"Cell [0][{j}] must be alphanumeric or contain any of these symbols: -, _, *, $, #, and non-empty.")

    for i in range(1, rows):
        if not data[i, 0] or not re.match("^[a-zA-Z0-9\-_*#$]+$", data[i, 0]):
            raise ValueError(f"Cell [{i}][0] must be alphanumeric or contain any of these symbols: -, _, *, $, #, and non-empty.")

    for i in range(1, rows):
        for j in range(1, cols):
            try:
                float(data[i, j])
            except ValueError:
                raise ValueError(f"Cell [{i}][{j}] must be numeric.")

    return True
