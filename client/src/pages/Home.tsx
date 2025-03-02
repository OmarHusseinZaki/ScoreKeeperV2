import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding-right: 2rem;
  
  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  
  &:hover {
    background-color: #357abD;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  
  &:hover {
    background-color: #f0f7ff;
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.text.primary};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0f7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const TestimonialsSection = styled.section`
  margin-bottom: 4rem;
  background-color: #f9f9f9;
  padding: 4rem 2rem;
  border-radius: 8px;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const TestimonialText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f7ff;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.p`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const AuthorRole = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const CTASection = styled.section`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 4rem 2rem;
  border-radius: 8px;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f0f7ff;
    transform: translateY(-2px);
  }
`;

const Home: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Track Scores with Ease</HeroTitle>
          <HeroSubtitle>
            Score Keeper helps you track scores for any game or competition. Create games, invite friends, and keep track of everyone's performance in real-time.
          </HeroSubtitle>
          <ButtonGroup>
            {user ? (
              <PrimaryButton to="/dashboard">Go to Dashboard</PrimaryButton>
            ) : (
              <>
                <PrimaryButton to="/register">Get Started</PrimaryButton>
                <SecondaryButton to="/login">Login</SecondaryButton>
              </>
            )}
          </ButtonGroup>
        </HeroContent>
        <HeroImage>
          <img src="/images/hero-image.jpg" alt="Score Keeper App" />
        </HeroImage>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>Features</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🎮</FeatureIcon>
            <FeatureTitle>Create Games</FeatureTitle>
            <FeatureDescription>
              Create custom games for any sport or activity. Set up player lists, scoring rules, and more.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Real-time Scoring</FeatureTitle>
            <FeatureDescription>
              Update scores in real-time during games. Everyone stays up to date with the latest standings.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Invite Players</FeatureTitle>
            <FeatureDescription>
              Invite friends to join your games. They can view scores and track their own performance.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Mobile Friendly</FeatureTitle>
            <FeatureDescription>
              Access Score Keeper from any device. Our responsive design works on desktop, tablet, and mobile.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📈</FeatureIcon>
            <FeatureTitle>Statistics</FeatureTitle>
            <FeatureDescription>
              View detailed statistics for players and games. Track performance over time with visual charts.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🏆</FeatureIcon>
            <FeatureTitle>Leaderboards</FeatureTitle>
            <FeatureDescription>
              See who's on top with customizable leaderboards. Filter by game type, date range, and more.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <TestimonialsSection>
        <SectionTitle>What Our Users Say</SectionTitle>
        <TestimonialGrid>
          <TestimonialCard>
            <TestimonialText>
              "Score Keeper has revolutionized how our basketball league tracks games. No more paper scoresheets or Excel files!"
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>JD</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>John Doe</AuthorName>
                <AuthorRole>Basketball League Organizer</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              "I use Score Keeper for our family game nights. It's so easy to keep track of who's winning at Monopoly now!"
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>JS</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Jane Smith</AuthorName>
                <AuthorRole>Family Game Night Host</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              "As a tennis coach, I needed a simple way to track my students' progress. Score Keeper is perfect for this!"
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>RJ</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Robert Johnson</AuthorName>
                <AuthorRole>Tennis Coach</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialsSection>
      
      <CTASection>
        <CTATitle>Ready to Start Keeping Score?</CTATitle>
        <CTADescription>
          Join thousands of users who are already tracking their games with Score Keeper. It's free to get started!
        </CTADescription>
        {user ? (
          <CTAButton to="/dashboard">Go to Dashboard</CTAButton>
        ) : (
          <CTAButton to="/register">Sign Up Now</CTAButton>
        )}
      </CTASection>
    </HomeContainer>
  );
};

export default Home; 