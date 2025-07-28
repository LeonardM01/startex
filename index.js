#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = process.argv[2];
if (!targetDir) {
  console.error("Please specify a project directory:");
  console.error("  npx startex my-app");
  process.exit(1);
}

const destDir = path.resolve(process.cwd(), targetDir);

(async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: targetDir,
    },
    {
      type: "list",
      name: "language",
      message: "Choose your preferred language:",
      choices: [
        { name: "TypeScript", value: "typescript" },
        { name: "JavaScript", value: "javascript" },
      ],
      default: "typescript",
    },
    {
      type: "confirm",
      name: "useDatabase",
      message: "Do you want to include a database (Prisma ORM)?",
      default: true,
    },
    {
      type: "list",
      name: "database",
      message: "Choose a database:",
      choices: [
        { name: "MySQL", value: "mysql" },
        { name: "PostgreSQL", value: "postgresql" },
        { name: "MongoDB", value: "mongodb" },
      ],
      default: "mysql",
      when: (answers) => answers.useDatabase,
    },
    {
      type: "confirm",
      name: "initGit",
      message: "Initialize a git repository?",
      default: true,
    },
    {
      type: "confirm",
      name: "installPackages",
      message: "Install packages?",
      default: true,
    },
  ]);

  // Determine the template directory based on choices
  let templateName = answers.language;
  if (answers.useDatabase && answers.database) {
    templateName = `${answers.language}-prisma-${answers.database}`;
  }

  const templateDir = path.join(__dirname, "templates", templateName);

  if (!(await fs.pathExists(templateDir))) {
    console.error(`Template "${templateName}" not found at ${templateDir}`);
    process.exit(1);
  }

  await fs.copy(templateDir, destDir);
  console.log(`Project created in ${destDir} using ${templateName} template`);

  const pkgPath = path.join(destDir, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = answers.projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    console.log(`Set project name to '${answers.projectName}' in package.json`);
  }

  if (answers.initGit) {
    try {
      execSync("git init", { cwd: destDir, stdio: "ignore" });
      console.log("Initialized a git repository.");
    } catch (err) {
      console.warn("Failed to initialize git repository:", err.message);
    }
  }

  if (answers.installPackages) {
    console.log("Installing packages...");
    try {
      const packageManager = detectPackageManager(destDir);

      console.log(`Using ${packageManager} to install packages...`);
      const installCommand =
        packageManager === "npm"
          ? "npm install"
          : packageManager === "pnpm"
          ? "pnpm install"
          : "yarn install";

      execSync(installCommand, { cwd: destDir, stdio: "inherit" });
      console.log("✅ Packages installed successfully!");

      // Generate Prisma client if this is a Prisma template
      if (answers.useDatabase) {
        console.log("Generating Prisma client...");
        try {
          const prismaCommand =
            packageManager === "npm"
              ? "npx prisma generate"
              : packageManager === "pnpm"
              ? "pnpm exec prisma generate"
              : "yarn prisma generate";

          execSync(prismaCommand, { cwd: destDir, stdio: "inherit" });
          console.log("✅ Prisma client generated successfully!");
        } catch (err) {
          console.warn("❌ Failed to generate Prisma client:", err.message);
          console.log("You can generate it manually by running:");
          console.log(`  cd ${path.basename(destDir)}`);
          console.log(
            `  ${
              packageManager === "npm"
                ? "npx"
                : packageManager === "pnpm"
                ? "pnpm exec"
                : "yarn"
            } prisma generate`
          );
        }
      }
    } catch (err) {
      console.warn("❌ Failed to install packages:", err.message);
      console.log(`You can install them manually by running:`);
      console.log(`  cd ${path.basename(destDir)}`);
      console.log(`  npm install`);
    }
  } else {
    console.log("Skipped package installation.");
    console.log("To install packages later, run:");
    console.log(`  cd ${path.basename(destDir)}`);
    console.log(`  npm install`);
  }

  console.log("\n🎉 Project setup complete!");
  console.log("\nNext steps:");
  console.log(`  cd ${path.basename(destDir)}`);
  if (!answers.installPackages) {
    console.log(`  npm install`);
    if (answers.useDatabase) {
      console.log(`  npx prisma generate`);
    }
  }

  // Template-specific instructions
  if (answers.useDatabase) {
    console.log(`  # Set up your database:`);
    console.log(`  # 1. Update DATABASE_URL in .env file`);
    console.log(`  # 2. npm run db:push    # Push schema to database`);
    console.log(`  # 3. npm run db:seed    # Seed with sample data`);
    console.log(`  npm run dev             # Start development server`);
    console.log(
      `  npm run db:studio       # Open Prisma Studio (database GUI)`
    );
  } else if (answers.language === "typescript") {
    console.log(`  npm run dev    # Start development server`);
    console.log(`  npm run build  # Build for production`);
  } else {
    console.log(`  npm run dev    # Start development server`);
    console.log(`  npm start      # Start production server`);
  }
})();

// Function to detect package manager based on lock files or global availability
function detectPackageManager(projectDir) {
  if (fs.existsSync(path.join(projectDir, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(projectDir, "yarn.lock"))) {
    return "yarn";
  }

  try {
    execSync("pnpm --version", { stdio: "ignore" });
    return "pnpm";
  } catch {}

  try {
    execSync("yarn --version", { stdio: "ignore" });
    return "yarn";
  } catch {}

  return "npm";
}
