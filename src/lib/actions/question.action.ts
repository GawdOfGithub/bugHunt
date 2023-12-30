"use server"
import Question from "@/database/question.model";
import { connectToDatabase } from "./mongoose";
import Tag from "@/database/tag.model";
import User from "@/database/user.modal";
import Answer from "@/database/answer.model";
import { GetQuestionParams,getQuestionById,QuestionVoteParams, DeleteQuestionParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";



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

            await Interaction.create({
                user:author,
                action:"ask_question",
                question:question._id,
                tags:tagDocuments
            })
            await User.findByIdAndUpdate(author,{$inc:{reputation:5}})
            revalidatePath(path)

    }
    catch(error)
    {
        console.log(error);
    }
}
 export async function getQuestionById({id}:getQuestionById)
 {
   try
    {
        connectToDatabase()
    console.log(id);
    const question = await Question.findById(id)
    .populate({
        path: 'tags',
        model: Tag,
        select: '_id name'
      })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture'
      })
      .populate({
        path: 'answers',
        model: Answer,
        select: '_id content views upvotes downvotes',
        populate: {
          path: 'author', 
          model: User,
          select: '_id clerkId name picture' 
        }
      });
    return question
  
    }
    catch(error)
    {
        console.log(error);
    }

}
export async function getQuestions(params:GetQuestionParams) {
    try{
        connectToDatabase() 
        const {searchQuery,filter,page=1,pageSize=5} = params
        const skipAmount = (page-1)* pageSize

        const query:FilterQuery<typeof Question> ={}
        if(searchQuery){
            query.$or = [
            {title:{$regex:new RegExp(searchQuery,"i")}},
            {content:{$regex:new RegExp(searchQuery,"i")}}
            ]
        }
        let sortOptions = {}
        switch(filter){
            case "newest":
                sortOptions = {createdAt:-1}
                break;
        
        case "frequent":
            sortOptions = {views:-1}
            break;
            case "recommended":
                sortOptions = {views:-1}
                break;
            case "unanswered":
                query.answers = {$size:-1}
                break
        }

        const questions = await Question.find(query)
        .populate({path:'tags',model:Tag})
        .populate({path:'author', model:User})
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize)
        const totalQuestions = await Question.countDocuments(query)
        const isNext = totalQuestions/5 +1
    
        return {questions,isNext}

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

export async function getSavedQuestionById({id}:getQuestionById)
 {
   try
    {
        connectToDatabase()
    console.log(id);
    const question = await Question.findById(id)
    .populate({
        path: 'tags',
        model: Tag,
        select: '_id name'
      })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture'
      })
      .populate({
        path: 'answers',
        model: Answer,
        select: '_id content views upvotes downvotes',
        populate: {
          path: 'author', 
          model: User,
          select: '_id clerkId name picture' 
        }
      });
    return question
  
    }
    catch(error)
    {
        console.log(error);
    }

}
export async function deleteQuestion (params:DeleteQuestionParams) {
  try {
    connectToDatabase()
    const {questionId,path} = params
   await Question.deleteOne({_id:questionId})
   await Answer.deleteMany({question:questionId})
   await Interaction.deleteMany({question:questionId})
   revalidatePath(path)
  } catch (error) {
    console.error(error);
  }
}
//9 min 6 sec video 1
export async function getTopQuestions() {
  try {
    const topQuestions = await Question.find({})
    .sort({views:-1,upvotes:-1})
    .limit(10)
 return topQuestions
  } catch (error) {
    console.error(error);
  }
}