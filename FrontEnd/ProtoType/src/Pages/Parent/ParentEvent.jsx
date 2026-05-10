import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ChevronRight, 
  Video, 
  Trophy, 
  Coffee,
  Ticket,
  Plus
} from 'lucide-react';

const ParentEvent = () => {
  const events = [
    {
      id: 1,
      title: "Annual Science & Tech Fair",
      category: "Academic",
      date: "18",
      month: "May",
      time: "09:00 AM - 03:00 PM",
      location: "Main Campus Auditorium",
      attendees: "250+ Parents",
      type: "Physical",
      color: "blue"
    },
    {
      id: 2,
      title: "Workshop: Cyber Safety for Kids",
      category: "Seminar",
      date: "22",
      month: "May",
      time: "07:30 PM - 09:00 PM",
      location: "Google Meet / Zoom",
      attendees: "Unlimited",
      type: "Virtual",
      color: "purple"
    },
    {
      id: 3,
      title: "Inter-School Football Finals",
      category: "Sports",
      date: "25",
      month: "May",
      time: "04:00 PM",
      location: "City Sports Complex",
      attendees: "Open Event",
      type: "Physical",
      color: "emerald"
    }
  ];

  return (
    <div className="flex w-full font-sans bg-gray-50 text-gray-900 pb-12">
      <main className="flex-1 space-y-8">
        
        {/* --- HERO HEADER --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 flex items-center justify-center lg:justify-start gap-3">
              <Calendar className="text-blue-600" size={32} />
              Upcoming Events
            </h1>
            <p className="text-gray-400 font-bold mt-2 uppercase text-[10px] tracking-[0.2em]">Don't miss out on important school gatherings</p>
          </div>
          
          <div className="flex bg-gray-50 p-2 rounded-3xl border border-gray-100">
            <button className="px-6 py-3 bg-white shadow-sm rounded-2xl text-xs font-black text-blue-600 border border-blue-50 transition-all">List View</button>
            <button className="px-6 py-3 rounded-2xl text-xs font-bold text-gray-400 hover:text-gray-600 transition-all">Calendar</button>
          </div>
        </div>

        {/* --- EVENTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-[2.5rem] p-6 border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-xl hover:shadow-blue-100/30 transition-all group">
                
                {/* Left: Date Card */}
                <div className={`flex flex-col items-center justify-center min-w-[100px] h-[120px] rounded-[2rem] border-2 transition-all ${
                  event.color === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                  event.color === 'purple' ? 'bg-purple-50 border-purple-100 text-purple-600' :
                  'bg-emerald-50 border-emerald-100 text-emerald-600'
                }`}>
                  <span className="text-sm font-black uppercase tracking-tighter">{event.month}</span>
                  <span className="text-4xl font-black">{event.date}</span>
                </div>

                {/* Center: Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      event.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      event.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {event.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase">
                      {event.type === 'Virtual' ? <Video size={14} className="text-rose-500" /> : <MapPin size={14} className="text-blue-500" />}
                      {event.type}
                    </div>
                  </div>

                  <h2 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{event.title}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                      <Clock size={16} className="text-gray-300" /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                      <MapPin size={16} className="text-gray-300" /> {event.location}
                    </div>
                  </div>
                </div>

                {/* Right: Action */}
                <div className="flex flex-col justify-center items-center gap-3 border-l border-gray-50 pl-8">
                  <button className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg active:scale-90">
                    <Plus size={20} />
                  </button>
                  <span className="text-[9px] font-black text-gray-400 uppercase">RSVP</span>
                </div>
              </div>
            ))}
          </div>

          {/* --- SIDEBAR --- */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-gray-200 overflow-hidden relative">
              <div className="relative z-10">
                <Ticket className="text-blue-400 mb-6" size={32} />
                <h3 className="text-xl font-black mb-4 tracking-tight">Your Registrations</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs text-gray-400 font-bold">Upcoming Attendance</span>
                    <span className="text-lg font-black text-blue-400">03</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs text-gray-400 font-bold">Invites Pending</span>
                    <span className="text-lg font-black text-orange-400">01</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16"></div>
            </div>

            {/* Interest Categories */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100">
              <h3 className="font-black text-gray-900 mb-6 text-sm flex items-center gap-2">
                <Trophy size={18} className="text-blue-600" /> Event Highlights
              </h3>
              <div className="space-y-4">
                <HighlightItem icon={<Coffee size={14}/>} label="Parent Morning Coffee" date="May 20" />
                <HighlightItem icon={<Users size={14}/>} label="Orientation Program" date="Jun 02" />
              </div>
              <button className="w-full mt-8 py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-xs font-black hover:border-blue-200 hover:text-blue-600 transition-all">
                Sync with Google Calendar
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

const HighlightItem = ({ icon, label, date }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900">{label}</span>
    </div>
    <span className="text-[10px] font-black text-gray-400">{date}</span>
  </div>
);

export default ParentEvent;