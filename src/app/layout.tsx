'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Доставка Сатка',
//   description: 'Доставка из любого магазина',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <head></head>
      <body className={inter.className}>
        <Provider store={store}>
          <Header />
          <main className='main'>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
