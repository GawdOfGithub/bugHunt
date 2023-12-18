"use client"
import React,{useRef} from 'react'
import {answerFormSchema} from '@/schema/schema'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '../components/ui/button'
import { Editor } from '@tinymce/tinymce-react'
import { Badge } from '../components/ui/badge'
import { useRouter,usePathname } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { useState } from 'react'
import { createAnswer } from '@/lib/actions/answer.action'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from  '../components/ui/form'
import { Input } from '../components/ui/input'
import { createQuestion } from '@/lib/actions/question.action'
import { redirect } from 'next/navigation'

type Props = {
  mongoUser:string,
  question:string
}
const Test = ({mongoUser,question}: Props) => {
const router = useRouter()
const pathname = usePathname()


 const [isSubmitting, setIsSubmitting] = useState(false);
 
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof answerFormSchema>>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      answer:""
    },
  })
  async function onSubmit(values: z.infer<typeof answerFormSchema>) {
    try
    
    {
        await createAnswer({
            content:values.answer,
            author:JSON.parse(mongoUser),
            question:JSON.parse(question),
            path:"/"


        })
  
    console.log(values);
   
  
  }
  catch(error)
  {
    console.log(error);
  }
}
   
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       
            <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <>
            <FormItem>
            <FormLabel className='text-black dark:text-white'>Detailed answer of your question</FormLabel>
              <FormControl>
              <Editor 
            apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
            //@ts-ignore
      onInit={(evt, editor) => editorRef.current = editor}
      onBlur={field.onBlur}
      onEditorChange={(content)=>field.onChange(content)}
      init={{
        height: 500,
        width:500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor','codesample',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
        ' codesample| bold italic backcolor | alignleft aligncenter ' +
        'align alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
              </FormControl>
              <FormDescription>
              Be specific and imagine that you are asking question to another user
              </FormDescription>
              <FormMessage />
            </FormItem>
            </>
            )}/>
          
              <Button type="submit" disabled={isSubmitting}>Add an answer</Button>
            </form>
    </Form>
    </>)
          }
          export default Test
          
              

