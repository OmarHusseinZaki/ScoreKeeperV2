import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const ProfileSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
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

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
  
  &:hover {
    background-color: #357abD;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DangerButton = styled(Button)`
  background-color: #e74c3c;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #d4edda;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f8d7da;
  border-radius: 4px;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  font-weight: 500;
  color: #333;
`;

const StatValue = styled.span`
  color: #4a90e2;
  font-weight: 600;
`;

const Profile: React.FC = () => {
  const { user, updateProfile, changePassword, logout } = useAuth();
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Mock stats (would come from API in a real app)
  const stats = {
    gamesPlayed: 24,
    gamesWon: 15,
    gamesLost: 9,
    totalPoints: 187,
    averagePoints: 7.8,
  };
  
  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setProfileSuccess(null);
    setProfileError(null);
    
    if (!username || !email) {
      setProfileError('Username and email are required');
      return;
    }
    
    try {
      setProfileLoading(true);
      
      // In a real app, we would make an API call to update the profile
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the updateProfile function from AuthContext
      await updateProfile({ username, email });
      
      setProfileSuccess('Profile updated successfully');
    } catch (err) {
      setProfileError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setProfileLoading(false);
    }
  };
  
  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(null);
    setPasswordError(null);
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setPasswordLoading(true);
      
      // In a real app, we would make an API call to change the password
      // For now, we'll just simulate a successful password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the changePassword function from AuthContext
      await changePassword(currentPassword, newPassword);
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setPasswordSuccess('Password changed successfully');
    } catch (err) {
      setPasswordError('Failed to change password. Please check your current password and try again.');
      console.error('Error changing password:', err);
    } finally {
      setPasswordLoading(false);
    }
  };
  
  return (
    <ProfileContainer>
      <Title>Your Profile</Title>
      
      <ProfileSection>
        <SectionTitle>Profile Information</SectionTitle>
        
        {profileSuccess && <SuccessMessage>{profileSuccess}</SuccessMessage>}
        {profileError && <ErrorMessage>{profileError}</ErrorMessage>}
        
        <Form onSubmit={handleProfileUpdate}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          
          <Button type="submit" disabled={profileLoading}>
            {profileLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Form>
      </ProfileSection>
      
      <ProfileSection>
        <SectionTitle>Change Password</SectionTitle>
        
        {passwordSuccess && <SuccessMessage>{passwordSuccess}</SuccessMessage>}
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        
        <Form onSubmit={handlePasswordChange}>
          <FormGroup>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          
          <Button type="submit" disabled={passwordLoading}>
            {passwordLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </Form>
      </ProfileSection>
      
      <ProfileSection>
        <SectionTitle>Your Stats</SectionTitle>
        
        <StatItem>
          <StatLabel>Games Played</StatLabel>
          <StatValue>{stats.gamesPlayed}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Games Won</StatLabel>
          <StatValue>{stats.gamesWon}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Games Lost</StatLabel>
          <StatValue>{stats.gamesLost}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Win Rate</StatLabel>
          <StatValue>{Math.round((stats.gamesWon / stats.gamesPlayed) * 100)}%</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Total Points Scored</StatLabel>
          <StatValue>{stats.totalPoints}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Average Points per Game</StatLabel>
          <StatValue>{stats.averagePoints}</StatValue>
        </StatItem>
      </ProfileSection>
      
      <ProfileSection>
        <SectionTitle>Account Actions</SectionTitle>
        <DangerButton onClick={logout}>Logout</DangerButton>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default Profile; 