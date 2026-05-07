import React from 'react'
import { Outlet } from 'react-router';
const Parent = () => {
  return (
    <div>
          <div>
            parent layout  
          </div>
          <div>
            <Outlet/>
          </div>
        </div>
  )
}

export default Parent
