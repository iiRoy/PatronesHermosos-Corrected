const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Utility function to transform flat keys into nested objects
const parseNestedBody = (body) => {
  const result = {};

  for (const key in body) {
    const parts = key.split('[');
    if (parts.length === 1) {
      result[key] = body[key];
    } else {
      let current = result;
      for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (part.endsWith(']')) {
          part = part.slice(0, -1);
        }
        if (i === parts.length - 1) {
          current[part] = body[key];
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      }
    }
  }

  return phenols;
};

const validateParticipant = [
  // Participant fields
  body('name').notEmpty().withMessage('El nombre del participante es obligatorio'),
  body('paternal_name').notEmpty().withMessage('El apellido paterno del participante es obligatorio'),
  body('email')
    .notEmpty()
    .withMessage('El correo electrónico del participante es obligatorio')
    .isEmail()
    .withMessage('Correo electrónico no válido')
    .custom(async (email) => {
      const existing = await prisma.participants.findFirst({
        where: { email },
      });
      if (existing) {
        throw new Error('El correo ya está registrado');
      }
    }),
  body('year').notEmpty().withMessage('El grado del participante es obligatorio'),
  body('education').notEmpty().withMessage('La escolaridad del participante es obligatoria'),
  body('id_group')
    .notEmpty()
    .withMessage('El grupo es obligatorio')
    .isInt()
    .withMessage('El ID del grupo debe ser un número entero')
    .custom(async (id_group) => {
      const group = await prisma.groups.findUnique({
        where: { id_group: parseInt(id_group) },
      });
      if (!group) {
        throw new Error('El grupo especificado no existe');
      }
    }),

  // Tutor fields
  body('tutor[name]').notEmpty().withMessage('El nombre del tutor es obligatorio'),
  body('tutor[paternal_name]').notEmpty().withMessage('El apellido paterno del tutor es obligatorio'),
  body('tutor[email]')
    .notEmpty()
    .withMessage('El correo electrónico del tutor es obligatorio')
    .isEmail()
    .withMessage('El correo electrónico del tutor debe ser válido'),
  body('tutor[phone_number]')
    .notEmpty()
    .withMessage('El celular del tutor es obligatorio'),

  // File validation
  (req, res, next) => {
    if (!req.files || !req.files['participation_file']) {
      return res.status(422).json({
        message: 'Error de validación',
        errors: [{ msg: 'El archivo de participación es obligatorio' }],
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Error de validación',
        errors: errors.array(),
      });
    }

    // Transform req.body to nested structure
    req.body = parseNestedBody(req.body);

    next();
  },
];

module.exports = { validateParticipant };