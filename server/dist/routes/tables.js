"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tableController_1 = require("../controllers/tableController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Protect all routes
router.use(auth_1.auth);
// @route   POST /api/tables
// @desc    Create a new table
// @access  Private
router.post('/', tableController_1.createTable);
// @route   GET /api/tables
// @desc    Get all tables for a user
// @access  Private
router.get('/', tableController_1.getTables);
// @route   GET /api/tables/:id
// @desc    Get a table by ID
// @access  Private
router.get('/:id', tableController_1.getTableById);
// @route   PUT /api/tables/:id
// @desc    Update a table
// @access  Private
router.put('/:id', tableController_1.updateTable);
// @route   DELETE /api/tables/:id
// @desc    Delete a table
// @access  Private
router.delete('/:id', tableController_1.deleteTable);
// @route   POST /api/tables/:id/players
// @desc    Add a player to a table
// @access  Private
router.post('/:id/players', tableController_1.addPlayerToTable);
// @route   DELETE /api/tables/:id/players/:playerId
// @desc    Remove a player from a table
// @access  Private
router.delete('/:id/players/:playerId', tableController_1.removePlayerFromTable);
exports.default = router;
