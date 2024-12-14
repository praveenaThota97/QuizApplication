import './QuizResults.css';
function QuizResultsDashboard({correctAnswersCount}){
    return(
        <div className="results-container">
                <p className='scoreSection'>Your Score: <span className="score">{correctAnswersCount}</span></p>
                {
                    correctAnswersCount > 5?(
                        <div className="celebration">
                            <div className="message">
                                <h2>🎉 Yay!! You scored well! 🎉</h2>
                                <p>Congratulations on your amazing performance!</p>
                            </div>
                            
                        </div>
                    ):(
                        <div className="encouragement">
                            <h2>Better Luck Next Time!</h2>
                            <p>Don't give up! Keep practicing to improve your score. 😊</p>
                        </div>

                    )  
                }
        </div>
    )
}

export default QuizResultsDashboard;