

function QuestionCard({ question, options, correctAnswer, updateScore }) {
    const handleSelect = (event) => {
        if (event.target.innerText == correctAnswer) {
            event.target.classList.add("correct");
            updateScore(true);
            
        } else {
            event.target.classList.add("incorrect");
            updateScore(false);
            
        }
        const buttons = event.target.parentNode.parentNode.querySelectorAll("button");
        buttons.forEach((btn) => {
            btn.disabled = true; // Disable all options
            if (btn.innerText === correctAnswer) {
                btn.classList.add("correct"); // Highlight the correct option
            }
        });
    }
    return (
        <div className="questionClass">
            <h3>{question}</h3>

            <ul>
                {
                    options && options.map((option, index) => (
                        <li key={index + 1}><button onClick={handleSelect}>{option}</button></li>
                    ))
                }
            </ul>


        </div>
    )
}

export default QuestionCard;