import React from 'react'
import { Outlet } from 'react-router';
const Principal = () => {
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

export default Principal
