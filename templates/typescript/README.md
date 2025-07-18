# Express.js TypeScript Project

This is an Express.js project template with TypeScript configuration.

## Features

- **TypeScript**: Full TypeScript support with type definitions
- **Express.js**: Web framework for Node.js
- **Security**: Helmet, CORS, and rate limiting
- **Logging**: Winston logger with Morgan middleware
- **Development**: Hot reload with nodemon and ts-node
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Docker**: Production-ready Dockerfile
- **CI/CD**: GitHub Actions workflow for deployment

## Development

Install dependencies:
```bash
npm install
# or
pnpm install
```

Start development server:
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
