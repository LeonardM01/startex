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

const templateDir = path.join(__dirname, "template");
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
      type: "confirm",
      name: "initGit",
      message: "Initialize a git repository?",
      default: true,
    },
  ]);

  await fs.copy(templateDir, destDir);
  console.log(`Project created in ${destDir}`);

  // Update package.json name
  const pkgPath = path.join(destDir, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = answers.projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    console.log(`Set project name to '${answers.projectName}' in package.json`);
  }

  // Optionally initialize git repo
  if (answers.initGit) {
    try {
      execSync("git init", { cwd: destDir, stdio: "ignore" });
      console.log("Initialized a git repository.");
    } catch (err) {
      console.warn("Failed to initialize git repository:", err.message);
    }
  }
})();
