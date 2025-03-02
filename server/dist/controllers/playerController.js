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
exports.deletePlayer = exports.updatePlayer = exports.getPlayerById = exports.getPlayers = exports.createPlayer = void 0;
const Player_1 = __importDefault(require("../models/Player"));
// @desc    Create a new player
// @route   POST /api/players
// @access  Private
const createPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const player = yield Player_1.default.create({
            name,
            user: req.user._id,
            tables: [],
        });
        res.status(201).json(player);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createPlayer = createPlayer;
// @desc    Get all players for a user
// @route   GET /api/players
// @access  Private
const getPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield Player_1.default.find({ user: req.user._id });
        res.json(players);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPlayers = getPlayers;
// @desc    Get a player by ID
// @route   GET /api/players/:id
// @access  Private
const getPlayerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield Player_1.default.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        // Check if the player belongs to the user
        if (player.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to access this player' });
        }
        res.json(player);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPlayerById = getPlayerById;
// @desc    Update a player
// @route   PUT /api/players/:id
// @access  Private
const updatePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const player = yield Player_1.default.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        // Check if the player belongs to the user
        if (player.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this player' });
        }
        player.name = name || player.name;
        const updatedPlayer = yield player.save();
        res.json(updatedPlayer);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updatePlayer = updatePlayer;
// @desc    Delete a player
// @route   DELETE /api/players/:id
// @access  Private
const deletePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield Player_1.default.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        // Check if the player belongs to the user
        if (player.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this player' });
        }
        yield player.deleteOne();
        res.json({ message: 'Player removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deletePlayer = deletePlayer;
