<p align="center">
  <a href="https://expressjs.com/pt-br/" target="blank"><img src="https://images.credly.com/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>


## Description

[Express](https://github.com/expressjs/expressjs.com) framework TypeScript starter repository.

## Installation

```bash
$ npm install
$ docker compose up --build
$ npx prisma migrate dev
```

## Running the app

```bash
# development
$ npm start
```

## Running the Entire Environment with Docker

You can run the entire environment, including the application and its dependencies, using Docker. This ensures a consistent setup across different environments and simplifies the process of getting started.

### Steps to Run with Docker

1. **Build and Start the Containers**

   ```bash
   $ docker compose up --build
   ```

## Using Express with Prisma and Docker

This project uses Express.js as the web framework, Prisma as the ORM for database interactions, and Docker to containerize the application and its dependencies. Below are the steps to set up and run the project from scratch.

### Prerequisites

Ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (which includes npm)

### Steps to Set Up and Run the Project

1. **Clone the Repository**

   ```bash
   $ git clone <repository-url>
   $ cd <repository-directory>
   ```

2. **Install Dependencies**

   ```bash
   $ npm install
   ```

3. **Build and Start the Containers**:
  Use Docker Compose to build and start the containers. This will set up the application and its dependencies as defined in the docker-compose.yml file.
   ```bash
   $ docker compose up --build
   ```

4. **Run Database Migrations**: After the containers are up and running, run the database migrations to ensure the database schema is up to date.

   ```bash
   $ npx prisma migrate dev
   ```

2. **Access the Application**

   ```bash
   Once the application is running, you can access it at http://localhost:5001 (or the port specified in your Docker configuration).
   ```


### Project Architecture

This project follows an MVC (Model-View-Controller) architecture adapted for an API. The architecture is organized into three main components: Model, Service, and Controller, which are accessed through routes.

1. **Model**

   The Model represents the data layer of the application. It defines the structure of the data and interacts with the database. In this project, Prisma is used as the ORM to manage database interactions.

2. **Service**

   The Service layer contains the business logic of the application. It processes data received from the controllers, interacts with the models, and returns the processed data back to the controllers. This layer helps to keep the controllers thin and focused on handling HTTP requests.

3. **Controller**

   The Controller handles incoming HTTP requests and sends responses back to the client. It receives input from the client, calls the appropriate service methods, and returns the results. Controllers are responsible for routing requests to the correct service methods.

4. **Routes**

   Routes define the endpoints of the API and map them to the corresponding controller methods. They act as the entry point for client requests and ensure that each request is handled by the appropriate controller.

### Directory Structure

The project directory is organized as follows:
- **controller/**: Contains the controller file for handling HTTP requests.
- **service/**: Contains the service file for business logic.
- **models/**: Contains the model files for database interactions.
- **routes/**: Contains the route files for defining API endpoints.
- **server.ts**: Initializes the Express application and sets up middleware, starts the server and listens for incoming requests.

By following this architecture, the project maintains a clear separation of concerns, making it easier to manage and scale.