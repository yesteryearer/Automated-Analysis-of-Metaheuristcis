import numpy as np
from scipy.stats import norm              

def calculate_z_value(average_rank_one, average_rank_two, k, n):
    """
    Calculates the z-value for a pairwise comparison between two groups.
    """
    standard_error = np.sqrt(k * (k + 1) / (6.0 * n))
    z_value = (average_rank_one - average_rank_two) / standard_error
    return z_value

def calculate_control_z_values(control_rank, other_ranks, k, n):
    """
    Calculates the z-values for pairwise comparisons with a control group.
    """
    return [calculate_z_value(control_rank, other_rank, k, n) for other_rank in other_ranks]

def calculate_pairwise_z_values(ranks, n):
    """
    Calculates the z-values for pairwise comparisons between all pairs of groups.
    """
    k = len(ranks)
    z_values = {}

    for i in range(k):
        for j in range(i+1, k):
            pair = (i, j)
            z_value = abs(calculate_z_value(ranks[i], ranks[j], k, n))
            z_values[pair] = z_value

    return z_values

def calculate_p_value(z_value):
    """
    Calculates the p-value for a z-value.
    """
    return 2 * (1 - norm.cdf(abs(z_value)))