import type { Metadata } from 'next';
import './globals.css';
import './poh-shell.css';
import SunsetSky from '@/components/SunsetSky';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MotionPreferences from '@/components/MotionPreferences';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.seyvikmagon.com'),
  title: 'POH Media — Films by Seyvik Magon',
  description: 'Films, founder stories, and startup storytelling by Seyvik Magon. POH Media turns what you are building into stories people feel.',
  openGraph: {
    title: 'POH Media — Films by Seyvik Magon',
    description: 'Films, founder stories, and startup storytelling by Seyvik Magon.',
    url: 'https://www.seyvikmagon.com',
    siteName: 'POH Media',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'POH Media — Films by Seyvik Magon',
    description: 'Films, founder stories, and startup storytelling by Seyvik Magon.',
  },
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
        <MotionPreferences>{children}</MotionPreferences>
        <Footer />
      </body>
    </html>
  );
}
