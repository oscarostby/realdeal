import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Main';
import Editor from './pages/PostEditor';
import Admin from './pages/Admin';
import Profile from './pages/Profile'; // Import the Profile component
import Help from './pages/help'; // Import the Profile component


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PostEditor" element={<Editor />} />
        <Route path="/Adminsecret" element={<Admin />} />
        <Route path="/:username" element={<Profile />} /> {/* New profile route */}
        <Route path="/help" element={<Help />} /> {/* New profile route */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
