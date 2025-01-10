import { useCallback, useState } from "react"

export const DownloadQuestions =  () => {
    const [questions, setQuestions] = useState([]);

    const fetchQuestions = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/questions");
            const data = await response.json();
            setQuestions(data)
        } catch (error) {
            console.error("Error fetching questions:", error)
        }
    }, [])

    return { questions, setQuestions, fetchQuestions };
}