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
  Clock,
  ChevronRight,
  Pin,
  BellRing,
  Plus
} from 'lucide-react';

const TeacherAnnouncement = () => {
  const [activeTitle, setActiveTitle] = useState('Announcements');
  const scrollContainerRef = useRef(null);

  // Mock data for teacher-specific notices
  const announcements = [
    {
      id: 1,
      title: "Semester Grade Submission Deadline",
      category: "Academic Affairs",
      date: "May 15, 2026",
      time: "11:59 PM",
      urgent: true,
      preview: "All faculty members are reminded that the final grade entry for the Spring semester must be completed by Friday night."
    },
    {
      id: 2,
      title: "Faculty Development Workshop: AI in Education",
      category: "Professional Growth",
      date: "May 18, 2026",
      time: "10:00 AM",
      urgent: false,
      preview: "Join us in the Main Hall for a session on integrating large language models into your classroom workflow and grading."
    },
    {
      id: 3,
      title: "Updated Lab Safety Protocols",
      category: "Departmental",
      date: "May 20, 2026",
      time: "09:00 AM",
      urgent: false,
      preview: "The Science department has released new safety guidelines for laboratory sessions. Please review them before the next practical."
    }
  ];

  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold shadow-sm ring-1 ring-blue-100' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className='flex flex-row w-full  overflow-hidden font-sans bg-white'>
     

      {/* Main Content */}
      <div ref={scrollContainerRef} className='flex-1  bg-gray-50/50 overflow-y-auto'>
      

        <main className=''>
          {/* Featured/Pinned Announcement */}
          <div className="relative bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-10 text-white mb-10 overflow-hidden shadow-2xl shadow-blue-100">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BellRing size={160} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-black flex items-center gap-2 uppercase tracking-widest">
                  <Pin size={14} /> Pinned by Principal
                </span>
              </div>
              <h2 className="text-3xl font-black mb-4 leading-tight max-w-2xl">
                Mandatory Faculty Assembly: 2026 Academic Strategy
              </h2>
              <p className="text-blue-50/80 mb-6 font-medium max-w-xl">
                A session to discuss the upcoming curriculum changes and institutional goals for the next academic year. Your presence is highly valued.
              </p>
              <div className='flex gap-4'>
                <button className="bg-white text-blue-600 font-black px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform active:scale-95">
                  Attend Meeting
                </button>
                <button className="bg-transparent border-2 border-white/30 text-white font-black px-8 py-3 rounded-2xl hover:bg-white/10 transition-all">
                  Read Agenda
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search faculty notices..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter size={20} /> Filter
            </button>
          </div>

          {/* Announcement List */}
          <div className="space-y-4">
            {announcements.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all cursor-pointer group"
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
                  <div className="bg-gray-50 p-4 rounded-2xl text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
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

export default TeacherAnnouncement;