# Express.js TypeScript + Prisma + MySQL Project

This is an Express.js project template with TypeScript, Prisma ORM, and MySQL database integration.

## Features

- **TypeScript**: Full TypeScript support with type definitions
- **Express.js**: Web framework for Node.js
- **Prisma ORM**: Modern database toolkit with type-safe queries
- **MySQL**: Relational database with full CRUD operations
- **Security**: Helmet, CORS, and rate limiting
- **Logging**: Winston logger with Morgan middleware
- **Development**: Hot reload with nodemon and ts-node
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Docker**: Production-ready Dockerfile
- **CI/CD**: GitHub Actions workflow for deployment

## Prerequisites

- Node.js 18+
- MySQL database (local or cloud)
- npm/pnpm/yarn

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your MySQL connection string:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:8080` with hot reload enabled.

## Build

Compile TypeScript to JavaScript:
```bash
npm run build
```

Run the compiled application:
```bash
npm run serve
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run serve` - Run the compiled application
- `npm run typecheck` - Type check without emitting files
- `npm run clean` - Remove the dist directory

## Project Structure

```
src/
├── app.ts              # Main application entry point
├── api/
│   ├── controllers/    # Route controllers
│   └── routes/         # API routes
└── configs/
    ├── logging.ts      # Winston and Morgan configuration
    └── security.ts     # CORS and rate limiting configuration
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080
NODE_ENV=development
DOMAIN=http://localhost:3000
```

## Docker

Build the Docker image:
```bash
docker build -t my-app .
```

Run the container:
```bash
docker run -p 8080:8080 my-app
```

## Deployment

Update the GitHub Actions workflow file `.github/workflows/api-deployment.yml` with your deployment configuration before pushing to production.
