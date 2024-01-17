"""
Backend Service Entry Point

This script serves as the entry point for the backend service of the application. 
It utilizes Flask to create and run a web server.

Key Components:
- Flask application initialization using 'create_app' from 'app.app'.
- Retrieval of the server port from environment variables, with a default fallback.
- Configuration to run the Flask app on a specified port, accessible externally.

Usage:
Run this script to start the backend service. Ensure environment variables are set 
for 'DOCKER_BACKEND_PORT', or it will default to port 5000.

Example:
$ python <script_name>.py
"""

import os
from app.app import create_app

app = create_app()
                                                                                                                                                                           
if __name__ == '__main__':
    port = os.environ.get('DOCKER_BACKEND_PORT', 5000)
    app.run(host='0.0.0.0', port=port)

