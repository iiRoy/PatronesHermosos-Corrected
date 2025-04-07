const express = require('express');
const router = express.Router();
const { validateParticipant } = require('../validators/participantValidator');
const participantController = require('../controllers/participant.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');


router.get('/', authMiddleware, participantController.getAll);
router.post('/', validateParticipant, participantController.create); // Se deja libre para inscripción abierta
router.get('/:id', authMiddleware, participantController.getById);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), validateParticipant, participantController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), participantController.remove);

module.exports = router;
