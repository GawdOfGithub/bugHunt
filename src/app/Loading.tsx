import React from 'react'
import Link from 'next/link'
import { Button } from './(root)/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
const Loading = () => {
  return (
    <section>
      <div className='flex flex-row justify-between gap-20 max-sm:flex-col max-sm:gap-[3rem]'>
          <Link href="/AskQuestion">
          <Button className='primary gradient bg-yellow-600 dark:text-white max-sm:w-32 ml-40'>
            Ask A Question
          </Button>
          </Link>
          <h1 className='font-extrabold text-4xl text-black dark:text-white mb-5'>
            All Questions
          </h1>
        </div>
        <div className='mb-12 mt-11 flex flex-wrap items-center justify-between gap-5'>
<Skeleton className='w-[100px] h-[20px] rounded-full'/>
<div className='hidden max-md:block'>
    <Skeleton className='h-14 w-28'/>
</div>
        </div>
        <div className='my-10 flex-wrap flex gap-6 md:flex'>
            <Skeleton className="h-9 w-40"/>
            <Skeleton className="h-9 w-40"/>
            <Skeleton className="h-9 w-40"/>
            <Skeleton className="h-9 w-40"/>
            



        </div>
        <div className='flex flex-col gap-6'>
            {[1,2,3,4,5].map((item)=>
            (
                <Skeleton key={item} className='h-48 w-full rounded-xl'/>
            ))}

        </div>
    </section>
  )
}

export default Loading