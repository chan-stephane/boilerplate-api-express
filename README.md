# boilerplate-api-express

Express API boilerplate with authentication, PostgreSQL persistence, structured logging, and email support. Use it as a starting point for REST APIs with JWT cookie-based sessions and OpenAPI documentation.

## Tech stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express 5 |
| ORM | Prisma |
| Database | PostgreSQL |
| Validation | Joi |
| Authentication | JWT (`jsonwebtoken`) + HTTP-only cookies |
| Email | Nodemailer |
| Logging | Winston (console + daily rotate files) |
| API docs | Swagger (OpenAPI 3) |
| Process manager (Docker) | PM2 |

Additional libraries: `bcrypt`, `cors`, `cookie-parser`.

## Features

- **Health check** — `GET /up` returns server status and uptime
- **Authentication** — login with email/password; JWT stored in `x-access-token` cookie
- **Logout** — clears the auth cookie
- **Input validation** — Joi schemas on auth routes
- **Structured responses** — consistent `{ code, status, message, data }` JSON shape
- **Logging** — Winston logs to console and `logs/` (30-day rotation)
- **Email service** — Nodemailer transport (ready for transactional mail)
- **API documentation** — Swagger UI at `/api-docs`
- **Docker** — multi-stage container with Prisma migrate + PM2 runtime

## Project structure

```
├── app.js                    # Express app entry point
├── config/
│   ├── jwt.config.js         # JWT secret & expiration
│   └── mail.config.js        # SMTP settings
├── controllers/              # Request handlers
├── database/
│   └── prisma.js             # Prisma client (PostgreSQL adapter)
├── models/                   # Data / business logic
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # SQL migrations
├── router/                   # Route definitions (+ Swagger annotations)
├── services/
│   └── email.service.js      # Nodemailer wrapper
├── utils/
│   └── logger.js             # Winston logger
├── validators/               # Joi validation middleware
├── swagger.js                # OpenAPI spec generation
├── Dockerfile
├── docker-compose.yaml
├── ecosystem.config.js       # PM2 config (Docker)
└── start.sh                  # Migrate, generate client, start app
```

## Prerequisites

- Node.js 20+ (Docker image uses Node 24)
- PostgreSQL database
- npm

## Getting started

### 1. Clone and install

```bash
git clone <repository-url>
cd boilerplate-api-express
npm install
```

### 2. Environment variables

Copy the example file and adjust values for your environment:

```bash
cp .env.example .env
```

See [Environment variables](#environment-variables) below for details.

### 3. Database setup

Ensure PostgreSQL is running and `DATABASE_URL` points to your database, then apply migrations and generate the Prisma client:

```bash
npx prisma migrate deploy
npx prisma generate
```

For local development with a new database:

```bash
npx prisma migrate dev
```

### 4. Run locally

```bash
npm run dev
```

The server listens on **port 3000** by default.

## Docker

Build and run with Docker Compose (uses `.env` for configuration):

```bash
docker compose up --build
```

The container will:

1. Run `prisma migrate deploy`
2. Run `prisma generate`
3. Start the app with PM2 via `start.sh`

API: `http://localhost:3000`  
Swagger: `http://localhost:3000/api-docs`

## Environment variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/boilerplate_api_express` |
| `JWT_SECRET` | Secret used to sign JWTs | `your-secret-key` |
| `JWT_EXPIRATION` | Token lifetime in seconds | `3600` |
| `MAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `MAIL_PORT` | SMTP port | `587` |
| `MAIL_NOREPLY` | From address (no-reply) | `noreply@example.com` |
| `MAIL_USER` | SMTP username | `your-email@example.com` |
| `MAIL_PASSWORD` | SMTP password or app password | `your-password` |
| `PORT` | HTTP port (optional) | `3000` |
| `NODE_ENV` | `development` or `production` (affects cookies & SMTP) | `development` |
| `CORS_ORIGIN` | Allowed origins, comma-separated (optional) | `http://localhost:5173` |

## API documentation

Interactive OpenAPI docs are served at:

**http://localhost:3000/api-docs**

Route annotations live in `router/*.js` and are assembled by `swagger.js`.

## Logging

Logs are written to:

- **Console** — all environments
- **Files** — `logs/boilerplate-api-express-YYYY-MM-DD.log` (retained 30 days)

Log level defaults to `info`.
