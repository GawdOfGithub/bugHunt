import React from 'react';
import { UserButton } from '@clerk/nextjs';

import { getQuestions } from '@/lib/actions/question.action';
import { HomeFilterData } from '@/constants';
import { SearchParamProps } from '@/lib/actions/shared.types';

import LocalSearchBar from '../components/shared/search/LocalSearchBar';
import QuestionCard from '../components/shared/QuestionCard';
import { Button } from '../components/ui/button';
import Filter from '../components/shared/FIlter/filter';
import FilterSmallScreen from '../components/shared/FIlter/filterSmallScreen';
import Pagination from '../components/shared/Pagination';
import Hamburger from '../components/shared/Hamburger';
import Link from 'next/link';
import Loading from './Loading';
const Page = async ({ searchParams }: SearchParamProps) => {
  const isLoading = false
  if(isLoading)
  {
    return <Loading/>
  }
  try {
    const result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page,
    });

    const isNext = result?.isNext;
  

    return (
      <div className='z-50 text-white mt-12'>
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
        <LocalSearchBar
          route='/'
          imgSrc='/icons8-search.svg'
          iconPosition='left'
          otherClasses='none'
          placeholder='Search....'
        />
        <Filter FilterData={HomeFilterData} />
        <div className='mt-3'>
          <FilterSmallScreen FilterData={HomeFilterData} />
          {result && result?.questions?.length > 0 ? (
            result?.questions.map((question) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                views={question.views}
              />
            ))
          ) : (
            <>
              <div>No questions found.</div>
            </>
          )}
        </div>
        <div>
          <Pagination totalPages={isNext} />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div className='text-red-500 font-bold'>An error occurred while fetching questions.</div>;
  }
};

export default Page;
