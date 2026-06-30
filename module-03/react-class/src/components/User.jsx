import React from 'react'

function User({name , age , city}) {
  return (
    <div>
        <h2>{name}</h2>
        <h3>{age}</h3>
        <p>{city}</p>
    </div>
  )
}

export default User