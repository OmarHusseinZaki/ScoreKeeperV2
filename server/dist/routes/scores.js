"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scoreController_1 = require("../controllers/scoreController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Protect all routes
router.use(auth_1.auth);
// @route   POST /api/scores
// @desc    Add a score for a player in a table
// @access  Private
router.post('/', scoreController_1.addScore);
// @route   GET /api/scores/table/:tableId
// @desc    Get all scores for a table
// @access  Private
router.get('/table/:tableId', scoreController_1.getScoresByTable);
// @route   GET /api/scores/player/:playerId
// @desc    Get all scores for a player
// @access  Private
router.get('/player/:playerId', scoreController_1.getScoresByPlayer);
// @route   GET /api/scores/total/:tableId/:playerId
// @desc    Get total score for a player in a table
// @access  Private
router.get('/total/:tableId/:playerId', scoreController_1.getTotalScore);
// @route   PUT /api/scores/:id
// @desc    Update a score
// @access  Private
router.put('/:id', scoreController_1.updateScore);
// @route   DELETE /api/scores/:id
// @desc    Delete a score
// @access  Private
router.delete('/:id', scoreController_1.deleteScore);
exports.default = router;
