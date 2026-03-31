# tasks-management-api

# Week 4: Tasks API with Authentication & Authorization

## Overview

This project is a secure RESTful API built using **Fastify**, **PostgreSQL**, and **Prisma**. Building on the Week 3 foundation, this version introduces a complete **Authentication and Authorization** system, ensuring that tasks are private and accessible only to their owners.

## Tech Stack

- **Node.js** & **TypeScript**
- **Fastify**: High-performance web framework.
- **PostgreSQL**: Relational database.
- **Prisma ORM**: Type-safe database client.
- **bcrypt**: For secure password hashing.
- **@fastify/jwt**: For JSON Web Token-based authentication.

## Features

- **User Authentication**: Secure Registration (with password hashing) and Login (JWT issuance).
- **Protected Routes**: Global `onRequest` hooks to verify user identity before reaching handlers.
- **Ownership Isolation**: Strict data privacy where users can only Create, Read, Update, or Delete tasks they personally own.
- **Validation**: Comprehensive JSON schema validation for request bodies, parameters, and queries.
- **Layered Architecture**: Clear separation of concerns between Routes, Handlers, and Repository logic.

## Project Structure

```
week3-tasks-api/
├ prisma/
├ src/
│  ├ prisma/
│  ├ auth/
   ├server.ts
   ├tasks/
   ├package.json
   ├.gitignore
   ├.env
   ├tsconfig.json
```

## Prerequisites

- **Node.js**
- **PostgreSQL** (Run via Docker or native installation)
- **npm**

## Setup & Installation

### 1. Clone and Install Dependencies

```bash
npm install
npm init -y
npx tsc --init
```

### 2. initialize prisma

```bash
npx prisma init
```

### 3. Configure Environment Variables

Create a .env file in the root directory and add your PostgreSQL connection string and the secret key for jwt:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
JWT_SECRET="your_super_secret_random_string"
```

### 4.database migration

```bash
npx prisma migrate dev --name init
```

### 5. run the API

```bash
npx ts-node server.ts
```

### API Endpoints

**Note:** All Task endpoints require a valid JWT in the `Authorization` header: `Bearer <token>`.

| Method     | Endpoint     | Description                                          | Status Codes |
| :--------- | :----------- | :--------------------------------------------------- | :----------- |
| **POST**   | `/register`  | Register a new user with hashed password.            | 201, 400     |
| **POST**   | `/login`     | Authenticate and receive a JWT.                      | 200, 401     |
| **GET**    | `/tasks`     | List all tasks belonging to the authenticated user.  | 200          |
| **POST**   | `/tasks`     | Create a new task linked to the user.                | 201          |
| **GET**    | `/tasks/:id` | Get task details (Ownership check enforced).         | 200, 404     |
| **PUT**    | `/tasks/:id` | Update task title/status (Ownership check enforced). | 200, 404     |
| **DELETE** | `/tasks/:id` | Remove a task (Ownership check enforced).            | 204, 404     |
