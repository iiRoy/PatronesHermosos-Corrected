import React from 'react';
import fs from 'fs';
import path from 'path';

const iconsPath = './src/assets/icons';
const outputPath = './src/components/icons';

// Eliminar todos los archivos previos en la carpeta de componentes
if (fs.existsSync(outputPath)) {
  fs.readdirSync(outputPath).forEach(file => {
    fs.unlinkSync(path.join(outputPath, file));
  });
  console.log('Limpieza completada: Se eliminaron los archivos previos en la carpeta de componentes.');
} else {
  fs.mkdirSync(outputPath, { recursive: true });
  console.log('Carpeta creada: src/components/icons');
}

const generateIconComponent = (iconName, svgContent) => {
  const cleanedSvgContent = svgContent
    .replace(/width="\d+"/g, '')
    .replace(/height="\d+"/g, '')
    .replace(/fill="[^"]*"/g, '')
    .replace(/\s+/g, ' ')
    .replace('<svg ', `<svg width={width} height={height} fill={color} `);

  return `import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ${iconName}: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  ${cleanedSvgContent}
);

export default ${iconName};`;
};

fs.readdir(iconsPath, (err, files) => {
  if (err) throw err;
  let indexContent = '';
  files.forEach(file => {
    if (path.extname(file) === '.svg') {
      const iconName = path.basename(file, '.svg');
      const filePath = path.join(iconsPath, file);
      const svgContent = fs.readFileSync(filePath, 'utf-8');
      const componentContent = generateIconComponent(iconName, svgContent);
      const componentPath = `${outputPath}/${iconName}.tsx`;
      fs.writeFileSync(componentPath, componentContent);
      indexContent += `export { default as ${iconName} } from './${iconName}';\n`;
      console.log(`Generated: ${iconName}.tsx`);
    }
  });
  fs.writeFileSync(`${outputPath}/index.ts`, indexContent);
  console.log('Generated index.ts');
});
