import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { PortfolioView } from './components/PortfolioView';
import { ResumeView } from './components/ResumeView';
import { LostItemView } from './components/LostItemView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Sync initial tab based on window path or hash if exported statically (e.g. /portfolio.html, /resume.html, /found.html, /lost.html)
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('portfolio') || hash.includes('portfolio')) {
      setActiveTab('portfolio');
    } else if (path.includes('resume') || hash.includes('resume')) {
      setActiveTab('resume');
    } else if (path.includes('found') || path.includes('lost') || hash.includes('found') || hash.includes('lost')) {
      setActiveTab('found');
    }
  }, []);

  // Standalone page for Lost Item Tag QR Code scans
  if (activeTab === 'found') {
    return <LostItemView />;
  }

  return (
    <div className="min-h-screen bg-[#111112] text-[#e8e8e6] font-inter flex flex-col antialiased">
      <div className="max-w-[900px] w-full mx-auto px-6 sm:px-8 min-h-screen flex flex-col justify-between">
        {/* NAVBAR */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* MAIN VIEW CONTENT */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'home' && (
            <HomeView setActiveTab={setActiveTab} />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioView />
          )}

          {activeTab === 'resume' && (
            <ResumeView />
          )}
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
