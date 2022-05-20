
import React,{useState,useEffect} from 'react'

const Button = () => {

    const[count1,setCount1] = useState(0);
    const[count2,setCount2] = useState(0);
    const decreament =(value)=>{
        setCount1(count1-value)

    }
    const increment =(value)=>{
        setCount2(count2+value)

    }

    useEffect(() => {
     console.log("count1Changed")
    
      return () => {
        console.log("Mounted[]")
      }
    }, [])
    


  return (
    <div>
     <h1>{count1}{count2}</h1>
     <button onClick={()=>{increment(1)}}>increment</button>
     <button onClick={()=>{ decreament(1)}}>Decrement</button>

      
    </div>
  )
}

export default Button;
