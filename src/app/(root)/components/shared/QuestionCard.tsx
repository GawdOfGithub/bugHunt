import React from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';

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
  downvotes: number;
  tags: TagType[];
  author: AuthorType; // Change 'authors' to 'author' since it's a single object
  upvotes: number;
  views: number;
};

const QuestionCard = ({ _id, author, downvotes, title, tags, upvotes }: Props) => {
  return (
   <>
   
   
    <div className="flex flex-col">
    <Link href={`QuestionDetail/${_id}`}>
      <div className="font-extrabold text-3xl mb-5 text-black dark:text-white">{title}</div>
      </Link>
      <div className="flex">
        {tags.map((item) => (
          <Badge key={item._id}>{item.name}</Badge>
        ))}
      </div>
      <div className="flex gap-10">
        <div key={author._id} className="flex gap-52 mt-10">
          
          <h2 className="text-black dark:text-white">{author.name}</h2>
          
          <h5 className="text-black dark:text-white">added 1 week ago</h5>
          <h5 className="text-black dark:text-white">{upvotes} votes</h5>
          <h5 className="text-black dark:text-white">{downvotes} downvotes</h5>
        </div>
      </div>
    </div>
    </>
  );
};

export default QuestionCard;