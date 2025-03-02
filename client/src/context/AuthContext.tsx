import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Set axios default base URL from environment variable
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Define types for user and auth context
interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  changePassword: async () => {},
  clearError: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      console.log('Found stored token and user data');
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    } else {
      console.log('No stored authentication data found');
    }
    
    setInitializing(false);
  }, []);

  const clearError = () => {
    setError(null);
  };

  // Login function
  const login = async (email: string, password: string) => {
    clearError();
    setLoading(true);
    
    try {
      let userData;
      let authToken;
      
      // Try to use the API first
      try {
        console.log('Attempting to login with API');
        // Make a real API call to the backend
        const response = await axios.post('/auth/login', { email, password });
        
        authToken = response.data.token;
        userData = {
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email
        };
        console.log('API login successful');
      } catch (apiError) {
        // If API fails, use mock data for development
        console.log('API call failed, using mock data');
        
        // Mock login for development
        if (email === 'user@example.com' && password === 'password') {
          userData = {
            _id: 'mock123',
            username: 'TestUser',
            email: 'user@example.com'
          };
          // Generate a more realistic mock JWT token
          authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1vY2sxMjMiLCJpYXQiOjE2MTY1MTY4MDAsImV4cCI6MTYxOTEwODgwMH0.mock-signature';
          console.log('Mock login successful');
        } else {
          throw new Error('Invalid email or password');
        }
      }
      
      // Store the token and user data
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Auth data stored in localStorage');
      
      // Set the user in state
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    clearError();
    setLoading(true);
    
    try {
      let userData;
      let authToken;
      
      // Try to use the API first
      try {
        console.log('Attempting to register with API');
        // Make a real API call to the backend
        const response = await axios.post('/auth/register', { username, email, password });
        
        authToken = response.data.token;
        userData = {
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email
        };
        console.log('API registration successful');
      } catch (apiError) {
        // If API fails, use mock data for development
        console.log('API call failed, using mock data');
        
        // Mock registration for development
        userData = {
          _id: 'mock' + Math.floor(Math.random() * 1000),
          username,
          email
        };
        // Generate a more realistic mock JWT token
        authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1vY2sxMjMiLCJpYXQiOjE2MTY1MTY4MDAsImV4cCI6MTYxOTEwODgwMH0.mock-signature';
        console.log('Mock registration successful');
      }
      
      // Store the token and user data
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Auth data stored in localStorage');
      
      // Set the user in state
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out user');
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Clear state
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    // Clear axios header
    delete axios.defaults.headers.common['Authorization'];
    
    console.log('User logged out successfully');
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = {
          ...user,
          ...userData
        };
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while updating profile');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Change password function
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation of current password
      if (currentPassword !== 'password') {
        throw new Error('Current password is incorrect');
      }
      
      // Password change successful (in a real app, we would update the password on the server)
      console.log('Password changed successfully');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while changing password');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Provide the auth context to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        clearError,
      }}
    >
      {!initializing && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 