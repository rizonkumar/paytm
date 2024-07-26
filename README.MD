# Paytm-like App

A full-stack application that mimics some functionalities of Paytm, including user registration, login, balance checking, and fund transfer. The project uses Express.js and MongoDB for the backend, and React with Tailwind CSS for the frontend.

## Table of Contents

- [Paytm-like App](#paytm-like-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [User Endpoints](#user-endpoints)
    - [Account Endpoints](#account-endpoints)
  - [Contributing](#contributing)


## Features

- User Registration and Login
- JWT Authentication
- Check Account Balance
- Transfer Funds to Other Users
- Filter and Search Users

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **HTTP Client**: Axios

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/paytm-like-app.git
   cd paytm-like-app/backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   PORT=3001
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to view the application.
2. Use the signup page to create a new user account.
3. Log in with the created account to access the dashboard and perform actions such as checking the balance and transferring funds.

## API Endpoints

### User Endpoints

- **POST /api/v1/user/signup**: Register a new user.
  - Request Body:
    ```json
    {
      "username": "user1",
      "password": "password123",
      "firstName": "John",
      "lastName": "Doe"
    }
    ```

- **POST /api/v1/user/signin**: Log in an existing user.
  - Request Body:
    ```json
    {
      "username": "user1",
      "password": "password123"
    }
    ```

- **GET /api/v1/user/bulk**: Get a list of users, optionally filtered by first or last name.
  - Query Params:
    - `filter`: (optional) filter string for searching users by first or last name.

### Account Endpoints

- **GET /api/v1/account/balance**: Get the account balance of the logged-in user.
  - Headers:
    - `Authorization`: Bearer `<JWT Token>`

- **POST /api/v1/account/transfer**: Transfer funds to another user's account.
  - Request Body:
    ```json
    {
      "amount": 100,
      "to": "recipient_user_id"
    }
    ```
  - Headers:
    - `Authorization`: Bearer `<JWT Token>`

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
