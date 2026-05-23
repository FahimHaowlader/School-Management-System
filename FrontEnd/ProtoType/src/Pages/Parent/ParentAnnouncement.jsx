import React from 'react';
import { 
  Megaphone, 
  Pin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Filter,
  BellRing,
  Info,
  AlertCircle,
  FileText
} from 'lucide-react';

const ParentAnnouncement = () => {
  const notices = [
    {
      id: 1,
      tag: "Urgent",
      title: "Quarterly Parent-Teacher Meeting (PTM)",
      desc: "The second quarterly PTM is scheduled for this coming Saturday. Attendance is mandatory for discussing the upcoming final term curriculum.",
      date: "15 May",
      time: "10:00 AM",
      type: "priority",
      isPinned: true
    },
    {
      id: 2,
      tag: "Academic",
      title: "Summer Vacation Schedule 2026",
      desc: "Please find the attached PDF for the official summer break schedule and holiday assignments for all grades.",
      date: "12 May",
      time: "02:30 PM",
      type: "general",
      hasAttachment: true
    },
    {
      id: 3,
      tag: "Event",
      title: "Annual Sports Day Registration",
      desc: "Registration for the Annual Sports Track & Field events is now open. Interested students can sign up via the student portal.",
      date: "10 May",
      time: "09:00 AM",
      type: "general"
    }
  ];

  return (
    <div className="flex w-full font-sans bg-gray-50 text-gray-900 pb-12">
      <main className="flex-1 space-y-8">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 flex items-center gap-3">
              <Megaphone className="text-blue-600" size={32} />
              School Announcements
            </h1>
            <p className="text-gray-400 font-bold mt-1 ml-11 uppercase text-[10px] tracking-[0.2em]">
              Stay updated with the latest campus news
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-black text-xs text-gray-500 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <BellRing size={16} />
              Alert Settings
            </button>
          </div>
        </div>

        {/* --- ANNOUNCEMENT LIST --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-4">
            {notices.map((notice) => (
              <div 
                key={notice.id} 
                className={`relative bg-white p-8 rounded-[2.5rem] border transition-all hover:shadow-xl hover:shadow-gray-200/50 group ${
                  notice.isPinned ? 'border-blue-100 ring-1 ring-blue-50' : 'border-gray-100'
                }`}
              >
                {notice.isPinned && (
                  <div className="absolute top-6 right-8 text-blue-600">
                    <Pin size={18} fill="currentColor" className="-rotate-45" />
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center min-w-[80px] h-[80px] bg-gray-50 rounded-[1.5rem] border border-gray-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-tighter group-hover:text-blue-100 transition-colors">
                      {notice.date.split(' ')[1]}
                    </span>
                    <span className="text-2xl font-black text-gray-900 group-hover:text-white transition-colors">
                      {notice.date.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                        notice.type === 'priority' 
                          ? 'bg-rose-50 text-rose-600 border-rose-100' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {notice.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[11px]">
                        <Clock size={12} />
                        {notice.time}
                      </div>
                    </div>

                    <h2 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                      {notice.title}
                    </h2>
                    
                    <p className="text-gray-500 font-medium leading-relaxed text-sm">
                      {notice.desc}
                    </p>

                    {notice.hasAttachment && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-100 transition-all">
                        <FileText size={14} className="text-blue-600" />
                        View Attachment (PDF)
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-center">
                    <button className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-300 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- SIDEBAR: STATISTICS & INFO --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 mb-6 flex items-center gap-2">
                <Info size={18} className="text-blue-600" />
                Quick Info
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-black">
                    12
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 uppercase tracking-tight">Active Notices</p>
                    <p className="text-[10px] text-gray-400 font-bold">Past 30 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                    02
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 uppercase tracking-tight">Urgent Tasks</p>
                    <p className="text-[10px] text-gray-400 font-bold">Needs attention</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
              <div className="relative z-10">
                <Calendar size={32} className="mb-4 opacity-50" />
                <h3 className="text-lg font-black leading-tight mb-2">Academic Calendar 2026</h3>
                <p className="text-blue-100 text-xs font-bold leading-relaxed mb-6">
                  Download the full schedule including exams and holidays.
                </p>
                <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-black text-xs hover:bg-blue-50 transition-all shadow-lg">
                  View Full Calendar
                </button>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-50" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ParentAnnouncement;