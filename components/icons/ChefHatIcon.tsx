
import React from 'react';

interface IconProps {
    className?: string;
}

const ChefHatIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 21a2 2 0 0 1-2-2v-4h18v4a2 2 0 0 1-2 2Z"/>
        <path d="M5 15V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6"/>
        <path d="M12 2c-2.76 0-5 2.24-5 5v2h10V7c0-2.76-2.24-5-5-5Z"/>
        <path d="M12 7c1.66 0 3-1.34 3-3"/>
        <path d="M12 7c-1.66 0-3-1.34-3-3"/>
    </svg>
  );
};

export default ChefHatIcon;
