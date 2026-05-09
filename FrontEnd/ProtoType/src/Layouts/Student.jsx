import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router';
import Pic from '../Assets/p.jpg';
import { 
  User, 
  ClipboardList, 
  Clock, 
  CalendarCheck, 
  FileText, 
  Megaphone, 
  LifeBuoy 
} from 'lucide-react';

const Student = () => {
  const [activeTitle, setActiveTitle] = useState('Profile');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [activeTitle]);

  // Shared classes for NavLinks
  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className='flex flex-row w-full h-screen overflow-hidden font-sans bg-white'>
      {/* Sidebar */}
      <div className='w-64 h-screen p-5 border-r border-gray-200 shrink-0'>
        <div className='flex mb-10 items-center gap-3'>
          <img src={Pic} alt="profile" className='w-10 h-10 rounded-xl object-cover shadow-sm' />
          <h2 className='text-xl font-black tracking-tight text-gray-900'>My Class</h2>
        </div>
        
        <nav className='flex flex-col gap-2'>
          <NavLink to="/student/profile" onClick={() => setActiveTitle("Profile")} className={navLinkClasses}>
            <User size={20} /> Profile
          </NavLink>
          
          <NavLink to="/student/assignment" onClick={() => setActiveTitle("Assignment")} className={navLinkClasses}>
            <ClipboardList size={20} /> Assignment
          </NavLink>
          
          <NavLink to="/student/routine" onClick={() => setActiveTitle("Class Routine")} className={navLinkClasses}>
            <Clock size={20} /> Class Routine
          </NavLink>
          
          <NavLink to="/student/event" onClick={() => setActiveTitle("Event")} className={navLinkClasses}>
            <CalendarCheck size={20} /> Event
          </NavLink>
          
          <NavLink to="/student/syllabus" onClick={() => setActiveTitle("Syllabus")} className={navLinkClasses}>
            <FileText size={20} /> Syllabus
          </NavLink>
          
          <NavLink to="/student/announcement" onClick={() => setActiveTitle("Announcement")} className={navLinkClasses}>
            <Megaphone size={20} /> Announcement
          </NavLink>
          
          <NavLink to="/student/support" onClick={() => setActiveTitle("Support")} className={navLinkClasses}>
            <LifeBuoy size={20} /> Support
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div 
        ref={scrollContainerRef} 
        className='flex-1 h-screen bg-gray-50 overflow-y-auto scroll-smooth'
      >
        {/* Navbar */}
        <header className='h-20 bg-gray-50/80 backdrop-blur-md w-full flex items-center justify-between px-8 sticky top-0 z-20'> 
          <h1 className='text-2xl font-black text-gray-900 tracking-tight'>{activeTitle}</h1>
          
          <div className='flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-gray-100 shadow-sm'>
            <img src={Pic} alt="profile" className='w-9 h-9 rounded-xl object-cover' />
            <span className='text-sm font-bold text-gray-700'>Fahim Haowlader Jahid</span>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div className='p-8 pt-2'>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Student;