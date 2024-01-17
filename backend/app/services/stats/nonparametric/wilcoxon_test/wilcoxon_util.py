import pandas as pd
import os

def load_wilcoxon_data(csv_file):
    """
    Load Wilcoxon T distribution data from a CSV file into a Pandas DataFrame.
    """
    full_path = os.path.join('/app', csv_file)

    if not os.path.exists(full_path):
        return f"File not found: {full_path}"
    
    try:
        return pd.read_csv(full_path, index_col=0)
    except Exception as e:
        return f"Error reading the file: {e}"

def get_wilcoxon_critical_values(n):
    csv_file = 'data/wilcoxon_t_distribution.csv'
    df = load_wilcoxon_data(csv_file)

    if not isinstance(df, pd.DataFrame):
        return df

    if n in df.index:
        row = df.loc[n].replace('x', pd.NA).dropna()
        critical_values = row.to_dict()
        return critical_values
    else:
        return f"No data available for n={n}"

