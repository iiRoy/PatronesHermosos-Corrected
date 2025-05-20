const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groups.controller');

router.get('/', groupController.getAll);

module.exports = router;