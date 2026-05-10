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
import Principal from './Layouts/Principal';
import Teacher from "./Layouts/Teacher";
import Staff from "./Layouts/Staff";
import Parent from "./Layouts/Parent";
import Technician from "./Layouts/Technician";

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
// student page
import StudentProfile from "./Pages/Student/StudentProfile";
import StudentAssignment from "./Pages/Student/StudentAssignment";
import StudentClassRoutine from "./Pages/Student/StudentClassRoutine";
import StudentEvent from "./Pages/Student/StudentEvent";
import StudentSyllabus from "./Pages/Student/StudentSyllabus";
import StudentAnnouncement from "./Pages/Student/StudentAnnouncement";
import StudentSupport from "./Pages/Student/StudentSupport";

// Principal page
import PrincipalAddStudent from "./Pages/Principal/principalAddStudent";
import PrincipalProfile from './Pages/Principal/PrincipalProfile'; 
import PrincipalAddTeacher from './Pages/Principal/PrincipalAddTeacher';
import PrincipalAddParent from './Pages/Principal/PrincipalAddParent';
import PrincipalAddStaff from './Pages/Principal/PrincipalAddStaff';
import PrincipalStaffPerformance from './Pages/Principal/PrincipalStaffPerformance';
import PrincipalStudentPerformance from './Pages/Principal/PrincipalStudentPerformance';
import PrincipalTeacherPerformance from './Pages/Principal/PrincipalTeacherPerformance';
import PrincipalSyllabus from './Pages/Principal/PrincipalSyllabus';
import PrincipalAnnouncement from './Pages/Principal/PrincipalAnnouncement';
import PrincipalSupport from './Pages/Principal/PrincipalSupport';
import PrincipalEvent from './Pages/Principal/PrincipalEvent';
import PrincipalClassRoutine from './Pages/Principal/PrincipalClassRoutine';
import PrincipalClassSection from './Pages/Principal/PrincipalClasssection';  



// Teacher page 
import TeacherProfile from "./Pages/Teacher/TeacherProfile";
import TeacherAssignmnet from './Pages/Teacher/TeacherAssignment';
import TeacherClassRoutine from './pages/Teacher/TeacherClassRoutine';
import TeacherEvent from './Pages/Teacher/TeacherEvent';
import TeacherSupport from './Pages/Teacher/TeacherSupport';
import TeacherSyllabus from './Pages/Teacher/TeacherSyllabus';
import TeacherExamRoutine from './Pages/Teacher/TeacherExamRoutine';
import TeacherAnnouncement from './Pages/Teacher/TeacherAnnouncement';  
import TeacherAssignment from './Pages/Teacher/TeacherAssignment'


// Staff page 
import StaffProfile from './Pages/Staff/StaffProfile';
import StaffAnnouncement from './Pages/Staff/StaffAnnouncement';
import StaffEvent from './Pages/Staff/StaffEvent'
import StaffSupport from './Pages/Staff/StaffSupport';

// Parent page
import ParentProfile from './Pages/Parent/ParentProfile';
import ParentAnnouncement from './Pages/Parent/ParentAnnouncement';
import ParentClassRoutine from './Pages/Parent/ParentClassRoutine';
import ParentSupport from './Pages/Parent/ParentSupport';
import ParentSyllabus from './Pages/Parent/ParentSyllabus';
import ParentEvent from './Pages/Parent/ParentEvent';
import ParentAssignment from './Pages/Parent/ParentAssignment';
import ParentStudentProfile from './Pages/Parent/ParentStudentProfile';

