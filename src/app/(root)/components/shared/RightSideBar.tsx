import React from 'react'
import { QuestionData } from '@/constants'
import {TagData} from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import RenderTags from './RenderTags'
type Props = {}
const RightSideBar = (props: Props) => {
  return (
    <>
     <div className="font-extrabold min-h-screen max-w-[300px] flex flex-col gap-5 sticky left-0 top-0 bg-white text-black dark:bg-black dark:text-white shadow-light-300 light:text-black dark:shadow-none max-sm:hidden   ">
        <h2 className='font-extrabold'>Top questions</h2>
      { QuestionData.map((item,index)=>
       (
       
        <div key={item._id} className=" font-normal flex gap-3">
             <Link href={`/questions/${item._id}`}>
        {item.question} 
        <Image
      src="right-thin-chevron-svgrepo-com.svg"
      width={10}
      height={10}
     
      alt="Picture of the author"
    />
    </Link>
        </div>
        
       )) 
    }
    
    <div>
    <h2 className='text-black'>Popular Tags</h2>
    {TagData.map((item,index)=>
    (
        <div key ={item._id}>
           <RenderTags  totalQuestions={item.totalQuestions} _id={item._id} name={item.name} />
            </div>

    ))}
    </div>
    </div>
    </>
  )
}
export default RightSideBar