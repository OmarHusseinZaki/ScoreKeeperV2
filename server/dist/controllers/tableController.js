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
exports.removePlayerFromTable = exports.addPlayerToTable = exports.deleteTable = exports.updateTable = exports.getTableById = exports.getTables = exports.createTable = void 0;
const Table_1 = __importDefault(require("../models/Table"));
const mongoose_1 = __importDefault(require("mongoose"));
// Mock data for when MongoDB is unavailable
const mockTables = [
    {
        _id: 'mock-table-1',
        name: 'Mock Poker Game',
        user: 'mock-user-1',
        players: [],
        metadata: {
            gameTitle: 'Texas Hold\'em',
            gameType: 'Poker',
            gameDate: '2023-06-15',
            location: 'Mock Location',
            maxPlayers: 8,
            description: 'This is a mock poker game for when MongoDB is unavailable'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: 'mock-table-2',
        name: 'Mock Chess Tournament',
        user: 'mock-user-1',
        players: [],
        metadata: {
            gameTitle: 'Chess Championship',
            gameType: 'Chess',
            gameDate: '2023-06-20',
            location: 'Mock Chess Club',
            maxPlayers: 16,
            description: 'Mock chess tournament for when MongoDB is unavailable'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
// Helper function to check if MongoDB is connected
const isMongoConnected = () => mongoose_1.default.connection.readyState === 1;
// Helper function to handle mock user IDs
const handleUserId = (userId) => {
    // If it's a mock ID and we're connected to MongoDB, create a valid ObjectId
    if (userId === 'mock123' && isMongoConnected()) {
        // Use a consistent ObjectId for the mock user
        return new mongoose_1.default.Types.ObjectId('000000000000000000000123');
    }
    return userId;
};
// @desc    Create a new table
// @route   POST /api/tables
// @access  Private
const createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if MongoDB is connected
        if (!isMongoConnected()) {
            console.log('MongoDB not connected. Returning mock response for createTable');
            const { name, metadata } = req.body;
            // Create a mock table with the provided data
            const mockTable = {
                _id: `mock-table-${Date.now()}`,
                name,
                user: req.user._id,
                players: [],
                metadata,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            return res.status(201).json(Object.assign(Object.assign({}, mockTable), { _isMock: true, message: 'MongoDB is not available. This is mock data and will not be persisted.' }));
        }
        const { name, metadata } = req.body;
        // Handle the mock user ID
        const userId = handleUserId(req.user._id);
        const table = yield Table_1.default.create({
            name,
            user: userId,
            players: [],
            metadata
        });
        res.status(201).json(table);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createTable = createTable;
// @desc    Get all tables for a user
// @route   GET /api/tables
// @access  Private
const getTables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if MongoDB is connected
        if (!isMongoConnected()) {
            console.log('MongoDB not connected. Returning mock tables');
            return res.json({
                data: mockTables,
                _isMock: true,
                message: 'MongoDB is not available. This is mock data.'
            });
        }
        // Handle the mock user ID
        const userId = handleUserId(req.user._id);
        console.log(`Fetching tables for user ID: ${userId}`);
        const tables = yield Table_1.default.find({ user: userId }).populate('players');
        res.json(tables);
    }
    catch (error) {
        console.error('Error fetching tables:', error);
        // Fallback to mock data on error
        res.json({
            data: mockTables,
            _isMock: true,
            message: 'Error connecting to database. This is mock data.'
        });
    }
});
exports.getTables = getTables;
// @desc    Get a table by ID
// @route   GET /api/tables/:id
// @access  Private
const getTableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if MongoDB is connected
        if (!isMongoConnected()) {
            console.log('MongoDB not connected. Returning mock table for ID:', req.params.id);
            const mockTable = mockTables.find(t => t._id === req.params.id) || mockTables[0];
            return res.json(Object.assign(Object.assign({}, mockTable), { _isMock: true, message: 'MongoDB is not available. This is mock data.' }));
        }
        const table = yield Table_1.default.findById(req.params.id).populate('players');
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Handle the mock user ID for comparison
        const userId = handleUserId(req.user._id);
        // Check if the table belongs to the user
        if (table.user.toString() !== userId.toString()) {
            return res.status(401).json({ message: 'Not authorized to access this table' });
        }
        res.json(table);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTableById = getTableById;
// @desc    Update a table
// @route   PUT /api/tables/:id
// @access  Private
const updateTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const table = yield Table_1.default.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if the table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this table' });
        }
        table.name = name || table.name;
        const updatedTable = yield table.save();
        res.json(updatedTable);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateTable = updateTable;
// @desc    Delete a table
// @route   DELETE /api/tables/:id
// @access  Private
const deleteTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const table = yield Table_1.default.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if the table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this table' });
        }
        yield table.deleteOne();
        res.json({ message: 'Table removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTable = deleteTable;
// @desc    Add a player to a table
// @route   POST /api/tables/:id/players
// @access  Private
const addPlayerToTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerId } = req.body;
        const table = yield Table_1.default.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if the table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this table' });
        }
        // Check if player is already in the table
        if (table.players.includes(playerId)) {
            return res.status(400).json({ message: 'Player already in table' });
        }
        table.players.push(playerId);
        const updatedTable = yield table.save();
        res.json(updatedTable);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addPlayerToTable = addPlayerToTable;
// @desc    Remove a player from a table
// @route   DELETE /api/tables/:id/players/:playerId
// @access  Private
const removePlayerFromTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const table = yield Table_1.default.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        // Check if the table belongs to the user
        if (table.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this table' });
        }
        // Remove player from table
        table.players = table.players.filter((player) => player.toString() !== req.params.playerId);
        const updatedTable = yield table.save();
        res.json(updatedTable);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.removePlayerFromTable = removePlayerFromTable;
