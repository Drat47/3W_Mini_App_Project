# 📱 Mini Social Platform

A modern, full-stack social media application built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project features a polished UI inspired by premium app designs (TaskPlanet), offering a seamless experience for sharing updates and interacting with other users.

## ✨ Features

- **🔐 Authentication**: Secure Login and Signup pages with gradient aesthetics, properly handling user sessions with JWT.
- **🎨 Modern UI**: Custom CSS implementation featuring cards, soft shadows, decent typography, and responsive layouts.
- **🏠 Social Feed**: A dynamic feed displaying posts with user details, dynamic timestamps, and interactive elements.
- **📝 Create Posts**: A functional post creator supporting both text and image uploads (handled via Base64).
- **❤️ Interactions**: 
  - **Like** posts instantly.
  - **Comment** system to engage with content.
- **🔍 Navigation**: Includes a search bar, filter tabs (e.g., "Most Liked"), and a clean header.

## 🛠️ Tech Stack

### Frontend
- **React.js** (via Vite): For a fast, interactive UI.
- **CSS3**: Custom styling with variables for consistent theming.
- **Axios**: For handling HTTP requests.
- **React Icons**: For beautiful, scalable icons.

### Backend
- **Node.js & Express.js**: RESTful API architecture.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM for data modeling.
- **Bcrypt & JWT**: For secure password hashing and authentication.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/) (Locally installed or Atlas Cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/Drat47/3W_Mini_App_Project.git
cd 3W_Mini_App_Project
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm run dev
```
*The server will run on `http://localhost:5000`*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```
*The application should now be running on `http://localhost:5173` (or similar)*

## 📦 Deployment

This project is optimized for deployment on popular cloud platforms.

### Frontend (Vercel)
1.  Import the repository into **Vercel**.
2.  Set the **Root Directory** to `frontend`.
3.  Add the Environment Variable: `VITE_API_URL` pointing to your deployed backend URL.

### Backend (Render)
1.  Create a new Web Service on **Render**.
2.  Connect the repository.
3.  Set the **Root Directory** to `backend`.
4.  **Build Command**: `npm install`
5.  **Start Command**: `node server.js`
6.  Add Environment Variables: `MONGO_URI`, `JWT_SECRET`, `PORT`.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
