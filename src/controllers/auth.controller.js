const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  let user = null;
  let role = null;

  try {
    // Buscar en Superusers por email o username
    user = await prisma.superusers.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      role = 'superuser';
      // Unificamos el campo id
      user.id = user.id_superuser;
    } else {
      // Buscar en venue coordinators
      user = await prisma.venue_coordinators.findFirst({
        where: {
          OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        role = 'venue_coordinator';
        user.id = user.id_venue_coord;
      }
    }

    if (!role) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        role,
      },
      process.env.JWT_SECRET || 'mi_clave_secreta',
      { expiresIn: '1d' }
    );

    return res.json({
      message: 'Login exitoso',
      token,
      role,
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
        username: user.username,
        image: user.profile_image
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  login,
};