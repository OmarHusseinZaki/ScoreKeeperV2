import express from 'express';
import {
  addScore,
  getScoresByTable,
  getScoresByPlayer,
  getTotalScore,
  updateScore,
  deleteScore,
} from '../controllers/scoreController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Protect all routes
router.use(auth);

// @route   POST /api/scores
// @desc    Add a score for a player in a table
// @access  Private
router.post('/', addScore);

// @route   GET /api/scores/table/:tableId
// @desc    Get all scores for a table
// @access  Private
router.get('/table/:tableId', getScoresByTable);

// @route   GET /api/scores/player/:playerId
// @desc    Get all scores for a player
// @access  Private
router.get('/player/:playerId', getScoresByPlayer);

// @route   GET /api/scores/total/:tableId/:playerId
// @desc    Get total score for a player in a table
// @access  Private
router.get('/total/:tableId/:playerId', getTotalScore);

// @route   PUT /api/scores/:id
// @desc    Update a score
// @access  Private
router.put('/:id', updateScore);

// @route   DELETE /api/scores/:id
// @desc    Delete a score
// @access  Private
router.delete('/:id', deleteScore);

export default router; 