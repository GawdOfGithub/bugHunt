"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"
 
  import {useEffect,useState} from 'react'
  import Link from "next/link"
  import { Sidebar } from "@/constants"
  import { usePathname,useRouter } from "next/navigation"
  import { SignedOut } from "@clerk/nextjs"
import { Button } from "../ui/button"
import {useAuth} from '@clerk/nextjs'
  type Props = {}
  
  const Hamburger = (props: Props) => {
    const {userId} = useAuth()
    
    const [isOpen, setIsOpen] = useState(false);
const pathname = usePathname()
  
    
    
    
    return (
      <>
      <div className="sm-hidden">
        <Sheet>
          <SheetTrigger className="text-2xl cursor-pointer">☰</SheetTrigger>
          <SheetContent side="left" className="bg-gray-800 text-white">
          <SheetHeader className="border-b border-gray-600 py-4">
            <SheetTitle className="text-2xl font-bold">Overflow</SheetTitle>
          </SheetHeader>
          <SheetClose>
         {Sidebar.map((item, index) => (
  <div key={index}>
    {index === 0 && <div className="mt-8"></div>}
    <Link
      href={
        item.name === 'Profile' && userId
          ? `/profile/${userId}`
          : `${item.link}`
      }
      className={`text-lg ${
        (pathname === item.link && item.name !== 'Profile') ||
        (item.name === 'Home' && pathname === '/')
          ? 'bg-red-500 text-white'
          : 'dark:hover:text-green-500 hover:text-red-500'
      } ${pathname === item.name ? 'bg-red-300' : ''} py-3 px-5 rounded-md transition-all duration-300 `}
    >
      {item.name}
    </Link>
    {index < Sidebar.length - 1 && (
      <div className="border-b border-gray-300 my-2"></div>
    )}
  </div>
))}

          </SheetClose>
          <SignedOut>
            <div className="flex flex-col justify-center items-center mt-4">
              <Link href="/sign-in">
                <Button className="w-full  py-3 mb-2 rounded-lg bg-green-500 hover:bg-green-600">
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          </SignedOut>
        </SheetContent>
      </Sheet>
      </div>
      </>
      
    )
  }
  export default Hamburger
  