"""
Pairwise Analysis Function

This function performs pairwise statistical analysis on two sets of algorithm results.

Functionality:
- Compares two algorithms using the Wilcoxon signed-rank test.
- Converts algorithm results to Decimal for precise arithmetic operations.
- Computes the Wilcoxon test statistics including R⁺, R⁻, and p-value.
- Generates a table with Wilcoxon test results and a table of critical values for various alpha levels.
- Provides a descriptive summary of the statistical comparison between the two algorithms.

Parameters:
- algorithm_one: A tuple containing the first algorithm's name and a list of its results.
- algorithm_two: A tuple containing the second algorithm's name and a list of its results.
- optimization_mode: An instance of OptimizationMode Enum indicating the optimization direction.
- alpha: The significance level used for the Wilcoxon test.

Returns:
- A tuple containing the Wilcoxon test result table, critical values table, and a descriptive summary.

Usage:
- This function is used for detailed pairwise comparisons between two algorithms, particularly useful in performance benchmarking studies.

Example:
wilcoxon_table, critical_values_table, description = perform_pairwise_analysis(algorithm_one, algorithm_two, OptimizationMode.MINIMIZE, 0.05)
"""

from app.services.stats.nonparametric import wilcoxon_signed_rank_test
from decimal import Decimal
import logging

logging.basicConfig(level=logging.DEBUG)

def perform_pairwise_analysis(
        algorithm_one, 
        algorithm_two, 
        optimization_mode, 
        alpha: float
    ):
    
    algorithm_one_name, algorithm_one_results = algorithm_one[0], algorithm_one[1:]
    algorithm_two_name, algorithm_two_results = algorithm_two[0], algorithm_two[1:]

    algorithm_one_results = [Decimal(result) for result in algorithm_one_results]
    algorithm_two_results = [Decimal(result) for result in algorithm_two_results]

    n = len(algorithm_one_results)

    result = wilcoxon_signed_rank_test(algorithm_one_results, algorithm_two_results, alpha)
    p_value = result.p_value

    wilcoxon_table = [
        ["Comparison", "R⁺", "R⁻", "p-value"],
        [
            f'{algorithm_one_name} vs {algorithm_two_name}', 
            str(result.R_plus), 
            str(result.R_minus), 
            str(result.p_value)
        ]
    ]

    critical_values_table = [
        ["alpha", "Critical Value", "Null Hypothesis"],
    ]
    for a, (critical_value, null_hypothesis) in result.critical_values.items():
        critical_values_table.append([a, str(critical_value), null_hypothesis])

    if result.significant:
        description_text = f"There is a significant difference between {algorithm_one_name} and {algorithm_two_name}."
    else:
        description_text = f"There is no significant difference between {algorithm_one_name} and {algorithm_two_name}."

    description = {
        "test_applied": "Wilcoxon Signed-ranks Test",
        "optimization_mode": str(),
        "algorithm_one": str(algorithm_one_name),
        "algorithm_two": str(algorithm_two_name),
        "comparison_results": description_text,
        "r_plus": str(result.R_plus),
        "r_minus": str(result.R_minus),
        "p_value": str('{:.5e}'.format(p_value) if p_value < 0.001 else '{:.5f}'.format(p_value),),
        "significance": str(result.significant),
        "alpha": str(alpha),
        "signficant": str(result.significant),
        "t": str(result.T),
        "benchmark_cardinality": str(n),
    }
    
    return wilcoxon_table, critical_values_table, description