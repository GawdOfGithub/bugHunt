"use server"
import User from "@/database/user.modal"

import { connectToDatabase } from "./mongoose"
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types"
import { revalidatePath } from "next/cache"
import Question from "@/database/question.model"
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
