import { Request, Response } from 'express';
import Player, { IPlayer } from '../models/Player';

// @desc    Create a new player
// @route   POST /api/players
// @access  Private
export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const player = await Player.create({
      name,
      user: req.user._id,
      tables: [],
    });

    res.status(201).json(player);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all players for a user
// @route   GET /api/players
// @access  Private
export const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await Player.find({ user: req.user._id });
    res.json(players);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a player by ID
// @route   GET /api/players/:id
// @access  Private
export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Check if the player belongs to the user
    if (player.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to access this player' });
    }

    res.json(player);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a player
// @route   PUT /api/players/:id
// @access  Private
export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Check if the player belongs to the user
    if (player.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this player' });
    }

    player.name = name || player.name;
    
    const updatedPlayer = await player.save();
    res.json(updatedPlayer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a player
// @route   DELETE /api/players/:id
// @access  Private
export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Check if the player belongs to the user
    if (player.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this player' });
    }

    await player.deleteOne();
    res.json({ message: 'Player removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 