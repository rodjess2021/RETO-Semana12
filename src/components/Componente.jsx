import React from 'react'
import { useState } from 'react'

const Componente = (props) => {
    const [estado,setEstado] = useState("estado inicial")
  return (
    <div>
        Soy un {estado} simple de react
    </div>
  )
}
export default Componente