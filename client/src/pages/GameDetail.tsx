import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Player {
  name: string;
  score: number;
}

interface Game {
  _id: string;
  name: string;
  gameId: string;
  owner: {
    _id: string;
    username: string;
  };
  players: Player[];
  isActive: boolean;
}

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tables/${id}`);
        setGame(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch game');
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!game) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/tables/${game._id}/players`, {
        name: newPlayerName
      });
      setGame(response.data);
      setNewPlayerName('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add player');
    }
  };

  const handleUpdateScore = async (playerIndex: number, newScore: number) => {
    if (!game) return;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/tables/${game._id}/players/${playerIndex}/score`,
        { score: newScore }
      );
      setGame(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update score');
    }
  };

  const handleRemovePlayer = async (playerIndex: number) => {
    if (!game) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/tables/${game._id}/players/${playerIndex}`
      );
      setGame(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove player');
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;
  if (!game) return <Container>Game not found</Container>;

  return (
    <Container>
      <Header>
        <div>
          <h1>{game.name}</h1>
          <GameInfo>
            <p>Game ID: {game.gameId}</p>
            <p>Created by: {game.owner.username}</p>
            <p>Status: {game.isActive ? 'Active' : 'Inactive'}</p>
          </GameInfo>
        </div>
        <ShareButton onClick={() => {
          navigator.clipboard.writeText(game.gameId);
          alert('Game ID copied to clipboard!');
        }}>
          Share Game ID
        </ShareButton>
      </Header>

      <Section>
        <h2>Add Player</h2>
        <AddPlayerForm onSubmit={handleAddPlayer}>
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            required
          />
          <button type="submit">Add Player</button>
        </AddPlayerForm>
      </Section>

      <Section>
        <h2>Players</h2>
        {game.players.length === 0 ? (
          <EmptyState>No players yet. Add some players to start keeping score!</EmptyState>
        ) : (
          <PlayersList>
            {game.players.map((player, index) => (
              <PlayerCard key={index}>
                <PlayerInfo>
                  <PlayerName>{player.name}</PlayerName>
                  <ScoreControls>
                    <ScoreButton onClick={() => handleUpdateScore(index, player.score - 1)}>
                      -
                    </ScoreButton>
                    <Score>{player.score}</Score>
                    <ScoreButton onClick={() => handleUpdateScore(index, player.score + 1)}>
                      +
                    </ScoreButton>
                  </ScoreControls>
                </PlayerInfo>
                <RemoveButton onClick={() => handleRemovePlayer(index)}>
                  Remove
                </RemoveButton>
              </PlayerCard>
            ))}
          </PlayersList>
        )}
      </Section>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;

  h1 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
  }
`;

const GameInfo = styled.div`
  p {
    margin: 0.5rem 0;
    color: #7f8c8d;
  }
`;

const ShareButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Section = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 1.5rem 0;
    color: #2c3e50;
  }
`;

const AddPlayerForm = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }

  button {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background-color: #27ae60;
    }
  }
`;

const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PlayerCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 5px;
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const PlayerName = styled.span`
  font-weight: bold;
  color: #2c3e50;
  min-width: 150px;
`;

const ScoreControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Score = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  min-width: 40px;
  text-align: center;
`;

const ScoreButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

const EmptyState = styled.p`
  text-align: center;
  color: #7f8c8d;
  font-size: 1.1rem;
`;

export default GameDetail; 