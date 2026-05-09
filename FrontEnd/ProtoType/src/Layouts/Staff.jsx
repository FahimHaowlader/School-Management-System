import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router';
import Pic from '../Assets/p.jpg';
import { 
  User, 
  Megaphone, 
  CalendarDays, 
  Settings, 
  LifeBuoy,
  ShieldCheck
} from 'lucide-react';

const Staff = () => {
  const [activeTitle, setActiveTitle] = useState('Staff Profile');
  const scrollContainerRef = useRef(null);

  // Smooth scroll to top on view change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [activeTitle]);

  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold shadow-sm ring-1 ring-blue-100' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className='flex flex-row w-full h-screen overflow-hidden font-sans bg-white'>
      
      {/* Sidebar */}
      <div className='w-64 h-screen p-5 border-r border-gray-100 shrink-0 flex flex-col'>
        <div className='flex mb-10 items-center gap-3 px-2'>
          <div className='bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200'>
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <h2 className='text-xl font-black tracking-tight text-gray-900'>My Class</h2>
        </div>
        
        <nav className='flex flex-col gap-1.5 flex-1'>
          <NavLink 
            to="/staff/profile" 
            onClick={() => setActiveTitle("Staff Profile")} 
            className={navLinkClasses}
          >
            <User size={20} /> 
            <span className='text-sm'>Profile</span>
          </NavLink>
          
          <NavLink 
            to="/staff/announcement" 
            onClick={() => setActiveTitle("Announcements")} 
            className={navLinkClasses}
          >
            <Megaphone size={20} /> 
            <span className='text-sm'>Announcement</span>
          </NavLink>
          
          <NavLink 
            to="/staff/event" 
            onClick={() => setActiveTitle("Events & Calendar")} 
            className={navLinkClasses}
          >
            <CalendarDays size={20} /> 
            <span className='text-sm'>Event</span>
          </NavLink>
          
          <div className='my-4 border-t border-gray-50' />

          {/* <NavLink 
            to="/staff/profile" 
            onClick={() => setActiveTitle("Settings")} 
            className={navLinkClasses}
          >
            <Settings size={20} /> 
            <span className='text-sm'>Settings</span>
          </NavLink> */}
          
          <NavLink 
            to="/staff/support" 
            onClick={() => setActiveTitle("Support Center")} 
            className={navLinkClasses}
          >
            <LifeBuoy size={20} /> 
            <span className='text-sm'>Support</span>
          </NavLink>
        </nav>

        {/* Optional: Simple footer for sidebar */}
        <div className='pt-4 border-t border-gray-50'>
          <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center'>
            v1.0.4 - 2026
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        ref={scrollContainerRef} 
        className='flex-1 h-screen bg-gray-50/50 overflow-y-auto scroll-smooth'
      >
        {/* Sticky Header */}
        <header className='h-20 bg-white/80 backdrop-blur-md w-full flex items-center justify-between px-8 sticky top-0 z-20 border-b border-gray-100'> 
          <div className='flex flex-col'>
            <h1 className='text-2xl font-black text-gray-900 tracking-tight'>{activeTitle}</h1>
            <div className='flex items-center gap-1.5'>
              <span className='size-1.5 rounded-full bg-green-500 animate-pulse'></span>
              <span className='text-[10px] font-bold text-blue-600 uppercase tracking-widest'>Staff Portal Active</span>
            </div>
          </div>
          
          <div className='flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-gray-200 shadow-sm'>
            <img src={Pic} alt="profile" className='w-9 h-9 rounded-xl object-cover ring-2 ring-gray-50 shadow-inner' />
            <div className='flex flex-col'>
              <span className='text-sm font-bold text-gray-900 leading-none'>Fahim Haowlader Jahid</span>
              <span className='text-[11px] text-gray-400 font-medium mt-1'>System Administrator</span>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className='p-8'>
          <div className='max-w-6xl mx-auto'>
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Staff;