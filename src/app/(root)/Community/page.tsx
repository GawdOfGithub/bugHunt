import React from 'react';
import FilterSmallScreen from '../components/shared/FIlter/filterSmallScreen';
import { CommunityFilterData } from '@/constants';
import LocalSearchBar from '../components/shared/search/LocalSearchBar';
import UserCard from '../components/shared/USerCard';
import { auth } from '@clerk/nextjs';
import { getAllUsers } from '@/lib/actions/user.action';
import { useSearchParams } from 'next/navigation';
import { SearchParamProps } from '@/lib/actions/shared.types';
import CommunityFilter from '../components/shared/FIlter/communityFilter';

type Props = {};

const Page = async ({ searchParams }: SearchParamProps) => {
  try {
    const users = await getAllUsers({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
    });

    return (
      <>
        <div className='text-black dark:text-white font-extrabold text-3xl mb-6'>
          All Users
        </div>

        <div className='flex flex-col items-center justify-center gap-10'>
          {/* Community Filter */}
          <CommunityFilter FilterData={CommunityFilterData} />

          {/* Local Search Bar */}
          <LocalSearchBar
            route='community'
            iconPosition='left'
            imgSrc=''
            placeholder='Search Amazing minds here'
            otherClasses='mb-3'
          />

          {/* Filter for Small Screens */}
          <FilterSmallScreen FilterData={CommunityFilterData} />

          {/* User Cards Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {users.length > 0 ? (
              users.map((item) => (
                <UserCard
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  username={item.username}
                  email={item.username}
                  picture={item.picture}
                />
              ))
            ) : (
              <p className='text-gray-500 text-lg'>
                No users found. Try a different search query.
              </p>
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className='text-red-500 font-bold'>
        An error occurred while fetching user data.
      </div>
    );
  }
};

export default Page;
