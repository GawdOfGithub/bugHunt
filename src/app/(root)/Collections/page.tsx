

import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { QuestionFilterData } from '@/constants'
import LocalSearchBar from '../components/shared/search/LocalSearchBar'
import { Button } from '../components/ui/button'
import Filter from '../components/shared/FIlter/filter'
import FilterSmallScreen from '../components/shared/FIlter/filterSmallScreen'
import Pagination from '../components/shared/Pagination'
import QuestionCard from '../components/shared/QuestionCard'
import { getQuestions } from '@/lib/actions/question.action'
import { HomeFilterData } from '@/constants'
import { getSavedQuestions } from '@/lib/actions/user.action'
import {auth} from '@clerk/nextjs'
import { SearchParamProps } from '@/lib/actions/shared.types'
type Props = {}

const page = async({searchParams}:SearchParamProps) => {
  const {userId} = auth()
  if(!userId) return null
  try{

  const result = await getSavedQuestions({
    clerkId:userId,
    searchQuery:searchParams.q,
    filter:searchParams.filter
  })


  return (
    <div className='z-50 text-white mt-12  '>
      <div className='flex flex-row justify-between gap-20  max-sm:flex-col max-sm:gap-[3rem]'>
      <Button className='primary gradient bg-yellow-600 dark:text-white  max-sm:w-32 ml-40'>Ask A Question</Button>
     <h1 className='font-extrabold text-4xl text-black dark:text-white mb-5'>All Questions</h1>
     
      </div>
     <LocalSearchBar route ="/"imgSrc="/icons8-search.svg"iconPosition="left" otherClasses='none' placeholder='Search....'/>
       <Filter FilterData={QuestionFilterData}/>
       <div className='mt-3'>
       <FilterSmallScreen FilterData={QuestionFilterData}/>
       
   
       {result && result?.questions?.length>0 ? 
      result?.questions.map((question:any)=>
      (
        <QuestionCard
        key={question._id}
        _id={question._id}
        title={question.title}
        tags={question.tags}
        author={question.author}
        upvotes={question.upvotes}
        downvotes={question.downvotes}
        views={question.views}
        
        //createdAt={question.createdAt}

        
        />

      )) :<>
      <div>
    
        NOthing to show
      </div>
      </>
      }
      <Pagination/>
       </div>
    </div>
    
  )
    }
    catch(error)
    {
      console.log(error);
    }
}

export default page