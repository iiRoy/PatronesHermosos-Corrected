"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collaborator_controller_1 = __importStar(require("../controllers/collaborator.controller"));
const collaboratorValidator_1 = require("../validators/collaboratorValidator");
const authMiddleware_1 = require("../middlewares/authMiddleware");
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
const router = express_1.default.Router();
// Get all collaborators (superuser or venue_coordinator)
router.get('/', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.getAllCollaborators);
// Create a new collaborator (public, no auth required)
router.post('/', collaboratorValidator_1.validateCollaborator, collaborator_controller_1.default.createCollaborator);
// Get a collaborator by ID (superuser or venue_coordinator)
router.get('/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.getCollaboratorById);
// Reject a collaborator (superuser or venue_coordinator)
router.patch('/:id/reject', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.rejectCollaborator);
// Update a collaborator (superuser or venue_coordinator)
router.put('/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaboratorValidator_1.validateCollaborator, collaborator_controller_1.default.updateCollaborator);
// Update basic info of a collaborator (superuser or venue_coordinator)
router.patch('/basic/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.updateCollaboratorBasicInfo);
// Delete a collaborator (superuser or venue_coordinator)
router.delete('/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.deleteCollaborator);
router.post('/:id/send-email', collaborator_controller_1.sendCustomEmailToCollaborator);
// Get available groups for a collaborator (superuser or venue_coordinator)
router.get('/:collaboratorId/available-groups', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.getAvailableGroups);
// Approve a collaborator (superuser or venue_coordinator)
router.patch('/:collaboratorId/approve', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.approveCollaborator);
// Cancel a collaborator (superuser or venue_coordinator)
router.patch('/:id/cancel', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.cancelCollaborator);
// New route: Update collaborator assignment (superuser or venue_coordinator)
router.patch('/:collaboratorId/update-assignment', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), collaborator_controller_1.default.updateCollaboratorAssignment);
exports.default = router;
