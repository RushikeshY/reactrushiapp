import React from 'react'

function Taskitems({title,color}) {
    // console.log(props);
  return (

    <>
     <div>
        <h2 style={{color}}> {`${title}`}</h2>
     </div>
    </>
  )
}

export default Taskitems
