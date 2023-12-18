"use server"
import Question from "@/database/question.model";
import { connectToDatabase } from "./mongoose";
import Tag from "@/database/tag.model";
import User from "@/database/user.modal";
import { GetQuestionParams,getQuestionById,QuestionVoteParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { truncate } from "fs/promises";



export async function createQuestion(params:any)
{
    try
    {
        connectToDatabase()
        const{title,content,tags,author,path} = params;
        const question = await Question.create({
            title,
            content,
            author
        })
        const tagDocuments = []
        for(const tag of tags){
            const existingTag = await Tag.findOneAndUpdate(
               {name:{$regex:new RegExp(`^${tag}$`,"i")}},
              {$setOnInsert:{name:tag},$push:{question:question._id}},
              {upsert:true,new:true}


            )
            tagDocuments.push(existingTag._id)
        }
        await Question.findByIdAndUpdate(question._id,
            {
                $push:{tags:{$each:tagDocuments}}
            })
            revalidatePath(path)

    }
    catch(error)
    {
        console.log(error);
    }
}
 export async function getQuestionById(params:getQuestionById)
 {
   try
    {
        connectToDatabase()
    const {id} = params
    console.log(id);
    const question = await Question.findById(id)
    .populate({path:'tags',model:Tag,select:'_id name'})
    .populate({path:'author',model:User,select:'_id clerkId name picture'})
    return question
  
    }
    catch(error)
    {
        console.log(error);
    }

}
export async function getQuestions() {
    try{
        connectToDatabase() 
        const questions = await Question.find({})
        .populate({path:'tags',model:Tag})
        .populate({path:'author', model:User})
        return {questions}

    }
    catch(error)
    {
        console.log(error);
    }

    
}
export async function upvoteQuestion({hasDownVoted,hasUpvoted,questionId,userId,path}:QuestionVoteParams){
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
            const question = await Question.findByIdAndUpdate(questionId,updateQuery,{new:true})
            if(!question){
                throw new Error("Question not found")
            }
            revalidatePath(path)
    }
    catch(error)
    {
        console.log(error);
    }
}
export async function downvoteQuestion({hasDownVoted,hasUpvoted,questionId,userId,path}:QuestionVoteParams){
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
            const question = await Question.findByIdAndUpdate(questionId,updateQuery,{new:true})
            if(!question){
                throw new Error("Question not found")
            }
            revalidatePath(path)
    }
    catch(error)
    {
        console.log(error);
    }
}

