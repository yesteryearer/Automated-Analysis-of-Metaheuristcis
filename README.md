<div align="center">
  <img src="https://i.ibb.co/843cxf3/Face.png" alt="The Faces of Computational Intelligence" style="border: 2px solid black; box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);">
</div>

<div align="center" style="font-size: larger;">
  <strong>Automated Analysis of Metaheuristics</strong>
</div>


## Overview

AE5 is a comprehensive full-stack web application tailored for the automated analysis of metaheuristic algorithms, a core component within the Computational Intelligence segment of Artificial Intelligence. This robust application integrates a front-end, back-end, and a database schema, all seamlessly hosted on a web based front-end. It leverages nonparametric statistical methods for the robust evaluation of algorithmic performance and provide visual representations.

## Usage

Leveraging Docker's advanced capabilities, AE5 ensures a smooth initiation process. Begin by cloning the project onto your local machine. Docker is designed with backward compatibility in mind, but please ensure your system meets or exceeds these versions:

  - Docker version 24.0.2
  - Docker Compose version v2.18

Once these prerequisites are satisfied, navigate to the cloned project's directory, where you'll find the `docker-compose.yml` file.

### Environment Configuration

The AE5 application uses a `.env` file for environment configurations. This centralized approach simplifies setup and addresses potential conflicts with existing configurations. Update the following variables in your `.env` file to suit your setup:

  - `DOCKER_BACKEND_PORT`: Define the back-end port.
  - `DOCKER_FRONTEND_PORT`: Set the front-end port.
  - `DOCKER_DB_PORT`: Specify the database port.

Adjust these variables as per your requirements. Remember to update corresponding backend database connection settings if necessary.

### Build & Run

To set up the application, follow these steps:

1. **Build Docker Images**: 
   In the root directory of the project, execute:

```
docker compose build
```

2. **Launch the Application**:
To start the application, input:

```
docker compose up
```

Optionally, for detached mode, use:

```
docker compose up -d
```


> **Note**: Initial builds may take a while. Optimization is ongoing as the project develops.

Once running, access the front-end through a modern browser at `localhost:${DOCKER_FRONTEND_PORT}`. The default for `${DOCKER_FRONTEND_PORT}` is 3000, but you can customize it in the `.env` file.

### Database Container Management

For database management, follow these steps:

1. View the PostgreSQL database container:

```
docker ps
```


2. Access the container:

```
docker exec -it [container_id_or_name] bash
```

3. Connect to the database:

```
psql -U [username] -d [databasename]
```

4. View and manage tables as required:
```
\dt
\d [tablename]
```

To completely reset the database, it is necessary to remove the contents of the `data` directory located within the database directory. This step is crucial particularly after making modifications to the database structure as outlined in `sql.init`. If this action is not taken, `docker compose` will bypass initialization, owing to the presence of hidden volumes within the data directory.

## Future Development
**Key Enhancements**

The upcoming improvements that are essential for future development include:

- Refactoring the Analyser Table on the Analysis Page
    Invert the orientation of algorithms and benchmarks.
    This major update involves significant changes to the core logic, which is why it has not been implemented yet.

- Selectable Benchmark Functions
    Introduce the ability to select benchmark functions directly.
    Currently, this is somewhat achievable through a workaround of deleting and adding columns.

- Persistent Data Across Window Changes
    Implement functionality to maintain data continuity even when navigating between different windows or views.

- More Nuanced Database 
    The database currently has some functionality for tracking benchmarks, algorithms, and such but this isn't utilised in the core functionality.