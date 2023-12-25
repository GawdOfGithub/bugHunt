import React from 'react';
import { TagData } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { getTopQuestions } from '@/lib/actions/question.action';
import RenderTags from './RenderTags';

type Props = {};

const RightSideBar = async (props: Props) => {
  try {
    const QuestionData = await getTopQuestions();
    console.log(QuestionData);

    return (
      <>
        <div className="font-extrabold min-h-screen max-w-[300px] flex flex-col gap-5 sticky left-0 top-0 bg-white text-black dark:bg-black dark:text-white shadow-light-300 light:text-black dark:shadow-none max-sm:hidden p-6 rounded-md">
          <h2 className="text-3xl mb-4">Top Questions</h2>
          {QuestionData?.map((item, index) => (
            <div key={item._id} className="font-normal flex gap-3 items-center hover:font-bold p-2 rounded-md transition duration-300 ease-in-out transform hover:translate-x-2 cursor-pointer">
              <Link href={`/QuestionDetail/${item._id}`}>
                <span>{item.title}</span>
                <Image
                  src="/right-thin-chevron-svgrepo-com.svg"
                  width={10}
                  height={10}
                  alt="Chevron Icon"
                  className="ml-2"
                />
              </Link>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-3xl font-extrabold mb-4">Popular Tags</h2>
            {TagData.map((item, index) => (
              <div key={item._id} className="mb-2">
                <RenderTags totalQuestions={item.totalQuestions} _id={item._id} name={item.name} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
  }
};

export default RightSideBar;
