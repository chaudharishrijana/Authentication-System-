# Authentication-System


# JWT Authentication System (Django + React)

A full-stack authentication system built with **Django REST Framework**, **React (Vite)**, and **MySQL**, using **JWT (JSON Web Tokens)** for secure user authentication.  

The system supports **user registration, login, protected dashboard routes**, and **auto logout when tokens expire**.


## 🚀 Features

- User Registration & Login
- JWT-based Authentication (access + refresh tokens)
- Protected Dashboard routes (only accessible when logged in)
- Auto logout on token expiration
- MySQL database integration
- Simple and clean React frontend with centralized login/register forms

## 🧩 Workflow Overview

The authentication system follows this workflow:
     +----------------+
     |     User       |
     +----------------+
             │
             ▼
   +-------------------+
   |    Register       |
   +-------------------+
             │
     Success / Token Issued
             │
             ▼
   +-------------------+
   |      Login        |
   +-------------------+
             │
     Success / Token Stored
             │
             ▼
   +-------------------+
   |  Access Dashboard |
   +-------------------+
             │
   Token Valid? ──────────┐
     │ Yes                │ No
     ▼                    ▼

### 🔹 Explanation:

1. **User registers** → server creates user and issues a JWT token.  
2. **User logs in** → server validates credentials and returns JWT token.  
3. **Frontend stores token** in Local Storage for subsequent requests.  
4. **Access protected routes** (e.g., Dashboard) → token validity checked.  
5. **Token expired or invalid** → user is automatically logged out and redirected to login page.



