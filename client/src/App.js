import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './Components/SignUpPage';
import HomePage from './Components/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path='/home/:role/:email' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
