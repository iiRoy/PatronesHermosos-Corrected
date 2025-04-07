const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  // Simulación de verificación de token
  if (token !== 'mi-token-seguro') {
    return res.status(403).json({ message: 'Token inválido' });
  }

  req.user = {
    id: 1,
    username: 'admin',
    role: 'admin',
  };

  next();
};

// Opcional: Middleware para validar roles
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permisos suficientes' });
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };
