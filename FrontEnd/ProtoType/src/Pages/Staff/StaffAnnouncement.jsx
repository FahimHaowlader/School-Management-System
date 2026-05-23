import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import Pic from '../../Assets/p.jpg';
import { 
  User, 
  Megaphone, 
  CalendarDays, 
  Settings, 
  LifeBuoy,
  ShieldCheck,
  Search,
  Filter,
  BellRing,
  Clock,
  ChevronRight,
  Pin
} from 'lucide-react';

const StaffAnnouncement = () => {
  const [activeTitle, setActiveTitle] = useState('Announcements');
  const scrollContainerRef = useRef(null);

  // Mock data for staff-specific notices
  const announcements = [
    {
      id: 1,
      title: "Annual Performance Review Cycle 2026",
      category: "Human Resources",
      date: "May 12, 2026",
      time: "09:00 AM",
      urgent: true,
      preview: "All department staff are requested to submit their self-evaluation forms by the end of this week."
    },
    {
      id: 2,
      title: "New Biometric Attendance System Update",
      category: "Operations",
      date: "May 08, 2026",
      time: "02:30 PM",
      urgent: false,
      preview: "Please register your thumbprints at the main office for the updated security and attendance gate."
    },
    {
      id: 3,
      title: "Inter-School Sports Meet - Volunteers Needed",
      category: "Events",
      date: "May 05, 2026",
      time: "11:00 AM",
      urgent: false,
      preview: "General staff interested in coordinating the logistics for the upcoming sports meet please sign up."
    }
  ];

  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold shadow-sm ring-1 ring-blue-100' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className='flex flex-row w-full overflow-hidden font-sans bg-white'>
      {/* Sidebar */}
      {/* <aside className='w-64 h-screen p-5 border-r border-gray-100 shrink-0 flex flex-col'>
        <div className='flex mb-10 items-center gap-3 px-2'>
          <div className='bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200'>
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <h2 className='text-xl font-black tracking-tight text-gray-900'>My class</h2>
        </div>
        
        <nav className='flex flex-col gap-1.5 flex-1'>
          <NavLink to="/staff/profile" className={navLinkClasses}><User size={20} /> <span className='text-sm'>Profile</span></NavLink>
          <NavLink to="/staff/announcement" className={navLinkClasses}><Megaphone size={20} /> <span className='text-sm'>Announcement</span></NavLink>
          <NavLink to="/staff/event" className={navLinkClasses}><CalendarDays size={20} /> <span className='text-sm'>Event</span></NavLink>
          <div className='my-4 border-t border-gray-50' />
          <NavLink to="/staff/settings" className={navLinkClasses}><Settings size={20} /> <span className='text-sm'>Settings</span></NavLink>
          <NavLink to="/staff/support" className={navLinkClasses}><LifeBuoy size={20} /> <span className='text-sm'>Support</span></NavLink>
        </nav>
      </aside> */}

      {/* Main Content */}
      <div ref={scrollContainerRef} className='flex-1  bg-gray-50/50 overflow-y-auto'>
        {/* Header */}
        {/* <header className='h-20 bg-white/80 backdrop-blur-md w-full flex items-center justify-between px-8 sticky top-0 z-20 border-b border-gray-100'> 
          <h1 className='text-2xl font-black text-gray-900'>{activeTitle}</h1>
          <div className='flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-gray-200'>
            <img src={Pic} alt="profile" className='w-9 h-9 rounded-xl object-cover' />
            <div className='flex flex-col'>
              <span className='text-sm font-bold text-gray-900'>Fahim Haowlader Jahid</span>
              <span className='text-[11px] text-gray-400 font-medium uppercase'>Admin Staff</span>
            </div>
          </div>
        </header> */}

        <main className=''>
          {/* Featured/Pinned Announcement */}
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white mb-10 overflow-hidden shadow-2xl shadow-blue-100">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Megaphone size={160} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  <Pin size={14} /> PINNED NOTICE
                </span>
              </div>
              <h2 className="text-3xl font-black mb-4 leading-tight max-w-2xl">
                Staff General Meeting regarding Semester End Planning
              </h2>
              <p className="text-blue-50/80 mb-6 font-medium max-w-xl">
                All administrative and general staff members are required to attend the assembly this Friday to discuss the transition to the 2026 Summer Session.
              </p>
              <button className="bg-white text-blue-600 font-black px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform active:scale-95">
                View Details
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search staff notices..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50">
              <Filter size={20} /> Filter
            </button>
          </div>

          {/* Announcement List */}
          <div className="space-y-4">
            {announcements.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${item.urgent ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                        <Clock size={14} /> {item.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 font-medium text-sm line-clamp-2 leading-relaxed">
                      {item.preview}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffAnnouncement;