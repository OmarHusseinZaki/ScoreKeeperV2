# Score Keeper Application

A full-stack application for tracking scores in various games and sports.

## Project Structure

- `client/` - React frontend
- `server/` - Node.js/Express backend

## Local Development

### Backend

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Name: score-keeper-server
   - Environment: Node
   - Root Directory: server
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add the following environment variables:
     - PORT: 10000 (Render will override this with its own port)
     - NODE_ENV: production
     - MONGO_URI: Your MongoDB connection string
     - JWT_SECRET: Your secure JWT secret
     - JWT_EXPIRES_IN: 90d
     - ALLOWED_ORIGINS: Your frontend URL(s), comma-separated

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure the project:
   - Framework Preset: Create React App
   - Root Directory: client
   - Build Command: npm run build
   - Output Directory: build
4. Add environment variables:
   - REACT_APP_API_URL: Your backend URL (e.g., https://score-keeper-server.onrender.com/api)

## Environment Variables

### Backend

See `.env.example` in the server directory for required environment variables.

### Frontend

- `REACT_APP_API_URL`: URL of the backend API
- `REACT_APP_ENV`: Environment (development or production)

## Features

- User authentication
- Create and join games
- Track scores
- View game history
- Player profiles

## Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Styled Components
- Axios for API requests

### Backend (Coming Soon)
- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/score-keeper.git
cd score-keeper
```

2. Install dependencies
```bash
# Install client dependencies
cd client
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
score-keeper/
├── client/                 # Frontend React application
│   ├── public/             # Public assets
│   ├── src/                # Source files
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Global styles and theme
│   │   ├── App.tsx         # Main App component
│   │   └── index.tsx       # Entry point
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
└── README.md               # Project documentation
```

## Future Enhancements

- Real-time updates using WebSockets
- Social features (friends, teams)
- Advanced statistics and visualizations
- Mobile app using React Native

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 