# tasks-management-api

# Week 5: Advanced Architecture & Containerization

## Overview

This project is an enterprise-ready RESTful API built using **Fastify**, **PostgreSQL**, and **Prisma**. Building on previous foundations, this version implements a **Modular Architecture** using the **Repository Pattern**, full **Dockerization**, and automated **Swagger/OpenAPI Documentation**.

## Tech Stack

- **Node.js** (v24.x) & **TypeScript**
- **Fastify**: High-performance web framework.
- **PostgreSQL**: Relational database running in **Docker**.
- **Prisma ORM**: Type-safe database client.
- **Pino**: Structured logging.
- **Swagger/OpenAPI**: Automated API documentation.
- **Jest**: Unit and Integration testing.

## Features

- **User Authentication**: Secure Registration (with password hashing) and Login (JWT issuance).
- **Protected Routes**: Global `onRequest` hooks to verify user identity before reaching handlers.
- **Ownership Isolation**: Strict data privacy where users can only Create, Read, Update, or Delete tasks they personally own.
- **Validation**: Comprehensive JSON schema validation for request bodies, parameters, and queries.
- **Layered Architecture**: Clear separation of concerns between Routes, Handlers, and Repository logic.

## Week 5 Features

- **Repository Pattern**: Abstracted data-access layer to decouple business logic from the database implementation.
- **Dockerization**: Fully containerized PostgreSQL environment ensuring environment consistency.
- **Interactive API Docs**: Integrated **Swagger UI** for real-time API testing and documentation.
- **Data Normalization**: Automated title formatting and URL-friendly **Slug** generation for every task.
- **Unit Testing**: 100% pass rate on core utility functions (Formatters/Slugs) using Jest.

## Project Structure

## Project Structure

```text
week3-tasks-api/
├ docker-compose.yml
├ DockerFile   # Container orchestration
├ prisma/
│  └ schema.prisma       # Database models
├ src/
│  ├ tasks/
      ├ prisma/
│  │  ├ tasks.repository.ts # Data Access Layer
│  │  ├ tasks.routes.ts     # Route definitions
│  ├ auth/
      ├ schema/
      ├ auth.controllers.ts
      ├ auth.repository.ts
      ├ auth.routess.ts
│  ├ utils/
│  │  └ formatter.ts        # Data normalization logic
│  ├ plugins/
│  │  ├ prisma.ts
      ├ auths.ts
      ├ error-handler.ts           # DB connection management
│  │  └ swagger.ts          # API Documentation config
│  └ server.ts              # Entry point
├ .gitignore
├ .dockerignore

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

### API Documentation

Once the server is running, access the interactive Swagger UI to test all endpoints:

```bash
 http://localhost:3000/docs
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

### Testing

Run the test suite to verify business logic and formatting:

```bash
npm test
```
