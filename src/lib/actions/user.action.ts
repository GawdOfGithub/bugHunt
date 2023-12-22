"use server"
import User from "@/database/user.modal"
import Tag from "@/database/tag.model"

import { connectToDatabase } from "./mongoose"
import { CreateUserParams, DeleteUserParams, GetSavedQuestionsParams, ToggleSavedQuestionParams, UpdateUserParams,GetUserByIdParams, GetUserStatsParam } from "./shared.types"
import { revalidatePath } from "next/cache"
import { FilterQuery } from "mongoose"
import Question from "@/database/question.model"
import Answer from "@/database/answer.model"
export default async function getUserById(params:any)
{
    try{
        connectToDatabase()
        const{userId} = params
        const user = await User.findOne({clerkId:userId})
        return user
        console.log(user);
    }
    catch(error)
    {
        console.log(error);
    }
}
export async function getAllUsers() {
    try {
        connectToDatabase();
        const users = await User.find({});
        console.log(users);
        return users;
    } catch (error) {
        console.log(error);
        throw error; // You might want to rethrow the error to handle it elsewhere
    }
}

export async function createUser(userData:CreateUserParams)
{
    try{
        connectToDatabase()
        const newUser = await User.create(userData)
    }
    catch(error)
    {
        console.log(error);
    }
}
    export async function updateUser(params:UpdateUserParams)
    {
       try
        {
           connectToDatabase()
            const {clerkId,updateData,path} = params
            await User.findOneAndUpdate({clerkId},updateData,{
                new:true
            })
            revalidatePath(path)
        }
        catch(error)
        {
            console.log(error);
        }
    }
    // export async function deleteUser(params:DeleteUserParams)
    // {
    //     try{
    //         connectToDatabase()
    //         const{clerkId} = params
    //         const user = await User.findOneAndDelete({clerkId})
    //         if(!user)
    //         {
    //             throw new Error('User not found')
    //         }
    //         const userQuestionsIds = await Question.find({
    //             author:user._id
    //         }).distinct('id')

    //     }
    //     catch(error)
    //     {
    //         console.log(error);
    //     }
    // }
    export async function toggleSavedQuestion(params:ToggleSavedQuestionParams)
    {
        try{
            connectToDatabase()
            const{userId,questionId,path} = params
            const user = await User.findById(userId)
            if(!user)
            {
                throw new Error('Error not found')
            }
            const isQuestionSaved = user.saved.includes(questionId)

            if(isQuestionSaved)
            {
                await User.findByIdAndUpdate(userId, 
                    {$pull:{saved:questionId}},
                    {new:true}
                    )

            }
            else{
                await User.findByIdAndUpdate(userId,
                    {$addToSet:{saved:questionId}},
                    {new:true}
                    )
                }
                revalidatePath(path)
            }

                    catch(error)
                    {
                        console.log(error);
                    }
            
        }
    
export async function getSavedQuestions(params:GetSavedQuestionsParams)
{
    try
    {
        connectToDatabase()
        const{clerkId,page=1,pageSize=10,filter,searchQuery} = params;
        const query: FilterQuery<typeof Question> = searchQuery ? {
            title:{$regex:new RegExp(searchQuery,'i')}}:{}
        
    const user = await User.findOne({clerkId}).populate({
        path:'saved',
        match:query,
        options:{
            sort:{
                createdAt:-1
            },
            populate:[
                {path:'tags', model:Tag, select:"_id name"},
                {path:'author', model:User, select:'_id clerkId name picture' }
            ]


        }
    })
    if(!user){
        throw new Error('User not found')
    }
    const savedQuestions = user.saved;
    return{questions:savedQuestions}

    }
    catch(error)
    {
        console.log(error);
    }
}

export async function getUserInfo(params:GetUserByIdParams)
{
    try{
        connectToDatabase()
        const {userId} = params
        const user = await User.findOne({clerkId:userId})
        if(!user)
        {
            throw new Error('User not found')
        }
        const totalQuestions = await Question.countDocuments({author:user._id})
        const totalAnswers = await Answer.countDocuments({author:user._id})
        return{
            user,
            totalQuestions,
            totalAnswers
        }
    }
    
    catch(error)
    {
        console.log(error);
    }

}
export async function getUserQuestions(params:GetUserStatsParam) {
    try{
        connectToDatabase()
        const {userId,page=1,pageSize} = params
        const totalQuestions = await Question.countDocuments({author:userId})
        const userQuestions = await Question.find({author:userId})
        .sort({views:-1,upvotes:-1})
        .populate('tags ','_id,name')
        .populate('author','_id clerkId name picture')

        return{totalQuestions,questions:userQuestions}

    }
    catch(error)
    {
        console.log(error);
    }

}
export async function getUserAnswers(params:GetUserStatsParam)
{
    try
    {
        connectToDatabase()
        const {userId,page=1} = params
        const totalAnswers = await Answer.countDocuments({author:userId})
        const userAnswer = await Answer.find({author:userId})
        .sort({views:-1 ,upvotes:-1})
        .populate('question','_id title')
        .populate('author', '_id clerkId name picture')
        return {totalAnswers,answers:userAnswer}

    }
    catch(error)
    {
        console.log(error);
    }
}
