import { Request, Response } from 'express';
import Score, { IScore } from '../models/Score';
import Table from '../models/Table';
import Player from '../models/Player';

// @desc    Add a score for a player in a table
// @route   POST /api/scores
// @access  Private
export const addScore = async (req: Request, res: Response) => {
  try {
    const { playerId, tableId, value } = req.body;

    // Validate player and table
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if player belongs to the user
    if (player.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to add score for this player' });
    }

    // Check if table belongs to the user
    if (table.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to add score to this table' });
    }

    // Create new score
    const score = await Score.create({
      player: playerId,
      table: tableId,
      value: value,
      date: new Date(),
    });

    res.status(201).json(score);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all scores for a table
// @route   GET /api/scores/table/:tableId
// @access  Private
export const getScoresByTable = async (req: Request, res: Response) => {
  try {
    const { tableId } = req.params;

    // Validate table
    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if table belongs to the user
    if (table.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view scores for this table' });
    }

    // Get scores for the table
    const scores = await Score.find({ table: tableId })
      .populate('player', 'name')
      .sort({ date: -1 });

    res.json(scores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all scores for a player
// @route   GET /api/scores/player/:playerId
// @access  Private
export const getScoresByPlayer = async (req: Request, res: Response) => {
  try {
    const { playerId } = req.params;

    // Validate player
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Check if player belongs to the user
    if (player.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view scores for this player' });
    }

    // Get scores for the player
    const scores = await Score.find({ player: playerId })
      .populate('table', 'name')
      .sort({ date: -1 });

    res.json(scores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get total score for a player in a table
// @route   GET /api/scores/total/:tableId/:playerId
// @access  Private
export const getTotalScore = async (req: Request, res: Response) => {
  try {
    const { tableId, playerId } = req.params;

    // Validate player and table
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if player belongs to the user
    if (player.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view scores for this player' });
    }

    // Check if table belongs to the user
    if (table.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view scores for this table' });
    }

    // Get all scores for the player in the table
    const scores = await Score.find({ player: playerId, table: tableId });

    // Calculate total score
    const totalScore = scores.reduce((total, score) => total + score.value, 0);

    res.json({ totalScore });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a score
// @route   PUT /api/scores/:id
// @access  Private
export const updateScore = async (req: Request, res: Response) => {
  try {
    const { value } = req.body;
    const { id } = req.params;

    const score = await Score.findById(id);
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }

    // Validate player and table
    const player = await Player.findById(score.player);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const table = await Table.findById(score.table);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if player belongs to the user
    if (player.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update score for this player' });
    }

    // Check if table belongs to the user
    if (table.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update score for this table' });
    }

    // Update score
    score.value = value;
    const updatedScore = await score.save();

    res.json(updatedScore);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a score
// @route   DELETE /api/scores/:id
// @access  Private
export const deleteScore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const score = await Score.findById(id);
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }

    // Validate player and table
    const player = await Player.findById(score.player);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const table = await Table.findById(score.table);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if player belongs to the user
    if (player.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete score for this player' });
    }

    // Check if table belongs to the user
    if (table.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete score for this table' });
    }

    // Delete score
    await score.deleteOne();

    res.json({ message: 'Score removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 