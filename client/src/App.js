import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedback, setFeedback] = useState('');

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

  const handleLogout = () => {
    // Add code to log out the user here
    setIsLoggedIn(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error.response.data);
    }
  };

  const handleRegister = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      console.log(response.data);
      setFeedback('User registered successfully');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setFeedback(error.response.data.error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Logged in as: [Username]</h2> {/* Add the username of the logged-in user */}
          <button onClick={handleLogout}>Logout</button>
          <h3>Users:</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.username}
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <Login setIsLoggedIn={setIsLoggedIn} />
          <Register handleRegister={handleRegister} />
        </div>
      )}
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default App;
