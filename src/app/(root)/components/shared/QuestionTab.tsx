import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionTabCard from "./QuestionTabCard";

interface Props {
  user: string;
  clerkId?: string;
}

const QuestionTab: React.FC<Props> = async ({ user }: Props) => {
  
  const result = await getUserQuestions({ userId: user });

  if (!result) {
  
    return <p>No questions found for the user</p>;
  }
  const { questions } = result;

  return (
    <>
      <QuestionTabCard result={result} />
    </>
  );
};

export default QuestionTab;
