import { useState, useEffect } from 'react';

import QuestionCard from './QuestionCard';
import QuizResultsDashboard from './QuizResultsDashboard';

function Quizdashboard() {
    const [questions, setQuestions] = useState([]);
    const [correctAnswersCount, setcorrectAnswersCount] = useState(0);
    const [isQuizCompleted, setIsQuizcompleted] = useState(false);

    const shuffleArray =(array)=>{
        //fisher-yates shuffle algorithm
        let arrayLength= array.length;
        for(let i=arrayLength-1;i>0;i--){
            const j= Math.floor(Math.random()* (i+1));
            [array[i],array[j]]= [array[j],array[i]];
        }
        return array;
    }
    const fetchQuestions = async function () {

        try {
            const repsonse = await fetch('https://the-trivia-api.com/api/questions?limit=10');
            const data = await repsonse.json();
            const formattedQuestions = data.map((question)=>({
                ...question,
                options: shuffleArray([...question.incorrectAnswers, question.correctAnswer]),
            }));
            console.log(formattedQuestions);
            setQuestions(formattedQuestions);

        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleSubmit = () => {
        setIsQuizcompleted(true);
    }

    const updateScore = (isCorrect) => {

        if (isCorrect) {
            
            setcorrectAnswersCount((prevCount) => prevCount + 1); 

        } 
    }


    return (
        <div className='quiz-container'>
            {!isQuizCompleted ? (
                <div>
                    <ul>

                        {
                            questions && questions.map((q) => (
                                <QuestionCard
                                    key={q.id}
                                    question={q.question}
                                    options={q.options}
                                    correctAnswer={q.correctAnswer}
                                    updateScore={(isCorrect) => updateScore(isCorrect)}
                                />
                            ))
                        }
                    </ul>
                    <div>
                        <button id='submit' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            ) : (
                <QuizResultsDashboard correctAnswersCount={correctAnswersCount} />
            )}
        </div>
    )
}

export default Quizdashboard;