// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SenderForm from './pages/ShareForm';
import SharePage from './pages/SharePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SenderForm />} />
        <Route path="/share/:shareId" element={<SharePage />} />
      </Routes>
    </Router>
  );
}

export default App;
