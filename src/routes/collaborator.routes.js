const express = require('express');
const router = express.Router();
const collaboratorsController = require('../controllers/collaborators.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.post('/', authMiddleware, roleMiddleware(['superuser']), collaboratorsController.createCollaborator);
router.get('/', authMiddleware, collaboratorsController.getAllCollaborators);
router.get('/:id', authMiddleware, collaboratorsController.getCollaboratorById);
router.put('/:id', authMiddleware, roleMiddleware(['superuser']), collaboratorsController.updateCollaborator);
router.delete('/:id', authMiddleware, roleMiddleware(['superuser']), collaboratorsController.deleteCollaborator);
router.get('/table/all', authMiddleware, collaboratorsController.getCollaboratorsTable);
router.put('/basic/:id', authMiddleware, roleMiddleware(['superuser']), collaboratorsController.updateCollaboratorBasicInfo);

module.exports = router;
