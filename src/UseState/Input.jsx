import React from 'react'

const Input = () => {
    const [Input,setInput] = React.useState('Hello')

const OnChange =(e)=>{

    setInput(e.target.value)

}
  return (
    <div>
      
    <input placeholder='Write here' id="" onChange={OnChange}/>
    <h2>{Input}</h2>
    </div>
  )
}

export default Input;
