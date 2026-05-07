import React from 'react'
import { Outlet } from 'react-router';

const Student = () => {
  return (
    <div>
      <div>
        student layout  
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Student
