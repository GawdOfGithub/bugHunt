import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"
 
  import React from 'react'
  import Link from "next/link"
  import { Sidebar } from "@/constants"
  import { usePathname } from "next/navigation"
  import { SignedOut } from "@clerk/nextjs"
import { Button } from "../ui/button"
  type Props = {}
  
  const Hamburger = (props: Props) => {
    const pathname = usePathname()
    console.log(pathname);
    return (
        <Sheet>
        <SheetTrigger>☰</SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Overflow</SheetTitle>
            
          </SheetHeader>
          <SheetClose >
           {
            Sidebar.map((item,index)=>
            (
              <>
              <div key={index} className="min-w-full font-extrabold">
               <Link className={`font-extrabold text-2xl mb-0 dark:hover:text-green-500 hover:text-red-500 ${pathname==="{item.name}" ? "bg-red-300":null}  `}href={item.link}>{item.name}</Link>
               {index < Sidebar.length - 1 && <div className="border-b border-blue-500 mb-5 min-w-full "></div>}
              {}
              </div>
              </>
            ))
           }
           </SheetClose>
           <SignedOut>
           <SheetClose>
            <div className="flex flex-col justify-center items-center ml-10 ">
              <Link href="/sign-in">
          <Button className="w-full px-10 py-5 mt-52 mb-5 rounded-lg hover:bg-green-300" >
           LogIn
          </Button>
          </Link>
          <Link href="/sign-up">
          <Button className="w-full px-10 py-5  mb-5 rounded-lg hover:bg-green-300" >
           Sign Up
          </Button>
          </Link>
          </div>
           </SheetClose>
           </SignedOut>
        </SheetContent>
      </Sheet>
      
    )
  }
  export default Hamburger
  