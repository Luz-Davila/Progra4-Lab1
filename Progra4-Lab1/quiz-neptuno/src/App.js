import { useEffect, useState } from "react";

function App() {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [actual, setActual] = useState(0);

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

  const seleccionarRespuesta = (idPregunta, indiceOpcion) => {
    setRespuestas({
      ...respuestas,
      [idPregunta]: indiceOpcion
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
  };
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#ebd7d7",
      fontFamily: "Arial"
    }}>
      
      {preguntas.length === 0 ? (
        <p>Cargando preguntas del quiz...</p>
      ) : resultado === null ? (
        
        <div
          key={actual} 
          style={{
            width: "350px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 3px 10px rgba(4, 4, 4, 0.1)",
            textAlign: "center"
          }}
        >
          
          <h2>Pregunta {actual + 1} de {preguntas.length}</h2>

          <h3>{preguntas[actual].pregunta}</h3>

          {preguntas[actual].opciones.map((op, i) => (
            <div
              key={i}
              onClick={() => seleccionarRespuesta(preguntas[actual].id, i)}
              style={{
                padding: "10px",
                margin: "8px 0",
                borderRadius: "5px",
                cursor: "pointer",
                background:
                  respuestas[preguntas[actual].id] === i
                    ? "#d86ec3"
                    : "#eeeeee"
              }}
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
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center"
          }}
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
