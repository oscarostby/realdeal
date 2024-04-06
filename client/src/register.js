import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ handleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setFeedback(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Register;
