import React from 'react'
import { Outlet } from 'react-router';
const Staff = () => {
  return (
   <div>
         <div>
           staff layout  
         </div>
         <div>
           <Outlet/>
         </div>
       </div>
  )
}

export default Staff
