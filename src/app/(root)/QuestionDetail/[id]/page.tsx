
import { auth } from '@clerk/nextjs';
import {redirect} from 'next/navigation'
import  getUserById  from '@/lib/actions/user.action';
import { getQuestionById } from '@/lib/actions/question.action';
import AnswerCard from './AnswerCard';
import Qna from './qna';
import Answer from './Answer';
import Test from '../Test';

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
  
  
 console.log(answers);

   const mongoUser = await getUserById({userId})
  // console.log(mongoUser);
   


  
  return (
    <div>
      {/* <Answer mongoUser={mongoUser ? JSON.stringify(mongoUser._id) : ''} question={question} /> */}
      {/* <Test mongoUser={mongoUser} question={question}/> */}
     <Test question={JSON.stringify(_id)} mongoUser={JSON.stringify(mongoUser._id)}/>
     <AnswerCard
  {...{_id, author, downvotes, title, tags, upvotes,views,answers  }}
/>


    </div>
  )
  
}
export default page
 

