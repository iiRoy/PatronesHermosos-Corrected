#!/usr/bin/env node

const { execSync } = require("child_process");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("❌ Debes proporcionar la rama de origen y la rama de destino.\n👉 Uso: node merge-release.js origen destino");
  process.exit(1);
}

const branchFrom = args[0];
const branchTo = args[1];

function run(command, options = {}) {
  try {
    execSync(command, { stdio: "inherit", ...options });
    return true;
  } catch (error) {
    console.error(`❌ Error al ejecutar: ${command}`);
    process.exit(1);
  }
}

function branchExists(branchName) {
  try {
    execSync(`git show-ref --verify --quiet refs/heads/${branchName}`);
    return true;
  } catch {
    return false;
  }
}

// Verificar existencia de ramas
if (!branchExists(branchFrom)) {
  console.error(`❌ La rama de origen '${branchFrom}' no existe.`);
  process.exit(1);
}
if (!branchExists(branchTo)) {
  console.error(`❌ La rama de destino '${branchTo}' no existe.`);
  process.exit(1);
}

// Cambiar a la rama destino
console.log(`\x1b[36m%s\x1b[0m`, `Cambiando a la rama destino '${branchTo}'...`);
run(`git checkout ${branchTo}`);

// Hacer pull para estar actualizados
console.log(`\x1b[36m%s\x1b[0m`, `Actualizando '${branchTo}' desde remoto...`);
run(`git pull origin ${branchTo}`);

// Merge desde la rama origen
console.log(`\x1b[36m%s\x1b[0m`, `Haciendo merge de '${branchFrom}' en '${branchTo}'...`);
const mergeMessage = `feat(merge): Merge from ${branchFrom} to ${branchTo}`;
run(`git merge ${branchFrom} -m "${mergeMessage}"`);

// Correr semantic-release
console.log("\x1b[36m%s\x1b[0m", "Ejecutando semantic-release...");
run("npx semantic-release --no-ci");

// Hacer push final
console.log(`\x1b[36m%s\x1b[0m`, `Haciendo push de '${branchTo}' con tags...`);
run(`git push origin ${branchTo} --tags`);
