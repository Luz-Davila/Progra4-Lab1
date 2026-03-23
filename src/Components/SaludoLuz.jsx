import { useState } from 'react'
import './SaludoLuz.css'

export default function SaludoLuz() {
  const [name, setName] = useState('Luz')

  return (
    <section className="saludo">
      <h2 className="saludo_title">¡Hola, {name}!</h2>

      <p className="saludo_extra">
        ¡Bienvenida a tu componente en React!
      </p>

      <button onClick={() => setName('Luz Dev')}>
        Cambiar nombre
      </button>
    </section>
  )
}