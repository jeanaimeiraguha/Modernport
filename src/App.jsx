import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PortfolioPage from './PortfolioPage';
import NotFoundPage from './NotFoundPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
