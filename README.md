# Student Management CRUD Application

This project demonstrates a simple CRUD (Create, Read, Update, Delete) application using .NET 8 Minimal API for the backend and React.js for the frontend.

## Project Structure

- `QT_API`: Contains the .NET 8 minimal API.
- `react-app`: Contains the React.js application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (which includes npm)

## Getting Started

### Setting Up the Backend

1. **Navigate to the API directory:**

    ```bash
    cd QT_API
    ```

2. **Restore the .NET dependencies:**

    ```bash
    dotnet restore
    ```

3. **Run the .NET API:**

    ```bash
    dotnet run
    ```

    By default, the API will run at `https://localhost:5222`.

### Setting Up the Frontend

1. **Navigate to the React application directory:**

    ```bash
    cd react-app
    ```

2. **Install the npm dependencies:**

    ```bash
    npm install
    ```

3. **Run the React application:**

    ```bash
    npm start
    ```

    By default, the React app will run at `http://localhost:3000`.

## API Endpoints

The following are the available API endpoints for managing students:

- **Get all students:**

    ```http
    GET /students
    ```

- **Get a student by ID:**

    ```http
    GET /students/{id}
    ```

- **Create a new student:**

    ```http
    POST /students
    ```

    **Request body:**

    ```json
    {
      "name": "string",
      "gender": 0,
      "dob": "2024-06-03T03:28:38.171Z",
      "classId": 0
    }
    ```

- **Update a student:**

    ```http
    PATCH /students/{id}
    ```

    **Request body:**

    ```json
    {
      "name": "string",
      "gender": 0,
      "dob": "2024-06-03T03:28:38.171Z",
      "classId": 0
    }
    ```

- **Delete a student:**

    ```http
    DELETE /students/{id}
    ```

## Running Tests

### Backend Tests

1. **Navigate to the API directory:**

    ```bash
    cd QT_API
    ```

2. **Run the tests:**

    ```bash
    dotnet test
    ```

### Frontend Tests

1. **Navigate to the React application directory:**

    ```bash
    cd react-app
    ```

2. **Run the tests:**

    ```bash
    npm test
    ```

## Deployment

### Backend Deployment

Build and publish the .NET API:

```bash
cd QT_API
dotnet publish -c Release -o ./publish
```

Deploy the contents of the `./publish` directory to your preferred hosting service.

### Frontend Deployment

Build the React application:

```bash
cd react-app
npm run build
```

Deploy the contents of the `build` directory to your preferred hosting service.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We appreciate your help!

## License

This project isn't licensed by anyway

## Acknowledgements

- [React.js](https://reactjs.org/)
- [.NET 8](https://dotnet.microsoft.com/download/dotnet/8.0)

---

Happy coding! If you have any questions, feel free to open an issue or reach out to the project maintainers.
