import { getUserAnswers } from "@/lib/actions/user.action"
import ParseHTML from "./ParseHTML"
interface Props{
user:string
clerkId?:string
}

const AnswerTab = async({user}:Props)=>
{
    const result = await getUserAnswers({userId:user})

    console.log(result?.answers[0].question);
    return (
        <>
          {result?.answers.map((answer) => (
            <div key={answer._id} className="mb-4 p-4 border rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{answer.question.title}</h2>
              <h3 className="text-lg mb-2"><ParseHTML data={answer.content}/></h3>
              <p className="text-sm text-gray-500">Views: {answer.views}</p>
              <div className="flex space-x-2 text-sm text-gray-500">
                <p>Upvotes: {answer.upvotes.length}</p>
                <p>Downvotes: {answer.downvotes.length}</p>
              </div>
            </div>
          ))}
        </>
      );
      
}
export default AnswerTab