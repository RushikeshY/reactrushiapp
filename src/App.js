// // import logo from './logo.svg';
// import './App.css';
 
// // import List from "./day1/List"
// import Sample from './day1/Sample';

// let a =112;
// function App() {
//   {
//     return (
//     <>
//     <Sample/>
//     </>
//     )
//   }
 
// }

// export default App;


// import logo from './logo.svg';

import './App.css';
import'./day2/components/styleday3.css'

 import './day1/style.css'


import Sample from "./day1/Sample"
import JoinUs from './day1/JoinUs';
import Button from './day2/components/button';
import Input from './day2/components/input';
// import Card from './day2/components/card';
// import EmployeeeDetails from './day2/components/Employe';
import Data from './day2/components/Employe';
import {Component} from 'react';





import Search from './day1/Search';
import Setting from './day1/Setting';
import Contactus from './day1/Contactus';
import Download from './day1/Download';
import Login from './day1/login';
import Help from './day1/Help';
import Home from './day1/Home';
// import Todo from './day2/components/todo';
import Btns from './day1/btns';
class App extends Component{

  render(){

    return (

      <div >
{/*   */}
{/* <Todo/> */}
    <h1 className='n1'>Counter</h1>
      {/* <Data/> */}
      <Button/>
      {/* <Input/> */}
     <div className='div0'>
            <Sample/>
            </div >
         <div className='div0'> 
            <div className='div1'>
                    <JoinUs/>
                    <Setting/>
            </div>
            <div className='div2'>
                    <Login/>
                    <Contactus/>
            </div>

            <div className='div3'>
                    <Search/>
                    <Help/>
            </div>

            <div className='div4'>
                    <Home/>
                    <Download/>
            </div>

        </div>

     <h1 id='name11'>Problem 2 - Part II</h1>

       <div className='div0'>

              <div className='div1111'> 

              <Btns id="btn1" name="join Us"/>
              <Btns id="btn2" name="Setting"/>

              </div>

              <div className='div1111'>

              <Btns id="btn3" name="Login"/>
              <Btns id="btn4" name="Contact Us"/>

              </div>

              <div className='div1111'>

              <Btns id="btn5" name="Search"/>
              <Btns id="btn6" name="Help"/>

              </div>

              <div className='div1111'>

              <Btns id="btn7" name="home"/>
              <Btns id="btn8" name="Download"/>

              </div>
        
     </div>

        


      </div> 
    )
  }
}

export default App;
