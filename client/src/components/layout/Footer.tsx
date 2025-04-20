import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-200 text-slate-600 text-sm py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        &copy; {currentYear} OncoTracker. All Rights Reserved.
        {/* Add other footer links if needed */}
        {/* <span className="mx-2">|</span>
        <a href="/privacy" className="hover:text-sky-600">Privacy Policy</a> */}
      </div>
    </footer>
  );
};

export default Footer; 