import { SetStateAction } from "react"
import AddQuestion from "../AddQuestion/AddQuestion";
import { DownloadQuestions } from "../../DownloadAPIHook/DowloadQuestions";

const FirstPage = () => {
    const { questions, fetchQuestions } = DownloadQuestions();
    return (
        <div className="max-w-[350] m-auto text-center">
            <AddQuestion fetchQuestions={fetchQuestions} setQuizCompleted={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.")
            } } setCurrentQuestionIndex={function (value: SetStateAction<number>): void {
                throw new Error("Function not implemented.")
            } } setScore={function (value: SetStateAction<number>): void {
                throw new Error("Function not implemented.")
            } } />
        </div>
    )
}

export default FirstPage;