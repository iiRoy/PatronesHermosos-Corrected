const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { data, getProfile } = require('../controllers/data.controller');

router.get('/', authMiddleware, data);
router.get('/getprofile', authMiddleware, getProfile);

module.exports = router;
