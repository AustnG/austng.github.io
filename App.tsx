import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MainLayout from './components/MainLayout';
import { ResumePage, PortfolioPage } from './components/ContentPages';
import NotFoundPage from './components/NotFoundPage';
import LostPage from './components/LostPage';
import SoccerTimelinePage from './components/SoccerTimelinePage';

const App: React.FC = () => {
  return (
    <div className="font-mono text-slate-300 min-h-screen min-h-[100dvh]">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<MainLayout />}>
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/soccer-timeline" element={<SoccerTimelinePage />} />
          </Route>
          <Route path="/lost" element={<LostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;