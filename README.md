# Music Generation Platform

## Overview

The Music Generation Platform is a web application that allows users to generate music based on a text prompt. Users can sign up, log in, and submit prompts to generate music files, which they can then download. The application is built using React for the frontend and Express.js for the backend.

## Features

- User Authentication (Sign up, Log in, Log out)
- Text prompt-based music generation
- Download generated music files

## Prerequisites

- Node.js (v12 or later)
- MongoDB (either local or a MongoDB Atlas account)

## Project Structure
/music-generation-platform
- Backend
  - Routes
  - Controllers
  - Middlewares
  - Models
- Frontend
  - App.js
  - src/app   


## Running the Application Locally

### Backend Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/s4nat/music_generation_platform.git
   cd music_generation_platform/backend
   ```

2. **Install Dependencies:**
 
 ```sh
  npm install
```

3. **Setup Environment Variables:**
  Create a .env file in the backend directory with the following content:
```.env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

4. Run the backend
```sh
cd backend
npm start
```
5. Frontend Setup
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

   
   
