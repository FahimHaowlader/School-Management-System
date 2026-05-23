import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import Pic from '../Assets/p.jpg';
import { 
  User, 
  Megaphone, 
  BookOpen, 
  FileText, 
  LifeBuoy, 
  CalendarDays, 
  Clock,
  ShieldCheck,
  Settings
} from 'lucide-react';

const Teacher = () => {
  const [activeTitle, setActiveTitle] = useState('Teacher Dashboard');
  const scrollContainerRef = useRef(null);
  const location = useLocation();

  // Mapping routes to readable titles for the header
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    const titles = {
      profile: 'My Profile',
      announcement: 'Announcements',
      assignment: 'Manage Assignments',
      syllabus: 'Course Syllabus',
      support: 'Help & Support',
      routine: 'Class Routine',
      event: 'School Events'
    };
    setActiveTitle(titles[path] || 'Teacher Dashboard');
    
    // Auto scroll to top on route change
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold shadow-sm ring-1 ring-blue-100' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className='flex flex-row w-full h-screen overflow-hidden font-sans bg-white'>
      {/* Sidebar */}
      <aside className='w-64 h-screen p-5 border-r border-gray-100 shrink-0 flex flex-col'>
        <div className='flex mb-10 items-center gap-3 px-2'>
          <div className='bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200'>
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <h2 className='text-xl font-black tracking-tight text-gray-900 text-nowrap'>My class</h2>
        </div>
        
        <nav className='flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar'>
          <NavLink to="/teacher/profile" className={navLinkClasses}>
            <User size={20} /> <span className='text-sm'>Profile</span>
          </NavLink>
          <NavLink to="/teacher/announcement" className={navLinkClasses}>
            <Megaphone size={20} /> <span className='text-sm'>Announcement</span>
          </NavLink>
          <NavLink to="/teacher/assignment" className={navLinkClasses}>
            <FileText size={20} /> <span className='text-sm'>Assignment</span>
          </NavLink>
          <NavLink to="/teacher/syllabus" className={navLinkClasses}>
            <BookOpen size={20} /> <span className='text-sm'>Syllabus</span>
          </NavLink>
          <NavLink to="/teacher/routine" className={navLinkClasses}>
            <Clock size={20} /> <span className='text-sm'>Class Routine</span>
          </NavLink>
          <NavLink to="/teacher/event" className={navLinkClasses}>
            <CalendarDays size={20} /> <span className='text-sm'>Event</span>
          </NavLink>
          
          <div className='my-4 border-t border-gray-50' />
          
          <NavLink to="/teacher/support" className={navLinkClasses}>
            <LifeBuoy size={20} /> <span className='text-sm'>Support</span>
          </NavLink>
          {/* <NavLink to="/teacher/settings" className={navLinkClasses}>
            <Settings size={20} /> <span className='text-sm'>Settings</span>
          </NavLink> */}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div ref={scrollContainerRef} className='flex-1 h-screen bg-gray-50/50 overflow-y-auto scroll-smooth'>
        {/* Header */}
        <header className='h-20 bg-white/80 backdrop-blur-md w-full flex items-center justify-between px-8 sticky top-0 z-20 border-b border-gray-100'> 
          <h1 className='text-2xl font-black text-gray-900 tracking-tight'>{activeTitle}</h1>
          
          <div className='flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-gray-200 shadow-sm'>
            <img src={Pic} alt="profile" className='w-9 h-9 rounded-xl object-cover' />
            <div className='flex flex-col text-left'>
              <span className='text-sm font-bold text-gray-900 leading-none text-nowrap'>Fahim Haowlader Jahid</span>
              <span className='text-[11px] text-gray-400 font-medium uppercase tracking-tighter'>Senior Faculty</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className='p-8'>
          <div className='max-w-6xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Teacher;