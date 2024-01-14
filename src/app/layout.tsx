import type { Metadata } from 'next'
import { Providers } from '@/contexts/Providers'
import { Inter,Space_Grotesk } from 'next/font/google'
import './globals.css'
import './prism.css'
import { ClerkProvider } from '@clerk/nextjs'
import ThemeContextProvider from '@/contexts/ThemeContext'
import Navbar from '@/app/(root)/components/shared/Navbar'
import RightSideBar from './(root)/components/shared/RightSideBar'
import LeftSideBar from './(root)/components/shared/LeftSideBar'
import { Toaster } from 'sonner'
const inter = Inter({ subsets: ['latin'] ,
weight: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ],
variable:'--font-inter'
})

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] ,
weight: [ '300', '400', '500', '600', '700'],
variable:'--font-inter'
})

export const metadata: Metadata = {
  title: 'Bug Hunter',
  description: 'Let us hunt the bugs today',
  icons:
  {
    icon:"/medal.svg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
 
    
    
     
    <html lang="en">
   <ClerkProvider>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <Providers>
      <ThemeContextProvider>
        <Toaster/>
      <div>
        <Navbar/>
      </div>
      <div className='flex justify-between '>
      <div>
        <LeftSideBar/>
      </div>
      <div className=''>
      
      {children}
      
      </div>
      <div>
        <RightSideBar/>
      </div>
      </div>
      </ThemeContextProvider>
      </Providers>
      </body>
      </ClerkProvider>
    </html>

    
    
   
   
  )
}