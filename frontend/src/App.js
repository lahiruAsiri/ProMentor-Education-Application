// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasePage from './pages/BasePage'; // Import the new BasePage component
import OutputPage from './components/OutputPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the new BasePage */}
        <Route path="/" element={<BasePage />} />
        
        {/* Route for the OutputPage */}
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </Router>
  );
}

export default App;
