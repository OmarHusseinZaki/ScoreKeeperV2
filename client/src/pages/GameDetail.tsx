import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

// Mock game data (will be replaced with API calls)
const mockGame = {
  id: 1,
  title: 'Basketball Game',
  type: 'basketball',
  date: '2023-06-15',
  location: 'City Park Court',
  maxPlayers: 10,
  description: 'Friendly basketball game at the city park. All skill levels welcome!',
  createdBy: 'user123',
  players: [
    { id: 'user123', username: 'JohnDoe', score: 15 },
    { id: 'user456', username: 'JaneSmith', score: 12 },
    { id: 'user789', username: 'MikeJohnson', score: 8 },
  ],
  status: 'in_progress', // 'scheduled', 'in_progress', 'completed'
};

const GameDetailContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const GameInfo = styled.div`
  flex: 1;
`;

const GameTitle = styled.h1`
  color: #333;
  margin-bottom: 0.5rem;
`;

const GameMeta = styled.div`
  color: #666;
  margin-bottom: 1rem;
`;

const MetaItem = styled.p`
  margin: 0.3rem 0;
`;

const GameDescription = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const PrimaryButton = styled(Button)`
  background-color: #4a90e2;
  color: white;
  
  &:hover {
    background-color: #357abD;
  }
`;

const DangerButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #f3f3f3;
  color: #333;
  
  &:hover {
    background-color: #e6e6e6;
  }
`;

const Section = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const ScoreboardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ScoreboardHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  padding: 1rem;
  background-color: #f3f3f3;
  font-weight: 600;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr 80px 80px;
  }
`;

const ScoreboardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr 80px 80px;
  }
`;

const PlayerName = styled.div`
  font-weight: 500;
`;

const ScoreCell = styled.div`
  text-align: center;
`;

const ScoreControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const ScoreButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #357abD;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const MinusButton = styled(ScoreButton)`
  background-color: #e74c3c;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 1rem;
  
  ${props => {
    switch(props.status) {
      case 'scheduled':
        return `
          background-color: #f39c12;
          color: white;
        `;
      case 'in_progress':
        return `
          background-color: #2ecc71;
          color: white;
        `;
      case 'completed':
        return `
          background-color: #3498db;
          color: white;
        `;
      default:
        return `
          background-color: #95a5a6;
          color: white;
        `;
    }
  }}
`;

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [game, setGame] = useState(mockGame);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // In a real app, we would fetch game data from an API
  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setGame(mockGame);
      } catch (err) {
        setError('Failed to load game details');
        console.error('Error fetching game:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGame();
  }, [id]);
  
  const handleScoreChange = (playerId: string, increment: boolean) => {
    setGame(prevGame => {
      const updatedPlayers = prevGame.players.map(player => {
        if (player.id === playerId) {
          return {
            ...player,
            score: increment ? player.score + 1 : Math.max(0, player.score - 1)
          };
        }
        return player;
      });
      
      return {
        ...prevGame,
        players: updatedPlayers
      };
    });
  };
  
  const handleStartGame = () => {
    setGame(prevGame => ({
      ...prevGame,
      status: 'in_progress'
    }));
  };
  
  const handleEndGame = () => {
    setGame(prevGame => ({
      ...prevGame,
      status: 'completed'
    }));
  };
  
  const handleDeleteGame = () => {
    // In a real app, we would make an API call to delete the game
    // For now, we'll just navigate back to the dashboard
    navigate('/dashboard');
  };
  
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'scheduled': return 'Scheduled';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };
  
  if (loading) {
    return <div>Loading game details...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  const isGameCreator = user?._id === game.createdBy;
  const canModifyScores = game.status === 'in_progress' && isGameCreator;
  const canStartGame = game.status === 'scheduled' && isGameCreator;
  const canEndGame = game.status === 'in_progress' && isGameCreator;
  
  return (
    <GameDetailContainer>
      <GameHeader>
        <GameInfo>
          <GameTitle>
            {game.title}
            <StatusBadge status={game.status}>
              {getStatusLabel(game.status)}
            </StatusBadge>
          </GameTitle>
          
          <GameMeta>
            <MetaItem><strong>Date:</strong> {game.date}</MetaItem>
            <MetaItem><strong>Location:</strong> {game.location || 'Not specified'}</MetaItem>
            <MetaItem><strong>Game Type:</strong> {game.type}</MetaItem>
            <MetaItem><strong>Players:</strong> {game.players.length} / {game.maxPlayers || 'Unlimited'}</MetaItem>
          </GameMeta>
          
          {game.description && (
            <GameDescription>
              <p>{game.description}</p>
            </GameDescription>
          )}
        </GameInfo>
        
        {isGameCreator && (
          <ActionButtons>
            {canStartGame && (
              <PrimaryButton onClick={handleStartGame}>
                Start Game
              </PrimaryButton>
            )}
            
            {canEndGame && (
              <PrimaryButton onClick={handleEndGame}>
                End Game
              </PrimaryButton>
            )}
            
            <DangerButton onClick={handleDeleteGame}>
              Delete Game
            </DangerButton>
          </ActionButtons>
        )}
      </GameHeader>
      
      <Section>
        <SectionTitle>Scoreboard</SectionTitle>
        
        <ScoreboardContainer>
          <ScoreboardHeader>
            <div>Player</div>
            <ScoreCell>Score</ScoreCell>
            <ScoreCell>Actions</ScoreCell>
          </ScoreboardHeader>
          
          {game.players.map(player => (
            <ScoreboardRow key={player.id}>
              <PlayerName>{player.username}</PlayerName>
              <ScoreCell>{player.score}</ScoreCell>
              <ScoreCell>
                {canModifyScores && (
                  <ScoreControls>
                    <MinusButton
                      onClick={() => handleScoreChange(player.id, false)}
                      disabled={player.score <= 0}
                    >
                      -
                    </MinusButton>
                    <ScoreButton
                      onClick={() => handleScoreChange(player.id, true)}
                    >
                      +
                    </ScoreButton>
                  </ScoreControls>
                )}
              </ScoreCell>
            </ScoreboardRow>
          ))}
        </ScoreboardContainer>
      </Section>
    </GameDetailContainer>
  );
};

export default GameDetail; 