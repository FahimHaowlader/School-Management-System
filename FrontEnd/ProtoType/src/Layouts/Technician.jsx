import React from 'react'

import { Outlet } from 'react-router'

const Technician = () => {
  return (
    <div>
      <div>
        technician layout
      </div>
      <div>
        {/* nested routes will be rendered here */}
        {<Outlet/>}
      </div>
    </div>
  )
}

export default Technician
