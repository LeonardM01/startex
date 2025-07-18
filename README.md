# startex

A simple CLI tool to scaffold a new [Express.js](https://expressjs.com/) project from a template, similar to `create-next-app`.

## Features
- Choose between JavaScript and TypeScript templates
- Automatic package installation with package manager detection
- Copies a template project to a new directory
- Prompts for project name and updates `package.json`
- Optionally initializes a git repository
- Automatic Dockerfile for deployment and a Github actions workflow file that deploys the server

## Installation

You can use `npx` to run without installing globally:

```
npx startex <project-directory>
```

Or install globally:

```
npm install -g startex
startex <project-directory>
```

## Important!

****When executed, make sure you update the [workflow file](./templates/[chosen-template]/.github/workflows/api-deployment.yml) and change the `envs` that hold the data used when deploying.****

## Usage

```
npx startex my-app
```

You will be prompted for:
- **Project name** (used to update the new project's `package.json`)
- **Template choice** (TypeScript or JavaScript)
- **Initialize a git repository** (yes/no)
- **Install packages** (yes/no)

## Templates

The CLI includes two template options:

### TypeScript Template (`templates/typescript/`)
- Full TypeScript setup with type definitions
- TypeScript compilation with `tsc`
- Type-safe Express.js configuration
- Development with `ts-node` and `nodemon`
- Production build process

### JavaScript Template (`templates/javascript/`)
- Modern ES modules (ESM) setup
- Direct Node.js execution
- Simplified development workflow
- No build step required for deployment


# 🚀 Project Roadmap

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
> ├─ 🗃️ Advanced Database Initialization (ORMs)
> │
> └─ 🎨 Expanded Template Library (REST, GraphQL)
> ```

---

> **Phase 3: Enhanced User Experience**
>
> ```
> ●
> │
> └─ 💬 Interactive Project Scaffolding (CLI Prompts)
> ```
_Have a feature request? Open an issue or contribute!_

## License

MIT 