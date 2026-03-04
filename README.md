# MeeTung

A personal finance tracking application that allows users to log daily transactions, categorize expenses, and review spending history.

> This project was built as a final project for a Software Engineering course.

## Architecture

This is a Turborepo monorepo with two Next.js applications and a set of shared packages.

```
apps/
  nextjs/     # Frontend (port 3000)
  backend/    # API server (port 3001)
packages/
  api/        # tRPC router definitions
  auth/       # Auth.js with Prisma adapter (Discord OAuth)
  db/         # Prisma client and schema (PostgreSQL)
  ui/         # Shared UI components
  validators/ # Zod validation schemas
```

## Tech Stack

- **Framework**: Next.js 14, React 18
- **API**: tRPC v11 with TanStack Query
- **Auth**: Auth.js v5
- **Database**: PostgreSQL via Prisma ORM
- **Monorepo**: Turborepo
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js >= 20.12.0
- pnpm 9.2.0
- A running PostgreSQL instance (or use Docker Compose)

### Local Development

1. Clone the repository and install dependencies:
   ```sh
   pnpm install
   ```

2. Copy and fill in the environment file:
   ```sh
   cp .env.example .env
   ```

3. Push the database schema and generate the Prisma client:
   ```sh
   pnpm db:push
   pnpm db:generate
   ```

4. Start the development servers:
   ```sh
   pnpm dev
   ```

### Docker Compose

To run the full stack (PostgreSQL, backend, frontend) via Docker:

```sh
docker compose up --build
```

| Service  | Port |
|----------|------|
| Frontend | 8080 |
| Backend  | 3001 |
| Database | 51332 |

## Screenshots

### Login Page

![Login](https://github.com/user-attachments/assets/caad4800-94db-453e-9623-d7dda303d461)

### Transaction Logging

![Transaction Logging](https://github.com/user-attachments/assets/d91af4dd-7593-4620-a8ed-2686e6c2450e)

### History Page

![History](https://github.com/user-attachments/assets/626f70e7-9a33-410f-a13e-cf2b302eed3c)

## Contributors

[@JAJAR94](https://github.com/JAJAR94)
[@nanananice](https://github.com/nanananice)
[@m0owo](https://github.com/m0owo)
[@zenithdreamer](https://github.com/zenithdreamer)

## License

MIT
