import React, { useEffect, useState } from 'react'

const One = () => {

  const [count,setCount] = useState(0)

console.log("1")
  useEffect(() => {
    console.log("it just start")

  },[])      //  depenencies => [] +=>No dependencies only once useeffect call
console.log("11111")

  useEffect(() => {

  document.title = (`Messages (${count})`)

  }, [count])  // Means Dependency on count whenever count increases useeffect get called
  

  console.log("2")
  return (
    <div>
 <h1 >Count:{count}</h1>
 <button onClick={()=>setCount(count+1)}>Add</button>
      
    </div>
  )
}

export default One
