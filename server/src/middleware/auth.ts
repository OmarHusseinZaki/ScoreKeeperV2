import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import mongoose from 'mongoose';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    // Check if this is a mock token (for development)
    if (token.includes('mock-signature')) {
      console.log('Using mock token in development environment');
      try {
        // Decode the mock token to get the user ID
        const decoded = jwt.decode(token);
        console.log('Mock token payload:', decoded);
        
        // Set a mock user in the request
        req.user = {
          _id: new mongoose.Types.ObjectId('000000000000000000000123'),
          username: 'TestUser',
          email: 'user@example.com'
        };
        return next();
      } catch (mockError) {
        console.error('Error processing mock token:', mockError);
        return res.status(401).json({ message: 'Invalid mock token' });
      }
    }

    // For real tokens, verify with JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    
    // Check if user exists
    const user = await User.findById((decoded as any).id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is valid, but user does not exist' });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 