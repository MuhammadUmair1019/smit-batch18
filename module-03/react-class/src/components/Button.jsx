import React from 'react'

function Button({onClick}) {
  return (
    <div>
        <button onClick={onClick}>Click me!</button>
    </div>
  )
}

export default Button