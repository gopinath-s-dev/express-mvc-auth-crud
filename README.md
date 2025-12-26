# Express MVC Authentication & CRUD Application

A modern Express.js backend application built using MVC architecture with secure authentication, validation, caching, and email support.

## 🚀 Features

- MVC architecture using Express.js (Modern JavaScript)
- User CRUD operations
- JWT-based authentication & authorization
- Secure password hashing using bcrypt
- Forgot password & reset password flow via email
- Email service using Nodemailer
- Request & payload validation using AJV
- Redis caching and in-memory LRU cache
- MongoDB integration using native Node.js MongoDB driver
- Server-side rendering using EJS
- Centralized error handling and custom middlewares
- Security-focused implementation

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Native Driver)
- JSON Web Token (JWT)
- AJV Schema Validation
- Redis
- LRU Cache
- Bcrypt
- Nodemailer
- EJS

## ⚙️ Installation

```bash
git clone https://github.com/your-username/express-mvc-auth-crud.git
cd express-mvc-auth-crud
npm install
```

🔐 Environment Variables
Create a .env file in the root directory:
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password

Run the Application
npm run start
