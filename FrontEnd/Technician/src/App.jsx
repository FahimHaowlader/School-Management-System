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
import Attendance from './Pages/Attendance/Attendance'
import Support from './Pages/Support/Support'
import Routine from './Pages/Routine/Routine'
import NotFound from './Pages/NotFound/NotFound' 
import AddAnnouncement from './Pages/Announcement/AddAnnouncement/AddAnnouncement'
import AllEvent from './Pages/Event/AllEvent/AllEvent'
import AddClass from './Pages/Class/AddClass/AddClass'
import AddParent from './Pages/Parent/AddParent/AddParent'
import AddStaff from './Pages/Staff/AddStaff/AddStaff'
import AddStudent from './Pages/Student/AddStudent/AddStudent'
import AddTeacher from './Pages/Teacher/AddTeacher/AddTeacher'  


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
      path: "/attendance",
      Component : Attendance
    },
    {
      path: "/support",
      Component : Support
    },
    {
      path: "/all-events",
      Component : AllEvent
    },
    {
      path: "/add-announcement",
      Component : AddAnnouncement
    },
    {
      path: "/add-class",
      Component : AddClass
    },
    {
      path: "/add-parent",
      Component : AddParent
    },
    {
      path: "/add-staff",
      Component : AddStaff
    },
    {
      path: "/add-student",
      Component : AddStudent
    },
    {
      path: "/add-teacher",
      Component : AddTeacher
    },
    {
      path: "*",
      Component : NotFound
    }
  ]);

  return  <RouterProvider router={router}/>
}

export default App
