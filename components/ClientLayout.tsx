"use client";

import { Navbar } from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import { FirebaseProvider } from '@/components/providers/FirebaseProvider';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/login';

  return (
    <FirebaseProvider>
      {showNavbar && <Navbar />}
      {children}
    </FirebaseProvider>
  );
}