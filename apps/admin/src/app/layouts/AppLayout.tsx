import React, { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return <div className='flex h-screen'>{children}</div>;
}
