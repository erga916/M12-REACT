import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './services/LoginPage';
import HomePage from './services/HomePage'; // Asegúrate de crear este componente
import { UserProvider } from './contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}
