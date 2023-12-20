import React from 'react';
import { Badge } from '../../components/ui/badge';
import Link from 'next/link';
import Votes from '../../components/shared/Votes';
import {auth} from '@clerk/nextjs'
import getUserById from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import ParseHTML from '../../components/shared/ParseHTML';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar ,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar'
type Author = {
  _id: ObjectId;
  clerkId: string;
  name: string;
  picture: string;
};

type Answer = {
  _id: ObjectId;
  content: string;
  views: number;
  upvotes: ObjectId[]; 
  downvotes: ObjectId[]; 
  author: Author;
};
type TagType = {
  _id?: number;
  name?: string;
};

type AuthorType = {
  _id?: number;
  name?: string;
  picture?: string;
};
type answers = Answer[];


type Props = {
  _id: string;
  title: string;
  downvotes: number[];
  tags: TagType[];
  author: AuthorType; // Change 'authors' to 'author' since it's a single object
  upvotes: number[];
  views: number;
  answers:{
_id:string,
content:string,
views:number,

  }[]
};

const AnswerCard = async({ _id, author, downvotes, title, tags, upvotes,answers }: Props) => {

  try
  {
    console.log(`This is coming from here${answers[0]}`);
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
           
           
           
           
         </div>
       </div>
       <div>
       {
        answers.map((item:any)=>
        (
          <div key={item._id} className='flex flex-col'>
           <div className="flex">
          
           <Avatar >
      <AvatarImage src={item.author.picture} alt="@shadcn" height="500" width="500" />
     
      <AvatarFallback >CN</AvatarFallback>
    
    </Avatar>
    <div>{item.author.name}</div>
            </div>
            <div>
            <ParseHTML data={item.content} />
              </div>
              <Votes
       type ="answer"
        upvotes={item.upvotes.length} 
        downvotes={item.downvotes.length} 
        itemId={JSON.stringify(item._id)}
        userId={JSON.stringify(mongoUser._id)}
        hasUpvoted={item.upvotes.includes(mongoUser._id)}
        hasDownVoted={item.downvotes.includes(mongoUser._id)}
        isSaved={mongoUser?.saved.includes(_id)}

        />
       {/* <div>{item.views} <VisibilityIcon/></div> */}

          </div>

        ))
      
  }
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

export default AnswerCard;