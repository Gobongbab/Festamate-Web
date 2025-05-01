import React from 'react';
import { Outlet } from 'react-router-dom';

import { SideBar } from '@/shared/ui';

export default function AppLayout() {
  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='scrollbar-hide flex-1 overflow-scroll p-6'>
        <Outlet />
      </div>
    </div>
  );
}
