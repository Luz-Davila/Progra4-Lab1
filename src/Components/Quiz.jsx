import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const isCorrect =
    selectedAnswer === questions[currentQuestion]?.correctAnswer;

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/69dc1641aaba882197f08d7a", {
      headers: {
        "X-Master-Key":
          "$2a$10$/4mFvhBmVDk213lTxfPibuKLHOdVS/R/4zDYgBwt.V5GSrl.1oDKq",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.record);
      })
      .catch((error) => console.error(error));
  }, []);

  if (currentQuestion >= questions.length && questions.length > 0) {
    return (
      <div className="quiz-container">
        <h2>Quiz terminado 🎉</h2>
        <p>✅ Correctas: {score}</p>
        <p>❌ Incorrectas: {incorrect}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
     
      {isCorrect && <Confetti />}

      <h2>Quiz de Informática - Luz :)</h2>

      <p>
        Pregunta {currentQuestion + 1} de {questions.length}
      </p>

      {questions.length > 0 ? (
        <div>
    
          <div className="question">
            {questions[currentQuestion].question}
          </div>

          {questions[currentQuestion].answers.map((answer, index) => {
            let className = "";

            if (selectedAnswer !== null) {
              if (index === questions[currentQuestion].correctAnswer) {
                className = "correct";
              } else if (index === selectedAnswer) {
                className = "incorrect";
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => setSelectedAnswer(index)}
              >
                {answer}
              </button>
            );
          })}

          <button
            disabled={selectedAnswer === null}
            onClick={() => {
              if (
                selectedAnswer ===
                questions[currentQuestion].correctAnswer
              ) {
                setScore(score + 1);
              } else {
                setIncorrect(incorrect + 1);
              }

              setCurrentQuestion(currentQuestion + 1);
              setSelectedAnswer(null);
            }}
          >
            Siguiente
          </button>

          <p className="result-summary">
            ✅ Correctas: {score} | ❌ Incorrectas: {incorrect}
          </p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}