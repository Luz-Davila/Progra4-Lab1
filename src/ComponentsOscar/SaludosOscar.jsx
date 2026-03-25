import { useState } from 'react'
import './SaludoOscar.css'

export default function SaludoOscar() {
  const [name, setName] = useState('Oscar')

  return (
    <section className="saludo">
      <h2 className="saludo_title">¡Hola, {name}!</h2>

      <p className="saludo_extra">
        ¡Bienvenido a tu componente en React!
      </p>

      <button onClick={() => setName('Oscar Dev')}>
        Cambiar nombre
      </button>
    </section>
  )
}