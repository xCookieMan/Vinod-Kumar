import type { Metadata } from 'next';
import { Bebas_Neue, Archivo, Space_Mono } from 'next/font/google';
import './globals.css';

const fontDisplay = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap'
});

const fontBody = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-body',
  display: 'swap'
});

const fontMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Vinod Kumar | Cinematic Portfolio',
  description: 'Portfolio for Vinod Kumar, film and television production educator.'
};

import Navbar from '@/components/Navbar';
import GrainOverlay from '@/components/GrainOverlay';
import Loading from '@/components/Loading';
import MotionProvider from '@/components/MotionProvider';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" style={{ fontFamily: 'var(--font-body)' }}>
      <body className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} bg-cream text-ink`}>
        <Loading />
        <Navbar />
        <GrainOverlay />
        <MotionProvider>{children}</MotionProvider>
        <Footer />
      </body>
    </html>
  );
}
