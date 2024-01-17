"""
Control Analysis Function

This function performs a control analysis on experiment data, comparing a control algorithm against others.

Process:
- Retrieves the control algorithm's data and compares it with other algorithms.
- Conducts the standard Friedman test and calculates related statistics like ranks and p-values.
- Performs control-specific z-value calculations for pairwise comparisons with the control algorithm.
- Adjusts p-values using the Holm correction method for multiple testing.
- Generates detailed tables and descriptions of the analysis results, including algorithm pairs, z-values, and p-values.
- Constructs a critical difference (CD) plot data matrix for visual representation of the results.

Parameters:
- experiment_data: A NumPy array of experiment data.
- selected_row: Index of the control algorithm in the experiment data.
- optimization_mode: An instance of OptimizationMode Enum indicating the optimization direction.
- alpha: The significance level used for statistical tests.

Returns:
- A tuple containing the ranks table, analysis table, descriptive statistics, and CD plot data.

Usage:
- Used to analyze the performance of a control algorithm relative to other algorithms, particularly useful in benchmarking studies.

Example:
ranks_table, analysis_table, description, cd_plot_data = perform_control_analysis(experiment_data, selected_row, OptimizationMode.MINIMIZE, 0.05)
"""

import numpy as np
import pandas as pd
from statsmodels.stats.multitest import multipletests
import logging

from app.services.stats.nonparametric import standard_friedman_test
from app.services.stats.util.z_values import calculate_control_z_values, calculate_p_value
from app.services.stats.nonparametric.friedman_test.friedman_util import calculate_f_critical_value, calculate_iman_davenport_stat
from app.util.graphs.critical_difference_plots import generate_cd_plot_data

logging.basicConfig(level=logging.DEBUG)

def perform_control_analysis(experiment_data, selected_row, optimization_mode, alpha: float):
    k, n = experiment_data.shape[0], experiment_data.shape[1] - 1
    control_algorithm_name = experiment_data[selected_row, 0]
    other_algorithm_names = experiment_data[np.arange(k) != selected_row, 0]

    friedman_result = standard_friedman_test(np.vstack(experiment_data), optimization_mode)
    friedman_stat = friedman_result.friedman_stat
    p_value = friedman_result.p_value
    z_values = calculate_control_z_values(friedman_result.ranks[0], friedman_result.ranks[1:], k, n)

    p_values_unadjusted = [calculate_p_value(z) for z in z_values]
    reject, p_values_adjusted, _, _ = multipletests(pvals=p_values_unadjusted, alpha=alpha, method='holm')

    data_for_table = sorted(
        [(f"{control_algorithm_name} vs {alg_name}", z, p_unadj, p_adj, "Rejected" if rej else "Retained")
         for alg_name, z, p_unadj, p_adj, rej in zip(other_algorithm_names, z_values, p_values_unadjusted, p_values_adjusted, reject)],
        key=lambda x: x[3]
    )

    table = [["Algorithm Pair", "z-value", "p-value (unadjusted)", "p-value (adjusted)", "Null Hypothesis"]] + [
        [alg_pair, f"{z:.5f}" if abs(z) >= 0.001 else f"{z:.5e}", 
         f"{p_unadj:.5f}" if p_unadj >= 0.001 else f"{p_unadj:.5e}", 
         f"{p_adj:.5f}" if p_adj >= 0.001 else f"{p_adj:.5e}", 
         nh_outcome] for alg_pair, z, p_unadj, p_adj, nh_outcome in data_for_table
    ]

    iman_davenport_stat = calculate_iman_davenport_stat(friedman_result.friedman_stat, k, n)
    f_critical_value = calculate_f_critical_value(k, n, alpha)
    significant_algorithms = [alg_name for alg_name, _, _, p_adj, _ in data_for_table if p_adj < alpha]

    description = {
        "test_applied": "Standard Friedman Test",
        "post_hoc": "Holm",
        "friedman_stat": '{:.5e}'.format(friedman_stat) if friedman_stat < 0.001 else '{:.5f}'.format(friedman_stat),
        "p_value": '{:.5e}'.format(p_value) if p_value < 0.001 else '{:.5f}'.format(p_value),
        "significant": True if p_value < alpha else False,
        "significance_test": f"p-value {('<' if p_value < alpha else '>')} alpha",
        "alpha": '{:.5g}'.format(alpha),    
        "significant_algorithms": significant_algorithms,
        "algorithm_cardinality": k,
        "benchmark_cardinality": n,
        "iman_davenport_critical": '{:.5e}'.format(f_critical_value) if f_critical_value < 0.001 else '{:.5f}'.format(f_critical_value),
        "iman_davenport_stat": '{:.5e}'.format(iman_davenport_stat) if iman_davenport_stat < 0.001 else '{:.5f}'.format(iman_davenport_stat),
        "control_algorithm": control_algorithm_name,
    }

    ranks_for_cd = {algorithm: rank for algorithm, rank in zip(np.concatenate(([control_algorithm_name], other_algorithm_names)), friedman_result.ranks)}

    sig_matrix_for_cd = np.ones((len(ranks_for_cd), len(ranks_for_cd)))
    control_index = 0
    for i, p_adj in enumerate(p_values_adjusted, 1):
        sig_matrix_for_cd[[control_index, i], [i, control_index]] = p_adj
    sig_matrix_for_cd = pd.DataFrame(sig_matrix_for_cd, index=ranks_for_cd.keys(), columns=ranks_for_cd.keys())

    holm_cd_plot_data = generate_cd_plot_data(ranks_for_cd, sig_matrix_for_cd, "Holm")

    cd_plot_data = [holm_cd_plot_data]

    return friedman_result.ranks_table, table, description, cd_plot_data


