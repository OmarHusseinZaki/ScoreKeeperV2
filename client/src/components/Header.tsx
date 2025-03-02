import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  margin-left: 1.5rem;
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${props => props.$active ? '500' : '400'};
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  margin-left: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: ${props => props.theme.colors.text.primary};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ProfileButton = styled(Link)`
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-right: 0.5rem;
`;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">Score Keeper</Logo>
        
        <Nav>
          {user ? (
            // Authenticated navigation
            <>
              <NavLink to="/dashboard" $active={isActive('/dashboard')}>
                Dashboard
              </NavLink>
              <NavLink to="/join-game" $active={isActive('/join-game')}>
                Join Game
              </NavLink>
              <NavLink to="/create-game" $active={isActive('/create-game')}>
                Create Game
              </NavLink>
              <ProfileButton to="/profile">
                <Avatar>{user.username ? getInitials(user.username) : 'U'}</Avatar>
                {user.username}
              </ProfileButton>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            // Unauthenticated navigation
            <>
              <NavLink to="/login" $active={isActive('/login')}>
                Login
              </NavLink>
              <NavLink to="/register" $active={isActive('/register')}>
                Register
              </NavLink>
            </>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 