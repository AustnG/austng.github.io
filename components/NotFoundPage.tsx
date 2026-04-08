import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 text-slate-300">
      <h1 className="text-6xl font-bold text-slate-100">404</h1>
      <p className="mt-4 text-xl text-slate-400">Oops! Looks like you're lost.</p>
      <p className="mt-2 text-slate-500">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-8 px-4 py-2 bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 transition-colors duration-200">
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;