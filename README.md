# Task Management App

A collaborative task management application that allows users to create, assign, track, and manage tasks in a team environment.

## Features

### Admin Users

- Add new team members.
- Assign tasks to users.
- View task progress for each user.

### Non-Admin Users

- View only their assigned tasks.
- Update task status.

## Sample Credentials

### Admin Credentials

- **Email Address**: admin@gmail.com
- **Password**: Sushant@123

### User Credentials

- **Email**: user1@gmail.com
  **Password**: Sushant@123

- **Email**: user2@gmail.com
  **Password**: Sushant@123

## Frontend URL

[Visit the Application](<Your Frontend URL Here>)

## Backend URL

```
https://task-manager-backend-7nni.onrender.com
```

## API Documentation

### Base URL

```
https://task-manager-backend-7nni.onrender.com
```

### Endpoints

#### 1. Authentication

**POST** `/auth/login`

- **Description**: Authenticate user and provide a token.
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

- **Response**:

```json
{
  "token": "jwt-token"
}
```

**POST** `/auth/register`

- **Description**: Register a new user.
- **Request Body**:

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "yourpassword"
}
```

- **Response**:

```json
{
  "message": "User registered successfully."
}
```

#### 2. Tasks

**GET** `/tasks`

- **Description**: Retrieve all tasks.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:

```json
[
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "priority": "High",
    "status": "Todo"
  }
]
```

**POST** `/tasks`

- **Description**: Create a new task.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "priority": "Medium",
  "dueDate": "2025-01-30"
}
```

- **Response**:

```json
{
  "message": "Task created successfully."
}
```

## Project Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A .env file with the following variables:
  ```env
  REACT_APP_API_URL=https://task-manager-backend-7nni.onrender.com
  ```

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Deployment Link

[Visit the Deployed Application](<Your Frontend URL Here>)

---

## Additional Notes

- Ensure the API server is running for the application to fetch data.
- For any issues, please open a GitHub issue or contact the maintainer.

