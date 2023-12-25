'use client'
import {useState} from 'react'
import { useAuth } from '@clerk/nextjs'
import { Sidebar} from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { SignedOut } from '@clerk/nextjs'

type Props = {}
const LeftSideBar = (props: Props) => {
const [Profile, setProfile] = useState(false);

const {userId} = useAuth()
  const pathname = usePathname()
if (pathname === "Profile" && userId) {
  setProfile(true);
}



 const {isSignedIn} = useAuth()
 console.log(pathname);
  return (
    <>
    <div className="font-extrabold min-h-screen max-w-[300px] flex flex-col gap-5 sticky left-0 top-0 dark:text-white bg-white text-gray-800 shadow-light-300 dark:shadow-none max-sm:hidden dark:bg-black">
      {Sidebar.map((item, index) => (
        <div key={index}>
          {index === 0 && <div className="mt-8"></div>}
          <Link
            href={item.link === '/Profile' && userId ? `/Profile/${userId}` : `${item.link}`}
            className={`text-lg ${
              pathname === item.link
                ? 'bg-red-500 text-white'
                : 'dark:hover:text-green-500 hover:text-red-500'
            } ${pathname.includes(item.link) ? 'bg-red-300' : ''} py-3 px-5 rounded-md transition-all duration-300`}
          >
            {item.name}
          </Link>
          {index < Sidebar.length - 1 && <div className="border-b border-gray-300 my-2"></div>}
        </div>
      ))}

      <SignedOut>
        <div className="flex flex-col w-full">
          <Link href="/sign-in">
            <Button className="w-full px-6 py-3 mt-4 rounded-lg bg-green-500 hover:bg-green-600 text-white">
              Log In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="w-full px-6 py-3 mt-2 rounded-lg border border-green-500 hover:bg-green-500 hover:text-white">
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