import React from 'react';
import QuestionTab from '@/app/(root)/components/shared/QuestionTab';
import Image from 'next/image';

type Props = {
  totalQuestions: number;
  totalAnswers: number;
  userId: string;
};

type StatsCardProps = {
  emojiOrImage: string | JSX.Element;
  value: number;
  title: string;
};

const StatsCard = ({ emojiOrImage, value, title }: StatsCardProps) => {
  return (
    <div className='flex flex-col items-center'>
      {typeof emojiOrImage === 'string' ? (
        <span role="img" aria-label={title} className='text-4xl'>
          {emojiOrImage}
        </span>
      ) : (
        <div className='image-container'>
          {emojiOrImage}
        </div>
      )}
      <p className='font-semibold text-lg mt-2'>{value}</p>
      <p className='font-medium text-gray-600'>{title}</p>
    </div>
  );
};

const Stats = ({ totalQuestions, totalAnswers, userId }: Props) => {
  return (
    <div className='mt-10'>
      <h4 className='text-2xl font-semibold mb-3'>Stats</h4>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        <StatsCard emojiOrImage='📚' value={totalQuestions} title='Questions' />
        <StatsCard emojiOrImage='💬' value={totalAnswers} title='Answers' />
        <StatsCard emojiOrImage=<Image
          src="/medal.svg"
          alt=""
          width={40}
          height={40}
          className=""
        
        /> value={0} title='Medals-Earned' />
        {/* Add more StatsCard components as needed */}
      </div>
    </div>
  );
};

export default Stats;
