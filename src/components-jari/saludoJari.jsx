import { useState } from 'react'
import './saludoJari.css'

export default function saludoJari() {
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState('Jarinton')

  return (
    <section className="saludo">
      <h2 className="saludo_title">¡Hola, {name}!</h2>

      <p className="saludo_extra">
        ¡Bienvenida a tu componente en React!
      </p>

      <button onClick={() => setName('Jarinton Dev')}>
        Cambiar nombre
      </button>
    </section>
  )
}