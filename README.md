# Authentication-System


# JWT Authentication System (Django + React)

A full-stack authentication system built with **Django REST Framework**, **React-vite framework)**, and **MySQL**, using **JWT (JSON Web Tokens)** for secure user authentication.  

The system supports **user registration, login, protected dashboard routes**, and **auto logout when tokens expire**.


## 🚀 Features

- User Registration & Login
- JWT-based Authentication (access + refresh tokens)
- Protected Dashboard routes (only accessible when logged in)
- Auto logout on token expiration
- MySQL database integration
- Simple and clean React frontend with centralized login/register forms

## 🧩 Workflow / System Overview

```mermaid


graph TD
    A[User Accesses App] --> B{Is User Registered?}
    B -->|No| C[Register User]
    C --> D[Login]
    B -->|Yes| D[Login]
    D --> E[Success?]
    E -->|Yes| F[JWT Token Issued & Stored in Local Storage]
    E -->|No| G[Show Login Error]
    F --> H[Access Dashboard]
    H --> I{Token Valid?}
    I -->|Yes| J[Access Granted]
    I -->|No| K[Redirect to Login]
    F --> L[Token Expiry]
    L --> K



```
### Explanation:
- Check if user is registered → If not, register first.
- Login → Server validates credentials.
- Success → JWT token issued and stored in Local Storage.
- Access Dashboard → Token validity checked.
- Token valid → Access granted, otherwise redirect to Login.
- Token expiry → Auto logout and redirect to Login.
### Technology Stack

| Layer            | Technologies / Tools                   |
|-----------------|---------------------------------------|
| **Frontend**    | React-vite, JSX, CSS               |
| **Backend**     | Django, Django REST Framework, MySQL   |
| **Authentication** | JWT (JSON Web Tokens), djangorestframework-simplejwt |
| **Dev Tools**   | Git, GitHub, VS Code                   |


### Interface Overview
![Authentication System](frontend/src/assets/register.png)
![Authentication System](frontend/src/assets/login.png) 
![Authentication System](frontend/src/assets/dashboard.png)
*Figure: UI of Authentication System*




