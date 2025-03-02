# Score Keeper Application

A modern web application for tracking scores and managing games across various sports and activities.

## Features

- **User Authentication**: Register, login, and manage your profile
- **Game Management**: Create, join, and manage games
- **Real-time Score Tracking**: Keep track of scores during games
- **Game History**: View past games and statistics
- **Responsive Design**: Works on desktop and mobile devices

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