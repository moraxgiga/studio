import type {Metadata} from 'next';
import {Space_Grotesk, VT323} from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const vt323 = VT323({
  variable: '--font-vt323',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SynapseAI',
  description: 'AI Engineer Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${vt323.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
