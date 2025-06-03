// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_clave_secreta');
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }

  // decoded debe tener: userId, email, username, role, tokenVersion
  const { userId, role, tokenVersion } = decoded;
  if (!userId || !role) {
    return res.status(403).json({ message: 'Token mal formado' });
  }

  try {
    let userRecord = null;

    if (role === 'superuser') {
      userRecord = await prisma.superusers.findUnique({
        where: { id_superuser: userId },
      });
    } else if (role === 'venue_coordinator') {
      userRecord = await prisma.venue_coordinators.findUnique({
        where: { id_venue_coord: userId },
      });
    } else {
      return res.status(403).json({ message: 'Rol no soportado' });
    }

    // Si no existe el registro o la versión del token no coincide, rehusamos
    if (!userRecord || userRecord.tokenVersion !== tokenVersion) {
      return res.status(403).json({ message: 'Token inválido o revocado' });
    }

    // Inyectar datos mínimos en req.user
    req.user = {
      id:       userId,
      email:    decoded.email,
      username: decoded.username,
      role:     role,
    };

    return next();
  } catch (error) {
    console.error('Error en authMiddleware:', error);
    return res.status(500).json({ message: 'Error interno de autenticación' });
  }
};


const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {

    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permisos suficientes' });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware,
};
