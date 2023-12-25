
import { auth } from '@clerk/nextjs';
import {redirect} from 'next/navigation'
import  getUserById  from '@/lib/actions/user.action';
import { getQuestionById } from '@/lib/actions/question.action';
import AnswerCard from './AnswerCard';

import Answer from '../Answer';

import { Avatar ,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar'
type Props = {
      params:{
         id:string
      }
  }


const  page =async ({params}:Props) => {
  
 const {id} = params
const {userId} = auth()
   if(!userId) redirect('/sign-in')
   const {_id, author, downvotes, title, tags, upvotes,views,answers} = await getQuestionById({id})
   const mongoUser = await getUserById({userId})
  return (
    <div className='flex flex-col gap-5'>    
     <Answer question={JSON.stringify(_id)} mongoUser={JSON.stringify(mongoUser._id)}/>
     
     <p className='text-white bg-red-600 p-2 rounded-md cursor-pointer'>
                Solutions by Other Bug Hunters
              </p>
     <AnswerCard
  {...{_id, author, downvotes, title, tags, upvotes,views,answers  }}
/>


    </div>
  )
  
}
export default page
 

