import AppSidebar from '@/components/custom/app-sidebar';
import React from 'react';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <AppSidebar />
      {children}
    </div>
  );
}