// Technician Page 
import TechnicianProfile from './Pages/Technician/TechnicianProfile';
import TechnicianEvent from './Pages/Technician/TechnicianEvent';
import TechnicianClassSection from './Pages/Technician/TechnicianClassSection';
import TechnicianClassRoutine from './Pages/Technician/TechnicianClassRoutine';
import TechnicianAddParent from './Pages/Technician/TechnicianAddparent';
import TechnicianAddStudent from './Pages/Technician/TechnicianAddStudent';
import TechnicianAddStaff from './Pages/Technician/TechnicianAddStaff';
import TechnicianAddTeacher from './Pages/Technician/TeachnicianAddTeacher';
import TechnicianAnnouncement from './Pages/Technician/TechinicianAnnouncement';
import TechnicianSyllabus from './Pages/Technician/TechinicianSyllabus'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/student" />,
    },
    {
      path: "/student",
      element: <Student />,
      children: [
        { path: "", element: <Navigate to="profile" /> },
        {
          path: "profile",
          element: <StudentProfile />,
        },
        {
          path: "assignment",
          element: <StudentAssignment />,
        },
        { path: "routine", element: <StudentClassRoutine /> },
        { path: "event", element: <StudentEvent /> },
        {
          path: "syllabus",
          element: <StudentSyllabus />,
        },
        {
          path: "announcement",
          element: <StudentAnnouncement />,
        },
        {
          path: "support",
          element: <StudentSupport />,
        },
        {
          path: "*",
          element: <Navigate to="profile" />,
        },
      ],
    },
    {
      path: "/teacher",
      element : <Teacher/>,
      children : [
        {
          path : "",
          element : <Navigate to="profile"/>

        },
        {
          path : "profile",
          element : <TeacherProfile/>
        },
        {
          path : "assignment",
          element : <TeacherAssignment/>
        },
        {
          path : "routine",
          element : <TeacherClassRoutine/>
        },
        {
          path : "event",
          element : <TeacherEvent/>
        },
        {
          path : "syllabus",
          element : <TeacherSyllabus/>
        },
        {
          path : "announcement",
          element : <TeacherAnnouncement/>
        },
        {
          path :"exam-routine",
          element : <TeacherExamRoutine/>
        },
        {
          path : "support",
          element : <TeacherSupport/>
        },
        {
          path : "*",
          element : <Navigate to="profile"/>
        }
      ]

    },
    {
      path:"/Principal",
      element : <Principal/>,
      children : [
        {
          path : "",
          element : <Navigate to="profile"/>

        },
        {
          path : "profile",
          element : <PrincipalProfile/>
        },
        {
          path : "routine",
          element : <PrincipalClassRoutine/>
        },
        {
          path : "event",
          element : <PrincipalEvent/>
        },
        {
          path : "support",
          element : <PrincipalSupport/>
        },
        {
          path : "syllabus",
          element : <PrincipalSyllabus/>
        },
        {
          path : "announcement",
          element : <PrincipalAnnouncement/>
        },
        {
          path : "add-student",
          element : <PrincipalAddStudent/>
        },
        {
          path  : "student-performance",
          element :<PrincipalStudentPerformance/>
        },
        {
          path : "add-teacher",
          element : <PrincipalAddTeacher/>
        },
        {
          path : "teacher-performance",
          element: <PrincipalTeacherPerformance/>
        },
        {
          path:"add-staff",
          element: <PrincipalAddStaff/>
        },
        {
          path:"staff-performance",
          element:<PrincipalStaffPerformance/>
        },
        {
          path:"sections",
          element:<PrincipalClassSection/>
        },
        {
          path:"add-parent",
          element:<PrincipalAddParent/>
        },
        {
          path : "*",
          element : <Navigate to="profile"/>
        }
      ] 
    },
    {
      path:"staff",
      element:<Staff/>,
      children :[
        {
          path:"",
          element: <Navigate to={'profile'}/>
        },
        {
          path:"profile",
          element:<StaffProfile/>
        },
        {
          path: "Announcement",
          element: <StaffAnnouncement/>
        },
        {
          path:"event",
          element:<StaffEvent/>
        },
        {
          path:"support", 
          element:<StaffSupport/>
        }
      ]
    },
    {
      path:"parent",
      element:<Parent/>,
      children:[
        {
          path:"",
          element:<Navigate to={'profile'}/>
        },
        {
          path:"profile",
          element:<ParentProfile/>
        },
        {
          path:'support',
          element:<ParentSupport/>
        },
        {
          path:"event",
          element:<ParentEvent/>
        },
        {
          path:"routine",
          element:<ParentClassRoutine/>
        },
        {
          path:"assignment",
          element:<ParentAssignment/>
        },
        {
          path:"announcement",
          element:<ParentAnnouncement/>
        },
        {
          path:"syllabus",
          element:<ParentSyllabus/>
        },
        {
          path: "student-profile",
          element: <ParentStudentProfile />
        },

      ]
    },
    {
      path: "technician",
      element:<Technician/>,
      children: [
        {
          path:"",
          element:<Navigate to="profile"/>
        },
        {
          path:"profile",
          element:<TechnicianProfile/>
        },
        {
          path:"add-teacher",
          element:<TechnicianAddTeacher/>
        },
        {
          path:"announcement",
          element:<TechnicianAnnouncement/> 
        },
        {
          path:"syllabus",
          element:<Technician/>
        },
        {
          path:"add-parent",
          element:<TechnicianAddParent/>
        },
        {
          path:"add-student",
          element:<TechnicianAddStudent/>
        },
        {
          path:"add-staff",
          element:<TechnicianAddStaff/>
        },
        {
          path:"routine",
          element:<TechnicianClassRoutine/>
        },
        {
          path:"event",
          element: <TechnicianEvent/>
        }

      ]
    },
    {
      path: "*",
      element: <Navigate to="/student" />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
