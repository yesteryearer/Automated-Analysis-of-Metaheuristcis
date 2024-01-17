"""
Wilcoxon Signed-Rank Test Function

This function conducts the Wilcoxon signed-rank test, a non-parametric statistical test for comparing paired samples.

Functionality:
- Calculates the differences between paired observations of two algorithms.
- Applies the Wilcoxon signed-rank test on these differences to determine statistical significance.
- Computes the test statistic (T) and the p-value for the differences.
- Determines whether the differences are statistically significant based on the alpha level.
- Calculates R⁺ and R⁻ values, which represent the sum of ranks for positive and negative differences, respectively.
- Retrieves critical values for the Wilcoxon test and assesses the null hypothesis acceptance or rejection for different alpha levels.

Parameters:
- algorithm_one: A list of results from the first algorithm.
- algorithm_two: A list of results from the second algorithm.
- alpha: The significance level used to determine the threshold for statistical significance.

Returns:
- A namedtuple 'Result' containing T, R⁺, R⁻, p-value, a boolean indicating significance, and a dictionary of critical values with hypothesis outcomes.

Usage:
- This function is used to statistically compare the results of two algorithms, particularly useful when the data does not meet the assumptions of parametric tests.

Example:
result = wilcoxon_signed_rank_test(algorithm_one_results, algorithm_two_results, 0.05)
"""

from scipy.stats import wilcoxon
from collections import namedtuple
from app.services.stats.nonparametric.wilcoxon_test.wilcoxon_util import get_wilcoxon_critical_values
from app.constants.optimization_mode import OptimizationMode
import logging
logging.basicConfig(level=logging.DEBUG)

Result = namedtuple('Result', ['T', 'R_plus', 'R_minus', 'p_value', 'significant', 'critical_values'])

def wilcoxon_signed_rank_test(
        algorithm_one, 
        algorithm_two, 
        alpha: float):
    n = len(algorithm_one)

    differences = [float(algorithm_one[i] - algorithm_two[i]) for i in range(n)]
    T, p_value = wilcoxon(x=differences, zero_method='zsplit')

    significant = p_value < alpha

    R_plus = T
    R_minus = n * (n + 1) / 2 - R_plus

    critical_values = get_wilcoxon_critical_values(n)

    for alpha, c in critical_values.items():
        if T <= int(c): 
            critical_values[alpha] = (int(c), 'Rejected')
        else:
            critical_values[alpha] = (int(c), 'Retained')

    return Result(T, R_plus, R_minus, p_value, significant, critical_values)