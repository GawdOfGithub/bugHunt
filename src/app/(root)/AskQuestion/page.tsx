import React from 'react';
import Question from './Question'
import { auth } from '@clerk/nextjs';
import {redirect} from 'next/navigation'
import  getUserById  from '@/lib/actions/user.action';
const  page =async() => {
  
  
  
const {userId} = auth()
   if(!userId) redirect('/sign-in')

   const mongoUser = await getUserById({userId})
   console.log(mongoUser);
   


  
  return (
    <div><Question mongoUser={JSON.stringify(mongoUser._id)}/>
    </div>
  )
}
[]
export default page