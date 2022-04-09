import React from 'react'

const Card = (props) => {

    const {name,age} = props
  return (
    <div>
        <h1>{name}</h1>
        <h1>{age}</h1>
    </div>
  )
}

export default Card;