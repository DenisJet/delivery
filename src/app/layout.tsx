import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Delivery',
  description: 'Доставка из любого магазина',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <head></head>
      <body className={inter.className}>
        <Header />
        <main className='main'>{children}</main>
      </body>
    </html>
  );
}
