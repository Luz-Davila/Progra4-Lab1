import { useEffect, useState } from "react";
import "./QuizNeptuno.css";

// Componente principal del quiz de Neptuno
function App() {
  // Estado para almacenar la lista de preguntas obtenidas de la API
  const [preguntas, setPreguntas] = useState([]);
  // Estado para almacenar las respuestas seleccionadas por el usuario (clave: id de pregunta, valor: índice de opción)
  const [respuestas, setRespuestas] = useState({});
  // Estado para almacenar el resultado final del quiz (puntos obtenidos)
  const [resultado, setResultado] = useState(null);
  // Estado para el índice de la pregunta actual (empieza en 0)
  const [actual, setActual] = useState(0);

  // Hook useEffect para cargar las preguntas desde la API al montar el componente
  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/69df4a01aaba882197ff2632", {
      headers: {
        "X-Master-Key": "$2a$10$Y9gQSbMH0QojetTPrShSPuHKhia1M.HdMNg.rXsydTwfVw0btkwyu",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setPreguntas(data.record.preguntas);
      })
      .catch(error => console.log(error));
  }, []);

  // Función para seleccionar una respuesta para una pregunta específica
  const seleccionarRespuesta = (idPregunta, indiceOpcion) => {
    setRespuestas({
      ...respuestas,
      [idPregunta]: indiceOpcion
    });
  };

  // Función para avanzar a la siguiente pregunta
  const siguientePregunta = () => {
    if (actual < preguntas.length - 1) {
      setActual(actual + 1);
    }
  };

  // Función para calcular el resultado final del quiz
  const calcularResultado = () => {
    let puntos = 0;

    preguntas.forEach((p) => {
      if (respuestas[p.id] === p.respuestaCorrecta) {
        puntos++;
      }
    });

    setResultado(puntos);
  };

  // Función para reiniciar el quiz a su estado inicial
  const reiniciarQuiz = () => {
    setRespuestas({});
    setResultado(null);
    setActual(0);
  };
  return (
    <div className="quiz-container">
      
      {preguntas.length === 0 ? (
        <p>Cargando preguntas del quiz...</p>
      ) : resultado === null ? (
        
        <div
          key={actual} 
          className="question-container"
        >
          
          <h2>Pregunta {actual + 1} de {preguntas.length}</h2>

          <h3>{preguntas[actual].pregunta}</h3>

          {preguntas[actual].opciones.map((op, i) => (
            <div
              key={i}
              onClick={() => seleccionarRespuesta(preguntas[actual].id, i)}
              className={`option ${respuestas[preguntas[actual].id] === i ? 'selected' : ''}`}
            >
              {op}
            </div>
          ))}

          {actual < preguntas.length - 1 ? (
            <button onClick={siguientePregunta}>
              Siguiente
            </button>
          ) : (
            <button onClick={calcularResultado}>
              Ver resultado
            </button>
          )}
        </div>

      ) : (
        <div
          key="resultado" 
          className="result-container"
        >
          <h2>Resultado final</h2>
          <h1>{resultado} / {preguntas.length}</h1>

          <button onClick={reiniciarQuiz}>
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
