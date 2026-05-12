//import package components
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

//import global css
//

// import local  css
import "./App.css";

// import global middlewares
//

// import local middlewares
//

// import global Layouts
//

// import local Layouts
import MainLayout from "./Layouts/MainLayout";
import ProxyLayout from "./Layouts/ProxyLayout";

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
import Profile from "./Pages/Profile/Profile";
import Fee from "./Pages/Fee/Fee";
import Calender from "./Pages/Calender/Calender";
import Routine from "./Pages/Routine/Routine";
import Announcement from "./Pages/Announcement/Announcement";
import Result from "./Pages/Result/Result";
import Certificate from "./Pages/Certificate/Certificate";
import Assignment from "./Pages/Assignment/Assignment";
import Attendance from "./Pages/Attendance/Attendance";
import Support from "./Pages/Support/Support";
import Syllabus from "./Pages/Syllabus/Syllabus";
import Event from "./Pages/Event/Event";
import NotFound from "./Pages/NotFound/NotFound";

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
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="/profile" />,
        },
        {
          path: "/profile",
          Component: Profile,
        },
        {
          path: "/fee",
          Component: Fee,
        },
        {
          path: "/calender",
          Component: Calender,
        },
        {
          path: "/routine",
          Component: Routine,
        },
        {
          path: "/announcement",
          Component: Announcement,
        },
        {
          path: "/result",
          Component: Result,
        },
        {
          path: "/certificate",
          Component: Certificate,
        },
        {
          path: "/assignment",
          Component: Assignment,
        },
        {
          path: "/attendance",
          Component: Attendance,
        },
        {
          path: "/support",
          Component: Support,
        },
        {
          path: "/syllabus",
          Component: Syllabus,
        },
        {
          path: "/event",
          Component: Event,
        },
        {
          path: "*",
          Component: NotFound,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
