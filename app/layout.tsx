import { Metadata } from 'next'
import './styles/globals.css'
import { Nunito } from 'next/font/google'
import { Navbar } from './components/navbar'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata:Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone optimized',
}

export default function RootLayout({ children }: {children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
