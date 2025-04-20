import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  // Optional: You could show a layout-specific loading state
  // if (isLoading) {
  //   return <div>Loading application layout...</div>;
  // }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
          {/* Outlet renders the matched child route component */}
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout; 