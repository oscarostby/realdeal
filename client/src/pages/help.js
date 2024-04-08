import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HelpPageContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 28px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
`;

const Step = styled.div`
  margin-bottom: 15px;
  color: #555;
  font-size: 18px;
  border-left: 3px solid #ccc;
  padding-left: 10px;
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const FancyBorder = styled.div`
  border: 3px dashed #ccc;
  padding: 30px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SparkleAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
`;

const Sparkle = styled.span`
  display: inline-block;
  position: absolute;
  top: -20px;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  animation: ${SparkleAnimation} 0.5s alternate infinite ease-in-out;
`;

const Help = () => {
  return (
    <HelpPageContainer>
      <Section>
        <SectionTitle>
          How to <Sparkle /> Get Started:
        </SectionTitle>
        <FancyBorder>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>1.</span> Log in using your username and password. If you don't
            have an account, click on the "Register" button to create one.
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>2.</span> After logging in, navigate to the "Make a Post" section
            to create a new post.
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>3.</span> To view your own posts, go to your user profile by
            clicking on your username in the header.
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>4.</span> In your user profile, you can delete your own posts by
            clicking on the "Delete" button next to each post.
          </Step>
        </FancyBorder>
      </Section>

      <Section>
        <SectionTitle>Common Errors:</SectionTitle>
        <FancyBorder>
          <Step>
            <span style={{ fontWeight: 'bold' }}>Error:</span> Invalid username or password. <Sparkle />
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold' }}>Error:</span> Unable to create post. <Sparkle />
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold' }}>Error:</span> Posts not loading. <Sparkle />
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold' }}>Error:</span> Unable to delete post. <Sparkle />
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold' }}>Error:</span> Unable to log out. <Sparkle />
          </Step>
        </FancyBorder>
      </Section>

      <Section>
        <SectionTitle>Guidance:</SectionTitle>
        <FancyBorder>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Resolution:</span> Make sure you entered the correct username and
            password. If you don't have an account, register a new one.
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Resolution:</span> Ensure that both the title and content fields are
            filled. If the issue persists, try refreshing the page or logging out and logging back in.
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Resolution:</span> Check your internet connection and try refreshing
            the page. If the issue persists, contact support for further assistance.
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Resolution:</span> Ensure that you are logged in and viewing your own
            profile. If the issue persists, try refreshing the page or logging out and logging back in.
          </Step>
          <Step>
            <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Resolution:</span> Try refreshing the page or clearing your browser's
            cache and cookies. If the issue persists, contact support for further assistance.
          </Step>
        </FancyBorder>
      </Section>
    </HelpPageContainer>
  );
};

export default Help;
