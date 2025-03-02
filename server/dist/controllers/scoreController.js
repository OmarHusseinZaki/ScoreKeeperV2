"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScore = exports.updateScore = exports.getTotalScore = exports.getScoresByPlayer = exports.getScoresByTable = exports.addScore = void 0;
const Score_1 = __importDefault(require("../models/Score"));
const Table_1 = __importDefault(require("../models/Table"));
const Player_1 = __importDefault(require("../models/Player"));
// @desc    Add a score for a player in a table
// @route   POST /api/scores
// @access  Private
const addScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerId, tableId, value } = req.body;
        // Validate player and table
        const player = yield Player_1.default.findById(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        const table = yield Table_1.default.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if player belongs to the user
        if (player.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to add score for this player' });
        }
        // Check if table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to add score to this table' });
        }
        // Create new score
        const score = yield Score_1.default.create({
            player: playerId,
            table: tableId,
            value: value,
            date: new Date(),
        });
        res.status(201).json(score);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addScore = addScore;
// @desc    Get all scores for a table
// @route   GET /api/scores/table/:tableId
// @access  Private
const getScoresByTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tableId } = req.params;
        // Validate table
        const table = yield Table_1.default.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view scores for this table' });
        }
        // Get scores for the table
        const scores = yield Score_1.default.find({ table: tableId })
            .populate('player', 'name')
            .sort({ date: -1 });
        res.json(scores);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getScoresByTable = getScoresByTable;
// @desc    Get all scores for a player
// @route   GET /api/scores/player/:playerId
// @access  Private
const getScoresByPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerId } = req.params;
        // Validate player
        const player = yield Player_1.default.findById(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        // Check if player belongs to the user
        if (player.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view scores for this player' });
        }
        // Get scores for the player
        const scores = yield Score_1.default.find({ player: playerId })
            .populate('table', 'name')
            .sort({ date: -1 });
        res.json(scores);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getScoresByPlayer = getScoresByPlayer;
// @desc    Get total score for a player in a table
// @route   GET /api/scores/total/:tableId/:playerId
// @access  Private
const getTotalScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tableId, playerId } = req.params;
        // Validate player and table
        const player = yield Player_1.default.findById(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        const table = yield Table_1.default.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if player belongs to the user
        if (player.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view scores for this player' });
        }
        // Check if table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view scores for this table' });
        }
        // Get all scores for the player in the table
        const scores = yield Score_1.default.find({ player: playerId, table: tableId });
        // Calculate total score
        const totalScore = scores.reduce((total, score) => total + score.value, 0);
        res.json({ totalScore });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTotalScore = getTotalScore;
// @desc    Update a score
// @route   PUT /api/scores/:id
// @access  Private
const updateScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value } = req.body;
        const { id } = req.params;
        const score = yield Score_1.default.findById(id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        // Validate player and table
        const player = yield Player_1.default.findById(score.player);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        const table = yield Table_1.default.findById(score.table);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if player belongs to the user
        if (player.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update score for this player' });
        }
        // Check if table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update score for this table' });
        }
        // Update score
        score.value = value;
        const updatedScore = yield score.save();
        res.json(updatedScore);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateScore = updateScore;
// @desc    Delete a score
// @route   DELETE /api/scores/:id
// @access  Private
const deleteScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const score = yield Score_1.default.findById(id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        // Validate player and table
        const player = yield Player_1.default.findById(score.player);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        const table = yield Table_1.default.findById(score.table);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if player belongs to the user
        if (player.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete score for this player' });
        }
        // Check if table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete score for this table' });
        }
        // Delete score
        yield score.deleteOne();
        res.json({ message: 'Score removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteScore = deleteScore;
