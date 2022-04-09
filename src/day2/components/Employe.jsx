// import Card from "./card"
import React from 'react'
import Card from "./card"
const Data ={

    name:'Ram',
    age :30,
    Qualification :"bsc",
    gender:"Male",
    image:"https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}

const Data2={

    name:'Ram',
    age :30,
    Qualification :"bsc",
    gender:"Male",
    image:"https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}


const Data3={

    name:'Ram',
    age :30,
    Qualification :"bsc",
    gender:"Male",
    image:"https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}


const Data4 ={

    name:'Ram',
    age :30,
    Qualification :"bsc",
    gender:"Male",
    image:"https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}




// const Data1 ={

//     name:'Ram',

//     Qualification :"bsc",
//     gender:"Male",
//     image:"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg"
// }


// function EmployeeeDetails(){

//     return (
//         <div style={{display:"flex"}}>
//         <Card {...Data}/>
//         <Card {...Data4}/>
//         <Card {...Data2}/>
//         <Card {...Data3}/>
//         {/* <Card {...Data1}/> */}
    
//         </div>
//     )
// }

// export default EmployeeeDetails;

// import React from 'react'

const EmployeeeDetails = () => {
  return (
    <div>
    <Card {...Data}/>
      
    </div>
  )
}

export default EmployeeeDetails;
