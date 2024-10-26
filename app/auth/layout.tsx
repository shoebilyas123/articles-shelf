import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
