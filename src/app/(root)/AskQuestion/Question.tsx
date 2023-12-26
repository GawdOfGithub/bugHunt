"use client"
import React,{useRef} from 'react'
import {formSchema} from '@/schema/schema'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '../components/ui/button'
import { Editor } from '@tinymce/tinymce-react'
import { Badge } from '../components/ui/badge'
import { useRouter,usePathname } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { useState } from 'react'
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
  mongoUser:string
}
const Question = (props: Props) => {
const router = useRouter()
const pathname = usePathname()


 const [isSubmitting, setIsSubmitting] = useState(false);
 
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionTitle: "",
      explanation:"",
      tags:[],
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    setIsSubmitting(true)
    try{
      await createQuestion({
        title:values.questionTitle,
        content:values.explanation,
        tags:values.tags,
        path:"/",
        author:JSON.parse(props.mongoUser)
      })
      router.push('/')
    }
    catch(error)
    {
        console.log(error);
    }
    finally{
      setIsSubmitting(false)
    }
  
  }
   const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement> ,field:any)=>
   {
    if(field.name==="tags" && e.key==="Enter")
    {
      e.preventDefault()
const tagInput = e.target as HTMLInputElement;
const tagValue = tagInput.value.trim()
if(tagValue!=='')
{
  if(tagValue.length>15)
  {
    return form.setError('tags', {
      type:'required',
      message:"Tag must be less than 15 characters"
    })
  }
  if(!field.value.includes(tagValue as never))
  {
    form.setValue('tags', [...field.value,tagValue])
    tagInput.value=''
    form.clearErrors('tags')

  }
  else{
    form.trigger()
  }
}
    }
   }
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="questionTitle"
          render={({ field }) => (
            <>
            <FormItem>
              <FormLabel className='text-black dark:text-white'>Question Title</FormLabel>
              <FormControl>
                <Input placeholder="Ask a question" {...field} />
              </FormControl>
              <FormDescription>
                Be specific and imagine that you are asking question to another user
              </FormDescription>
              <FormMessage />
            </FormItem>
            </>
            )}/>
            <FormField
          control={form.control}
          name="explanation"
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
            <FormField
          control={form.control}
          name="tags"
         
          render={({ field }) => (
          
            <>
            <FormItem>
          <FormLabel className='text-black dark:text-white'>Tags</FormLabel>
          <FormControl>
            <>
            <Input placeholder="Add the tags " onKeyDown={(e)=>handleKeyPress(e,field)}  />
           
            {field.value.length > 0 && (
              <>
  <div className='flex-start mt-2.5 gap-2.5'>
    
      {field.value.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
   
  </div>
  </>
)}
            </>
          </FormControl>
          <FormDescription>
            Press enter to add tags
          </FormDescription>
          <FormMessage />
        </FormItem>
            </>
            )}/>
              <Button type="submit" disabled={isSubmitting}>Ask a question</Button>
            </form>
    </Form>
    </>)
          }
          export default Question
          
              

