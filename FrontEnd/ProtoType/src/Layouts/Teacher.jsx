import React from 'react'
import { Outlet } from 'react-router-dom';
const Teacher = () => {
  return (
   <div>
         <div>
           teacher layout  
         </div>
         <div>
           <Outlet/>
         </div>
       </div>
  )
}

export default Teacher
