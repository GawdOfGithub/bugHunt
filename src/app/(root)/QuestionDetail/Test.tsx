'use client'
import React, { useRef } from 'react';
import { answerFormSchema } from '@/schema/schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Editor } from '@tinymce/tinymce-react';
import { Badge } from '../components/ui/badge';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { useState } from 'react';
import { createAnswer } from '@/lib/actions/answer.action';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { createQuestion } from '@/lib/actions/question.action';
import { redirect } from 'next/navigation';
import Link from 'next/link';
type Props = {
  mongoUser: string;
  question: string;
};

const Test = ({ mongoUser, question }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const route = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof answerFormSchema>>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      answer: '',
    },
  });

  async function onSubmit(values: z.infer<typeof answerFormSchema>) {
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(mongoUser),
        question: JSON.parse(question),
        path: '/',
      });
      route.push('/');

      console.log(values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <div className="mb-12">
            <FormLabel className="text-black text-5xl font-extrabold dark:text-yellow-500 sm:ml-12 mb-4">
              Please provide a detailed answer... 🚀
            </FormLabel>
            <FormDescription className="text-gray-600">
              Be as specific as possible
            </FormDescription>
          </div>

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  //@ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'codesample',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      ' codesample| bold italic backcolor | alignleft aligncenter ' +
                      'align alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style:
                      'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
                  }}
                />
              </FormControl>
            )}
          />

          <div className="mt-6">
            <Button type="submit" disabled={isSubmitting}>
              Add an answer
            </Button>
          </div>
          <div className="mt-4 ">
            <Link href="/QnA">
          <Button className='bg-red-600' type="button">Check solutions by others</Button>
          </Link>
        </div>
        </form>

       
      </Form>
    </>
  );
};

export default Test;
