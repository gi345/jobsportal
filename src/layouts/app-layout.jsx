import { Header } from '@/components/header';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className='min-h-screen container'>
        <Header/>
        <Outlet/>
      </main>
      <div className='p-10 text-centerbg-gray-800 mt-10'>Made with ❤️ by Divyanshu Tiwari</div>
      
    </div>
  );
};
