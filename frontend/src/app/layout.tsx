// app/layout.tsx
'use client'
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}