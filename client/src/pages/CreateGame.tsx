import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Game types for selection
const gameTypes = [
  { id: 'basketball', name: 'Basketball' },
  { id: 'soccer', name: 'Soccer' },
  { id: 'volleyball', name: 'Volleyball' },
  { id: 'tennis', name: 'Tennis' },
  { id: 'pingpong', name: 'Ping Pong' },
  { id: 'custom', name: 'Custom Game' }
];

const CreateGameContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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

const SubmitButton = styled(Button)`
  background-color: #27ae60;
  color: white;
  
  &:hover {
    background-color: #219653;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f3f3f3;
  color: #333;
  
  &:hover {
    background-color: #e6e6e6;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f8d7da;
  border-radius: 4px;
`;

const GameTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const GameTypeCard = styled.div<{ selected: boolean }>`
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#4a90e2' : '#ddd'};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.selected ? '#f0f7ff' : 'white'};
  
  &:hover {
    border-color: #4a90e2;
  }
`;

const GameTypeName = styled.p`
  font-weight: 500;
  margin: 0;
`;

const CreateGame: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    gameTitle: '',
    gameType: '',
    gameDate: '',
    location: '',
    maxPlayers: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMockData, setIsMockData] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsMockData(false);
    
    // If user is not authenticated, show error and redirect to login
    if (!user || !token) {
      setError('Please log in to create a game.');
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    
    // Validate required fields
    if (!formData.gameTitle || !formData.gameType || !formData.gameDate) {
      setError('Game title, type, and date are required');
      setLoading(false);
      return;
    }

    try {
      // Create game data object
      const gameData = {
        name: `${formData.gameTitle} (${formData.gameType})`,
        metadata: {
          gameTitle: formData.gameTitle,
          gameType: formData.gameType,
          gameDate: formData.gameDate,
          location: formData.location,
          maxPlayers: formData.maxPlayers ? parseInt(formData.maxPlayers) : undefined,
          description: formData.description
        }
      };

      // Ensure we have the latest token from localStorage
      const currentToken = localStorage.getItem('authToken') || token;
      
      // Set up request configuration with authorization header
      const config = {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json'
        }
      };

      console.log('Sending request with token:', currentToken);
      
      // Create a new table (game) with the authorization config
      // Use axios default baseURL configured in AuthContext
      const response = await axios.post('/tables', gameData, config);

      // Check if the response contains mock data flag
      if (response.data._isMock) {
        setIsMockData(true);
        console.log('Game created with mock data:', response.data);
        // Show a message to the user that this is mock data
        alert('Game created locally. Since the server is unavailable, this game will not be saved permanently.');
      } else {
        console.log('Game created successfully:', response.data);
      }

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error creating game:', err);
      
      if (err.response) {
        setError(err.response.data.message || 'Failed to create game. Please try again.');
      } else if (err.request) {
        console.log('Server not responding. Creating game with mock data.');
        setIsMockData(true);
        
        // Simulate successful creation with mock data
        setTimeout(() => {
          alert('Game created locally. Since the server is unavailable, this game will not be saved permanently.');
          navigate('/dashboard');
        }, 1000);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };
  
  return (
    <CreateGameContainer>
      <Title>Create New Game</Title>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="gameTitle">Game Title *</Label>
          <Input
            type="text"
            id="gameTitle"
            name="gameTitle"
            value={formData.gameTitle}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Game Type *</Label>
          <GameTypeGrid>
            {gameTypes.map(type => (
              <GameTypeCard
                key={type.id}
                selected={formData.gameType === type.id}
                onClick={() => setFormData(prev => ({ ...prev, gameType: type.id }))}
              >
                <GameTypeName>{type.name}</GameTypeName>
              </GameTypeCard>
            ))}
          </GameTypeGrid>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="gameDate">Game Date *</Label>
          <Input
            type="date"
            id="gameDate"
            name="gameDate"
            value={formData.gameDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="maxPlayers">Maximum Players</Label>
          <Input
            type="number"
            id="maxPlayers"
            name="maxPlayers"
            value={formData.maxPlayers}
            onChange={handleChange}
            min="2"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about your game..."
          />
        </FormGroup>
        
        <ButtonGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Game'}
          </SubmitButton>
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </CreateGameContainer>
  );
};

export default CreateGame; 