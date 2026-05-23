import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router';
import Pic from '../../Assets/p.jpg';
import { 
  User, 
  Megaphone, 
  CalendarDays, 
  Settings, 
  LifeBuoy,
  ShieldCheck,
  Mail,
  Phone,
  Star,
  MessageSquare,
  Users,
  Award,
  Briefcase,
  Building2,
  FileText
} from 'lucide-react';

const StaffProfile = () => {
  const [activeTitle, setActiveTitle] = useState('Staff Profile');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* <aside className='w-64 h-screen p-5 border-r border-gray-100 shrink-0 flex flex-col'>
        <div className='flex mb-10 items-center gap-3 px-2'>
          <div className='bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200'>
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <h2 className='text-xl font-black tracking-tight text-gray-900 text-nowrap'>My class</h2>
        </div>
        
        <nav className='flex flex-col gap-1.5 flex-1'>
          <NavLink to="/staff/profile" onClick={() => setActiveTitle("Staff Profile")} className={navLinkClasses}>
            <User size={20} /> <span className='text-sm'>Profile</span>
          </NavLink>
          <NavLink to="/staff/announcement" onClick={() => setActiveTitle("Announcements")} className={navLinkClasses}>
            <Megaphone size={20} /> <span className='text-sm'>Announcement</span>
          </NavLink>
          <NavLink to="/staff/event" onClick={() => setActiveTitle("Events")} className={navLinkClasses}>
            <CalendarDays size={20} /> <span className='text-sm'>Event</span>
          </NavLink>
          <div className='my-4 border-t border-gray-50' />
          <NavLink to="/staff/settings" onClick={() => setActiveTitle("Settings")} className={navLinkClasses}>
            <Settings size={20} /> <span className='text-sm'>Settings</span>
          </NavLink>
          <NavLink to="/staff/support" onClick={() => setActiveTitle("Support")} className={navLinkClasses}>
            <LifeBuoy size={20} /> <span className='text-sm'>Support</span>
          </NavLink>
        </nav>
      </aside> */}

      {/* Main Content */}
      <div ref={scrollContainerRef} className='flex-1 h-screen bg-gray-50/50 overflow-y-auto scroll-smooth'>
        {/* Header */}
        {/* <header className='h-20 bg-white/80 backdrop-blur-md w-full flex items-center justify-between px-8 sticky top-0 z-20 border-b border-gray-100'> 
          <h1 className='text-2xl font-black text-gray-900 tracking-tight'>{activeTitle}</h1>
          <div className='flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-gray-200 shadow-sm'>
            <img src={Pic} alt="profile" className='w-9 h-9 rounded-xl object-cover' />
            <div className='flex flex-col text-left'>
              <span className='text-sm font-bold text-gray-900 leading-none text-nowrap'>Fahim Haowlader Jahid</span>
              <span className='text-[11px] text-gray-400 font-medium'>Administrative Officer</span>
            </div>
          </div>
        </header> */}

        {/* Profile Content */}
        <main className=''>
          <div className=''>
            <div className="bg-white overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                
                {/* Left Column: Stats & Avatar */}
                <div className="p-8 bg-gray-50/50 border-r border-gray-100 flex flex-col items-center text-center">
                  <div className="relative group">
                    <img 
                      src={Pic} 
                      alt="Staff Avatar" 
                      className="h-40 w-40 rounded-[2.5rem] object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full h-6 w-6 border-4 border-white shadow-sm"></div>
                  </div>

                  <h2 className="text-2xl font-black text-gray-900 mt-6 leading-tight">Fahim Haowlader Jahid</h2>
                  <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mt-1">Registrar's Office</p>
                  <p className="text-gray-400 text-xs mt-2 font-medium italic">Operational Excellence since 2018</p>

                  <div className="w-full mt-8 space-y-3">
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                      <div className="flex items-center gap-3 text-yellow-500"><Star size={18} fill="currentColor"/> <span className="text-gray-700 font-bold text-sm">Efficiency</span></div>
                      <span className="text-gray-900 font-black">4.8</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                      <div className="flex items-center gap-3 text-blue-500"><MessageSquare size={18}/> <span className="text-gray-700 font-bold text-sm">Feedback</span></div>
                      <span className="text-gray-900 font-black">94%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                      <div className="flex items-center gap-3 text-emerald-500"><Users size={18}/> <span className="text-gray-700 font-bold text-sm">Projects</span></div>
                      <span className="text-gray-900 font-black">28+</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-2 p-10">
                  <section>
                    <h3 className="flex items-center gap-2 text-xl font-black text-gray-900 mb-4">
                      <Award className="text-blue-600" size={24} /> Professional Summary
                    </h3>
                    <p className="text-gray-500 leading-relaxed font-medium text-justify">
                      Highly organized and detail-oriented Administrative Professional with over 6 years of experience in managing educational operations. 
                      Expertise in streamlining office workflows, student record management, and coordinating multi-departmental events. 
                      Dedicated to providing high-quality support to both faculty and students to ensure a seamless academic environment.
                    </p>
                  </section>

                  {/* Operational Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                    <div className="flex flex-col gap-1">
                      <h4 className="flex items-center gap-2 text-sm font-black text-gray-900 uppercase tracking-widest">
                        <Building2 size={18} className="text-blue-600" /> Division
                      </h4>
                      <p className="text-sm text-gray-500 font-medium">Academic Affairs & <br/>Institutional Support</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="flex items-center gap-2 text-sm font-black text-gray-900 uppercase tracking-widest">
                        <Briefcase size={18} className="text-blue-600" /> Core Skills
                      </h4>
                      <p className="text-sm text-gray-500 font-medium">Resource Allocation & <br/>Project Coordination</p>
                    </div>
                  </div>

                  <section className="mt-12">
                    <h3 className="flex items-center gap-2 text-xl font-black text-gray-900 mb-6">
                      <FileText className="text-blue-600" size={24} /> Official Contact
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50 transition-all group">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400 group-hover:text-blue-600 transition-colors">
                          <Mail size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Work Email</p>
                          <p className="text-sm font-bold text-gray-700">admin.jahid@school.edu</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50 transition-all group">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400 group-hover:text-blue-600 transition-colors">
                          <Phone size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Extension</p>
                          <p className="text-sm font-bold text-gray-700">+880 17XX-XXXXXX</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="mt-12 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95">
                      Schedule Meeting
                    </button>
                    <button className="flex-1 bg-white text-gray-900 border-2 border-gray-100 font-black py-4 rounded-2xl hover:bg-gray-50 transition-all active:scale-95">
                      View Service Record
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffProfile;