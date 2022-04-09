import React from 'react'
import Card from './card'

let Data = {

    name:"king",
    age:22

}

const  Index = () => {
  return (
    <div>

     <Card {...Data}/>
        
    </div>
  )
}

export default Index;