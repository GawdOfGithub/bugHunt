import { getUserQuestions } from "@/lib/actions/user.action"
import QuestionCard from "./QuestionCard"

interface Props{
userId:string
clerkId?:string
}

const QuestionTab = async({userId,clerkId}:Props)=>
{
    const result = await getUserQuestions({
        userId
    })
    return(
        <>
        {result?.questions.map((question)=>{
            <QuestionCard
            key={question._id}
        _id={question._id}
        title={question.title}
        tags={question.tags}
        author={question.author}
        upvotes={question.upvotes.length}
        downvotes={question.downvotes}
        views={question.views}
            
            
            />
        })}
        </>
    )
}