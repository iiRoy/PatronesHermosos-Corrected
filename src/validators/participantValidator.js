const { body, validationResult } = require('express-validator');

const validateParticipant = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('paternal_name').notEmpty().withMessage('El apellido paterno es obligatorio'),
  body('maternal_name').notEmpty().withMessage('El apellido materno es obligatorio'),
  body('email').isEmail().withMessage('Correo inválido'),
  body('year').isInt().withMessage('Año inválido'),
  body('education').notEmpty().withMessage('Educación obligatoria'),
  body('participation_file').notEmpty().withMessage('Archivo obligatorio'),
  body('id_group').isInt().withMessage('ID de grupo inválido'),
  body('id_tutor').isInt().withMessage('ID de tutor inválido'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: 'Error de validación', errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateParticipant };
