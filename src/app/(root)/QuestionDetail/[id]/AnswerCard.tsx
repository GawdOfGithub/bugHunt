import React from 'react';
import { Badge } from '../../components/ui/badge';
import Link from 'next/link';
import Votes from '../../components/shared/Votes';
import { auth } from '@clerk/nextjs';
import getUserById from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import ParseHTML from '../../components/shared/ParseHTML';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';

type Author = {
  _id: ObjectId;
  clerkId: string;
  name: string;
  picture: string;
};

type Answer = {
  _id: ObjectId;
  content: string;
  views: number;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
  author: Author;
};
type TagType = {
  _id?: number;
  name?: string;
};

type AuthorType = {
  _id?: number;
  name?: string;
  picture?: string;
};
type answers = Answer[];

type Props = {
  _id: string;
  title: string;
  downvotes: number[];
  tags: TagType[];
  author: AuthorType; // Change 'authors' to 'author' since it's a single object
  upvotes: number[];
  views: number;
  answers: {
    _id: string;
    content: string;
    views: number;
    author: {
      _id: string;
      name: string;
      picture: string;
    };
  }[];
};

const AnswerCard = async ({ _id, author, downvotes, title, tags, upvotes, answers,views}: Props) => {
  try {
    (`This is coming from here${answers[0]}`);
    const { userId } = auth();
    if (!userId) redirect('/sign-in');

    const mongoUser = await getUserById({ userId });
    return (
      <div className="flex flex-col bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-md shadow-md mb-6">
        <div className="flex justify-between items-center mb-5">
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
            views ={views}
          />
        </div>
        <div className="flex gap-2 mb-4">
          {tags.map((item) => (
            <Badge key={item._id}>{item.name}</Badge>
          ))}
        </div>
        <div className="flex gap-10">
          <div key={author._id} className="flex gap-52 mt-10">
            <Avatar>
              <AvatarImage src={author.picture} alt={author.name} height="40" width="40" />
              <AvatarFallback>{author?.name?.slice(0, 1)?.toUpperCase() ?? ''}</AvatarFallback>

            </Avatar>
            <div>{author.name}</div>
          </div>
        </div>
        <div>
          {answers.map((item: any) => (
            <div key={item._id} className="flex flex-col mt-4">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={item.author.picture} alt={item.author.name} height="40" width="40" />
                  <AvatarFallback>{item.author.name.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-2">{item.author.name}</div>
              </div>
              <div className="mt-2">
                <ParseHTML data={item.content} />
              </div>
              <Votes
                type="answer"
                upvotes={item.upvotes.length}
                downvotes={item.downvotes.length}
                itemId={JSON.stringify(item._id)}
                userId={JSON.stringify(mongoUser._id)}
                hasUpvoted={item.upvotes.includes(mongoUser._id)}
                hasDownVoted={item.downvotes.includes(mongoUser._id)}
                isSaved={mongoUser?.saved.includes(_id)}
                views={item.views}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default AnswerCard;
