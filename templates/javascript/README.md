# Express.js JavaScript Project

This is an Express.js project template with modern JavaScript (ES modules) configuration.

## Features

- **Modern JavaScript**: ES modules (ESM) support
- **Express.js**: Web framework for Node.js
- **Security**: Helmet, CORS, and rate limiting
- **Logging**: Winston logger with Morgan middleware
- **Development**: Hot reload with nodemon
- **Linting**: ESLint with modern JavaScript support
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

## Production

Start the application:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start the application in production mode

## Project Structure

```
src/
├── app.js              # Main application entry point
├── api/
│   ├── controllers/    # Route controllers
│   └── routes/         # API routes
└── configs/
    ├── logging.js      # Winston and Morgan configuration
    └── security.js     # CORS and rate limiting configuration
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

## Notes

This template uses ES modules (ESM) which requires Node.js 14+ and the `"type": "module"` setting in package.json. All imports must include the `.js` file extension.
