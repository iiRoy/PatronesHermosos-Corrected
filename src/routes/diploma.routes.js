const express = require('express');
const router = express.Router();

const {
  generateDiplomas,
  getDiplomaFilters,
  getDiplomaUsers,
  sendDiplomasByEmail,
} = require('../controllers/diploma.controller');

const { authMiddleware } = require('../middlewares/authMiddleware');

// POST /api/diplomas/generate
router.post('/generate', generateDiplomas);

// GET /api/diplomas/filtros
router.get('/filtros', getDiplomaFilters);

// GET /api/diplomas/users
router.get('/users', getDiplomaUsers);

// POST /api/diplomas/email
router.post('/email', authMiddleware, sendDiplomasByEmail);

module.exports = router;
