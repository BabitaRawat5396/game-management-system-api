# Game Management System API

## Introduction

This is a RESTful API for managing users, games, and scores in a game management system. It includes user registration, login, game creation, and score tracking functionalities.

## Features

### User Management

- Register a new user.
- Login and generate a JWT token.
- Get user profile.

### Game Management

- Create a new game (Admin only).
- Get all games.
- Get a single game by ID.
- Update a game (Admin only).
- Delete a game (Admin only).

### Score Management

- Add a score for a game (Player only).
- Get all scores by user.
- Get all scores for a game.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm (v6 or later) or yarn (v1.22 or later)

### Installation

1. **Clone the repository:**

   - git clone [Game-management-system-api link](https://github.com/BabitaRawat5396/game-management-system-api)
   - cd game-management-system-api
   
3. **Install dependencies:**

   npm install
   
5. **Set up environment variables:**

Create a .env file in the root directory and add the following environment variables:

- DB_NAME=your_database_name
- DB_USER=your_database_user
- DB_PASSWORD=your_database_password
- DB_HOST=localhost
- PORT=4000
- ACCESS_TOKEN_SECRET=your_access_token_secret
- ACCESS_TOKEN_EXPIRY=1h

8. **Set up the database:**

Make sure PostgreSQL is running and create a new database with the name specified in the .env file.

### Running the Server

5. **Start the server:**

   npm start
   
6. **Access the API:**

The API will be running on [LocalHost](http://localhost:4000).

### Testing the API with Postman

1. **Download Postman**

If you haven't already, download and install [Postman](https://www.postman.com/downloads/).

2. **Import the Postman collection**

- Locate the `Postman API` folder in your project directory.
- Import the **`Game Management System API.postman_collection.json`** file into Postman:
  - Click on **Import** in Postman.
  - Upload the JSON file.
  - The collection should now be available in your Postman sidebar.

3. **Set up environment variables (optional)**

- If your API endpoints require environment-specific variables (like tokens or base URLs), create a Postman environment and set these variables there.

4. **Use the API**

- Open the imported collection in Postman.
- Select an endpoint to test (e.g., Register User, Login, Create Game, etc.).
- Ensure you provide valid request body parameters where required.
- Click **Send** to execute the request and view the API's response.
