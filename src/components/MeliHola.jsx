import { useState } from 'react'
import './MeliHola.css'

export default function SaludoMelissa() {
  const [name, setName] = useState('Melissa')

  return (
    <section className="saludo">
      <h2 className="saludo__title">¡Hola, {name}!</h2>
      <p className="saludo__extra">
        ¡.............!
      </p>
    </section>
  )
}