# startex

A simple CLI tool to scaffold a new [Express.js]("https://expressjs.com/") project from a template, similar to `create-next-app`.

## Features
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

****When executed, make sure you update the [workflow file](./template/.github/workflows/api-deployment.yml) and change the `envs` that hold the data used when deploying.****

## Usage

```
npx startex my-app
```

You will be prompted for:
- **Project name** (used to update the new project's `package.json`)
- **Initialize a git repository** (yes/no)

## Template

The CLI copies everything from the `template/` directory in this package to your new project directory.

# 🚀 Project Roadmap

> **Phase 1: Foundational Flexibility**
>
> ```
> ●
> │
> ├─ 🔧 Tech Stack Selection (TS/JS)
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