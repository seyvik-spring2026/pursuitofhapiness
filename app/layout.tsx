import type { Metadata } from 'next';
import './globals.css';
import SunsetSky from '@/components/SunsetSky';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Seyvik Magon',
  description: 'Cinematic storyteller, content creator, and versatile operator.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
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
        <Footer />
      </body>
    </html>
  );
}
