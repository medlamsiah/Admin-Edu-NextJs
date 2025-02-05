import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { ClientLayout } from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin-Edu - Gestion des étudiants',
  description: 'Plateforme de gestion des étudiants pour école informatique',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}