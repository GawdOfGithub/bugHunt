'use client'
import { SignedIn, UserButton } from '@clerk/nextjs';
import React from 'react';
import Theme from './Theme';
import { Button } from '../ui/button';
import Hamburger from './Hamburger';
import GlobalSearchBar from './search/GlobalSearchBar';

import Image from 'next/image';

import RightSideBar from './RightSideBar';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <nav className="dark:bg-black dark:text-white bg-white text-gray-300 p-4 flex items-center justify-between font-bold shadow-md">
        <span className="text-2xl font-bold text-black dark:text-white">OverFlow</span>
        <div className='max-sm:hidden'>
        <Hamburger/>
        </div>

        <div className="flex items-center rounded-md border ml-4 max-sm:hidden">
          <GlobalSearchBar
            route="/"
            imgSrc="/search.svg"
            iconPosition="left"
            otherClasses="none"
            placeholder="Search anything"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Theme />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      <div className=""></div>
    </>
  );
};

export default Navbar;
