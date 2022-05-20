
//  import {useState} from "react";


//   function Button(){
//       const [count,setCount]  = useState(0)

//     // const [name,setName] = useState("Rushi")
    


//     console.log("first")
//     //   let  name = "Rushi"
//     const Handlename = (value) =>{

//         // name = "Hope"
//         // console.log(name,"clicked")
//        setCount(count+value)
//         // setName("Dream Big ")
        
//     }

//     const Handlename2 = (value) =>{

//         // name = "Hope"
//         // console.log(name,"clicked")
//        setCount(count+value)
//         // setName("Dream Big ")
        
//     }
//     const Handlename1 = (value) =>{

//         // name = "Hope"
//         // console.log(name,"clicked")
//        setCount(count*value)
//         // setName("Dream Big ")
        
//     }


 
//     console.log("second")
//       return(
//           <div className="divinput">
//               {/* <h1>{name}</h1> */}
//               <h1  style={{color:count%2===0 ? "green":"red"}} className="n2">{count}</h1>
           
//                <button id="one" onClick={()=>Handlename(1)}>Increment</button>
//                <button onClick={()=>Handlename2(-1)}>Decrement</button>
//                <button onClick={()=>Handlename1(2)}>Double</button>
               
//           </div>
         
//       )
//   }

//   export default Button;

//   useState ==> Hooks  Change In UI


// count => 1 -1 *2 

import React,{useState} from 'react'

const Button = () => {

    const[count,setCount] = useState(0);

    const decreament =(value)=>{
        setCount(count-value)

    }
    const increment =(value)=>{
        setCount(count+value)

    }
    const double =(value)=>{
        setCount(count*value)

    }
  return (
    <div>
     <h1>{count}</h1>
     <button onClick={()=>{increment(1)}}>increment</button>
     <button onClick={()=>{ decreament(1)}}>Decrement</button>
     <button onClick={()=>{double(2)}}>Double</button>
      
    </div>
  )
}

export default Button;
