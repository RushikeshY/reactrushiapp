

//   import React, { useState } from 'react'

//     function Todo() {

//         const [Task,setTask] = React.useState("")
//         const[task,setTodo] = useState([])

//         const handleChange =(e) =>{

//             // console.log("Changing Input")

//             setTask(e.target.value);
//         }

//         const handleClick =() =>{
            
//         }
//     return (
//         <div>
//         <h1>Todo</h1>

//         <input type={"text"} name="" value ={Task}id="" placeholder=""  onChange={handleChange}/>
//         <button>Add</button>
//         </div>
//     )
//     }

//     export default Todo;

import Taskitems from './todoitems'
import React from 'react'

function Todo() {

    const [query,setQuery] = React.useState("")

    const [task,setTasks] = React.useState([])
    const handleChange =(e) =>{
        
         const  {value} = e.target;
         setQuery(value)
        
    }

    const handleAdd =() =>{
        const payload = {
            title:query,
            status:false
        }
        let newTasks =[...task,payload];
        setTasks (newTasks)
    }
  return (
    <div>

        {/* <h1>Tasks</h1> */}
        <div>
            <input type="text" value={query}name=""  onChange={handleChange} id="" />
            <button onClick={handleAdd}>Add</button>
        </div>
        <div>
            {task.map((item,index) =>{
                return <div> <h1><Taskitems color = {index%2===0 ? "blue":
                "green"} title={item.title} statu={item.status}/></h1></div>
            })}
        </div>
    </div>
  )
}

export default Todo