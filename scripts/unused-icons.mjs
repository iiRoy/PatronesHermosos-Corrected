// Icon Usage Reporter for ES Modules
// Reports where each icon component in src/components/icons/** is used within src/app/**
// Generates a text report in icon-usage-report.txt
// Usage:
//   1. Install dependencies: npm install glob
//   2. Run: npm run unused-icons

import fs from 'fs';
import path from 'path';
import { sync } from 'glob';

// Determine project root directory
const rootDir = process.cwd();

// 1. Collect all .tsx icon files (relative to rootDir)
const iconPattern = 'src/components/icons/**/*.tsx';
const iconFiles = sync(iconPattern, { cwd: rootDir, absolute: true });

// 2. Collect all files in src/app where icons might be referenced
// Exclude the components/icons directory from the search
const appPattern = 'src/**/*.{ts,tsx,js,jsx}';
const appFiles = sync(appPattern, {
  cwd: rootDir,
  absolute: true,
  ignore: ['src/components/icons/**'],
});

// Prepare report lines
const reportLines = [];
reportLines.push(
  `🔍 Buscando iconos con patrón \`${iconPattern}\`: ${iconFiles.length} encontrados.`,
);
reportLines.push(
  `🔍 Buscando archivos de app con patrón \`${appPattern}\`: ${appFiles.length} encontrados.`,
);

if (iconFiles.length === 0) {
  reportLines.push('⚠️ No se encontraron archivos de iconos. Verifica la ruta y el patrón.');
  fs.writeFileSync('icon-usage-report.txt', reportLines.join('\n'), 'utf8');
  process.exit(1);
}

// 3. Build usage report
reportLines.push('');
reportLines.push('📄 Reporte de uso de iconos:');

iconFiles.forEach((iconPath) => {
  const relativeIcon = path.relative(rootDir, iconPath);
  const iconName = path.basename(iconPath, '.tsx');
  const usageRegex = new RegExp(`\\b${iconName}\\b`, 'g');

  // Find app files containing the icon name
  const usedIn = appFiles.filter((file) => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      return usageRegex.test(content);
    } catch {
      return false;
    }
  });

  if (usedIn.length > 0) {
    reportLines.push(`\n✅ ${relativeIcon} se usa en (${usedIn.length}):`);
    usedIn.forEach((file) => {
      reportLines.push(`   - ${path.relative(rootDir, file)}`);
    });
  } else {
    reportLines.push(`\n❌ ${relativeIcon} NO se usa en ningún archivo de src/app`);
  }
});

// 4. Write report to file
const outputPath = path.join(rootDir, 'icon-usage-report.txt');
fs.writeFileSync(outputPath, reportLines.join('\n'), 'utf8');
console.log(`Reporte guardado en ${outputPath}`);
