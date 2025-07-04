import React from 'react';
import fs from 'fs';
import path from 'path';

const iconsPath = './public/assets/icons';
const outputPath = './src/components/icons';

if (fs.existsSync(outputPath)) {
  fs.readdirSync(outputPath).forEach((file) => {
    fs.unlinkSync(path.join(outputPath, file));
  });
  console.log(
    'Limpieza completada: Se eliminaron los archivos previos en la carpeta de componentes.',
  );
} else {
  fs.mkdirSync(outputPath, { recursive: true });
  console.log('Carpeta creada: src/components/icons');
}

// Convierte atributos SVG de kebab-case a camelCase para JSX
function svgAttributesToCamelCase(svg) {
  return svg
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/viewBox=/g, 'viewBox=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/stop-opacity=/g, 'stopOpacity=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    .replace(/xmlns:xlink=/g, 'xmlnsXlink=');
}

const generateIconComponent = (iconName, svgContent) => {
  let cleanedSvgContent = svgContent
    .replace(/stroke-width="[^"]*"/g, '')
    .replace(/stroke="[^"]*"/g, '')
    .replace(/fill="[^"]*"/g, '')
    .replace(
      /<path /g,
      '<path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" ',
    )
    .replace(
      /<circle /g,
      '<circle stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" ',
    )
    .replace(
      /<line /g,
      '<line stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" ',
    )
    .replace(
      /<rect /g,
      '<rect stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" ',
    )
    .replace(/\s+/g, ' ')
    .replace(/width="[^"]*"/g, '')
    .replace(/height="[^"]*"/g, '')
    .replace(
      '<svg ',
      `<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" `,
    );

  // Aplica la conversión a camelCase
  cleanedSvgContent = svgAttributesToCamelCase(cleanedSvgContent);

  return `'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const ${iconName}: React.FC<IconProps> = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (
  ${cleanedSvgContent}
);

export default ${iconName};`;
};

fs.readdir(iconsPath, (err, files) => {
  if (err) throw err;
  let indexContent = '';
  files.forEach((file) => {
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
