import React from 'react'

const Counter = () => {

    const [count,setCount] = React.useState(10);

    React.useEffect(()=>{

        const id = setInterval(()=>{
            setCount((prev)=>{
                if(prev===0){
                    clearInterval(id);
                    return prev;
                }

                return prev-1;
            });
        },1000)

    },[])
  return (
    <div>
    <h1>Counter:{count}</h1></div>
  )
}

export default Counter;