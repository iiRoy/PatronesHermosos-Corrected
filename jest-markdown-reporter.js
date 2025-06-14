// jest-markdown-reporter.js
const fs = require('fs');
const path = require('path');

class MarkdownReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
    this._results = [];
  }

  onTestResult(test, testResult) {
    testResult.testResults.forEach((result) => {
      this._results.push({
        file: testResult.testFilePath,
        title: result.fullName,
        status: result.status,
        duration: result.duration,
        failureMessages: result.failureMessages,
      });
    });
  }

  onRunComplete() {
    const date = new Date().toISOString();
    let md = `# Reporte de Tests\n\nFecha de ejecución: ${date}\n\n`;
    this._results.forEach((r, i) => {
      md += `## Test #${i + 1}\n`;
      md += `**Archivo:** ${path.basename(r.file)}\n\n`;
      md += `**Descripción:** ${r.title}\n\n`;
      md += `**Resultado:** ${r.status === 'passed' ? '✅ Éxito' : '❌ Fallo'}\n\n`;
      if (r.status === 'failed') {
        md += `**Errores:**\n\n`;
        r.failureMessages.forEach((msg, idx) => {
          md += `- ${msg}\n`;
        });
      }
      md += `**Duración:** ${r.duration || 0} ms\n\n`;
      md += `**Análisis:** `;
      if (r.status === 'passed') {
        md += 'La prueba pasó correctamente.';
      } else {
        md += 'La prueba falló. Revisar los errores para más detalles.';
      }
      md += '\n\n---\n\n';
    });
    fs.writeFileSync(path.join(process.cwd(), 'test-report.md'), md, 'utf8');
  }
}

module.exports = MarkdownReporter;
