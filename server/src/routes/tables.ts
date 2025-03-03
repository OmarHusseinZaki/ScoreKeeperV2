import express from 'express';
import {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
  addPlayerToTable,
  removePlayerFromTable,
  joinTable,
  updatePlayerScore
} from '../controllers/tableController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Protect all routes
router.use(auth);

// @route   POST /api/tables
// @desc    Create a new game
// @access  Private
router.post('/', createTable);

// @route   POST /api/tables/join/:gameId
// @desc    Join a game by gameId
// @access  Private
router.post('/join/:gameId', joinTable);

// @route   GET /api/tables
// @desc    Get all games for a user (both owned and participating)
// @access  Private
router.get('/', getTables);

// @route   GET /api/tables/:id
// @desc    Get a game by ID or gameId
// @access  Private
router.get('/:id', getTableById);

// @route   PUT /api/tables/:id
// @desc    Update a game
// @access  Private
router.put('/:id', updateTable);

// @route   DELETE /api/tables/:id
// @desc    Delete a game
// @access  Private
router.delete('/:id', deleteTable);

// @route   POST /api/tables/:id/players
// @desc    Add a player to a game
// @access  Private
router.post('/:id/players', addPlayerToTable);

// @route   PUT /api/tables/:id/players/:playerIndex/score
// @desc    Update a player's score
// @access  Private
router.put('/:id/players/:playerIndex/score', updatePlayerScore);

// @route   DELETE /api/tables/:id/players/:playerIndex
// @desc    Remove a player from a game
// @access  Private
router.delete('/:id/players/:playerIndex', removePlayerFromTable);

export default router; 