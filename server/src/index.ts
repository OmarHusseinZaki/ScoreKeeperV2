import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import tableRoutes from './routes/tables';
import playerRoutes from './routes/players';
import scoreRoutes from './routes/scores';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/scores', scoreRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/score-keeper';

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Connect to MongoDB with improved error handling
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server after successful database connection
    startServer();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Starting server without MongoDB connection...');
    // Start server even if MongoDB connection fails
    startServer();
  });

// Function to start the server
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB connection status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  });
}

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Score Keeper API is running');
});

export default app; 