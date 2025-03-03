import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Game {
  _id: string;
  name: string;
  gameId: string;
  owner: {
    _id: string;
    username: string;
  };
  players: {
    name: string;
    score: number;
  }[];
  isActive: boolean;
  createdAt: string;
}

const Dashboard = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gameId, setGameId] = useState('');
  const [joinError, setJoinError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tables`);
        setGames(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch games');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleJoinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/tables/join/${gameId}`);
      navigate(`/games/${response.data._id}`);
    } catch (err: any) {
      setJoinError(err.response?.data?.message || 'Failed to join game');
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <Header>
        <h1>Welcome, {user?.username}!</h1>
        <CreateGameButton to="/create-game">Create New Game</CreateGameButton>
      </Header>

      <JoinGameSection>
        <h2>Join a Game</h2>
        <JoinGameForm onSubmit={handleJoinGame}>
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Enter Game ID"
            required
          />
          <button type="submit">Join Game</button>
        </JoinGameForm>
        {joinError && <ErrorMessage>{joinError}</ErrorMessage>}
      </JoinGameSection>

      <GamesSection>
        <h2>Your Games</h2>
        {games.length === 0 ? (
          <EmptyState>No games found. Create a new game or join an existing one!</EmptyState>
        ) : (
          <GamesList>
            {games.map((game) => (
              <GameCard key={game._id}>
                <GameInfo>
                  <h3>{game.name}</h3>
                  <p>Game ID: {game.gameId}</p>
                  <p>Created by: {game.owner.username}</p>
                  <p>Players: {game.players.length}</p>
                  <p>Status: {game.isActive ? 'Active' : 'Inactive'}</p>
                </GameInfo>
                <ViewButton onClick={() => navigate(`/games/${game._id}`)}>
                  View Game
                </ViewButton>
              </GameCard>
            ))}
          </GamesList>
        )}
      </GamesSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    margin: 0;
    color: #2c3e50;
  }
`;

const CreateGameButton = styled(Link)`
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const JoinGameSection = styled.section`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
  }
`;

const JoinGameForm = styled.form`
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

const ErrorMessage = styled.p`
  color: #e74c3c;
  margin: 0.5rem 0 0 0;
`;

const EmptyState = styled.p`
  text-align: center;
  color: #7f8c8d;
  font-size: 1.1rem;
  margin: 2rem 0;
`;

const GamesSection = styled.section`
  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
`;

const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const GameCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GameInfo = styled.div`
  h3 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
  }

  p {
    margin: 0.5rem 0;
    color: #7f8c8d;
  }
`;

const ViewButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

export default Dashboard; 