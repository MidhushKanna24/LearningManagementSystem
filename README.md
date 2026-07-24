# Learning Management System (LMS) — Backend

A REST API backend for a Learning Management System, built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/) (PostgreSQL), and JWT-based authentication. It supports course creation, enrollments, lessons, assignments, submissions, and role-based access for admins, instructors, and students.

## Features

- **Authentication** — Register/login with email & password, JWT access tokens, Passport `local` and `jwt` strategies
- **Role-based users** — `ADMIN`, `INSTRUCTOR`, `STUDENT` roles
- **Courses** — Create, read, update, and delete courses, each owned by an instructor
- **Lessons** — Ordered lesson content per course
- **Enrollments** — Students enroll in courses
- **Progress tracking** — Per-user, per-lesson completion records
- **Assignments & Submissions** — Instructors create assignments; students submit work and receive scores
- **Validation** — Global `ValidationPipe` with DTO-based request validation (`class-validator`)

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Framework      | NestJS 11                            |
| Language       | TypeScript                           |
| Database       | PostgreSQL                           |
| ORM            | Prisma 7                             |
| Auth           | Passport (local + JWT strategies)    |
| Password hash  | bcrypt                               |
| Testing        | Jest, Supertest                      |

## Project Structure

```
src/
├── auth/            # Registration, login, JWT & local strategies, guards
├── users/           # User CRUD
├── courses/         # Course CRUD
├── prisma/          # PrismaService / PrismaModule
├── generated/prisma/ # Auto-generated Prisma client (do not edit)
├── app.module.ts
└── main.ts
prisma/
├── schema.prisma    # Data model (User, Course, Enrollment, Lesson, Progress, Assignment, Submission)
└── migrations/       # SQL migration history
test/                # e2e tests
```

## Data Model

The schema defines the following entities and relations (see `prisma/schema.prisma`):

- **User** — has a `Role` (`ADMIN` / `INSTRUCTOR` / `STUDENT`); can instruct courses, enroll in courses, track progress, and submit assignments
- **Course** — belongs to an instructor (`User`); has many `Lesson`s, `Enrollment`s, and `Assignment`s
- **Enrollment** — join table linking `User` ↔ `Course`
- **Lesson** — ordered content belonging to a `Course`; tracked via `Progress`
- **Progress** — records a user's completion of a lesson
- **Assignment** — belongs to a `Course`; has many `Submission`s
- **Submission** — a user's submission for an assignment, with an optional score

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A running PostgreSQL instance

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="replace-with-a-strong-secret"
PORT=3000
```

### 3. Run database migrations

```bash
npx prisma migrate dev
```

This applies the existing migrations and generates the Prisma client into `src/generated/prisma`.

### 4. Start the server

```bash
# development (with watch mode)
npm run start:dev

# production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000` (or your configured `PORT`).

## API Overview

### Auth (`/auth`)

| Method | Endpoint         | Auth required | Description                    |
|--------|------------------|----------------|---------------------------------|
| POST   | `/auth/register` | No             | Register a new user            |
| POST   | `/auth/login`    | No             | Log in and receive a JWT       |
| GET    | `/auth/profile`  | Yes (JWT)      | Get the current user's profile |

### Users (`/users`)

| Method | Endpoint    | Auth required | Description       |
|--------|-------------|----------------|--------------------|
| GET    | `/users`    | No             | List all users     |
| POST   | `/users`    | No             | Create a new user  |

### Courses (`/courses`)

| Method | Endpoint       | Auth required | Description                     |
|--------|----------------|----------------|-----------------------------------|
| POST   | `/courses`     | Yes (JWT)      | Create a course (as instructor)  |
| GET    | `/courses`     | No             | List all courses                 |
| GET    | `/courses/:id` | No             | Get a single course              |
| PATCH  | `/courses/:id` | Yes (JWT)      | Update a course                  |
| DELETE | `/courses/:id` | Yes (JWT)      | Delete a course                  |

> Authenticated routes expect an `Authorization: Bearer <token>` header with the JWT returned from `/auth/login`.

## Testing

```bash
# unit tests
npm run test

# end-to-end tests
npm run test:e2e

# coverage report
npm run test:cov
```

## Scripts

| Script                | Description                          |
|------------------------|---------------------------------------|
| `npm run start`        | Start the app                         |
| `npm run start:dev`    | Start with hot reload                 |
| `npm run start:prod`   | Run the compiled build                |
| `npm run build`        | Compile TypeScript to `dist/`         |
| `npm run lint`         | Lint and auto-fix `src`, `test`, etc. |
| `npm run format`       | Format code with Prettier             |

## License

UNLICENSED — private project.
