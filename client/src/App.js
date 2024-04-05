// App.js
import React from 'react';
import Login from './login';
import Register from './register';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    // Legg til kode for å logge ut brukeren her
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Logged in as: [Brukernavn]</h2> {/* Legg til brukernavnet for pålogget bruker */}
          <button onClick={handleLogout}>Logout</button>
          <h3>Users:</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <Login setIsLoggedIn={setIsLoggedIn} />
          <Register />
        </div>
      )}
    </div>
  );
};

export default App;