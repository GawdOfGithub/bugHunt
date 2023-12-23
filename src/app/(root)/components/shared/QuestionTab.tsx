import { getUserQuestions } from "@/lib/actions/user.action"
import getUserById from "@/lib/actions/user.action"
import QuestionCard from "./QuestionCard"
import QuestionTabCard from "./QuestionTabCard"

interface Props{
user:string
clerkId?:string
}

const QuestionTab = async({user}:Props)=>
{
    

    
    // const id = await getUserById({
    //     user
    // })
    const result = await getUserQuestions({userId:user})
    
   
   
    // return(
    //     <>
    //      {result?.questions.map((question)=>{
    //         <QuestionCard
    //         key={question._id}
    //     _id={question._id}
    //     title={question.title}
    //     tags={question.tags}
    //     author={question.author}
    //     upvotes={question.upvotes.length}
    //     downvotes={question.downvotes}
    //     views={question.views}
            
            
    //         />
    //     })}
    //     </>
    // )
    return (
        <>
      <QuestionTabCard result={result}/>
        </>
    )
}
export default QuestionTab