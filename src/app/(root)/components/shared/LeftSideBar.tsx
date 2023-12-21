
import React from 'react'
import { useAuth } from '@clerk/nextjs'
import { Sidebar} from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { SignedOut } from '@clerk/nextjs'
import {auth} from '@clerk/nextjs'
type Props = {}
const LeftSideBar = (props: Props) => {
  const {userId} = auth()
  //const pathname = usePathname();
  const pathname="Profile"
  


 const {isSignedIn} = useAuth()
 console.log(pathname);
  return (
    <>
    <div className="font-extrabold min-h-screen max-w-[300px] flex flex-col gap-5 sticky left-0 top-0 dark:bg-black dark:text-white bg-white text-black shadow-light-300 dark:shadow-none max-sm:hidden">
      {Sidebar.map((item, index) => (
       
        <div key={index}>
          {index==0 && <div className='mt-8'></div>}
          <Link
            className={`text-2xl ${pathname === item.link ?"bg-red-500":null} dark:hover:text-green-500 hover:text-red-500 ${pathname === item.name ? "bg-red-300" : ""}`}
            
            href={ (pathname === "Profile" && userId) ?`/Profile/${userId}`: item.link}
            
          >
            {item.name}
          </Link>
          {index < Sidebar.length - 1 && <div className="border-b border-blue-500 mb-5 min-w-full"></div>}
        </div>
       
      ))}
    
    <SignedOut>
         
            <div className="flex flex-col w-full ">
              <Link href="/sign-in">
          <Button className="w-full px-24 py-5 mt-52 mb-5 ml-0 rounded-lg hover:bg-green-300" >
           LogIn
          </Button>
          </Link>
          <Link href="/sign-up">
          <Button className="w-full px-10 py-5  mb-5 rounded-lg hover:bg-green-300" >
           Sign Up
          </Button>
          </Link>
          </div>
          
           </SignedOut>
           </div>
    </>
  );
};
export default LeftSideBar