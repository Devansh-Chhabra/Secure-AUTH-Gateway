<div align="center">

# 🔐 Secure AUTH Gateway

### A production-ready authentication system built with the MERN stack
[![Live Demo](https://img.shields.io/badge/Live_Demo-FF4154?style=for-the-badge&logo=googlechrome&logoColor=white)]()

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Mailtrap](https://img.shields.io/badge/Mailtrap-00A9E0?style=for-the-badge&logo=mailtrap&logoColor=white)](https://mailtrap.io/)

</div>

---

## 📖 Overview

**Secure AUTH Gateway** is a full-stack authentication system built on the MERN stack (MongoDB, Express, React, Node.js). It handles the complete identity lifecycle — sign-up, login, logout, email verification, and password recovery — with secure token-based sessions and transactional emails powered by **Mailtrap**.

Designed as a reusable authentication foundation that can be dropped into larger applications, rather than a bare-bones login demo.

---

## ✨ Features

- 🔑 **User Sign-Up & Login** — Secure credential-based authentication
- 🔒 **Password Hashing** — Passwords hashed with bcrypt, never stored in plain text
- 📧 **Email Verification** — Verification codes/links sent via Mailtrap on sign-up
- 🔁 **Password Recovery** — Secure forgot-password and reset-password flow
- 🪪 **JWT-Based Sessions** — Stateless authentication using signed JSON Web Tokens
- 🚪 **Logout Handling** — Clean session/token invalidation
- 🛡️ **Protected Routes** — Middleware-guarded backend routes and frontend route protection
- ⚛️ **Modern React Frontend** — Responsive UI for all auth flows

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| **Frontend**   | React, Vite                          |
| **Backend**    | Node.js, Express.js                  |
| **Database**   | MongoDB (Mongoose)                   |
| **Auth**       | JSON Web Tokens (JWT), bcrypt        |
| **Email**      | Mailtrap                             |  

---


## 🔐 Authentication Flow

1. **Sign Up** → User registers with email + password → verification email sent via Mailtrap
2. **Verify Email** → User confirms account using the emailed code/link
3. **Login** → Verified users log in and receive a JWT session token
4. **Forgot Password** → User requests a reset link via email
5. **Reset Password** → User sets a new password using the secure reset token
6. **Logout** → Session/token invalidated

---


## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas cluster)
- A free [Mailtrap](https://mailtrap.io/) account for email delivery

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Devansh-Chhabra/Secure-AUTH-Gateway.git
   cd Secure-AUTH-Gateway
```

2. **Install backend dependencies**
```bash
   cd backend
   npm install
```

3. **Install frontend dependencies**
```bash
   cd ../frontend/auth-gateway
   npm install
```

4. **Set up environment variables**

   Create a `.env` file inside the `backend/` folder:
```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   MAILTRAP_TOKEN=your_mailtrap_token
   MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/
   CLIENT_URL=http://localhost:5173
```

5. **Run the backend server**
```bash
   cd backend
   npm run dev
```

6. **Run the frontend**
```bash
   cd frontend/auth-gateway
   npm run dev
```

7. Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

---


## 👨‍💻 Author

**Devansh Chhabra**  
📧 Email: [devanshchhabr@gmail.com](mailto:devanshchhabr@gmail.com)  

---

<div align="center">
</div>
