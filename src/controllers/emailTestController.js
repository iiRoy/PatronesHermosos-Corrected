const { sendEmail } = require('../lib/emails/emailSender');

const sendTestEmail = async (req, res) => {
  try {
    // Datos estáticos para el correo de prueba
    const emailData = {
      pName: 'Usuario de Prueba',
      role: 'Colaborador',
      sede: 'Ciudad de México',
      grupo: 'A1',
      direccion: 'Av. Reforma 123',
      mName: 'Mentora Ejemplo',
      mEmail: 'mentora@patroneshermosos.org',
      iName: 'Soporte Patrones Hermosos',
      iEmail: 'soporte@patroneshermosos.org'
    };

    // Enviar correo de prueba
    await sendEmail({
      to: 'panaboxgaming@gmail.com', // Correo de destino
      subject: 'Correo de Prueba - Patrones Hermosos',
      template: 'aceptado', // Nombre del template sin .ejs
      data: emailData
    });

    res.json({ success: true, message: 'Correo de prueba enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar correo de prueba:', error);
    res.status(500).json({ success: false, message: `Error al enviar correo de prueba: ${error.message}` });
  }
};

module.exports = { sendTestEmail };