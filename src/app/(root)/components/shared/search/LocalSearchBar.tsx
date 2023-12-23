'use client'
import React from 'react';
import Image from 'next/image';
import { Input } from '../../ui/input';
import {usePathname,useRouter,useSearchParams } from 'next/navigation';
import { useState,useEffect } from 'react';
import { formUrl,removeKeysFromQuery } from '@/lib/utils';
type Props = {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
};

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [search, setSearch] = useState(query || '');
  useEffect(()=>
  {
    const delayDebounceFn = setTimeout(()=>
    {
      if(search)
      {
        const newUrl = formUrl({
          params:searchParams.toString(),
          key:'q',
          value:search
        })
        router.push(newUrl, {scroll:false})
      }
      else
      {
        if(pathname===route){
          const newUrl = removeKeysFromQuery({
            params:searchParams.toString(),
            keysToRemove:['q']

          })
          router.push(newUrl,{scroll:false})

        }

      }

    },200)
    return ()=> clearTimeout(delayDebounceFn)

  },[search,route,pathname,router,searchParams,query])
  

  return (
    <>
      <div
        className={`flex flex-grow items-center shadow-none text-black dark:text-white bg-gray-100 dark:bg-cyan-500 min-h-[56px] rounded-[10px] px-4 gap-4 ${otherClasses}`}
      >
        {iconPosition === 'left' && (
          <Image
            src={imgSrc}
            alt="Search icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}

        <Input
          type="text"
          className="flex-grow border-none shadow-none outline-none text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
          placeholder={placeholder}
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        {iconPosition === 'right' && (
          <Image
            src={imgSrc}
            alt="Search icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
      </div>
    </>
  );
};

export default LocalSearchBar;
