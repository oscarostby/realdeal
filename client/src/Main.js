// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const BitterUser = styled.h2`
  text-align: center;
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    color: gray;
  }
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const SpacedInput = styled.input`
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid ${props => (props.error ? 'red' : 'black')};
  border-radius: 3px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -15px;
  height: 20px; /* Fixed height */
  overflow: hidden; /* Hide overflow */
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

const PostBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostBox = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  height: 400px;
  width: 70%;
  max-width: 1000px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const PostTitle = styled.h3`
  font-weight: bold;
  margin: 0;
  font-size: 24px;
`;

const PostContent = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

const PostAuthor = styled.p`
  text-align: right;
  font-size: 12px;
`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackLocal, setFeedbackLocal] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error.response.data);
      }
    };

    fetchUsers();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error.response.data);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleRegister = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      console.log(response.data);
      setFeedback('User registered successfully');
      setShowRegister(false);
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setFeedbackLocal(error.response.data.error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const existingUser = users.find(user => user.username === username);
      if (!existingUser) {
        throw new Error('User not found. Please register first.');
      }

      localStorage.setItem('user', username);
      setIsLoggedIn(true);
      setUsername(username);
      setFeedback('');
      setFeedbackLocal('');
      setShowLogin(false);
    } catch (error) {
      setFeedback('');
      setShowLogin(true);
      setFeedbackLocal(error.message);
    }
  };

  const handleMakePost = () => {
    navigate('/PostEditor');
  };

  const LoginPopup = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await handleLogin(username, password);
        setUsername('');
        setPassword('');
      } catch (error) {
        // Do nothing here, as we don't want to show feedback for incorrect login attempts
      }
    };

    return (
      <Popup>
        <CloseButton onClick={() => setShowLogin(false)}>X</CloseButton>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <SpacedInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <SpacedInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {feedbackLocal && <ErrorMessage>{feedbackLocal}</ErrorMessage>}
          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
      </Popup>
    );
  };

  const RegisterPopup = ({ handleRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await handleRegister(username, password);
        setUsername('');
        setPassword('');
      } catch (error) {
        // Do nothing here, as we don't want to show feedback for registration attempts
      }
    };

    return (
      <Popup>
        <CloseButton onClick={() => setShowRegister(false)}>X</CloseButton>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit}>
          <SpacedInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <SpacedInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {feedbackLocal && <ErrorMessage>{feedbackLocal}</ErrorMessage>}
          <SubmitButton type="submit">Register</SubmitButton>
        </Form>
      </Popup>
    );
  };

  return (
    <div>
      <Header>
        <Logo src={logo} alt="Logo" />
        <ButtonContainer>
          {isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button onClick={() => setShowLogin(true)}>Login</Button>
              <Button onClick={() => setShowRegister(true)}>Register</Button>
            </>
          )}
        </ButtonContainer>
      </Header>
      <BitterUser>
        {isLoggedIn ? `Bitter - ${username}` : 'Bitter'}
      </BitterUser>
      {isLoggedIn && (
        <Button onClick={handleMakePost}>Make a Post</Button>
      )}
      {showLogin && <LoginPopup handleLogin={handleLogin} />}
      {showRegister && <RegisterPopup handleRegister={handleRegister} />}
      <PostBoxContainer>
        <h3>Posts:</h3>
        {posts.map((post, index) => (
          <PostBox key={index}>
            <PostHeader>
              <div>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
              </div>
              <PostAuthor>Author: {post.author}</PostAuthor>
            </PostHeader>
          </PostBox>
        ))}
      </PostBoxContainer>
      {(feedback || feedbackLocal) && (
        <ErrorMessage>{feedback || feedbackLocal}</ErrorMessage>
      )}
    </div>
  );
};

export default App;
