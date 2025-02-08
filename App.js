import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProfilePage from './components/ProfilePage';
import QuizPage from './components/QuizPage';
import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
