// // import React,{useState} from 'react'

// // const Countchange = () => {

// //     const [count,setCount] = useState(0);
// //     const [text,setText] = useState(true)

// //     const onchange=()=>{
// //         setCount(count+1);
// //         setText(!text);
// //       }
// //   return (
// //     <div>
// //         <button onClick={onchange}>
// //         ClickMe
// //         </button>
// //         <h1>{count}</h1>
// //        {text && <h3>This Is UseReducer </h3>}

        
// //     </div>
// //   )
// // }

// // export default Countchange;


// import React,{useReducer}from 'react'
// const reducer =(state,action)=>{

//    switch(action.type){
//      case"INCREMENT"
// return{count:state.count+1,text:state.text}
//      case "toggleshowtext"
//      return{count:state.count,text:!state.text}
      
//      return state;
//    }
// }

// const Countchange = () => {
//     const [state,dispatch] = useReducer(reducer,
//         {count:0,text:true})
//   return (
//     <div>
//     <h1>{state.count}</h1>
//     <button onClick={()=>{
//       dispatch({type:"INCREMENT"});
//       disppatch({type:"toggleshowtext"})
//     }}></button>
      
//     </div>
//   )
// }

// export default Countchange
