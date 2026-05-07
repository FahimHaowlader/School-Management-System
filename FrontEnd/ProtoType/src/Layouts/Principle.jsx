import React from 'react'
import { Outlet } from 'react-router';
const Principle = () => {
  return (
   <div>
         <div>
           principes layout  
         </div>
         <div>
           <Outlet/>
         </div>
       </div>
  )
}

export default Principle
