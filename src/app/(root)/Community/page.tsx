import React from 'react'
import FilterSmallScreen from '../components/shared/FIlter/filterSmallScreen'
import { CommunityFilterData } from '@/constants'
import LocalSearchBar from '../components/shared/search/LocalSearchBar'
import UserCard from '../components/shared/USerCard'
import {auth} from '@clerk/nextjs'
import { getAllUsers } from '@/lib/actions/user.action'
type Props = {}

const Page = async(props: Props) => {
  try
  {
    const users = await getAllUsers()
    return (
      <>
      <div className='text-whit font-extrabold text-3xl '>All Users</div>
      <div className='flex flex-col '>
      <LocalSearchBar route="community" iconPosition='left' imgSrc='' placeholder='Search Amazing minds here' otherClasses='mb-3'/>
      <FilterSmallScreen FilterData={CommunityFilterData}/>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
      
      
       {users.map((item)=>
        (<UserCard key={item._id} _id={item._id} name={item.name} username={item.username}  email={item.username} picture={item.picture}/>
        ))
        
      }
      
      
      </div>
      </div>
      </>
    )
    console.log(users);

  }
  catch(error){
    console.log(error);

  }
  
}

export default Page