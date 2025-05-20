const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller');

router.get('/', groupController.getAll);

module.exports = router;