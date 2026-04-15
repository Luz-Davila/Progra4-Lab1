import { useState, useEffect } from 'react'
import './SaludoLuz.css'

export default function SaludoLuz() {
  const [name, setName] = useState('Luz')
  const [data ,SetData]=useState([]);
  const [randomIndex, setRandomIndex] = useState(1);

  useEffect(() => {
   const fetchData = async () => {
    try{
    const response = await fetch(`https://positive-api.online/phrase/esp/${randomIndex}`);
    const data = await response.json()
    SetData(data)
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
   }
   fetchData();
   }, [randomIndex]);
   
    const handleButtonClick = () => {
        const randomIndex = Math.floor(Math.random() * 40) + 1;
        setRandomIndex(randomIndex);
    }

  return (
    <section className="saludo">
      <h2 className="saludo_title">¡Hola, {name}!</h2>

      <p className="saludo_extra">
        ¡Bienvenida a tu componente en React!
      </p>

       <button onClick={() => setName('Luz Dev')}>
        Cambiar nombre
      </button>

    <p className="saludo_frase">
      {data?.text || "Cargando frase..."}
    </p>

      <button onClick={handleButtonClick}>
      Siguiente frase
    </button>
    </section>
  )
}