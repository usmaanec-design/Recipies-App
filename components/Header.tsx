import React from 'react';
import ChefHatIcon from './icons/ChefHatIcon';
import { type Language } from '../translations';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: any; 
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <ChefHatIcon className="h-8 w-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            {t.headerTitle}
          </h1>
        </div>
        <button
          onClick={toggleLanguage}
          className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors duration-200 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label={`Switch to ${t.languageName}`}
        >
          {t.languageName}
        </button>
      </div>
    </header>
  );
};

export default Header;