/* eslint-disable no-undef */
import { useCallback, useState } from "react"

export const DownloadQuestions =  () => {
    const [questions, setQuestions] = useState([]);

  const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "api"

    const fetchQuestions = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/questions`);
            const data = await response.json();
            setQuestions(data)
        } catch (error) {
            console.error("Error fetching questions:", error)
        }
    }, [API_BASE_URL])

    return { questions, setQuestions, fetchQuestions };
}