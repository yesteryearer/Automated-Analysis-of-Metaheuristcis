import logging

logging.basicConfig(level=logging.DEBUG)

import scipy.stats as stats

def calculate_f_critical_value(dfn, dfd, alpha: float):
    """
    Calculates the critical value for the F-distribution.

    :param dfn: Degrees of freedom of the numerator
    :param dfd: Degrees of freedom of the denominator
    :param alpha: Significance level
    :return: Critical value for the F-distribution
    """

    return stats.f.ppf(1 - alpha, dfn, dfd)

def calculate_iman_davenport_stat(friedman_statistic, k, n):
    """
    Calculates the Iman-Davenport statistic.

    :param friedman_statistic: Friedman statistic
    :param k: Number of groups
    :param n: Number of blocks (repeated measures)
    :return: Iman-Davenport statistic
    """

    return (friedman_statistic * (n - 1)) / (n * (k - 1) - friedman_statistic)