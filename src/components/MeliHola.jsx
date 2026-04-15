import { useEffect, useState } from 'react'
import './MeliHola.css'

export default function MeliHola() {

  //declaramos estados 
  const [phrase, setPhrase] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [name, setName] = useState('Melissa');
  

  //cargamos la frase motivacional al iniciar el componente
   useEffect(() => { //useEffect se ejecuta al montar el componente
    const fetchPhrase = async () => { // srive para obtener datos de una API de forma asincrona
      try {
        const response = await fetch(`https://www.positive-api.online/phrases/esp`); // hacemos la petición a la API utilizando el número aleatorio generado
        const data = await response.json();
        
        setPhrase(data); // actualizamos el estado con la frase obtenida de la API
      } catch (error) {
        console.error("Error fetching phrase:", error);
      } 
      finally 
      {
          setRandomNumber(Math.floor(Math.random() * 40));
      }
    };//aqui termina el metodo cons motivacion 

    fetchPhrase(); // llamamos a la función para obtener la frase
  }, []); // el array vacío [] indica que este efecto se ejecutará solo una vez al montar el componente


  return (
    <div>
    <section className="saludo">
      <h2 className="saludo_title">¡Hola, {name}!</h2>

      <p className="saludo_extra">
        ¡Bienvenida a tu componente en React!
      </p>

      <button onClick={() => setName('Melissa Dev')}>
        Cambiar Nombre
      </button>
      <div>
      <h1 className='saludo_title'> Frase del dia</h1>
      <p>
        {phrase[randomNumber]?.text}
      </p>

       <button onClick={() => { setRandomNumber(Math.floor(Math.random() * 40)) }}>
          
        Cambiar frase
      </button> 
    </div>
    </section>
    
    </div>
  )
}