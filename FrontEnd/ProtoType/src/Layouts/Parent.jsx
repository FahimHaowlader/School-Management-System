import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import Pic from '../Assets/p.jpg';
import { 
  User, ClipboardList, Clock, CalendarCheck, 
  FileText, Megaphone, LifeBuoy, ChevronDown, 
  LayoutDashboard, GraduationCap, Bell 
} from 'lucide-react';

const Parent = () => {
  const scrollContainerRef = useRef(null);
  const location = useLocation();

  // Mock Students
  const students = [
    { id: 1, name: "Fahim Jahid", grade: "10th", avatar: Pic },
    { id: 2, name: "Sara Hossain", grade: "8th", avatar: null },
  ];

  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // 1. Student-Specific (Blue Theme)
  const studentMenu = [
    { path: "/parent/student-profile", label: "Student Profile", icon: <User size={20} /> },
    { path: "/parent/assignment", label: "Assignments", icon: <ClipboardList size={20} /> },
    { path: "/parent/routine", label: "Class Routine", icon: <Clock size={20} /> },
    { path: "/parent/syllabus", label: "Syllabus", icon: <FileText size={20} /> },
  ];

  // 2. Global Parent Items
  const globalMenu = [
    { path: "/parent/profile", label: "My Profile", icon: <GraduationCap size={20} /> },
    { path: "/parent/announcement", label: "Announcements", icon: <Megaphone size={20} /> },
    { path: "/parent/event", label: "School Events", icon: <CalendarCheck size={20} /> },
    { path: "/parent/support", label: "Help & Support", icon: <LifeBuoy size={20} /> },
  ];

  const allItems = [...studentMenu, ...globalMenu];
  const currentItem = allItems.find(item => item.path === location.pathname);
  const activeTitle = currentItem ? currentItem.label : "Parent Dashboard";

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold shadow-sm ring-1 ring-blue-100' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className='flex w-full h-screen overflow-hidden font-sans bg-white'>
      
      {/* SIDEBAR */}
      <aside className='w-72 h-screen p-6 border-r border-gray-100 shrink-0 flex flex-col bg-white'>
        <div className='flex mb-8 items-center gap-3 px-2'>
          <div className='w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200'>
            M
          </div>
          <h2 className='text-xl font-black tracking-tight text-gray-900'>My Class</h2>
        </div>

        {/* STUDENT SWITCHER (Matches the header style) */}
        <div className='relative mb-8'>
          <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2'>Switch Student</p>
          <button 
            onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            className='w-full flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-300 transition-all shadow-sm'
          >
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-xl bg-blue-600 overflow-hidden flex items-center justify-center text-white text-xs font-bold shadow-sm'>
                {selectedStudent.avatar ? <img src={selectedStudent.avatar} className='object-cover w-full h-full' /> : selectedStudent.name.charAt(0)}
              </div>
              <div className='text-left'>
                <p className='text-sm font-bold text-gray-900 leading-tight'>{selectedStudent.name}</p>
                <p className='text-[11px] text-gray-500 font-bold uppercase'>{selectedStudent.grade}</p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${isSwitcherOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSwitcherOpen && (
            <div className='absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden'>
              {students.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedStudent(s); setIsSwitcherOpen(false); }}
                  className='w-full flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors border-b last:border-0 border-gray-50'
                >
                  <div className='w-8 h-8 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center text-xs font-bold'>
                    {s.avatar ? <img src={s.avatar} className='object-cover w-full h-full' /> : s.name.charAt(0)}
                  </div>
                  <span className='text-sm font-bold text-gray-700'>{s.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* NAVIGATION */}
        <nav className='flex flex-col gap-6 overflow-y-auto'>
          {/* Student Content (Dynamic) */}
          <div>
            <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-3'>Academic Content</p>
            <div className='flex flex-col gap-1'>
              {studentMenu.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClasses}>
                  {item.icon} <span className='text-[15px]'>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Parent Content (Global) */}
          <div>
            <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-3'>General</p>
            <div className='flex flex-col gap-1'>
              {globalMenu.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClasses}>
                  {item.icon} <span className='text-[15px]'>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* LOGOUT */}
        <div className='mt-auto pt-6 border-t border-gray-100'>
            <button className='flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-500 transition-colors w-full font-bold text-sm'>
                Logout
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main ref={scrollContainerRef} className='flex-1 h-screen bg-gray-50/50 overflow-y-auto'>
        <header className='h-20 bg-white/80 backdrop-blur-md w-full flex items-center justify-between px-8 sticky top-0 z-30 border-b border-gray-100'> 
          <div className='flex flex-col'>
            <h1 className='text-2xl font-black text-gray-900 tracking-tight'>{activeTitle}</h1>
            <p className='text-[11px] font-bold text-blue-600 uppercase tracking-widest mt-0.5'>
              Guardian Dashboard &bull; {selectedStudent.name}
            </p>
          </div>
          
          <div className='flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-2xl border border-gray-200'>
            <div className='w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold'>
               G
            </div>
            <div className='flex flex-col'>
                <span className='text-sm font-bold text-gray-800 leading-none'>Mr. Jahid</span>
                <span className='text-[10px] font-bold text-gray-400 uppercase mt-1'>Guardian</span>
            </div>
          </div>
        </header>

        {/* CONTENT INJECTION */}
        <section className='p-8 max-w-6xl mx-auto'>
          <Outlet context={{ student: selectedStudent }} />
        </section>
      </main>

    </div>
  );
};

export default Parent;