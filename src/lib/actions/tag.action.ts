"use server"
import Question from "@/database/question.model";

import { connectToDatabase } from "./mongoose";
import Tag, { ITag } from "@/database/tag.model";
import User from "@/database/user.modal";
import { GetQuestionParams, getQuestionByTagIdParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function getAllQuestionsByTags({params}:any)
{

    const {id} = params
    try
    {
        connectToDatabase()

        
        const tag = Tag.findById({id})
        return tag

    }
    catch(error)
    {
        console.log(error);
    }

}
export asysnc function getQuestionsByTagId(params:getQuestionByTagIdParams)
{
    try
    {
        connectToDatabase()
        const {tagId,page=1,pageSize=10,searchQuery} = params
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
        const tagFilter: FilterQuery<ITag> = searchQuery ? {
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