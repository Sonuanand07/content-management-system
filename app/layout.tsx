'use client';
import { Provider } from 'react-redux';
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { store } from '@/lib/store'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider store={store}>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </Provider>
      </body>
    </html>
  )
}
