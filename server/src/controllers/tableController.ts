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

// @desc    Create a new table
// @route   POST /api/tables
// @access  Private
export const createTable = async (req: Request, res: Response) => {
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
      
      return res.status(201).json({
        ...mockTable,
        _isMock: true,
        message: 'MongoDB is not available. This is mock data and will not be persisted.'
      });
    }

    const { name, metadata } = req.body;
    
    // Handle the mock user ID
    const userId = handleUserId(req.user._id);

    const table = await Table.create({
      name,
      user: userId,
      players: [],
      metadata
    });

    res.status(201).json(table);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tables for a user
// @route   GET /api/tables
// @access  Private
export const getTables = async (req: Request, res: Response) => {
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
    const tables = await Table.find({ user: userId }).populate('players');
    res.json(tables);
  } catch (error: any) {
    console.error('Error fetching tables:', error);
    // Fallback to mock data on error
    res.json({
      data: mockTables,
      _isMock: true,
      message: 'Error connecting to database. This is mock data.'
    });
  }
};

// @desc    Get a table by ID
// @route   GET /api/tables/:id
// @access  Private
export const getTableById = async (req: Request, res: Response) => {
  try {
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('MongoDB not connected. Returning mock table for ID:', req.params.id);
      const mockTable = mockTables.find(t => t._id === req.params.id) || mockTables[0];
      return res.json({
        ...mockTable,
        _isMock: true,
        message: 'MongoDB is not available. This is mock data.'
      });
    }

    const table = await Table.findById(req.params.id).populate('players');

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
    if (table.user.toString() !== req.user._id.toString()) {
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
    if (table.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this table' });
    }

    await table.deleteOne();
    res.json({ message: 'Table removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a player to a table
// @route   POST /api/tables/:id/players
// @access  Private
export const addPlayerToTable = async (req: Request, res: Response) => {
  try {
    const { playerId } = req.body;
    
    const table = await Table.findById(req.params.id);

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
    const updatedTable = await table.save();
    
    res.json(updatedTable);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove a player from a table
// @route   DELETE /api/tables/:id/players/:playerId
// @access  Private
export const removePlayerFromTable = async (req: Request, res: Response) => {
  try {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if the table belongs to the user
    if (table.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this table' });
    }

    // Remove player from table
    table.players = table.players.filter(
      (player) => player.toString() !== req.params.playerId
    );
    
    const updatedTable = await table.save();
    res.json(updatedTable);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 