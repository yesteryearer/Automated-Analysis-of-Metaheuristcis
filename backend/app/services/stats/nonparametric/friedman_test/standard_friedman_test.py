"""
Standard Friedman Test Function

This function performs the Friedman test, a non-parametric statistical test for comparing multiple related samples.

Functionality:
- Converts the algorithm data to numeric values and adjusts for optimization mode (minimize or maximize).
- Applies the Friedman test to the numeric data, calculating the Friedman statistic and p-value.
- Computes the mean ranks for each algorithm and sorts them based on the optimization mode.
- Creates a detailed table of algorithms with their mean and ultimate ranks.
- Handles both maximization and minimization scenarios by adjusting the direction of comparison.

Parameters:
- algorithm_data: A NumPy array with the first column as algorithm names and the remaining columns as numeric results.
- optimization_mode: An instance of OptimizationMode Enum indicating the direction of optimization.

Returns:
- A namedtuple 'Result' containing the mean ranks, a detailed ranks table, the Friedman statistic, and the p-value.

Usage:
- This function is primarily used for comparing multiple algorithms or treatments across multiple test attempts or conditions.
- Useful in scenarios where the data does not meet the assumptions of parametric tests and where multiple related samples are compared.

Example:
result = standard_friedman_test(algorithm_data, OptimizationMode.MINIMIZE)
"""

from scipy.stats import friedmanchisquare, rankdata
from collections import namedtuple
from app.constants.optimization_mode import OptimizationMode
import numpy as np
import logging

logging.basicConfig(level=logging.DEBUG)

Result = namedtuple('Result', ['ranks', 'ranks_table', 'friedman_stat', 'p_value'])

def standard_friedman_test(algorithm_data, optimization_mode):
    numeric_data = algorithm_data[:, 1:].astype(float)

    if optimization_mode == OptimizationMode.MAXIMIZE:
        numeric_data = -numeric_data

    ranks = np.apply_along_axis(rankdata, 0, numeric_data)

    ranks_mean = ranks.mean(axis=1)

    friedman_stat, p_value = friedmanchisquare(*numeric_data)

    algorithm_names = algorithm_data[:, 0]
    mean_ranks_with_names = [(name, rank) for name, rank in zip(algorithm_names, ranks_mean)]
    mean_ranks_with_names.sort(key=lambda x: x[1], reverse=optimization_mode == OptimizationMode.MAXIMIZE)

    ultimate_ranks = {name: i+1 for i, (name, _) in enumerate(mean_ranks_with_names)}

    table = [[name, rank, ultimate_ranks[name]] for name, rank in mean_ranks_with_names]

    ranks_table = []
    for algorithm_name, mean_rank, ultimate_rank in table:
        formatted_mean_rank = '{:.5f}'.format(mean_rank).rstrip('0').rstrip('.')
        formatted_ultimate_rank = '{:.5f}'.format(ultimate_rank).rstrip('0').rstrip('.')
        ranks_table.append([algorithm_name, formatted_mean_rank, formatted_ultimate_rank])

    return Result(ranks_mean, ranks_table, friedman_stat, p_value)