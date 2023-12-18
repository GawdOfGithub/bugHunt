
import { auth } from '@clerk/nextjs';
import {redirect} from 'next/navigation'
import  getUserById  from '@/lib/actions/user.action';
import { getQuestionById } from '@/lib/actions/question.action';
import Answer from './Answer';
import Test from '../Test';
type Props = {
      params:{
         id:string
      }
  }
  

const  page =async ({params}:Props) => {


  
 const {id} = params
const {userId} = auth()
   if(!userId) redirect('/sign-in')
   const question = await getQuestionById({id})
  
 // console.log(question);

   const mongoUser = await getUserById({userId})
  // console.log(mongoUser);
   


  
  return (
    <div>
      {/* <Answer mongoUser={mongoUser ? JSON.stringify(mongoUser._id) : ''} question={question} /> */}
      {/* <Test mongoUser={mongoUser} question={question}/> */}
     <Test question={JSON.stringify(question._id)} mongoUser={JSON.stringify(mongoUser._id)}/>
    </div>
  )
  
}
export default page
 

