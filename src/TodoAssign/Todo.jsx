import React from 'react';
import {nanoid} from 'nanoid' 
import Todoitem from './Todoitem';
function TodoList() {

    const [task,setTask] = React.useState("")
    const [todo,setTodo] = React.useState([])

    const handleChange =(e) =>{

        setTask(e.target.value)
    }

    const handleClick =() =>{

      let taskobj ={
        id:nanoid(),
        title:task,
        status:false
     
      }
      setTodo([taskobj,...todo])
    }

    const handleRemove =(id) =>{

        console.log(id);

        let newTodo = todo.filter((item) =>item.id !=id)
        setTodo(newTodo)

    }
   
    // const handleToggle = (id) =>{

    // }

  return (
    <>
     <input id="input" type={"text"} value={task}  onChange={handleChange}   />
     <button  id ="btn"onClick={handleClick}>  Add</button>
      {todo.map((item,index )=> {
          return <Todoitem   color = {index%2==0 ? "blue":
          "green"} key = {item.id}{...item} handleRemove ={handleRemove}/>
      })}
    </>
  )
}

export default TodoList;
