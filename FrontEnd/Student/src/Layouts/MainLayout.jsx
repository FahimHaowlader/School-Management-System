// import Package components
import React, { useState, useEffect, useRef } from 'react'
import { Outlet, NavLink } from 'react-router'

// import  Global Components
import DashBoardFooter from '@Global/Components/DashBoardFooter'

const MainLayout = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTitle, setActiveTitle] = useState('Profile');

  // Logic: Scroll the entire window to the top when the title changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [activeTitle]);

  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 py-2 rounded-lg transition-colors  ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    // min-h-screen allows the page to grow. relative + z-index for footer.
    <div className='relative flex flex-col min-h-screen'>
      
      <div className='flex flex-grow'>
        
        {/* SIDEBAR - Lower z-index (z-10) */}
       <aside 
  className={`bg-white h-screen sticky top-0 transition-all duration-300 flex flex-col z-10 border-r border-gray-200 flex-shrink-0 ${
    isMinimized ? 'w-20' : 'w-60'
  }`}
>
          {/* Logo Section - Will be covered by footer because footer is z-20 */}
          <div 
            onClick={() => setIsMinimized(!isMinimized)}
            className='bg-red-500 h-10 flex-shrink-0 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors sticky top-0'
          >
            <h1 className='font-bold text-white'>{isMinimized ? 'L' : 'LOGO'}</h1>
          </div>

          <div 
            className='overflow-y-auto p-4 flex-grow custom-scrollbar' 
            style={{ direction: 'rtl' }} 
          >
            <div style={{ direction: 'ltr' }} className='space-y-8' >
              
              
              <NavLink to="/profile" onClick={() => setActiveTitle("Profile")} className={navLinkClasses}>
                {isMinimized ? '👤' : `Profile`}
              </NavLink>
              <NavLink to="/routine" onClick={() => setActiveTitle("Routine")} className={navLinkClasses}>
                {isMinimized ? '�' : `Routine`}
              </NavLink>
              
              <NavLink to="/event" onClick={() => setActiveTitle("Event")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Event`}
              </NavLink>

            
               <NavLink to="/announcement" onClick={() => setActiveTitle("Announcement")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Announcement`}
              </NavLink>
               <NavLink to="/assignment" onClick={() => setActiveTitle("Assignment")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Assignment`}
              </NavLink>
              
               <NavLink to="/syllabus" onClick={() => setActiveTitle("Syllabus")} className={navLinkClasses}>
                {isMinimized ? '📚' : ` Syllabus`}
              </NavLink>
               <NavLink to="/support" onClick={() => setActiveTitle("Support")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Support`}
              </NavLink>

               {/* <NavLink to="/certificate" onClick={() => setActiveTitle("Certificate")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Certificate`}
              </NavLink> */}

               {/* <NavLink to="/calender" onClick={() => setActiveTitle("Calender")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Calender`}
              </NavLink> */}

               {/* <NavLink to="/attendance" onClick={() => setActiveTitle("Attendance")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Attendance`}
              </NavLink> */}

               {/* <NavLink to="/fee" onClick={() => setActiveTitle("Fee")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Fee`}
              </NavLink> */}

               {/* <NavLink to="/result" onClick={() => setActiveTitle("Result")} className={navLinkClasses}>
                {isMinimized ? '📚' : `Result`}
              </NavLink> */}

            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className='flex-grow flex flex-col'>
          {/* Header - z-10 means it will vanish under the z-20 footer */}
          <header className='sticky top-0 bg-white h-10 flex-shrink-0 flex items-center px-4 border-b border-gray-300 z-10'>
            <h1 className='text-lg font-bold text-gray-800'>Main Layout Header {activeTitle}</h1>
          </header>
          
          <div className='p-4 flex-grow bg-gray-50'>
            <div className="">
               <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER - z-20 ensures it goes OVER the sidebar and header */}
      <div className='relative z-20 bg-white border-t border-gray-200'> 
         <DashBoardFooter />
      </div>
    </div>
  )
}

export default MainLayout