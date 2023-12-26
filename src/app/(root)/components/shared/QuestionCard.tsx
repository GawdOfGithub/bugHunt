import React from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import Votes from './Votes';
import { auth } from '@clerk/nextjs';
import getUserById from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
import Image from 'next/image';

type TagType = {
  _id?: number;
  name?: string;
};

type AuthorType = {
  _id?: number;
  name?: string;
  picture?: string;
};

type Props = {
  _id: string;
  title: string;
  downvotes: number[];
  tags: TagType[];
  author: AuthorType; // Change 'authors' to 'author' since it's a single object
  upvotes: number[];
  views: number;
};

const QuestionCard = async ({ _id, author, downvotes, title, tags, upvotes,views }: Props) => {
  try {
    const { userId } = auth();
    if (!userId) redirect('/sign-in');

    const mongoUser = await getUserById({ userId });
    console.log(mongoUser);

    return (
      <div className="flex flex-col  text-black dark:text-white p-6 rounded-md shadow-md ">
        <div className="flex justify-between items-center mb-5 ">
          
          <Link href={`QuestionDetail/${_id}`}>
            <h1 className="font-extrabold text-3xl cursor-pointer">{title}</h1>
          </Link>
          <Votes
            type="question"
            upvotes={upvotes.length}
            downvotes={downvotes.length}
            itemId={JSON.stringify(_id)}
            userId={JSON.stringify(mongoUser._id)}
            hasUpvoted={upvotes.includes(mongoUser._id)}
            hasDownVoted={downvotes.includes(mongoUser._id)}
            isSaved={mongoUser?.saved.includes(_id)}
            views={views}
          />
        </div>
        <div className="flex gap-2 mb-4">
          {tags.map((item) => (
            <Badge key={item._id}>{item.name}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={author.picture}
           height={30}
           width={30}
            alt="Author's Profile Picture"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{author.name}</h2>
            <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default QuestionCard;
