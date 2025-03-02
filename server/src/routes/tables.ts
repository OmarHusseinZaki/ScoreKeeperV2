import express from 'express';
import {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
  addPlayerToTable,
  removePlayerFromTable,
} from '../controllers/tableController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Protect all routes
router.use(auth);

// @route   POST /api/tables
// @desc    Create a new table
// @access  Private
router.post('/', createTable);

// @route   GET /api/tables
// @desc    Get all tables for a user
// @access  Private
router.get('/', getTables);

// @route   GET /api/tables/:id
// @desc    Get a table by ID
// @access  Private
router.get('/:id', getTableById);

// @route   PUT /api/tables/:id
// @desc    Update a table
// @access  Private
router.put('/:id', updateTable);

// @route   DELETE /api/tables/:id
// @desc    Delete a table
// @access  Private
router.delete('/:id', deleteTable);

// @route   POST /api/tables/:id/players
// @desc    Add a player to a table
// @access  Private
router.post('/:id/players', addPlayerToTable);

// @route   DELETE /api/tables/:id/players/:playerId
// @desc    Remove a player from a table
// @access  Private
router.delete('/:id/players/:playerId', removePlayerFromTable);

export default router; 