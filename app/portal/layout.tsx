import AppSidebar from '@/components/custom/app-sidebar';
import React from 'react';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className=" flex flex-row bg-neutral-100">
      <div>
        <AppSidebar />
      </div>

      <div className="border rounded-md w-full m-1 p-3 bg-white ">
        {children}
      </div>
    </div>
  );
}
