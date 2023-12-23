import React from 'react';
import Votes from './Votes';
interface Mapper {
  _id: string;
  title: string;
  views: number;
  upvotes: string[];
  downvotes: string[];
}

const QuestionTabCard: React.FC<{ result: { questions: Mapper[] } }> = ({ result }) => {
    return (
        <>
          {result?.questions.map((question: Mapper) => (
            <div key={question._id} className="border p-4 my-4 rounded-md shadow-md">
              <h3 className="text-xl font-bold mb-2">{question.title}</h3>
              <p className="text-gray-600">Views: {question.views}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-green-500">Upvotes: {question.upvotes.length}</p>
                <p className="text-red-500">Downvotes: {question.downvotes.length}</p>
              </div>
            </div>
          ))}
        </>
      );
      
};

export default QuestionTabCard;
