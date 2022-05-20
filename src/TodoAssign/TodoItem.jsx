
import React from 'react';

const  Todoitem = (props) => {
// console.log(props)

const {title ,id,handleRemove,color} = props;


  return (
    <div id="btndiv">
        <h1  style={{color}}> {title} </h1>
     

        <button  onClick={()=>handleRemove(id)}>Delete</button>
    </div>
  )
}

export default Todoitem;
//   
//
