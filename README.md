
# Task CRUD

This is a simple Task Management application built using Node.js, Sequelize, and PostgreSQL. It allows users to register, login, create tasks, and perform CRUD operations on tasks.



## Installation

1. Clone Repository 
```bash
  git clone https://github.com/Bhushan-04/ve3-task.git
```

2. Navigate to the project folder 
```bash
  cd ve3 
```

3. Install the dependencies
```bash
npm install
```

3. start application
```bash
  npm start
```


    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`TOKEN_KEY`
`dbname`
`dbuser`
`dbpassword`


## Tech Stack

**Server:** Node, Express, Sequelize, mysql


## api reference

## User API Endpoints

### 1. POST /register
- **Description**: Registers a new user by providing a username, email, and password. The password is hashed before storing it in the database.
- **Request body**:
    ```json
    {
        "username": "exampleUser",
        "email": "user@example.com",
        "password": "yourPassword"
    }
    ```
- **Response** (Success):
    ```json
    {
        "userdata": {
            "id": 1,
            "username": "exampleUser",
            "email": "user@example.com"
        }
    }
    ```
- **Response** (Error - Missing Fields):
    ```json
    {
        "message": "Username, email, and password are required"
    }
    ```
- **Response** (Error - Username Already Exists):
    ```json
    {
        "message": "Username already exists"
    }
    ```
- **Response** (Error - Email Already Exists):
    ```json
    {
        "message": "Email already exists"
    }
    ```
- **Response** (Error - Server Error):
    ```json
    {
        "message": "Server Error",
        "error": "Error details here"
    }
    ```

### 2. POST /login
- **Description**: Logs in an existing user by providing an email and password. If the credentials are correct, a JWT token is generated and returned to the user.
- **Request body**:
    ```json
    {
        "email": "user@example.com",
        "password": "yourPassword"
    }
    ```
- **Response** (Success):
    ```json
    {
        "userdataWithToken": {
            "userId": 1,
            "email": "user@example.com",
            "token": "jwt-token-here"
        }
    }
    ```
- **Response** (Error - Missing Fields):
    ```json
    {
        "message": "Please enter both email and password"
    }
    ```
- **Response** (Error - User Not Found):
    ```json
    {
        "message": "User not found"
    }
    ```
- **Response** (Error - Invalid Password):
    ```json
    {
        "message": "Invalid password"
    }
    ```
- **Response** (Error - Server Error):
    ```json
    {
        "message": "Server Error",
        "error": "Error details here"
    }
    ```

---

## Example Requests and Responses

### 1. POST /register

- **Request**:
    ```bash
    POST /register
    ```
    Body:
    ```json
    {
        "username": "johnDoe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```

- **Response**:
    ```json
    {
        "userdata": {
            "id": 1,
            "username": "johnDoe",
            "email": "john@example.com"
        }
    }
    ```

### 2. POST /login

- **Request**:
    ```bash
    POST /login
    ```
    Body:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```

- **Response**:
    ```json
    {
        "userdataWithToken": {
            "userId": 1,
            "email": "john@example.com",
            "token": "jwt-token-here"
        }
    }
    ```

# Task API Endpoints
## 1. POST /tasks/register
- **Description**: Registers a new task. The task requires a `title` and should be associated with the authenticated user. 
- **Request body**:
    ```json
    {
        "title": "New Task"
    }
    ```
- **Response** (Success):
    ```json
    {
        "taskdata": {
            "id": 1,
            "title": "New Task",
            "userId": 1
        }
    }
    ```
- **Response** (Error - Missing Title):
    ```json
    {
        "message": "Title is required"
    }
    ```
- **Response** (Error - User Authentication Failed):
    ```json
    {
        "message": "User authentication failed"
    }
    ```
- **Response** (Error - Server Error):
    ```json
    {
        "message": "Server Error",
        "error": "Error details here"
    }
    ```

---

## 2. GET /tasks
- **Description**: Retrieves all tasks in the database.
- **Response** (Success):
    ```json
    {
        "tasks": [
            {
                "id": 1,
                "title": "Task 1",
                "userId": 1
            },
            {
                "id": 2,
                "title": "Task 2",
                "userId": 2
            }
        ]
    }
    ```
- **Response** (Error - No Tasks Found):
    ```json
    {
        "message": "No tasks found"
    }
    ```
- **Response** (Error - Server Error):
    ```json
    {
        "message": "Server Error",
        "error": "Error details here"
    }
    ```

---

## 3. GET /tasks/:id
- **Description**: Retrieves a specific task by its ID.
- **Request parameters**:
    - `id` (required): ID of the task to retrieve.
- **Response** (Success):
    ```json
    {
        "task": {
            "id": 1,
            "title": "Task 1",
            "userId": 1
        }
    }
    ```
- **Response** (Error - Task Not Found):
    ```json
    {
        "message": "Task not found"
    }
    ```
- **Response** (Error - Server Error):
    ```json
    {
        "message": "Server Error",
        "error": "Error details here"
    }
    ```

---

## 4. PUT /tasks/:id
- **Description**: Updates an existing task by its ID. Only the fields provided in the request body will be updated.
- **Request parameters**:
    - `id` (required): ID of the task to update.
- **Request body** (Example for updating title):
    ```json
    {
        "title": "Updated Task Title"
    }
    ```
- **Response** (Success):
    ```json
    {
        "task": {
            "id": 1,
            "title": "Updated Task Title",
            "userId": 1
        }
    }
    ```
- **Response** (Error - Task Not Found):
    ```json
    {
        "message": "Task not found"
    }
    ```
- **Response** (Error - Server Error):
    ```json
    {
        "message": "Server Error",
        "error": "Error details here"
    }
    ```

---

## 5. DELETE /tasks/:id
- **Description**: Deletes a specific task by its ID.
- **Request parameters**:
    - `id` (required): ID of the task to delete.
- **Response** (Success):
    ```json
    {
        "message": "Task deleted successfully!"
    }
    ```
- **Response** (Error - Task Not Found):
    ```json
    {
        "message": "Task not found"
    }
    ```
- **Response** (Error - Server Error):
    ```json
    {
        "message": "Server Error",
        "error": "Error details here"
    }
    ```

---

## Example Requests and Responses

### 1. POST /tasks/register

- **Request**:
    ```bash
    POST /tasks/register
    ```
    Body:
    ```json
    {
        "title": "Complete Documentation"
    }
    ```

- **Response**:
    ```json
    {
        "taskdata": {
            "id": 1,
            "title": "Complete Documentation",
            "userId": 1
        }
    }
    ```

### 2. GET /tasks

- **Request**:
    ```bash
    GET /tasks
    ```

- **Response**:
    ```json
    {
        "tasks": [
            {
                "id": 1,
                "title": "Complete Documentation",
                "userId": 1
            }
        ]
    }
    ```

### 3. GET /tasks/1

- **Request**:
    ```bash
    GET /tasks/1
    ```

- **Response**:
    ```json
    {
        "task": {
            "id": 1,
            "title": "Complete Documentation",
            "userId": 1
        }
    }
    ```

### 4. PUT /tasks/1

- **Request**:
    ```bash
    PUT /tasks/1
    ```
    Body:
    ```json
    {
        "title": "Complete Documentation with Updates"
    }
    ```

- **Response**:
    ```json
    {
        "task": {
            "id": 1,
            "title": "Complete Documentation with Updates",
            "userId": 1
        }
    }
    ```

### 5. DELETE /tasks/1

- **Request**:
    ```bash
    DELETE /tasks/1
    ```

- **Response**:
    ```json
    {
        "message": "Task deleted successfully!"
    }
    ```