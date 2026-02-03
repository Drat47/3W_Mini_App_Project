# 📘 Detailed Project Summary & Documentation

## 🌟 Project Overview
**3W Mini App Project** is a full-stack social media application designed to demonstrate a complete MERN (MongoDB, Express, React, Node.js) architecture. It allows users to register, login, create posts (with text and images), view a social feed, and interact with posts via likes and comments. The UI is polished with a modern, gradient-rich aesthetic inspired by premium applications.

---

## 📂 File Structure & Descriptions

### 🔙 Backend (`/backend`)
The backend is built with Node.js and Express, handling API requests and database operations.

- **`server.js`**:
  - The **entry point** of the backend application.
  - Connects to **MongoDB** using Mongoose.
  - Configures **Middleware** (CORS for frontend access, `express.json` with increased limits for image uploads).
  - Defines the main API routes (`/api/auth`, `/api/posts`).
  - Starts the server on port 5000 (or `process.env.PORT`).

- **`models/`**: Defines the database schema (structure of data).
  - **`User.js`**: Schema for user data. Stores `username`, `email`, and a hashed `password`.
  - **`Post.js`**: Schema for posts. Stores `userId`, `username`, `text`, `image` (Base64 string), `likes` (array of user IDs), and `comments` (array of objects).

- **`routes/`**: Contains the business logic for API endpoints.
  - **`auth.js`**:
    - `POST /register`: Hashes password using `bcryptjs`, creates a new user, and returns a JWT token.
    - `POST /login`: Verifies credentials and returns a JWT token.
  - **`posts.js`**:
    - `POST /`: Creates a new post (protected route).
    - `GET /`: Fetches all posts, sorted by newest first.
    - `PUT /:id/like`: Toggles a like on a post.
    - `POST /:id/comment`: Adds a comment to a post.

- **`.env`**: Stores sensitive configuration like `MONGO_URI` and `JWT_SECRET`.
- **`package.json`**: Lists dependencies (`express`, `mongoose`, `cors`, `dotenv`, `bcryptjs`, `jsonwebtoken`) and scripts (`start`, `dev`).

### 🎨 Frontend (`/frontend`)
The frontend is a Single Page Application (SPA) built with React and Vite.

- **`src/main.jsx`**: The entry point that mounts the React app to the DOM.
- **`src/App.jsx`**: Sets up the **Router** (using `react-router-dom`). Defines routes for `/` (Feed) and `/auth` (Login/Signup).
- **`src/index.css`**: Global stylesheet. Contains all custom CSS for the gradient backgrounds, card styles, inputs, and animations.

- **`src/pages/`**: Top-level page components.
  - **`Auth.jsx`**: Handles both Login and Sign Up. Features a toggle state to switch between forms, form validation, and API integration.
  - **`Feed.jsx`**: The main landing page after login. Displays the header, search bar, `CreatePost` component, and a list of `PostCard` components.

- **`src/components/`**: Reusable UI components.
  - **`CreatePost.jsx`**: A form to type text and upload an image. Handles file reading (FileReader) and sending data to the backend.
  - **`PostCard.jsx`**: Renders a single post. Handles "Like" checks (filled/empty heart), toggling the comments section, and submitting new comments.

- **`.env.local`**: Stores `VITE_API_URL` for local development (points to `http://localhost:5000/api`).
- **`vite.config.js`**: Configuration for the Vite build tool.

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
1.  **Node.js**: Installed on your machine.
2.  **MongoDB**: A running instance (local `mongod` or Atlas connection string).

### Step 1: Start the Backend
1.  Open a terminal and navigate to the backend: `cd backend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.
4.  Run the server: `npm run dev` (starts on port 5000).

### Step 2: Start the Frontend
1.  Open a new terminal and navigate to the frontend: `cd frontend`
2.  Install dependencies: `npm install`
3.  Ensure `.env.local` exists with `VITE_API_URL=http://localhost:5000/api`.
4.  Run the server: `npm run dev` (starts on port 5173/5174).

### Step 3: Verify
- Go to the frontend URL in your browser.
- Sign up and explore the app!

---

## 🚀 Deployment Guide

This project is set up for a distributed deployment (Frontend on Vercel, Backend on Render).

### 1. Database (MongoDB Atlas)
- Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Whitelist all IP addresses (`0.0.0.0/0`) in Network Access.
- Get the Connection String (URI).

### 2. Backend (Render)
- Push code to GitHub.
- Create a **Web Service** on Render connected to your repo.
- **Root Directory**: `backend`.
- **Build**: `npm install`.
- **Start**: `node server.js`.
- **Environment Variables**: Add `MONGO_URI`, `JWT_SECRET`, and `PORT` (10000).

### 3. Frontend (Vercel)
- Create a **New Project** on Vercel.
- Import your GitHub repo.
- **Root Directory**: `frontend`.
- **Environment Variables**: Add `VITE_API_URL` with value `https://<YOUR-RENDER-BACKEND-URL>/api`.
- Deploy!

---

**Summary Created**: 2026-02-03
**Project Status**: Production-Ready
