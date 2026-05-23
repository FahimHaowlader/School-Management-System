import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Users, 
  Bell,
  MoreVertical,
  ClipboardCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  CalendarIcon
} from 'lucide-react';


const TeacherClassRoutine = () => {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

  const schedule = {
    'Mon': [
      { id: 1, period: '1st Period', time: '08:30 AM - 09:20 AM', subject: 'Mathematics', room: 'Room 204', section: 'Class 9-A', active: false },
      { id: 2, period: '2nd Period', time: '09:25 AM - 10:15 AM', subject: 'Physics', room: 'Lab 1', section: 'Class 10-C', active: true },
      { id: 3, period: 'Break', time: '10:15 AM - 10:45 AM', subject: 'Recess', room: 'Staff Room', section: '-', active: false, isBreak: true },
      { id: 4, period: '3rd Period', time: '10:50 AM - 11:40 AM', subject: 'Higher Math', room: 'Room 204', section: 'Class 9-B', active: false },
    ],
    'Tue': [
      { id: 5, period: '1st Period', time: '08:30 AM - 09:20 AM', subject: 'General Science', room: 'Room 102', section: 'Class 8-A', active: false },
    ]
  };

  const currentClasses = schedule[selectedDay] || [];

  return (
    <div className='animate-in fade-in slide-in-from-bottom-3 duration-500'>
      {/* Day Selector - Styled like your header profile box */}
      <div className='flex flex-wrap items-center justify-between mb-8 gap-4'>
        <div className='flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm'>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedDay === day 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-2 text-gray-400 text-sm font-medium bg-white px-4 py-2 rounded-xl border border-gray-100'>
          <Sparkles size={16} className='text-blue-500' />
          <span>Academic Year 2026</span>
        </div>
      </div>

      {/* Routine Timeline */}
      <div className='relative'>
        {/* Subtle Path */}
        <div className='absolute left-8 md:left-[2.75rem] top-0 bottom-0 w-px bg-gray-200/60 hidden sm:block'></div>

        <div className='space-y-6 relative'>
          {currentClasses.length > 0 ? (
            currentClasses.map((item) => (
              <div key={item.id} className={`group flex flex-col sm:flex-row gap-4 md:gap-10 items-start ${item.isBreak ? 'opacity-60' : ''}`}>
                
                {/* Time Indicator Node */}
                <div className={`mt-6 w-14 h-14 rounded-2xl shrink-0 hidden sm:flex items-center justify-center border-4 border-gray-50 shadow-sm z-10 transition-all duration-300 ${
                  item.active 
                    ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-100' 
                    : 'bg-white text-gray-300 border-gray-100'
                }`}>
                  {item.isBreak ? <Clock size={22} /> : <BookOpen size={22} />}
                </div>

                {/* Period Content Card - Matches NavLink active style */}
                <div className={`flex-1 w-full bg-white border rounded-[1.5rem] p-6 transition-all duration-300 ${
                  item.active 
                    ? 'border-blue-100 ring-1 ring-blue-50 shadow-xl shadow-blue-50/50' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}>
                  <div className='flex flex-col lg:flex-row justify-between gap-6'>
                    
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-4'>
                        <span className={`text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1 rounded-lg ${
                          item.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {item.period}
                        </span>
                        <span className='text-[11px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1.5'>
                          <Clock size={14} className='text-gray-300' /> {item.time}
                        </span>
                        {item.active && (
                          <span className='flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase animate-pulse'>
                            <div className='w-1.5 h-1.5 rounded-full bg-blue-600'></div> Live
                          </span>
                        )}
                      </div>
                      
                      <h3 className='text-xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors'>
                        {item.subject}
                      </h3>

                      <div className='flex flex-wrap items-center gap-6'>
                        <div className='flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-tight'>
                          <MapPin size={15} className='text-blue-600' /> {item.room}
                        </div>
                        {!item.isBreak && (
                          <div className='flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-tight'>
                            <Users size={15} className='text-blue-600' /> {item.section}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    {!item.isBreak && (
                      <div className='flex items-center gap-2 self-end lg:self-center border-t border-gray-50 pt-4 lg:pt-0 lg:border-0 w-full lg:w-auto justify-end'>
                        <button className='w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100'>
                          <Bell size={18} />
                        </button>
                        <button className='flex items-center gap-2 px-5 h-10 rounded-xl text-xs font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all'>
                          <ClipboardCheck size={16} /> Attendance
                        </button>
                        <button className={`flex items-center gap-2 px-6 h-10 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          item.active 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700' 
                          : 'bg-gray-900 text-white hover:bg-black'
                        }`}>
                          Start Class <ArrowRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='py-24 text-center bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center'>
              <div className='bg-gray-50 p-4 rounded-full mb-4 text-gray-300'>
                <CalendarIcon size={40} />
              </div>
              <h4 className='text-gray-900 font-black'>No Sessions Found</h4>
              <p className='text-gray-400 text-sm font-medium max-w-xs mx-auto mt-1'>There are no classes scheduled for {selectedDay}.</p>
            </div>
          )}
        </div>
      </div>

      {/* Simplified Legend */}
      <footer className='mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]'>
        <p>© 2026 My class technologies Ltd.</p>
        <div className='flex gap-6'>
          <span className='flex items-center gap-2'><div className='w-2 h-2 rounded-full bg-blue-600'></div> In Session</span>
          <span className='flex items-center gap-2'><div className='w-2 h-2 rounded-full bg-gray-200'></div> Upcoming</span>
        </div>
      </footer>
    </div>
  );
};

export default TeacherClassRoutine;