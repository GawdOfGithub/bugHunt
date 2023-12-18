"use client"

import { z } from "zod";

const formSchema = z.object({
    questionTitle: z.string().min(1, {
      message: "You cannot leave the question empty.",
    }),
    explanation:z.string(),
    tags:z.array(z.string().min(1).max(15).min(1).max(10))
    
  })

  const answerFormSchema = z.object({
    answer:z.string().min(1,{
      message:"You can't leave the answer empty"
    }),
  
  })
  export { formSchema, answerFormSchema };
