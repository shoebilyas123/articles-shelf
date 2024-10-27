import AppSidebar from '@/components/custom/app-sidebar';
import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect('/auth/login');

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
