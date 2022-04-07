import React from 'react'

function Btns(props) {
  return (
    <div>
      
      <button id={props.id}> {props.name }</button>
    </div>
  )
}

export default Btns
