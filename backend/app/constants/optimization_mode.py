"""
Optimization Mode Enumeration

This enumeration defines the modes of optimization used in the application.

Enum Values:
- MINIMIZE (1): Represents the optimization mode where the goal is to minimize a certain metric or value.
- MAXIMIZE (2): Represents the optimization mode where the goal is to maximize a certain metric or value.

Usage:
- Used to specify the optimization mode in various parts of the application, such as in analysis functions or algorithms.
- Facilitates clear and consistent references to these optimization modes throughout the codebase.

Example:
optimization_mode = OptimizationMode.MINIMIZE
if optimization_mode == OptimizationMode.MAXIMIZE:
    # Perform maximization logic
"""

from enum import Enum

class OptimizationMode(Enum):
    MINIMIZE = 1
    MAXIMIZE = 2
