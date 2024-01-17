"""
Flask Application Factory

This function initializes and configures the Flask application.

Features:
- Sets up CORS (Cross-Origin Resource Sharing) to allow requests from different origins.
- Registers blueprints for various routes: experiments, analysis, results, and search.
- Defines a simple home route that returns a greeting message.
- Configures logging to reduce verbosity of certain libraries like matplotlib.

Usage:
Called to create an instance of the Flask app with pre-configured settings and routes.

Example:
app = create_app()
"""

from flask import Flask
from flask_cors import CORS
from app.api.routes.experiments import experiments
from app.api.routes.analysis import analysis
from app.api.routes.results import results
from app.api.routes.search import search
from flask import Flask
import logging

logging.getLogger('matplotlib').setLevel(logging.WARNING)

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(experiments)
    app.register_blueprint(analysis)
    app.register_blueprint(results)
    app.register_blueprint(search)

    @app.route('/')
    def home():
        return 'Greetings from the backend!'   

    return app



