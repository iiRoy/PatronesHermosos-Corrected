const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmation = async (req, res) => {
  const { userId, userType, confirmationUrl } = req.body;

  try {
    let user, email, name;
    if (userType === 'collaborator') {
      user = await prisma.collaborators.findUnique({
        where: { id_collaborator: parseInt(userId) },
        include: { groups: { include: { venues: true } } },
      });
      email = user?.email;
      name = `${user?.name} ${user?.paternal_name}`;
    } else if (userType === 'participant') {
      user = await prisma.participants.findUnique({
        where: { id_participant: parseInt(userId) },
        include: { groups: { include: { venues: true } } },
      });
      email = user?.email;
      name = `${user?.name} ${user?.paternal_name}`;
    } else {
      return res.status(400).json({ message: 'Tipo de usuario inválido' });
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmación de Registro - Evento STEAM',
      html: `
        <h1>¡Bienvenid@, ${name}!</h1>
        <p>Tu registro como ${userType === 'collaborator' ? 'colaboradora' : 'participante'} ha sido recibido.</p>
        <p><strong>Grupo:</strong> ${user.groups?.name || 'No asignado'}</p>
        <p><strong>Sede:</strong> ${user.groups?.venues?.name || 'N/A'}</p>
        <p><strong>Fecha de inicio:</strong> ${user.groups?.start_date?.toISOString().split('T')[0] || 'N/A'}</p>
        <p>Por favor, confirma tu participación haciendo clic en el siguiente enlace:</p>
        <a href="${confirmationUrl}" style="background-color: #8a2be2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmar Registro</a>
        <p>Si no puedes hacer clic, copia y pega este enlace: ${confirmationUrl}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      message: 'Correo de confirmación enviado',
      data: { userId, userType, email },
    });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar correo', error: error.message });
  }
};

const sendBulkConfirmation = async (req, res) => {
  const { userIds, userType, confirmationUrlTemplate } = req.body;
  let sent = 0;
  let failed = 0;

  try {
    for (const userId of userIds) {
      let user, email, name, token;
      if (userType === 'collaborator') {
        user = await prisma.collaborators.findUnique({
          where: { id_collaborator: parseInt(userId) },
          include: { groups: { include: { venues: true } } },
        });
        email = user?.email;
        name = `${user?.name} ${user?.paternal_name}`;
        token = Buffer.from(`${userId}:collaborator`).toString('base64');
      } else if (userType === 'participant') {
        user = await prisma.participants.findUnique({
          where: { id_participant: parseInt(userId) },
          include: { groups: { include: { venues: true } } },
        });
        email = user?.email;
        name = `${user?.name} ${user?.paternal_name}`;
        token = Buffer.from(`${userId}:participant`).toString('base64');
      } else {
        failed++;
        continue;
      }

      if (!user) {
        failed++;
        continue;
      }

      const confirmationUrl = confirmationUrlTemplate.replace('{token}', token);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmación de Registro - Evento STEAM',
        html: `
          <h1>¡Bienvenid@, ${name}!</h1>
          <p>Tu registro como ${userType === 'collaborator' ? 'colaboradora' : 'participante'} ha sido recibido.</p>
          <p><strong>Grupo:</strong> ${user.groups?.name || 'No asignado'}</p>
          <p><strong>Sede:</strong> ${user.groups?.venues?.name || 'N/A'}</p>
          <p><strong>Fecha de inicio:</strong> ${user.groups?.start_date?.toISOString().split('T')[0] || 'N/A'}</p>
          <p>Por favor, confirma tu participación haciendo clic en el siguiente enlace:</p>
          <a href="${confirmationUrl}" style="background-color: #8a2be2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmar Registro</a>
        `,
      };

      await transporter.sendMail(mailOptions);
      sent++;
    }

    res.json({
      message: 'Correos de confirmación enviados',
      data: { sent, failed },
    });
  } catch (error) {
    console.error('Error al enviar correos:', error);
    res.status(500).json({ message: 'Error al enviar correos', error: error.message });
  }
};

module.exports = {
  sendConfirmation,
  sendBulkConfirmation,
};