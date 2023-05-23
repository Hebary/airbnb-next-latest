import { Metadata } from 'next'
import './styles/globals.css'
import { Nunito } from 'next/font/google'
import { Navbar } from './components/navbar'
import { RegisterModal, LoginModal } from './components/modals'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata:Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone optimized',
}

export default function RootLayout({ children }: {children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <RegisterModal/>
        <LoginModal/>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
