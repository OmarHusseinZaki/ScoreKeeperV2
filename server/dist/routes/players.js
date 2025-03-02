"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// @route   GET /api/players
// @desc    Get all players
// @access  Private
router.get('/', authMiddleware_1.protect, (req, res) => {
    res.json({ message: 'Get all players' });
});
// @route   POST /api/players
// @desc    Create a new player
// @access  Private
router.post('/', authMiddleware_1.protect, (req, res) => {
    res.json({ message: 'Create a new player' });
});
// @route   GET /api/players/:id
// @desc    Get a player by ID
// @access  Private
router.get('/:id', authMiddleware_1.protect, (req, res) => {
    res.json({ message: `Get player with ID: ${req.params.id}` });
});
// @route   PUT /api/players/:id
// @desc    Update a player
// @access  Private
router.put('/:id', authMiddleware_1.protect, (req, res) => {
    res.json({ message: `Update player with ID: ${req.params.id}` });
});
// @route   DELETE /api/players/:id
// @desc    Delete a player
// @access  Private
router.delete('/:id', authMiddleware_1.protect, (req, res) => {
    res.json({ message: `Delete player with ID: ${req.params.id}` });
});
exports.default = router;
