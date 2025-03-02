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

4. Update the `.env` file with your MongoDB connection string and JWT secret.

5. Start the development server:
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
   - Build Command: `npm install --production=false && npm run build`
   - Start Command: `npm start`
   - Add the following environment variables:
     - `PORT`: 10000 (Render will override this with its own port)
     - `NODE_ENV`: production
     - `MONGO_URI`: Your MongoDB Atlas connection string (e.g., mongodb+srv://username:password@cluster.mongodb.net/database)
     - `JWT_SECRET`: A secure random string for JWT token signing
     - `JWT_EXPIRES_IN`: 90d
     - `ALLOWED_ORIGINS`: Your frontend URL(s), comma-separated (e.g., https://your-app.vercel.app,https://www.your-app.vercel.app)

4. Deploy the service and wait for the build to complete
5. Once deployed, note the URL of your Render service (e.g., https://score-keeper-server.onrender.com)

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure the project:
   - Framework Preset: Create React App
   - Root Directory: client
   - Build Command: npm run build
   - Output Directory: build
4. Add environment variables:
   - `REACT_APP_API_URL`: Your backend URL with /api path (e.g., https://score-keeper-server.onrender.com/api)
   - `REACT_APP_ENV`: production
5. Deploy the project and wait for the build to complete

## Environment Variables

### Backend (.env)

```
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=90d

# CORS Configuration
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://www.your-frontend-domain.vercel.app
```

### Frontend (.env.production)

```
# API Configuration
REACT_APP_API_URL=https://your-score-keeper-api.onrender.com/api

# Environment
REACT_APP_ENV=production
```

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

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- TypeScript

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
├── server/                 # Backend Node.js application
│   ├── src/                # Source files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Entry point
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
└── README.md               # Project documentation
```

## Troubleshooting Deployment

### Render
- If your application fails to build, check the build logs for errors
- Ensure all environment variables are correctly set
- Verify that your MongoDB Atlas IP access list includes Render's IPs or is set to allow access from anywhere (0.0.0.0/0)
- If you encounter TypeScript compilation errors about missing type definitions, make sure all `@types/*` packages are in the `dependencies` section of your `package.json`, not just in `devDependencies`, as Render may not install dev dependencies during the build process

### Vercel
- If your frontend fails to connect to the backend, check that REACT_APP_API_URL is correctly set
- Ensure CORS is properly configured on your backend to allow requests from your Vercel domain

## Future Enhancements

- Real-time updates using WebSockets
- Social features (friends, teams)
- Advanced statistics and visualizations
- Mobile app using React Native

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
