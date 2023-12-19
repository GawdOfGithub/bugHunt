"use server"
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
//import { CreateAnswerParams } from "./shared.types";
import { connectToDatabase } from "./mongoose";
import Answer from "@/database/answer.model";
import { AnswerVoteParams } from "./shared.types";

export async function createAnswer(params:any) {
  try {
    connectToDatabase()
    const {content,author,question,path} = params
    const newAnswer = await Answer.create({content,author,question})
    await Question.findByIdAndUpdate(question, {
        $push:{answers:newAnswer._id}
    })
    
    revalidatePath(path)
    
  } catch (error) {
    console.error(error);
  }
}
export async function upvoteAnswer({hasDownVoted,hasUpvoted,answerId,userId,path}:AnswerVoteParams){
  try{
      connectToDatabase()
      let updateQuery = {}
      if(hasUpvoted)
      {
          updateQuery ={$pull:{upvotes:userId}}
      }
      else if(hasDownVoted)
      {
          updateQuery ={
              $pull:{downvotes:userId},
              $push:{upvotes:userId}
          }
      }
          else{
              updateQuery ={$addToSet:{upvotes:userId}}
          }
          const answer = await Answer.findByIdAndUpdate(answerId,updateQuery,{new:true})
          if(!answer){
              throw new Error("Question not found")
          }
          revalidatePath(path)
  }
  catch(error)
  {
      console.log(error);
  }
}
export async function downvoteAnswer({hasDownVoted,hasUpvoted,answerId,userId,path}:AnswerVoteParams){
  try{
      connectToDatabase()
      let updateQuery = {}
      if(hasUpvoted)
      {
          updateQuery ={$pull:{upvotes:userId},$push:{downvotes:userId}}
      }
      else if(hasDownVoted)
      {
          updateQuery ={
              $pull:{downvotes:userId},
          }
      }
          else{
              updateQuery ={$addToSet:{downvotes:userId}}
          }
          const answer = await Answer.findByIdAndUpdate(answerId,updateQuery,{new:true})
          if(!answer){
              throw new Error("Question not found")
          }
          revalidatePath(path)
  }
  catch(error)
  {
      console.log(error);
  }
}
