# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Overview

Create a “Task Management” application with **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database). The application should:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

Focus on **correctness**, **functionality**, and **code clarity** rather than visual design.  
This challenge is intended to be completed within ~3 hours, so keep solutions minimal yet functional.

---

## Requirements

### 1. Authentication

- **User Model**:
  - `id`: Primary key
  - `username`: Unique string
  - `password`: Hashed string
- **Endpoints**:
  - `POST /auth/register` – Create a new user
  - `POST /auth/login` – Login user, return a token (e.g., JWT)
- **Secure the Tasks Routes**: Only authenticated users can perform task operations.  
  - **Password Hashing**: Use `bcrypt` or another hashing library to store passwords securely.
  - **Token Verification**: Verify the token (JWT) on each request to protected routes.

### 2. Backend (Node.js or Nest.js)

- **Tasks CRUD**:  
  - `GET /tasks` – Retrieve a list of tasks (optionally filtered by user).  
  - `POST /tasks` – Create a new task.  
  - `PUT /tasks/:id` – Update a task (e.g., mark as complete, edit text).  
  - `DELETE /tasks/:id` – Delete a task.
- **Task Model**:
  - `id`: Primary key
  - `title`: string
  - `description`: string (optional)
  - `isComplete`: boolean (default `false`)
  - _(Optional)_ `userId` to link tasks to the user who created them
- **Database**: PostgreSQL
  - Provide instructions/migrations to set up:
    - `users` table (with hashed passwords)
    - `tasks` table
- **Setup**:
  - `npm install` to install dependencies
  - `npm run start` (or `npm run dev`) to run the server
  - Document any environment variables (e.g., database connection string, JWT secret)

### 3. Frontend (React + TypeScript)

- **Login / Register**:
  - Simple forms for **Register** and **Login**.
  - Store JWT (e.g., in `localStorage`) upon successful login.
  - If not authenticated, the user should not see the tasks page.
- **Tasks Page**:
  - Fetch tasks from `GET /tasks` (including auth token in headers).
  - Display the list of tasks.
  - Form to create a new task (`POST /tasks`).
  - Buttons/fields to update a task (`PUT /tasks/:id`).
  - Button to delete a task (`DELETE /tasks/:id`).
- **Navigation**:
  - Show `Login`/`Register` if not authenticated.
  - Show `Logout` if authenticated.
- **Setup**:
  - `npm install` then `npm start` (or `npm run dev`) to run.
  - Document how to point the frontend at the backend (e.g., `.env` file, base URL).

---

## Deliverables

1. **Fork the Public Repository**: **Fork** this repo into your own GitHub account.
2. **Implement Your Solution** in the forked repository. Make sure you're README file has:
   - Steps to set up the database (migrations, environment variables).
   - How to run the backend.
   - How to run the frontend.
   - Any relevant notes on testing.
   - Salary Expectations per month (Mandatory)
3. **Short Video Demo**: Provide a link (in a `.md` file in your forked repo) to a brief screen recording showing:
   - Registering a user
   - Logging in
   - Creating, updating, and deleting tasks
4. **Deadline**: Submissions are due **Sunday, Feb 23th 11:59 pm PST**.

> **Note**: Please keep your solution minimal. The entire project is intended to be completed in around 3 hours. Focus on core features (registration, login, tasks CRUD) rather than polished UI or extra features.

---

## Evaluation Criteria
1. **Functionality**  
   - Does registration and login work correctly (with password hashing)?
   - Are tasks protected by authentication?
   - Does the tasks CRUD flow work end-to-end?

2. **Code Quality**  
   - Is the code structured logically and typed in TypeScript?
   - Are variable/function names descriptive?

3. **Clarity**  
   - Is the `README.md` (in your fork) clear and detailed about setup steps?
   - Easy to run and test?

4. **Maintainability**  
   - Organized logic (controllers/services, etc.)
   - Minimal hard-coded values

Good luck, and we look forward to your submission!

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


For my implementation

---

## Table of Contents
1. [Setup Instructions](#setup-instructions)
   - [Database Setup](#database-setup)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
2. [Running the Application](#running-the-application)
   - [Backend](#backend)
   - [Frontend](#frontend)
3. [Testing](#testing)
4. [Salary Expectations](#salary-expectations)

---

## Setup Instructions

### Database Setup

1. **Install PostgreSQL**:
   - Ensure PostgreSQL is installed and running on your machine.
   - Create a database user with sufficient privileges.

2. **Set Environment Variables**:
   - Create a `.env` file in the `backend/` directory with the following variables:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=task_manager
     DB_DIALECT=postgres
     JWT_SECRET=your_jwt_secret_key
     ```

3. **Run Migrations**:
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run migrations to create the database tables:
     ```bash
     npx sequelize-cli db:migrate
     ```

4. **Seed Data (Optional)**:
   - If you have seed files, populate the database with initial data:
     ```bash
     npx sequelize-cli db:seed:all
     ```

---

### Backend Setup

1. **Install Dependencies**:
   - Navigate to the `backend/` directory and install dependencies:
     ```bash
     npm install
     ```

2. **Start the Server**:
   - Start the backend server:
     ```bash
     npm start
     ```
   - The server will run on `http://localhost:5000`.

---

### Frontend Setup

1. **Install Dependencies**:
   - Navigate to the `frontend/` directory and install dependencies:
     ```bash
     npm install
     ```

2. **Set Environment Variables**:
   - Create a `.env.local` file in the `frontend/` directory with the following variable:
     ```env
     NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
     ```

3. **Start the Development Server**:
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
   - The app will be available at `http://localhost:3000`.

---

## Running the Application

### Backend

1. Ensure PostgreSQL is running and the database is set up.
2. Start the backend server:
   ```bash
   npm start
   ```
3. Verify the API endpoints using tools like Postman or cURL:
   - Register: `POST /auth/register`
   - Login: `POST /auth/login`
   - Tasks: `GET /tasks`, `POST /tasks`, etc.

### Frontend

1. Ensure the backend server is running.
2. Start the frontend development server:
   ```bash
   npm run dev
   ```
3. Open the app in your browser at `http://localhost:3000`.


## Salary Expectations

Monthly salary expectation is: **$5,000 USD per month**


---

## Notes

- Ensure both the backend and frontend are running simultaneously for the app to function correctly.
- Clear browser cache (`localStorage`) if authentication issues arise after re-cloning the project.
- For production deployment, use environment variables securely and configure HTTPS.

---

By following these instructions, you should be able to set up, run, and test the application successfully. Let me know if you have any questions!


Video link - https://drive.google.com/file/d/1UGM65nayZZ_IloiDtPGRxzvWiHmJYM7G/view?usp=sharing
