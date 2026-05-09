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
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  Coffee,
  Briefcase,
  Users
} from 'lucide-react';

const StaffEvent = () => {
  const [activeTitle, setActiveTitle] = useState('Staff Events');
  const scrollContainerRef = useRef(null);

  const events = [
    {
      id: 1,
      title: "MERN Stack Workshop for IT Staff",
      category: "Professional Development",
      date: "15 May",
      time: "10:00 AM",
      location: "Lab 04, SUST",
      icon: <Briefcase size={20} />,
      color: "blue"
    },
    {
      id: 2,
      title: "Quarterly Staff Social Mixer",
      category: "Social",
      date: "20 May",
      time: "04:30 PM",
      location: "Staff Lounge",
      icon: <Coffee size={20} />,
      color: "orange"
    },
    {
      id: 3,
      title: "Admin Strategy & Planning 2026",
      category: "Official",
      date: "22 May",
      time: "09:00 AM",
      location: "Conference Room B",
      icon: <Users size={20} />,
      color: "purple"
    },
    {
      id: 3,
      title: "Admin Strategy & Planning 2026",
      category: "Official",
      date: "22 May",
      time: "09:00 AM",
      location: "Conference Room B",
      icon: <Users size={20} />,
      color: "purple"
    }
  ];

  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold shadow-sm ring-1 ring-blue-100' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className='flex flex-row w-full h-screen overflow-hidden font-sans bg-white'>
      {/* Sidebar */}
    
      {/* Main Content */}
      <div ref={scrollContainerRef} className='flex-1 h-screen bg-gray-50/50 overflow-y-auto scroll-smooth'>
        {/* Header */}
       

        <main className=''>
          {/* Featured Event Card */}
          <div className="relative h-[300px] w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Featured Event"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Upcoming Highlight</span>
                <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold">Registration Open</span>
              </div>
              <h2 className="text-4xl font-black mb-4 tracking-tight">Annual Staff Excellence Awards 2026</h2>
              <div className="flex items-center gap-6 text-sm font-medium text-gray-200">
                <span className="flex items-center gap-2"><CalendarDays size={18} className="text-blue-400" /> June 12, 2026</span>
                <span className="flex items-center gap-2"><MapPin size={18} className="text-blue-400" /> SUST Central Auditorium</span>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50/50 transition-all group cursor-pointer">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 
                  ${event.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                    event.color === 'orange' ? 'bg-orange-50 text-orange-600' : 
                    'bg-purple-50 text-purple-600'}`}>
                  {event.icon}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{event.category}</span>
                  <span className="text-sm font-black text-blue-600">{event.date}</span>
                </div>

                <h3 className="text-lg font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{event.title}</h3>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <Clock size={14} /> {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <MapPin size={14} /> {event.location}
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl text-sm font-black text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  RSVP Now <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffEvent;