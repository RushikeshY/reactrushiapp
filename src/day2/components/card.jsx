
//  function Card (props){
// console.log(props)

// const {name,organisation,Qualification,gender,image} = props
//     return (
//         <div className="div11">
        
//             <div className="Left">
//             <img src={image} alt = {name} />
//             </div>
            
    
//             <div>
//                 <div className="right">
//                     <h2> Name  : {name}</h2>
//                     <h2> Organisation : {organisation}</h2>

//                     <h2> Qualification :{Qualification}</h2>
//                     <h2>Gender : {gender}</h2>
//                 </div>
//             </div> 
//         </div>
//     )
//  }

//  export default Card;

// export default card

 import React from 'react'
 
 const card = (props) => {
    const {name,age} =props
   return (
     <div>
      
       <div>
       <h1 style={{color :"red"}}>{name}</h1>
       <h1 style={{color :"blue"}}>{age}</h1>
       </div>
     </div>
   )
 }
 
 export default card
 