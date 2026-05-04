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
import Routine from './Pages/Routine/Routine'
import NotFound from './Pages/NotFound/NotFound'  
import AllAnnouncement from './Pages/Announcement/AllAnnouncement/AllAnnouncement'
import AllEvent from './Pages/Event/AllEvent/AllEvent'
import AllClass from './Pages/Class/AllClass/AllClass'
import Support from './Pages/Support/Support'
import Approval from './Pages/Approval/Approval'
import AddStaff from './Pages/Staff/AddStaff/AddStaff'
import AddTeacher from './Pages/Teacher/AddTeacher/AddTeacher'
import AddStudent from './Pages/Student/AddStudent/AddStudent'





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
      Component : AllAnnouncement
    },
    {
      path: "/support",
      Component : Support
    },
    { 
      path: "/event",
      Component : AllEvent
    },
    {
      path: "/approval",
      Component : Approval
    },
    {
      path: "/add-staff",
      Component : AddStaff
    },
    {
      path: "/add-teacher",
      Component : AddTeacher
    },
    {
      path: "/add-student",
      Component : AddStudent
    },
    {
      path: "/class",
      Component : AllClass
    },
    {
      path: "*",
      Component : NotFound
    }
  ]);

  return  <RouterProvider router={router}/>
}

export default App
