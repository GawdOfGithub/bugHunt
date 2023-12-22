import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "../../QuestionDetail/[id]/AnswerCard";

type Props = 
{
    userId:string;
    clerkId:string|null
}
const AnswerTab = async({userId,clerkId}:Props)=>
{
    const result = await getUserAnswers({
        userId,
        page:1
    })
    return (
        <>
        {result?.answers.map((item)=>(
            <AnswerCard 
        
        ))
        }
        </>
    )

}

