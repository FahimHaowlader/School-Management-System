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
 import MainLayout from './Layouts/MainLayout'

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
import Class from './Pages/Class/Class'
import Parent from './Pages/Parent/Parent'
import Staff from './Pages/Staff/Staff'
import Student from './Pages/Student/Student'
import Teacher from './Pages/Teacher/Teacher' 
import Event from './Pages/Event/Event' 
import Announcement from './Pages/Announcement/Announcement'
import Syllabus from './Pages/Syllabus/Syllabus'
import Assignment from './Pages/Assignment/Assignment'
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
      element : <MainLayout/>,
      children : [
        {
          index: true,
          Component : Profile
        },
        
    {
      path: "/",
      element : <Navigate to="/profile"/>
    },
    {
      path: "/profile",
      Component : Profile 
    },
    {
      path : "/event",
       Component : Event,
    },
    {
      path: "/announcement",
      Component : Announcement
    },
    {
      path: "/calender",
      Component : Calender
    },
    {
      path: "/Assignment",
      Component : Assignment
    },
    {
      path: "/syllabus",
      Component : Syllabus
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
      path: "/class",
      Component : Class
    },
    {
      path: "/parent",
      Component : Parent
    },
    {
      path: "/staff",
      Component : Staff
    },
    {
      path: "/student",
      Component : Student
    },
    {
      path: "/teacher",
      Component : Teacher
    },
    {
      path: "*",
      Component : NotFound
    }
  ]
  }]);

  return  <RouterProvider router={router}/>
}

export default App
