import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Define the Table/Game interface
interface Game {
  _id: string;
  name: string;
  players: any[];
  metadata?: {
    type?: string;
    date?: string;
    location?: string;
    maxPlayers?: number;
    description?: string;
  };
  createdAt: string;
}

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
  text-decoration: none;
  display: inline-block;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CreateGameButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  background-color: #27ae60;
  
  &:hover {
    background-color: #219653;
  }
`;

const JoinGameButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  background-color: #4a90e2;
  
  &:hover {
    background-color: #357abD;
  }
`;

const GamesSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const GameCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const GameTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const GameInfo = styled.div`
  color: #666;
  margin-bottom: 1rem;
`;

const GameDate = styled.p`
  margin-bottom: 0.3rem;
`;

const GamePlayers = styled.p`
  margin-bottom: 0.3rem;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  background-color: #4a90e2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #357abD;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const EmptyStateText = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const LoadingMessage = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: #ff3b3b;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const GameType = styled.p`
  margin-bottom: 0.3rem;
`;

// Mock data for games when API is unavailable
const mockGames: Game[] = [
  {
    _id: 'mock1',
    name: 'Basketball Game (basketball)',
    players: [],
    metadata: {
      type: 'basketball',
      date: '2023-06-15',
      location: 'City Park',
      maxPlayers: 10,
      description: 'Weekly basketball game at the city park'
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock2',
    name: 'Soccer Match (soccer)',
    players: [],
    metadata: {
      type: 'soccer',
      date: '2023-06-20',
      location: 'Community Field',
      maxPlayers: 22,
      description: 'Friendly soccer match'
    },
    createdAt: new Date().toISOString()
  }
];

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMockData, setIsMockData] = useState(false);

  // Fetch games (tables) from the API
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      
      // Check if user is authenticated
      if (!user || !token) {
        console.log('User not authenticated, using mock data');
        setGames(mockGames);
        setIsMockData(true);
        setError('Please log in to access your games. Using sample data instead.');
        setLoading(false);
        return;
      }

      try {
        // Set the authorization header with the token
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        console.log('Fetching games with token:', token);
        
        // Fetch tables from the API
        const response = await axios.get('/tables');
        
        console.log('API response:', response.data);
        
        // Check if the response contains mock data flag
        if (response.data && response.data._isMock) {
          console.log('Received mock data from server');
          setIsMockData(true);
          setGames(response.data.data || mockGames);
          setError(response.data.message || 'Using sample data from server.');
        } else if (Array.isArray(response.data)) {
          // Regular array response
          console.log('Received array data from server:', response.data.length, 'games');
          setGames(response.data);
          setIsMockData(false);
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          // Response with data property
          console.log('Received data property from server:', response.data.data.length, 'games');
          setGames(response.data.data);
          setIsMockData(false);
        } else {
          // Unexpected response format
          console.error('Unexpected response format:', response.data);
          setGames(mockGames);
          setIsMockData(true);
          setError('Received unexpected data format. Using sample data instead.');
        }
      } catch (error: any) {
        console.error('Error fetching games:', error);
        
        // Check for 401 Unauthorized error
        if (error.response && error.response.status === 401) {
          console.log('Authentication error. Token may be invalid.');
          // Clear the invalid token
          localStorage.removeItem('authToken');
          setError('Your session has expired. Please log in again.');
          // Reload the page to trigger re-authentication
          window.location.reload();
        } else {
          setError('Could not connect to the server. Using sample data instead.');
          setGames(mockGames);
          setIsMockData(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [user, token]);

  // Extract game title from the name (which might include game type)
  const getGameTitle = (name: string) => {
    // If name contains game type in parentheses, extract just the title
    const match = name.match(/(.*?)\s*\(.*\)/);
    return match ? match[1] : name;
  };
  
  // Extract game type from metadata or from name
  const getGameType = (game: Game) => {
    if (game.metadata?.type) {
      return game.metadata.type;
    }
    
    // Try to extract from name if in format "Title (Type)"
    const match = game.name.match(/.*\((.*?)\)/);
    return match ? match[1] : 'Unknown';
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
    
    // If it's a metadata date field
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new Date(dateString).toLocaleDateString();
    }
    
    // If it's a createdAt timestamp
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <DashboardContainer>
      <WelcomeSection>
        <Title>Welcome, {user?.username || 'User'}!</Title>
        <Subtitle>Manage your games and scores from your dashboard</Subtitle>
      </WelcomeSection>
      
      <ActionButtons>
        <CreateGameButton to="/create-game">Create New Game</CreateGameButton>
        <JoinGameButton to="/join-game">Join a Game</JoinGameButton>
      </ActionButtons>
      
      <SectionTitle>Your Games</SectionTitle>
      
      {loading ? (
        <LoadingMessage>Loading your games...</LoadingMessage>
      ) : error ? (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          {isMockData && (
            <LoadingMessage>
              Showing sample data. Games created here will not be saved permanently.
            </LoadingMessage>
          )}
        </>
      ) : games.length === 0 ? (
        <EmptyState>
          <EmptyStateText>You haven't created any games yet.</EmptyStateText>
          <CreateGameButton to="/create-game">Create Your First Game</CreateGameButton>
        </EmptyState>
      ) : (
        <>
          {isMockData && (
            <LoadingMessage>
              Showing sample data. Games created here will not be saved permanently.
            </LoadingMessage>
          )}
          <GameGrid>
            {games.map((game) => (
              <GameCard key={game._id} to={`/games/${game._id}`}>
                <GameTitle>{getGameTitle(game.name)}</GameTitle>
                <GameInfo>
                  <GameType>{getGameType(game)}</GameType>
                  <GameDate>
                    {game.metadata?.date 
                      ? formatDate(game.metadata.date) 
                      : formatDate(game.createdAt)}
                  </GameDate>
                  <GamePlayers>
                    {game.players.length} / {game.metadata?.maxPlayers || '∞'} players
                  </GamePlayers>
                </GameInfo>
              </GameCard>
            ))}
          </GameGrid>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard; 