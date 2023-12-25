"use client"
import React from 'react';
import Image from 'next/image';
import { Input } from '../../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { formUrl, removeKeysFromQuery } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { mode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [search, setSearch] = useState(query || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrl({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <>
      <div
        className={`flex flex-grow items-center border rounded-md p-2 gap-x-6 ${
          iconPosition === 'left' ? 'pl-2 pr-4' : 'pl-4 pr-2'
        } ${otherClasses}`}
        style={{ width: '300px' }} 
      >
        {iconPosition === 'left' && (
          <Image
            src={mode === 'light' ? '/search.svg' : '/search-white.png'}
            alt="Search icon"
            width={20}
            height={20}
            className="cursor-pointer dark:text-white"
          />
        )}

        <Input
          type="text"
          className="flex-grow border-none outline-none text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 "
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {iconPosition === 'right' && (
          <Image
            src="/search.svg"
            alt="Search icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        )}
      </div>
    </>
  );
};

export default LocalSearchBar;
