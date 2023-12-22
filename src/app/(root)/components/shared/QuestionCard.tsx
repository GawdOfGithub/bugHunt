import React from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import Votes from './Votes';
import {auth} from '@clerk/nextjs'
import getUserById from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
type TagType = {
  _id?: number;
  name?: string;
};

type AuthorType = {
  _id?: number;
  name?: string;
  picture?: string;
};

type Props = {
  _id: string;
  title: string;
  downvotes: number[];
  tags: TagType[];
  author: AuthorType; // Change 'authors' to 'author' since it's a single object
  upvotes: number[];
  views: number;
};

const QuestionCard = async({ _id, author, downvotes, title, tags, upvotes }: Props) => {
  
  try
  {
    const {userId} = auth()
  if(!userId)  redirect('/sign-in')


    console.log(userId);

   const mongoUser = await getUserById({userId})
   return (
    <>
    
    
     <div className="flex flex-col">
 
       <div className="flex justify-between gap-5">
      <Link href={`QuestionDetail/${_id}`}> 
    
       <div className="font-extrabold text-3xl mb-5 text-black dark:text-white">{title}</div>
       </Link>
       <Votes
       type ="question"
        upvotes={upvotes.length} 
        downvotes={downvotes.length} 
        itemId={JSON.stringify(_id)}
        userId={JSON.stringify(mongoUser._id)}
        hasUpvoted={upvotes.includes(mongoUser._id)}
        hasDownVoted={downvotes.includes(mongoUser._id)}
        isSaved={mongoUser?.saved.includes(_id)}

        />
       </div>
       <div className="flex">
         {tags.map((item) => (
           <Badge key={item._id}>{item.name}</Badge>
         ))}
       </div>
       <div className="flex gap-10">
         <div key={author._id} className="flex gap-52 mt-10">
           
           <h2 className="text-black dark:text-white">{author.name}</h2>
           
           
         </div>
       </div>
     </div>
     </>
   );
         }

         
   

  
  catch(error)
  {
    console.log(error);
  }


 
};

export default QuestionCard;