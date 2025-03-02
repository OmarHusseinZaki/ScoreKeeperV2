"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const tables_1 = __importDefault(require("./routes/tables"));
const players_1 = __importDefault(require("./routes/players"));
const scores_1 = __importDefault(require("./routes/scores"));
// Load environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/tables', tables_1.default);
app.use('/api/players', players_1.default);
app.use('/api/scores', scores_1.default);
// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/score-keeper';
// Add a health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        mongoConnected: mongoose_1.default.connection.readyState === 1
    });
});
// Connect to MongoDB with improved error handling
mongoose_1.default.connect(MONGO_URI)
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
        console.log(`MongoDB connection status: ${mongoose_1.default.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    });
}
// Basic route for testing
app.get('/', (req, res) => {
    res.send('Score Keeper API is running');
});
exports.default = app;
