import React from 'react';

const LostPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 font-mono text-slate-300">
      <main className="max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6">
          THIS ITEM HAS BEEN LOST
        </h1>
        <p className="text-base sm:text-lg text-slate-400 mb-8">
          Please contact AUSTIN GREER
          <br />
          to arrange the return of this item.
        </p>
        <div className="space-y-4 text-base sm:text-lg">
          <p>
            <span className="font-semibold">Text or Call:</span>{' '}
            <a href="tel:+12702450938" className="text-blue-500 hover:underline">
              +1 (270) 245-0938
            </a>
          </p>
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a href="mailto:austin.greer6@gmail.com" className="text-blue-500 hover:underline">
              austin.greer6@gmail.com
            </a>
          </p>
        </div>
        <p className="mt-12 text-lg sm:text-xl italic text-slate-500">
          Thank you!
        </p>
      </main>
    </div>
  );
};

export default LostPage;