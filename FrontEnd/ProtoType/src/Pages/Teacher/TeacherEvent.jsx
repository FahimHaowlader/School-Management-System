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
  Zap,
  BookOpen,
  Coffee,
  Globe
} from 'lucide-react';

const TeacherEvent = () => {
  const [activeTitle, setActiveTitle] = useState('Faculty Events');
  const scrollContainerRef = useRef(null);

  const events = [
    {
      id: 1,
      title: "Advanced Research Methodologies",
      category: "Research",
      date: "18 May",
      time: "11:00 AM",
      location: "Faculty Hall A",
      icon: <Globe size={20} />,
      color: "blue"
    },
    {
      id: 2,
      title: "Science Faculty Networking Lunch",
      category: "Social",
      date: "22 May",
      time: "01:30 PM",
      location: "Executive Lounge",
      icon: <Coffee size={20} />,
      color: "orange"
    },
    {
      id: 3,
      title: "Hybrid Teaching Tech Training",
      category: "Professional Development",
      date: "25 May",
      time: "03:00 PM",
      location: "Digital Lab 02",
      icon: <Zap size={20} />,
      color: "purple"
    },
    {
      id: 3,
      title: "Hybrid Teaching Tech Training",
      category: "Professional Development",
      date: "25 May",
      time: "03:00 PM",
      location: "Digital Lab 02",
      icon: <Zap size={20} />,
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
    <div className='flex flex-row w-full overflow-hidden font-sans bg-white'>
      
      {/* Main Content */}
      <div ref={scrollContainerRef} className='flex-1  bg-gray-50/50 overflow-y-auto scroll-smooth'>
        

        <main className=''>
          {/* Featured Event Card */}
          <div className="relative h-[320px] w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl group border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2070" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Faculty Symposium"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Faculty Symposium</span>
                <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Mandatory</span>
              </div>
              <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight max-w-2xl">SUST Science & Tech Annual Conference 2026</h2>
              <div className="flex items-center gap-6 text-sm font-medium text-gray-200">
                <span className="flex items-center gap-2"><CalendarDays size={18} className="text-blue-400" /> June 05-07, 2026</span>
                <span className="flex items-center gap-2"><MapPin size={18} className="text-blue-400" /> Main Auditorium</span>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all group cursor-pointer flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 
                    ${event.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                      event.color === 'orange' ? 'bg-orange-50 text-orange-600' : 
                      'bg-purple-50 text-purple-600'}`}>
                    {event.icon}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{event.category}</span>
                    <span className="text-sm font-black text-blue-600">{event.date}</span>
                  </div>

                  <h3 className="text-lg font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">{event.title}</h3>

                  <div className="space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Clock size={14} className="text-gray-400" /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <MapPin size={14} className="text-gray-400" /> {event.location}
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-50 rounded-2xl text-xs font-black text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-blue-100">
                  Register Interest <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherEvent;