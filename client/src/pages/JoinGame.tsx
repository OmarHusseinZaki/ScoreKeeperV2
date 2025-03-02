import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

// Mock data for available games (will be replaced with API calls)
const mockAvailableGames = [
  { id: 4, title: 'Weekend Soccer Match', type: 'soccer', date: '2023-07-10', location: 'Community Field', players: 14, maxPlayers: 22 },
  { id: 5, title: 'Tennis Tournament', type: 'tennis', date: '2023-07-15', location: 'Tennis Club', players: 4, maxPlayers: 8 },
  { id: 6, title: 'Volleyball at the Beach', type: 'volleyball', date: '2023-07-20', location: 'Beach Court', players: 8, maxPlayers: 12 },
];

const JoinGameContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

const SearchSection = styled.div`
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const FilterSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const SearchButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #357abD;
  }
`;

const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const GameCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const GameHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const GameTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const GameType = styled.span`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background-color: #f0f7ff;
  color: #4a90e2;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const GameInfo = styled.div`
  padding: 1.5rem;
`;

const InfoItem = styled.p`
  margin: 0.3rem 0;
  color: #666;
`;

const PlayerCount = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  margin-right: 1rem;
  overflow: hidden;
`;

const Progress = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => {
    if (props.percentage < 50) return '#2ecc71';
    if (props.percentage < 80) return '#f39c12';
    return '#e74c3c';
  }};
`;

const CountText = styled.span`
  font-weight: 500;
`;

const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JoinButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #219653;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ViewButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f3f3f3;
  color: #333;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e6e6e6;
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

const JoinGame: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [gameTypeFilter, setGameTypeFilter] = useState('');
  const [availableGames, setAvailableGames] = useState(mockAvailableGames);
  const [filteredGames, setFilteredGames] = useState(mockAvailableGames);
  const [loading, setLoading] = useState(false);
  
  // In a real app, we would fetch available games from an API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setAvailableGames(mockAvailableGames);
        setFilteredGames(mockAvailableGames);
      } catch (err) {
        console.error('Error fetching available games:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, []);
  
  // Filter games based on search term and game type
  useEffect(() => {
    const filtered = availableGames.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = gameTypeFilter ? game.type === gameTypeFilter : true;
      
      return matchesSearch && matchesType;
    });
    
    setFilteredGames(filtered);
  }, [searchTerm, gameTypeFilter, availableGames]);
  
  const handleSearch = () => {
    // In a real app, we might make an API call with the search parameters
    // For now, we're just using the client-side filtering in the useEffect above
  };
  
  const handleJoinGame = (gameId: number) => {
    // In a real app, we would make an API call to join the game
    // For now, we'll just navigate to the game detail page
    navigate(`/games/${gameId}`);
  };
  
  const handleViewGame = (gameId: number) => {
    navigate(`/games/${gameId}`);
  };
  
  return (
    <JoinGameContainer>
      <Title>Join a Game</Title>
      
      <SearchSection>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by game title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <FilterSelect
            value={gameTypeFilter}
            onChange={(e) => setGameTypeFilter(e.target.value)}
          >
            <option value="">All Game Types</option>
            <option value="basketball">Basketball</option>
            <option value="soccer">Soccer</option>
            <option value="volleyball">Volleyball</option>
            <option value="tennis">Tennis</option>
            <option value="pingpong">Ping Pong</option>
          </FilterSelect>
          
          <SearchButton onClick={handleSearch}>
            Search
          </SearchButton>
        </SearchBar>
      </SearchSection>
      
      {loading ? (
        <p>Loading available games...</p>
      ) : filteredGames.length > 0 ? (
        <GamesList>
          {filteredGames.map(game => {
            const playerPercentage = (game.players / game.maxPlayers) * 100;
            const isFull = game.players >= game.maxPlayers;
            
            return (
              <GameCard key={game.id}>
                <GameHeader>
                  <GameTitle>{game.title}</GameTitle>
                  <GameType>{game.type}</GameType>
                </GameHeader>
                
                <GameInfo>
                  <InfoItem><strong>Date:</strong> {game.date}</InfoItem>
                  <InfoItem><strong>Location:</strong> {game.location}</InfoItem>
                  
                  <PlayerCount>
                    <ProgressBar>
                      <Progress percentage={playerPercentage} />
                    </ProgressBar>
                    <CountText>
                      {game.players}/{game.maxPlayers}
                    </CountText>
                  </PlayerCount>
                </GameInfo>
                
                <CardFooter>
                  <ViewButton onClick={() => handleViewGame(game.id)}>
                    View Details
                  </ViewButton>
                  
                  <JoinButton
                    onClick={() => handleJoinGame(game.id)}
                    disabled={isFull}
                  >
                    {isFull ? 'Full' : 'Join Game'}
                  </JoinButton>
                </CardFooter>
              </GameCard>
            );
          })}
        </GamesList>
      ) : (
        <EmptyState>
          <EmptyStateText>No games found matching your criteria.</EmptyStateText>
          <SearchButton onClick={() => {
            setSearchTerm('');
            setGameTypeFilter('');
          }}>
            Clear Filters
          </SearchButton>
        </EmptyState>
      )}
    </JoinGameContainer>
  );
};

export default JoinGame; 