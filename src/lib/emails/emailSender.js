const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail({ to, subject, template, data }) {
  try {
    // Construir la ruta del template dinámicamente
    const templatePath = path.join(__dirname, `${template}.ejs`);

    // Verificar si el archivo del template existe
    await fs.access(templatePath).catch(() => {
      throw new Error(`Template no encontrado: ${templatePath}`);
    });

    // Renderizar el template con los datos
    const html = await ejs.renderFile(templatePath, data);

    // Enviar el correo
    await transporter.sendMail({
      from: `"Equipo Patrones Hermosos" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error; // Propagar el error para que el controlador lo maneje
  }
}

module.exports = { sendEmail };