import React from 'react';

interface SplashScreenProps {
  onEnter: () => void;
  t: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter, t }) => {
  return (
    <div dir="rtl" className="font-urdu flex flex-col items-center justify-center min-h-screen bg-emerald-50 text-slate-800 p-4">
      <div className="text-center bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-emerald-700 mb-4">
          {t.splashProverb}
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          {t.splashCredit}
        </p>
        <button
          onClick={onEnter}
          className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-105"
        >
          {t.splashButton}
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
