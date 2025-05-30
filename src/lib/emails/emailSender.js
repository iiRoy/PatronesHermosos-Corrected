const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail({ to, subject, template, data }) {
  const templatePath = path.join(__dirname, 'templates', 'colaboradores', `${template}.ejs`);
  const html = await ejs.renderFile(templatePath, data);

  await transporter.sendMail({
    from: `"Equipo Patrones Hermosos" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
}

module.exports = { sendEmail };