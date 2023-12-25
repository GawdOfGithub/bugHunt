"use client";
import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { upvoteQuestion, downvoteQuestion } from '@/lib/actions/question.action';
import { upvoteAnswer, downvoteAnswer } from '@/lib/actions/answer.action';
import { usePathname, useRouter } from 'next/navigation';
import { toggleSavedQuestion } from '@/lib/actions/user.action';
import { useEffect } from 'react';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { toast } from "sonner"
import { clerkClient } from '@clerk/nextjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
type Props = {
  type: string,
  itemId: string,
  userId: string,
  hasUpvoted: boolean,
  hasDownVoted: boolean,
  isSaved: boolean,
  upvotes: number,
  downvotes: number,
  views:number
  answerId?:string
};

const Votes = ({ type, hasUpvoted, hasDownVoted, isSaved, upvotes, downvotes, itemId, userId,views }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleUpvoted = async () => {
    try {
      if (type == "question") {
        await upvoteQuestion({
          hasDownVoted: hasDownVoted,
          hasUpvoted: hasUpvoted,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathname,
        });
        return   toast(`Upvote ${!hasUpvoted?'added successfully':'removed successfully'}`, {
          description: "Thanks for the feedback",
         
        })
      
      } else if (type === "answer") {
        await upvoteAnswer({
          hasDownVoted: hasDownVoted,
          hasUpvoted: hasUpvoted,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathname,
        });
        return   toast(`Upvote ${!hasUpvoted?'added successfully':'removed successfully'}`, {
          description: "Thanks for the feedback",
         
        })
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvoted = async () => {
    try {
      if (type === "question") {
        await downvoteQuestion({
          hasDownVoted: hasDownVoted,
          hasUpvoted: hasUpvoted,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathname,
        });
        return   toast(`Downvote ${!hasUpvoted?'added successfully':'removed successfully'}`, {
          description: "Thanks for the feedback",
         
        })
      } else if (type === "answer") {
        await downvoteAnswer({
          hasDownVoted: hasDownVoted,
          hasUpvoted: hasUpvoted,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathname,
        });
        return   toast(`Downvote ${!hasUpvoted?'added successfully':'removed successfully'}`, {
          description: "Thanks for the feedback",
         
        })
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async() => {
    await toggleSavedQuestion({
      userId:JSON.parse(userId),
      questionId:JSON.parse(itemId),
      path:pathname
    })
    return   toast(`Your question was  ${!isSaved?'added to the collection page':' removed from the collection page'}`, {
     
     
    })
  };


  
  useEffect(()=>{
    viewQuestion({
      questionId:JSON.parse(itemId),
      userId:userId? JSON.parse(userId):undefined
    })
    
  },[itemId,userId])


  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center justify-center">
        {hasUpvoted ? <button onClick={handleUpvoted}><ThumbUpIcon /></button> : <button onClick={handleUpvoted}><ThumbUpOutlinedIcon /></button>}
        {upvotes}
      </div>
      <div className="flex flex-col items-center justify-center">
        {hasDownVoted ? <button onClick={handleDownvoted}><ThumbDownIcon /></button> : <button onClick={handleDownvoted}><ThumbDownOutlinedIcon /></button>}
        {downvotes}
      </div>
      { type=="question" &&
      (<div className="flex-col ">
        {isSaved ? <button onClick={handleSave}><StarIcon /></button> : <button onClick={handleSave}><StarOutlineIcon /></button>}
      </div>)}
      <div className="flex flex-col items-center justify-center">
        
        <div><VisibilityIcon/></div>
        <div>{views}</div>
      </div>
    </div>
  );
};

export default Votes;
