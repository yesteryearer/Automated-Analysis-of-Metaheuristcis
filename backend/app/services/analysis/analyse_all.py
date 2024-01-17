"""
All Analysis Performance Function

This function performs a comprehensive statistical analysis on experiment data.

Process:
- Converts the experiment data to a NumPy array and retrieves algorithm names.
- Conducts the standard Friedman test and calculates related statistics like ranks and p-values.
- Performs pairwise z-value calculations and adjusts p-values using multiple test corrections (Holm's method).
- Conducts the Nemenyi post-hoc test for pairwise comparisons.
- Generates detailed tables and descriptions of the analysis results.
- Constructs critical difference (CD) plots data for visual representation of the results.

Parameters:
- experiment_data: A NumPy array of experiment data.
- optimization_mode: An instance of OptimizationMode Enum indicating the optimization direction.
- alpha: The significance level used for statistical tests.

Returns:
- A tuple containing the ranks table, detailed analysis table, descriptive statistics, and CD plot data.

Usage:
- This function is used to perform an end-to-end analysis of experiment data, especially in comparing multiple algorithms or methods.

Example:
ranks_table, analysis_table, description, cd_plot_data = perform_all_analysis(experiment_data, OptimizationMode.MINIMIZE, 0.05)
"""

import numpy as np
import pandas as pd
import logging
import scikit_posthocs as sp
from statsmodels.stats.multitest import multipletests

from app.services.stats.nonparametric import standard_friedman_test
from app.services.stats.nonparametric.friedman_test.friedman_util import calculate_f_critical_value, calculate_iman_davenport_stat
from app.util.graphs.critical_difference_plots import generate_cd_plot_data
from app.services.stats.util.z_values import calculate_pairwise_z_values, calculate_p_value

logging.basicConfig(level=logging.DEBUG)

def perform_all_analysis(experiment_data, optimization_mode, alpha: float):
    k, n = experiment_data.shape[0], experiment_data.shape[1] - 1
    algorithm_names = experiment_data[:, 0]

    friedman_result = standard_friedman_test(np.vstack(experiment_data), optimization_mode)
    friedman_stat = friedman_result.friedman_stat
    p_value = friedman_result.p_value
    ranks = friedman_result.ranks

    z_values = calculate_pairwise_z_values(ranks, n)

    p_values_unadjusted = {pair: calculate_p_value(z) for pair, z in z_values.items()}
    transposed_data = experiment_data[:, 1:].T
    nemenyi_result = sp.posthoc_nemenyi_friedman(transposed_data)

    all_p_values = [calculate_p_value(z) for z in z_values.values()]
    _, holm_p_values_adjusted, _, _ = multipletests(pvals=all_p_values, alpha=alpha, method='holm')

    table = [["Algorithm Pair", "z-value", "p-value", "APV (Holm)", "APV (Nemenyi)", "Holm NH", "Nemenyi NH"]]
    significant_algorithms_nemenyi = []
    significant_algorithms_holm = []

    for i in range(len(algorithm_names)):
        for j in range(i + 1, len(algorithm_names)):
            z_value = z_values.get((i, j), None)
            alg_pair = f"{algorithm_names[i]} vs {algorithm_names[j]}"
            p_unadj = p_values_unadjusted.get((i, j), None)
            holm_p_adj = holm_p_values_adjusted[list(z_values.keys()).index((i, j))]
            nemenyi_p_adj = nemenyi_result.iloc[i, j]
            nemenyi_nh_outcome = "Rejected" if nemenyi_p_adj < alpha else "Retained"
            if nemenyi_nh_outcome == "Rejected":
                significant_algorithms_nemenyi.append(alg_pair)
            holm_nh_outcome = "Rejected" if holm_p_adj < alpha else "Retained"
            if holm_nh_outcome == "Rejected":
                significant_algorithms_holm.append(alg_pair)

            table.append([alg_pair, 
                        "{:.5g}".format(z_value),
                        "{:.5g}".format(p_unadj),
                        "{:.5g}".format(holm_p_adj),
                        "{:.5g}".format(nemenyi_p_adj),
                        holm_nh_outcome, nemenyi_nh_outcome])

    nemenyi_result = nemenyi_result.astype(float)
    
    iman_davenport_stat = calculate_iman_davenport_stat(friedman_stat, k, n)
    f_critical_value = calculate_f_critical_value(k, n, alpha)

    description = {
        "test_applied": "Standard Friedman Test",
        "post_hoc": "Nemenyi",
        "friedman_stat": '{:.5e}'.format(friedman_stat) if friedman_stat < 0.001 else '{:.5f}'.format(friedman_stat),
        "p_value": '{:.5e}'.format(p_value) if p_value < 0.001 else '{:.5f}'.format(p_value),
        "significant": True if p_value < alpha else False,
        "significance_test": f"p-value {('<' if p_value < alpha else '>')} alpha",
        "alpha": '{:.5g}'.format(alpha),   
        "significant_algorithms" : significant_algorithms_nemenyi + significant_algorithms_holm, 
        "significant_algorithms_nemenyi": significant_algorithms_nemenyi,
        "significant_algorithms_holm": significant_algorithms_holm,
        "algorithm_cardinality": k,
        "benchmark_cardinality": n,
        "iman_davenport_critical": '{:.5e}'.format(f_critical_value) if f_critical_value < 0.001 else '{:.5f}'.format(f_critical_value),
        "iman_davenport_stat": '{:.5e}'.format(iman_davenport_stat) if iman_davenport_stat < 0.001 else '{:.5f}'.format(iman_davenport_stat),
    }

    ranks_for_cd = dict(zip(algorithm_names, ranks))

    sig_matrix_for_nemenyi = pd.DataFrame(np.ones((k, k)), index=algorithm_names, columns=algorithm_names)
    for (i, j), _ in z_values.items():
        p_adj_value = float(nemenyi_result.iloc[min(i, j), max(i, j)])
        sig_matrix_for_nemenyi.iloc[i, j] = p_adj_value
        sig_matrix_for_nemenyi.iloc[j, i] = p_adj_value

    nemenyi_cd_plot_data = generate_cd_plot_data(ranks_for_cd, sig_matrix_for_nemenyi, "Nemenyi")

    sig_matrix_for_holm = pd.DataFrame(np.ones((k, k)), index=algorithm_names, columns=algorithm_names)
    counter = 0
    for i in range(len(algorithm_names)):
        for j in range(i + 1, len(algorithm_names)):
            holm_p_adj = holm_p_values_adjusted[counter]
            sig_matrix_for_holm.iloc[i, j] = holm_p_adj
            sig_matrix_for_holm.iloc[j, i] = holm_p_adj
            counter += 1

    holm_cd_plot_data = generate_cd_plot_data(ranks_for_cd, sig_matrix_for_holm, "Holm")

    cd_plot_data = [nemenyi_cd_plot_data, holm_cd_plot_data]

    return friedman_result.ranks_table, table, description, cd_plot_data