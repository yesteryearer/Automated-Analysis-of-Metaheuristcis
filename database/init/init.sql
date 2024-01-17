CREATE TABLE  IF NOT EXISTS algorithms (
    algorithm_id SERIAL PRIMARY KEY,
    algorithm_name VARCHAR(255) NOT NULL
);

CREATE TABLE  IF NOT EXISTS benchmarks (
    benchmark_id SERIAL PRIMARY KEY,
    benchmark_name VARCHAR(255) NOT NULL
);

CREATE TABLE  IF NOT EXISTS experiments (
    experiment_id SERIAL PRIMARY KEY,
    experiment_name VARCHAR(255) NOT NULL,
    experiment_description TEXT,
    alpha NUMERIC,
    experiment_data json
);

CREATE TABLE  IF NOT EXISTS experiment_algorithms (
    experiment_id INTEGER NOT NULL,
    algorithm_id INTEGER NOT NULL,
    PRIMARY KEY (experiment_id, algorithm_id),
    FOREIGN KEY (experiment_id) REFERENCES experiments (experiment_id),
    FOREIGN KEY (algorithm_id) REFERENCES algorithms (algorithm_id)
);

CREATE TABLE  IF NOT EXISTS experiment_benchmarks (
    experiment_id INTEGER NOT NULL,
    benchmark_id INTEGER NOT NULL,
    PRIMARY KEY (experiment_id, benchmark_id),
    FOREIGN KEY (experiment_id) REFERENCES experiments (experiment_id),
    FOREIGN KEY (benchmark_id) REFERENCES benchmarks (benchmark_id)
);

CREATE TABLE  IF NOT EXISTS experiment_data (
    data_id SERIAL PRIMARY KEY,
    experiment_id INTEGER NOT NULL,
    algorithm_id INTEGER NOT NULL,
    benchmark_id INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    FOREIGN KEY (experiment_id) REFERENCES experiments (experiment_id),
    FOREIGN KEY (algorithm_id) REFERENCES algorithms (algorithm_id),
    FOREIGN KEY (benchmark_id) REFERENCES benchmarks (benchmark_id)
);

CREATE TABLE  IF NOT EXISTS analyses (
    analysis_name VARCHAR(255) NOT NULL,
    experiment_name VARCHAR(255) NOT NULL,
    analysis_id SERIAL PRIMARY KEY,
    test_type VARCHAR(255) NOT NULL,
    experiment_description TEXT,
    analysis_notes TEXT,
    result_data json
);

CREATE TABLE  IF NOT EXISTS analysis_algorithms (
    analysis_id INTEGER NOT NULL,
    algorithm_id INTEGER NOT NULL,
    algorithm_ranking NUMERIC,
    z_value NUMERIC,
    unadjusted_p_value NUMERIC,
    adjusted_p_value NUMERIC,
    PRIMARY KEY (analysis_id, algorithm_id),
    FOREIGN KEY (analysis_id) REFERENCES analyses (analysis_id),
    FOREIGN KEY (algorithm_id) REFERENCES algorithms (algorithm_id)
);

CREATE TABLE  IF NOT EXISTS analysis_benchmarks (
    analysis_id INTEGER NOT NULL,
    benchmark_id INTEGER NOT NULL,
    PRIMARY KEY (analysis_id, benchmark_id),
    FOREIGN KEY (analysis_id) REFERENCES analyses (analysis_id),
    FOREIGN KEY (benchmark_id) REFERENCES benchmarks (benchmark_id)
);
