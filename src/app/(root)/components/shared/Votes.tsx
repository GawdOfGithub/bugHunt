"use client"
import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { upvoteQuestion } from '@/lib/actions/question.action';
import { downvoteQuestion } from '@/lib/actions/question.action';
import { usePathname,useRouter } from 'next/navigation';
type Props = {
   itemId:string,
   userId:string,
    hasUpvoted:boolean,
    hasDownVoted:boolean,
    isSaved:boolean,
    upvotes:number,
    downvotes:number,

     
}

const Votes = ({hasUpvoted,hasDownVoted,isSaved,upvotes,downvotes,itemId,userId}: Props) => {
  const router = useRouter()
const pathname = usePathname()

  const handleUpvoted = async()=>
  {
    try
    {
      await upvoteQuestion({

        hasDownVoted:hasDownVoted,
        hasUpvoted:hasUpvoted,
        questionId:JSON.parse(itemId),
        userId:JSON.parse(userId),
        path:pathname
      })
      router.push("/")


    }
    catch(error)
    {
      console.log(error);
    }
  }
  const handleDownvoted = async()=>
  {
    try
    {
      console.log(hasDownVoted);

      await downvoteQuestion({
        

        hasDownVoted:hasDownVoted,
        hasUpvoted:hasUpvoted,
        questionId:JSON.parse(itemId),
        userId:JSON.parse(userId),
        path:pathname
      })

    }
    catch(error)
    {
      console.log(error);
    }
  }
  const handleSave = ()=>
  {
    alert("hello world")
  }
  return (
    <div className="flex gap-4">
  
      <div className="flex flex-col items-center justify-center">
        
      { hasUpvoted ? 
      <button onClick={handleUpvoted}>
      <ThumbUpIcon/></button>:<button onClick={handleUpvoted}> <ThumbUpOutlinedIcon/></button>}
      {upvotes}
      </div>
      <div className="flex flex-col items-center justify-center">
        
     {hasDownVoted ?   <button onClick={handleDownvoted}> <ThumbDownIcon/></button> : <button onClick={handleDownvoted}> <ThumbDownOutlinedIcon/></button> }
     {downvotes}
     </div>
    <div className="flex-col ">
     {isSaved? <button onClick={handleSave}><StarIcon/></button>:<button onClick={handleSave}><StarOutlineIcon/></button>}
     </div>
       
    </div>
  )
}

export default Votes