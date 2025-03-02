"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get token from header
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }
        // Check if this is a mock token (for development)
        if (token.includes('mock-signature')) {
            console.log('Using mock token in development environment');
            try {
                // Decode the mock token to get the user ID
                const decoded = jsonwebtoken_1.default.decode(token);
                console.log('Mock token payload:', decoded);
                // Set a mock user in the request
                req.user = {
                    _id: new mongoose_1.default.Types.ObjectId('000000000000000000000123'),
                    username: 'TestUser',
                    email: 'user@example.com'
                };
                return next();
            }
            catch (mockError) {
                console.error('Error processing mock token:', mockError);
                return res.status(401).json({ message: 'Invalid mock token' });
            }
        }
        // For real tokens, verify with JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
        // Check if user exists
        const user = yield User_1.default.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Token is valid, but user does not exist' });
        }
        // Add user to request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
});
exports.auth = auth;
