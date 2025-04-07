const { body, validationResult } = require('express-validator');

const validateVenue = [
  body('name').notEmpty().withMessage('El nombre de la sede es obligatorio'),
  body('location').notEmpty().withMessage('La ubicación es obligatoria'),
  body('address').notEmpty().withMessage('La dirección es obligatoria'),
  body('participation_file').notEmpty().withMessage('El archivo es obligatorio'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: 'Error de validación', errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateVenue };
