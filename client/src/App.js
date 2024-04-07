import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Main';
import Editor from './PostEditor';
import Admin from './Admin';
import Profile from './Profile'; // Import the Profile component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PostEditor" element={<Editor />} />
        <Route path="/Adminsecret" element={<Admin />} />
        <Route path="/:username" element={<Profile />} /> {/* New profile route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
