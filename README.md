<<<<<<< HEAD
# FinEdge - Personal Finance & Expense Tracker API

## Overview

FinEdge is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB** that helps users manage their personal finances. It provides secure authentication, transaction management, budgeting, financial summaries, caching, and automated testing.

---

# Features

* User Registration & Login
* JWT Authentication
* Transaction Management (CRUD)
* Budget Management (CRUD)
* Financial Summary API
* In-Memory Cache Service
* Request Logging
* Global Error Handling
* Rate Limiting
* CORS Support
* Health Check Endpoint
* Automated Testing with Jest & Supertest

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcrypt
* Jest
* Supertest
* MongoDB Memory Server
* express-rate-limit
* cors
* dotenv

---

# Project Structure

```text
FinEdge/
│
├── src/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd FinEdge
```

Install dependencies

```bash
npm install
```

Create a `.env` file in the project root.

Example:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
```

---

# Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# Running Tests

```bash
npm test
```

---

# API Endpoints

## Health

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| GET    | `/health` | Check server health |

---

## User

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | `/users/signup` | Register a new user |
| POST   | `/users/login`  | Login user          |

---

## Transactions

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/transactions`     | Create transaction    |
| GET    | `/transactions`     | Get all transactions  |
| GET    | `/transactions/:id` | Get transaction by ID |
| PATCH  | `/transactions/:id` | Update transaction    |
| DELETE | `/transactions/:id` | Delete transaction    |

---

## Budget

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| POST   | `/budget`     | Create budget |
| GET    | `/budget`     | Get budget    |
| PATCH  | `/budget/:id` | Update budget |
| DELETE | `/budget/:id` | Delete budget |

---

## Summary

| Method | Endpoint   | Description                                          |
| ------ | ---------- | ---------------------------------------------------- |
| GET    | `/summary` | Get income, expenses, balance, and transaction count |

---

# Authentication

Protected routes require a JWT token.

Example header:

```http
Authorization: Bearer <your_jwt_token>
```

---

# Middleware

* Authentication Middleware
* Logger Middleware
* Global Error Handler
* Rate Limiter
* CORS

---

# Testing

The project uses:

* Jest
* Supertest
* MongoDB Memory Server

Tests cover:

* Health API
* User APIs
* Transaction APIs
* Budget APIs
* Summary APIs

Run tests:

```bash
npm test
```

---

# Environment Variables

```env
PORT=
MONGO_URI=
JWT_KEY=
```

---

# Future Improvements

* Swagger/OpenAPI Documentation
* Docker Support
* Redis Cache
* Email Notifications
* Export Transactions (CSV/PDF)
* Monthly Analytics Dashboard
* CI/CD with GitHub Actions

---

# Author

**Sarthak Priyadarshan**

Backend Developer | Node.js | Express.js | MongoDB

---

# License

This project is developed for learning and educational purposes.
=======
# finedge
>>>>>>> 28fe522a2856452f86a9c72886d3f18189982d89
