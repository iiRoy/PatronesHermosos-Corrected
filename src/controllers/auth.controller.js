const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  let user = null;
  let role = null;
  let tokenVersion = 0;

  try {
    user = await prisma.superusers.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      role = 'superuser';
      user.id = user.id_superuser;
      tokenVersion = user.tokenVersion;
    } else {
      user = await prisma.venue_coordinators.findFirst({
        where: {
          OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        role = 'venue_coordinator';
        user.id = user.id_venue_coord;
        tokenVersion = user.tokenVersion;
      }
    }

    if (!role) {
      return res.status(401).json({ message: 'Los datos ingresados son incorrectos. Intenta de nuevo.' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        role,
        tokenVersion,
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
        name: user.name,
        username: user.username,
        image: user.profile_image
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

const logout = async (req, res) => {
  const { id, role } = req.user;

  try {
    if (role === 'superuser') {
      await prisma.superusers.update({
        where: { id_superuser: id },
        data: { tokenVersion: { increment: 1 } },
      });
    } else if (role === 'venue_coordinator') {
      await prisma.venue_coordinators.update({
        where: { id_venue_coord: id },
        data: { tokenVersion: { increment: 1 } },
      });
    }

    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};

module.exports = {
  login,
  logout,
};