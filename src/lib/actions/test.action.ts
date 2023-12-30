"use server"
import Test from "@/database/test.model";
import { connectToDatabase } from "./mongoose";
export async function createTest(params:any)
{
    try{
        const {reputation} = params
    
        connectToDatabase()
        console.log("trying");
        const test = await Test.create({
            reputation
        })
    }

    catch(error)
    {
        console.log(error)
    }
}
