import React from 'react'
import { Outlet } from 'react-router';
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
