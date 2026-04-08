import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeftIcon } from './Icons';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6">
       <header className="w-full max-w-3xl flex justify-between items-center mb-8">
            <Link 
              to="/" 
              className="p-2 rounded-full text-slate-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-900" 
              aria-label="Back to home"
            >
                <ArrowLeftIcon className="w-6 h-6" />
            </Link>
       </header>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;