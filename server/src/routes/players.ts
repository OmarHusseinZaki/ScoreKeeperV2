import express from 'express';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// @route   GET /api/players
// @desc    Get all players
// @access  Private
router.get('/', protect, (req, res) => {
  res.json({ message: 'Get all players' });
});

// @route   POST /api/players
// @desc    Create a new player
// @access  Private
router.post('/', protect, (req, res) => {
  res.json({ message: 'Create a new player' });
});

// @route   GET /api/players/:id
// @desc    Get a player by ID
// @access  Private
router.get('/:id', protect, (req, res) => {
  res.json({ message: `Get player with ID: ${req.params.id}` });
});

// @route   PUT /api/players/:id
// @desc    Update a player
// @access  Private
router.put('/:id', protect, (req, res) => {
  res.json({ message: `Update player with ID: ${req.params.id}` });
});

// @route   DELETE /api/players/:id
// @desc    Delete a player
// @access  Private
router.delete('/:id', protect, (req, res) => {
  res.json({ message: `Delete player with ID: ${req.params.id}` });
});

export default router; 