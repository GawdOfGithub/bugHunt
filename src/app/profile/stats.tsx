import React from 'react';
import QuestionTab from '@/app/(root)/components/shared/QuestionTab';

type Props = {
  totalQuestions: number;
  totalAnswers: number;
  userId: string;
};

type StatsCardProps = {
  emoji: string;
  value: number;
  title: string;
};

const StatsCard = ({ emoji, value, title }: StatsCardProps) => {
  return (
    <div className='flex flex-col items-center'>
      <span role="img" aria-label={title} className='text-4xl'>{emoji}</span>
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
        <StatsCard emoji='📚' value={totalQuestions} title='Questions' />
        <StatsCard emoji='💬' value={totalAnswers} title='Answers' />
        {/* Add more StatsCard components as needed */}
      </div>
    </div>
  );
};

export default Stats;
