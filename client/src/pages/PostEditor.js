// PostEditor.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from '../logo.png';

const Header = styled.header`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;

const Button = styled.button`
  margin-left: 10px;
  border: 2px solid black;
  border-radius: 2px;
  background-color: black;
  color: white;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 2px solid black;
  border-radius: 5px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 3px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: black;
  border: none;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const PostEditor = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(3);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://10.12.11.194:5000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    let countdownInterval;
    if (showCountdown) {
      countdownInterval = setInterval(() => {
        setCountdownSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (countdownSeconds === 0) {
        window.location.href = '/';
      }
    }

    return () => clearInterval(countdownInterval);
  }, [showCountdown, countdownSeconds]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleWords = title.split(/\s+/);
    const contentWords = content.split(/\s+/);
    const totalWords = titleWords.length + contentWords.length;
    if (totalWords > 100) {
      setFeedback('Total words should not exceed 100');
      return;
    }
    try {
      const response = await axios.post('http://10.12.11.194:5000/posts', {
        title,
        content,
        author: username,
      });
      console.log(response.data);
      setFeedback('Message sent successfully');
      setShowPopup(true);
      setShowCountdown(true);
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('Failed to submit post:', error.response.data);
      setFeedback('Failed to send message');
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setShowCountdown(false);
    setCountdownSeconds(3);
  };

  return (
    <div>
      <Header>
        <Logo src={logo} alt="Logo" />
        <ButtonContainer>
          {isLoggedIn ? (
            <Button onClick={() => window.location.href = '/'}>Go to Main Page</Button>
          ) : (
            <Button onClick={() => setShowLogin(true)}>Login</Button>
          )}
        </ButtonContainer>
      </Header>
      <Popup>
        <Title>Create a New Post</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {isLoggedIn && <SubmitButton type="submit">Submit</SubmitButton>}
        </Form>
      </Popup>
      {showPopup && (
        <Overlay>
          <Popup>
            {feedback.includes('successfully') ? (
              <SuccessMessage>{feedback}</SuccessMessage>
            ) : (
              <ErrorMessage>{feedback}</ErrorMessage>
            )}
            {showCountdown && (
              <p>
                Redirecting to the main page in {countdownSeconds <= 0 ? 0 : countdownSeconds}... <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              </p>
            )}
          </Popup>
        </Overlay>
      )}
      {!isLoggedIn && (
        <Overlay>
          <Popup>
            <p>Please login to create a new post.</p>
            <Button onClick={() => window.location.href = '/'}>Go to Main Page to Login</Button>
          </Popup>
        </Overlay>
      )}

    </div>
  );
};

const formatTimeElapsed = (dateString) => {
  const postDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - postDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }
};

export default PostEditor;
