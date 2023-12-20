"use server"
import { connectToDatabase } from "./mongoose"
import { ViewQuestionParams } from "./shared.types"
import Interaction from "@/database/interaction.model"
import Question from "@/database/question.model"

export async function viewQuestion(params:ViewQuestionParams) {
    try{
        await connectToDatabase()
        const {questionId,userId} = params
  
  if(userId)
  {
   
    const existingInteraction = await Interaction.findOne({
        user:userId,
        action:"view",
        question:questionId

    })
    if(existingInteraction) return console.log('User has already upvoted');
    await Question.findByIdAndUpdate(questionId,{$inc:{views:1}})
  }
  await Interaction.create({
    user:userId,
    action:"view",
    question:questionId
  })
    }
    catch(error)
    {
        console.log(error);
    }
    
}