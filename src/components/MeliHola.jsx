import { useState } from 'react'
import './MeliHola.css'

export default function MeliHola() {
  const [name, setName] = useState('Melissa')

  return (
    <section className="saludo">
      <h2 className="saludo_title">¡Hola, {name}!</h2>

      <p className="saludo_extra">
        ¡Bienvenida a tu componente en React!
      </p>

      <button onClick={() => setName('Melissa Dev')}>
        Cambiar nombre
      </button>
    </section>
  )
}