import scikit_posthocs as sp
import pandas as pd
import matplotlib.pyplot as plt
import base64
from io import BytesIO

def plot_critical_difference_diagram(ranks, sig_matrix):
    """
    Plots a Critical Difference diagram based on provided ranks and significance matrix.

    Parameters:
    ranks (dict): A dictionary with classifiers/estimators as keys and their ranks as values.
    sig_matrix (DataFrame): A pandas DataFrame representing the significance matrix (p-values).

    Returns:
    matplotlib figure: A figure containing the plotted Critical Difference diagram.
    """
    fig, ax = plt.subplots(figsize=(11.5, 5))

    sp.critical_difference_diagram(
        ranks, 
        sig_matrix, 
        ax=ax, 
        label_fmt_left='{label} [{rank:.3f}]  ',
        label_fmt_right='  [{rank:.3f}] {label}',
        text_h_margin=0.15,
        label_props={'color': 'black', 'fontweight': 'bold', 'fontsize': 10},
        crossbar_props={'color': None, 'marker': 'o', 'linewidth': 1.5},
        elbow_props={'color': 'gray', 'linestyle': '--'},
    )

    plt.subplots_adjust(left=0.1, right=0.9, top=0.8, bottom=0.3)

    return fig

def generate_cd_plot_data(ranks, sig_matrix, post_hoc_name):
    """
    Generates a critical difference plot and returns it in a format suitable for frontend use.

    :param ranks: Dictionary of algorithm names and their ranks.
    :param sig_matrix: DataFrame representing the significance matrix.
    :param post_hoc_name: String representing the name of the post-hoc test.
    :return: A dictionary containing the Base64-encoded plot image and its title.
    """
    fig = plot_critical_difference_diagram(ranks, sig_matrix)
    buf = BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)

    img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')

    cd_plot_data = {
        'imageData': img_base64,
        'title': f'Critical Difference Plot: {post_hoc_name}'
    }

    return cd_plot_data

