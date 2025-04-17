#!/usr/bin/env node

const { execSync } = require("child_process");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ Debes proporcionar un mensaje de commit.\n👉 Uso: node release-all.js \"tipo(scope): descripción\"");
  process.exit(1);
}

const commitMessage = args.join(" ");

function run(command, options = {}) {
  try {
    execSync(command, { stdio: "inherit", ...options });
    return true;
  } catch (error) {
    return false;
  }
}

console.log("\x1b[36m%s\x1b[0m", "Agregando cambios...");
run("git add .");

console.log("\x1b[36m%s\x1b[0m", `Intentando commit con mensaje: "${commitMessage}"`);
if (!run(`git commit -m "${commitMessage}"`)) {
  console.error("\x1b[31m%s\x1b[0m", "Commit inválido (¿falló el hook commit-msg?)");
  process.exit(1);
}

console.log("\x1b[36m%s\x1b[0m", "Ejecutando semantic-release...");
if (!run("npx semantic-release --no-ci")) {
  console.error("\x1b[31m%s\x1b[0m", "Error en semantic-release. No se publicará nada.");
  process.exit(1);
}

console.log("\x1b[36m%s\x1b[0m", "Instalando recursos necesarios...");
run("npm install");

console.log("\x1b[36m%s\x1b[0m", "Cambiando de versión...");
run("git add package-lock.json package.json CHANGELOG.md");
run(`git commit -m "chore(release): update version and changelog"`);

console.log("\x1b[36m%s\x1b[0m", "Haciendo push de commits y tags...");
run("git push origin HEAD --tags");
