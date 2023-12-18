'use client'
import React from 'react'
import Image from 'next/image'
import { Input } from '../../ui/input'
type Props = {
  route:string
  iconPosition:string
  imgSrc:string
  placeholder:string
  otherClasses:string
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses


}: Props) => {
  return (
    <>
 <div className={`flex flex-grow  items-center shadow-none text-black dark:text-white bg-gray-100 dark:bg-cyan-500 min-h-[56px] rounded-[10px] px-4 gap-4 ${otherClasses} `}>
  
{iconPosition ==='left' &&
  
  (<Image 
src={imgSrc}
alt="Search name"
width={24}
height={24}
className = "cursor-pointer"/>)}

<Input type="text"
className ="border-none shadow-none outline-none  "
placeholder={placeholder} />
{iconPosition ==='right' &&
  
  (<Image 
src={imgSrc}
alt="Search name"
width={24}
height={24}
className = "cursor-pointer"/>)}



</div>
</>)
}
export default LocalSearchBar