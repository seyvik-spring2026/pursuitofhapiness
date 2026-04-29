import type { Metadata } from 'next';
import './globals.css';
import SunsetSky from '@/components/SunsetSky';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Seyvik Magon',
  description: 'Cinematic storyteller, content creator, and versatile operator.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SunsetSky />
        <Nav />
        {children}
      </body>
    </html>
  );
}
