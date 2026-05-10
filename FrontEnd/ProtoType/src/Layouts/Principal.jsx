import React, { useEffect, useRef, memo } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import { 
  UserPlus, Users, Briefcase, GraduationCap, 
  BarChart3, School, Clock, FileText, 
  Megaphone, CalendarCheck, LifeBuoy, 
  ShieldCheck, Bell, LogOut, Search
} from 'lucide-react';

// Memoized NavSection prevents unnecessary re-renders when route changes,
// which often causes the sidebar to "jump" or scroll to top.
const NavSection = memo(({ title, items }) => {
  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'text-indigo-600 bg-indigo-50 font-bold shadow-sm ring-1 ring-indigo-100/50' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div className="mb-6">
      <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2'>{title}</p>
      <div className='flex flex-col gap-0.5'>
        {items.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={navLinkClasses}
            // preventScrollReset ensures React Router doesn't mess with the scroll
            preventScrollReset={true} 
          >
            {item.icon} <span className='text-[13px]'>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
});

const Principal = () => {
  const scrollContainerRef = useRef(null);
  const location = useLocation();

  const studentGroup = [
    { path: "/principal/add-student", label: "Add Student", icon: <UserPlus size={18} /> },
    { path: "/principal/student-performance", label: "Student Analytics", icon: <BarChart3 size={18} /> },
  ];

  const teacherGroup = [
    { path: "/principal/add-teacher", label: "Add Teacher", icon: <Users size={18} /> },
    { path: "/principal/teacher-performance", label: "Teacher Analytics", icon: <BarChart3 size={18} /> },
  ];

  const staffGroup = [
    { path: "/principal/add-staff", label: "Add Staff", icon: <Briefcase size={18} /> },
    { path: "/principal/staff-performance", label: "Staff Analytics", icon: <BarChart3 size={18} /> },
  ];

  const parentGroup = [
    { path: "/principal/add-parent", label: "Add Parent", icon: <GraduationCap size={18} /> },
  ];
  
  const academicGroup = [
    { path: "/principal/sections", label: "Class Sections", icon: <School size={18} /> },
    { path: "/principal/routine", label: "Class Routine", icon: <Clock size={18} /> },
    { path: "/principal/syllabus", label: "Syllabus", icon: <FileText size={18} /> },
    { path: "/principal/profile", label: "Principal Profile", icon: <ShieldCheck size={18} /> },
  ];

  const generalGroup = [
    { path: "/principal/announcement", label: "Announcements", icon: <Megaphone size={18} /> },
    { path: "/principal/event", label: "School Events", icon: <CalendarCheck size={18} /> },
    { path: "/principal/support", label: "Help & Support", icon: <LifeBuoy size={18} /> },
  ];

  const allItems = [...studentGroup, ...teacherGroup, ...staffGroup, ...parentGroup, ...academicGroup, ...generalGroup];
  const currentItem = allItems.find(item => item.path === location.pathname);
  const activeTitle = currentItem ? currentItem.label : "Principal Console";

  // Only reset the scroll of the MAIN CONTENT, not the sidebar.
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className='flex w-full h-screen overflow-hidden font-sans bg-white'>
      
      {/* SIDEBAR */}
      <aside className='w-72 h-screen py-6 pl-4 border-r border-gray-100 shrink-0 flex flex-col bg-white'>
        <div className='flex mb-8 items-center gap-3 px-4'>
          <div className='w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100'>
            M
          </div>
          <h2 className='text-xl font-black tracking-tight text-gray-900 italic'>MyClass</h2>
        </div>
        
        {/* Navigation container with fixed scrollbar */}
        <nav className='flex-1 overflow-y-auto pr-3 custom-scrollbar'>
          <NavSection title="Students" items={studentGroup} />
          <NavSection title="Teachers" items={teacherGroup} />
          <NavSection title="Administration" items={staffGroup} />
          <NavSection title="Parental" items={parentGroup} />
          <NavSection title="Academic Ops" items={academicGroup} />
          <NavSection title="Communications" items={generalGroup} />
        </nav>

        <div className='mt-auto pt-4 border-t border-gray-100 pr-4'>
            <button className='flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all w-full font-bold text-sm'>
                <LogOut size={18} />
                <span>Sign Out</span>
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main ref={scrollContainerRef} className='flex-1 h-screen bg-[#F8FAFC] overflow-y-auto scroll-smooth'>
        <header className='h-20 bg-white/80 backdrop-blur-xl w-full flex items-center justify-between px-8 sticky top-0 z-30 border-b border-gray-100/80'> 
          <div className='flex flex-col'>
            <h1 className='text-xl font-black text-gray-900 tracking-tight uppercase italic'>{activeTitle}</h1>
            <div className='flex items-center gap-2 mt-0.5'>
              <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse'></span>
              <p className='text-[10px] font-bold text-indigo-600 uppercase tracking-widest'>
                Principal Portal &bull; HQ Campus
              </p>
            </div>
          </div>
          
          <div className='flex items-center gap-4'>
            <button className='p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors'>
                <Search size={20} />
            </button>
            <button className='p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors relative'>
                <Bell size={20} />
                <span className='absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white'></span>
            </button>
            <div className='flex items-center gap-3 bg-gray-50/50 p-1 pr-4 rounded-xl border border-gray-100'>
                <div className='w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm'>
                FH
                </div>
                <div className='hidden sm:flex flex-col'>
                    <span className='text-xs font-black text-gray-800 leading-none'>Fahim Haowlader</span>
                    <span className='text-[9px] font-black text-gray-400 uppercase mt-1'>Lead Administrator</span>
                </div>
            </div>
          </div>
        </header>

        <section className='p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]'>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Principal;