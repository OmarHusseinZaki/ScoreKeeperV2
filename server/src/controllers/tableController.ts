import { Request, Response } from 'express';
import Table, { ITable } from '../models/Table';
import mongoose from 'mongoose';

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
const isMongoConnected = () => mongoose.connection.readyState === 1;

// Helper function to handle mock user IDs
const handleUserId = (userId: string) => {
  // If it's a mock ID and we're connected to MongoDB, create a valid ObjectId
  if (userId === 'mock123' && isMongoConnected()) {
    // Use a consistent ObjectId for the mock user
    return new mongoose.Types.ObjectId('000000000000000000000123');
  }
  return userId;
};

// @desc    Create a new game
// @route   POST /api/tables
// @access  Private
export const createTable = async (req: Request, res: Response) => {
  try {
    const { name, metadata } = req.body;
    
    const table = await Table.create({
      name,
      owner: req.user._id,
      participants: [req.user._id], // Add creator as first participant
      players: [],
      metadata
    });

    res.status(201).json(table);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Join a game by gameId
// @route   POST /api/tables/join/:gameId
// @access  Private
export const joinTable = async (req: Request, res: Response) => {
  try {
    const table = await Table.findOne({ gameId: req.params.gameId });

    if (!table) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (!table.isActive) {
      return res.status(400).json({ message: 'This game is no longer active' });
    }

    // Check if user is already a participant
    if (table.participants.some(p => p.toString() === req.user._id.toString())) {
      return res.status(400).json({ message: 'You are already in this game' });
    }

    // Add user to participants
    table.participants.push(req.user._id);
    await table.save();

    res.json(table);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tables for a user (both owned and participating)
// @route   GET /api/tables
// @access  Private
export const getTables = async (req: Request, res: Response) => {
  try {
    const tables = await Table.find({
      $or: [
        { owner: req.user._id },
        { participants: req.user._id }
      ]
    }).populate('owner', 'username');
    
    res.json(tables);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a table by ID or gameId
// @route   GET /api/tables/:id
// @access  Private
export const getTableById = async (req: Request, res: Response) => {
  try {
    const table = await Table.findOne({
      $or: [
        { _id: req.params.id },
        { gameId: req.params.id }
      ]
    }).populate('owner participants', 'username email');

    if (!table) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if user is a participant
    if (!table.participants.some(p => p._id.toString() === req.user._id.toString())) {
      return res.status(401).json({ message: 'Not authorized to access this game' });
    }

    res.json(table);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a table
// @route   PUT /api/tables/:id
// @access  Private
export const updateTable = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if the table belongs to the user
    if (table.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this table' });
    }

    table.name = name || table.name;
    
    const updatedTable = await table.save();
    res.json(updatedTable);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a table
// @route   DELETE /api/tables/:id
// @access  Private
export const deleteTable = async (req: Request, res: Response) => {
  try {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if the table belongs to the user
    if (table.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this table' });
    }

    await table.deleteOne();
    res.json({ message: 'Table removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a player to a game
// @route   POST /api/tables/:id/players
// @access  Private
export const addPlayerToTable = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if user is a participant
    if (!table.participants.some(p => p.toString() === req.user._id.toString())) {
      return res.status(401).json({ message: 'Not authorized to update this game' });
    }

    // Add new player
    table.players.push({
      name,
      score: 0
    });
    
    const updatedTable = await table.save();
    res.json(updatedTable);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update player score
// @route   PUT /api/tables/:id/players/:playerIndex/score
// @access  Private
export const updatePlayerScore = async (req: Request, res: Response) => {
  try {
    const { score } = req.body;
    const { id, playerIndex } = req.params;
    const playerIdx = parseInt(playerIndex);

    const table = await Table.findById(id);

    if (!table) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if user is a participant
    if (!table.participants.some(p => p.toString() === req.user._id.toString())) {
      return res.status(401).json({ message: 'Not authorized to update this game' });
    }

    // Check if player exists
    if (!table.players[playerIdx]) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Update player score
    table.players[playerIdx].score = score;
    const updatedTable = await table.save();
    
    res.json(updatedTable);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove a player from a game
// @route   DELETE /api/tables/:id/players/:playerIndex
// @access  Private
export const removePlayerFromTable = async (req: Request, res: Response) => {
  try {
    const { id, playerIndex } = req.params;
    const playerIdx = parseInt(playerIndex);
    
    const table = await Table.findById(id);

    if (!table) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if user is a participant
    if (!table.participants.some(p => p.toString() === req.user._id.toString())) {
      return res.status(401).json({ message: 'Not authorized to update this game' });
    }

    // Remove player
    table.players.splice(playerIdx, 1);
    const updatedTable = await table.save();
    
    res.json(updatedTable);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 