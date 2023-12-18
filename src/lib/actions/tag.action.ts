"use server"
import Question from "@/database/question.model";

import { connectToDatabase } from "./mongoose";
import Tag from "@/database/tag.model";
import User from "@/database/user.modal";
import { GetQuestionParams } from "./shared.types";
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