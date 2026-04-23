import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import "./QuizNeptuno.css";

const clave = import.meta.env.VITE_JSON_MASTER_KEY;

function App() {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [actual, setActual] = useState(0);
  const [validadas, setValidadas] = useState({}); // NUEVO

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/69df4a01aaba882197ff2632", {
      headers: {
        "X-Master-Key": clave,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setPreguntas(data.record.preguntas);
      })
      .catch(error => console.log(error));
  }, []);

  const seleccionarRespuesta = (idPregunta, indiceOpcion) => {
  if (validadas[idPregunta]) return;

  setRespuestas({
    ...respuestas,
    [idPregunta]: indiceOpcion
  });

  const preguntaActual = preguntas.find(p => p.id === idPregunta);

  if (indiceOpcion === preguntaActual.respuestaCorrecta) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  setValidadas({
    ...validadas,
    [idPregunta]: true
  });
};

  const siguientePregunta = () => {
    if (actual < preguntas.length - 1) {
      setActual(actual + 1);
    }
  };

  const calcularResultado = () => {
    let puntos = 0;

    preguntas.forEach((p) => {
      if (respuestas[p.id] === p.respuestaCorrecta) {
        puntos++;
      }
    });

    setResultado(puntos);
  };

  const reiniciarQuiz = () => {
    setRespuestas({});
    setResultado(null);
    setActual(0);
    setValidadas({});
  };

  return (
    <div className="quiz-container">
      
      {preguntas.length === 0 ? (
        <p>Cargando preguntas del quiz...</p>
      ) : resultado === null ? (
        
        <div key={actual} className="question-container">
          
          <h2>Pregunta {actual + 1} de {preguntas.length}</h2>

          <h3>{preguntas[actual].pregunta}</h3>

          {preguntas[actual].opciones.map((op, i) => {
            const id = preguntas[actual].id;
            const esSeleccionada = respuestas[id] === i;
            const esCorrecta = i === preguntas[actual].respuestaCorrecta;
            const yaValido = validadas[id];

            let clase = "option";

            if (yaValido) {
              if (esCorrecta) {
                clase += " correct"; // verde
              } else if (esSeleccionada && !esCorrecta) {
                clase += " incorrect"; // rojo
              }
            } else if (esSeleccionada) {
              clase += " selected";
            }

            return (
              <div
                key={i}
                onClick={() => seleccionarRespuesta(id, i)}
                className={clase}
              >
                {op}
              </div>
            );
          })}

          {validadas[preguntas[actual].id] && (
            <div className="feedback">
              {respuestas[preguntas[actual].id] === preguntas[actual].respuestaCorrecta
                ? "Correcto"
                : "Incorrecto"}
            </div>
          )}

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
        <div key="resultado" className="result-container">
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