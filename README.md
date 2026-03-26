# week3-tasks-api

## Overview

This project is a RESTful API built using Fastify, PostgreSQL, and Prisma. It allows basic task management operations including creating, reading, updating, and deleting tasks.

Each task is associated with a default user.

## Tech Stack

- Node.js
- Fastify
- PostgreSQL (Docker)
- Prisma ORM

## Features

- **Full CRUD**: Create, List, Get by ID, Update, and Delete tasks.
- **Validation**: Strict JSON schema validation for all request bodies, parameters, and queries.
- **Persistence**: Data is persisted in a PostgreSQL database using Prisma.
- **Layered Architecture**: Clean separation between Route Handlers and Repository logic.

## Project Structure

```
week3-tasks-api/
├ prisma/
├ src/
│  ├ prisma/
│  ├ tasks.repository.ts
   ├server.ts
   ├tasks/
   ├package.json
   ├.gitignore
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

Create a .env file in the root directory and add your PostgreSQL connection string:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
```

### 4.database migration

```bash
npx prisma migrate dev --name init
```

### 5. run the API

```bash
npx ts-node server.ts
```
