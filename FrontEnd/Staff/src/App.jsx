//import package components
import { useState } from 'react'
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router'

//import global css
//

// import local  css 
import './App.css'

// import global middlewares
//

// import local middlewares
//

// import global Layouts
//

// import local Layouts
//

// import global hooks
//

// import local hooks
//

// import global context
//

// import local context
//

//import global components
//

// import local components
//

// import global pages
//

// import local pages 
import Profile from './Pages/Profile/Profile' 
import Calender from './Pages/Calender/Calender'
import Announcement from './Pages/Announcement/Announcement'
import Attendance from './Pages/Attendance/Attendance'
import Support from './Pages/Support/Support'
import Event from './Pages/Event/Event'
import Routine from './Pages/Routine/Routine'
import NotFound from './Pages/NotFound/NotFound'  




function App() {


  const router = createBrowserRouter([  
    // {
    //   path: "/",
    //   children: [
    //     {
    //       index: true,
    //       Component : Profile
    //     },
    //     { 
    //       path: "profile", 
    //     Component : Profile
    //     }
    //   ]
    // },
    {
      path: "/",
      element : <Navigate to="/profile"/>
    },
    {
      path: "/profile",
      Component : Profile 
    },
    {
      path: "/calender",
      Component : Calender
    },
    {
      path: "/routine",
      Component : Routine
    },
    {
      path: "/announcement",
      Component : Announcement
    },
    {
      path: "/attendance",
      Component : Attendance
    },
    {
      path: "/support",
      Component : Support
    },
    { 
      path: "/event",
      Component : Event
    },
    {
      path: "*",
      Component : NotFound
    }
  ]);

  return  <RouterProvider router={router}/>
}

export default App
