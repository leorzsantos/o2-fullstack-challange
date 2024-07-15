This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Installation

```bash
$ npm install
$ docker compose up --build
$ npx prisma migrate dev
```

## Running the app

```bash
# development
$ npm run dev
```

## Running the Entire Environment with Docker

You can run the entire environment, including the application and its dependencies, using Docker. This ensures a consistent setup across different environments and simplifies the process of getting started.

### Steps to Run with Docker

1. **Build and Start the Containers**

   ```bash
   $ docker compose up --build
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Architecture

This project follows an architecture organized into four main components: `models`, `pages`, `services`, and `utils`. Each component has a specific responsibility, ensuring a clear separation of concerns and facilitating the maintenance and scalability of the project.

1. **Models**

   The `models` folder contains the data definitions and schemas used by the application. These models represent the structure of the data and are used to interact with the database or other data sources.

2. **Pages**

   The `pages` folder contains the page components of the application. Each file in this folder corresponds to a specific route of the application. Next.js uses a file-based routing system, where each file in `pages` becomes an accessible route in the application.

3. **Services**

   The `services` folder contains the business logic and functions that interact with external APIs or other parts of the application. This layer is responsible for processing data, making API calls, and returning the results to the components that request them.

4. **Utils**

   The `utils` folder contains utility functions and helpers that are used in various parts of the application. These functions help avoid code duplication and keep the codebase clean and organized.

### Directory Structure

The project directory is organized as follows:
- **models/**: Contains the model files for data definitions.
- **pages/**: Contains the page components that correspond to the application's routes.
- **services/**: Contains the service files for business logic and API interactions.
- **utils/**: Contains utility functions and helpers used in various parts of the application.
- **app.js**: Initializes the Next.js application and sets up middleware.
- **server.js**: Starts the server and listens for incoming requests.

By following this architecture, the project maintains a clear separation of concerns, making it easier to manage and scale.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
