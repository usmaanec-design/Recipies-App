import React from 'react';

interface FooterProps {
    t: any;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-white mt-12 py-6 border-t border-slate-200">
      <div className="container mx-auto px-4 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} {t.footerText}</p>
      </div>
    </footer>
  );
};

export default Footer;