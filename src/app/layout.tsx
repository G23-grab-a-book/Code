import type { Metadata } from 'next'
import './globals.css'

import ThemeProvider from './providers/ThemeProvider';
import Header from './header';

export const metadata: Metadata = {
  title: 'Grab a Book',
  description: 'Your adorable app to buy and & sell books!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider> 
      </body>
    </html>
  )
}