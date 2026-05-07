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
import Student from "./Layouts/Student";

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
import StudentProfile from "./Pages/StudentProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/student" />,
    },
    {
      path: "/student",
      element: <Student />,
      children: [{ path: "profile", element: <StudentProfile /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
