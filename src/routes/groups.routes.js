const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groups.controller');

router.get('/', groupController.getAll);
router.post('/', groupController.createGroup);

module.exports = router;