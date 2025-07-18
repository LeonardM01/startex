# startex

A simple CLI tool to scaffold a new [Express.js](https://expressjs.com/) project from a template, similar to `create-next-app`.

## Features
- Choose between JavaScript and TypeScript templates
- Prisma database templates with MySQL, PostgreSQL, and MongoDB support
- Automatic package installation with package manager detection
- Automatic Prisma client generation for database templates
- Copies a template project to a new directory
- Prompts for project name and updates `package.json`
- Optionally initializes a git repository
- Automatic Dockerfile for deployment and a Github actions workflow file that deploys the server

---

# Usage

```
npx startex my-app
```

You will be prompted for:
- **Project name** (used to update the new project's `package.json`)
- **Template choice** (TypeScript, JavaScript, or Prisma variants)
- **Database choice** (MySQL, PostgreSQL, or MongoDB - for Prisma templates)
- **Initialize a git repository** (yes/no)
- **Install packages** (yes/no)


## Important!

****When executed, make sure you update the [workflow file](./templates/[chosen-template]/.github/workflows/api-deployment.yml) and change the `envs` that hold the data used when deploying.****

<br/>

---

<br/>

## Templates

The CLI includes multiple template options:

### Basic Templates

#### TypeScript Template

- Full TypeScript setup with type definitions
- TypeScript compilation with `tsc`
- Type-safe Express.js configuration
- Development with `ts-node` and `nodemon`
- Production build process

#### JavaScript Template

- Modern ES modules (ESM) setup
- Direct Node.js execution
- Simplified development workflow
- No build step required for deployment

### Prisma Database Templates

#### TypeScript/JavaScript + Prisma Templates
- **MySQL**
- **PostgreSQL**
- **MongoDB**

**Prisma templates include:**
- Type-safe database queries with Prisma ORM
- Pre-configured database schemas (User/Post models)
- Database migration and seeding scripts
- CRUD API endpoints examples
- Database connection management
- **Automatic Prisma client generation** during setup
- Type-safe Express.js configuration
- Development with `ts-node` and `nodemon`
- Production build process


# 🚀 Project Roadmap
****
> **Phase 1: Foundational Flexibility**
>
> ```
> ●
> │
> ├─  ✅Done -> Tech Stack Selection (TS/JS)
> │
> └─ 📚 Automated API Documentation (Swagger/OpenAPI)
> ```

---

> **Phase 2: Architecture & Data Layer**
>
>
> ```
> ●
> │
> ├─ ✅Done -> Advanced Database Initialization (ORMs)
> │
> └─ 🎨 Expanded Template Library (REST, GraphQL)
> ```

---

> **Phase 3: Enhanced User Experience**
>
> ```
> ●
> │
> └─ 💬 Advanced Project Scaffolding (Prompts)
> ```
_Have a feature request? Open an issue or contribute!_

## License

MIT 