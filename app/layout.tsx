import { Metadata } from 'next'
import './styles/globals.css'
import { Nunito } from 'next/font/google'
import { Navbar } from './components/navbar'
import { RegisterModal, LoginModal } from './components/modals'
import { ToasterProvider } from './components'
import { Provider } from './components'
import { getCurrentUser } from './actions'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata:Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone optimized',
}

export default async function RootLayout({ children }: {children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Provider>
            <ToasterProvider/>
            <RegisterModal/>
            <LoginModal/>
            <Navbar currentUser={user}/>
          {children}
        </Provider>
      </body>
    </html>
  )
}
