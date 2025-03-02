import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f5f7fa;
  border-top: 1px solid #eee;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.primary};
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 1.5rem 2rem 0;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.2rem;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Score Keeper</FooterTitle>
          <FooterText>
            Track scores for your games and competitions with ease.
          </FooterText>
          <FooterText>
            Create, join, and manage games across various sports.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/dashboard">Dashboard</FooterLink>
          <FooterLink to="/create-game">Create Game</FooterLink>
          <FooterLink to="/join-game">Join Game</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Account</FooterTitle>
          <FooterLink to="/login">Login</FooterLink>
          <FooterLink to="/register">Register</FooterLink>
          <FooterLink to="/profile">Profile</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterText>support@scorekeeper.com</FooterText>
          <FooterText>1-800-SCORE-KEEPER</FooterText>
          <FooterText>123 Game Street, Sports City</FooterText>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy; {currentYear} Score Keeper. All rights reserved.
        </Copyright>
        
        <SocialLinks>
          <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </SocialLink>
          <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </SocialLink>
          <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </SocialLink>
        </SocialLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 