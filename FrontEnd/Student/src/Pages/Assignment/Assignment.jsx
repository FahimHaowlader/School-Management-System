import React from "react";

const AssignmentCard = ({ title, course, date, status }) => {
  const statusConfig = {
    Overdue: { line: "bg-red-500", text: "text-red-600", btn: "bg-slate-900 text-white" },
    Pending: { line: "bg-amber-500", text: "text-amber-600", btn: "bg-slate-900 text-white" },
    Submitted: { line: "bg-blue-500", text: "text-blue-600", btn: "bg-slate-50 text-slate-500 border-slate-100" },
    Graded: { line: "bg-emerald-500", text: "text-emerald-600", btn: "bg-slate-50 text-slate-500 border-slate-100" },
  };

  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <div className="group relative bg-white px-6 py-4 rounded-xl border border-slate-100 transition-all duration-300 shadow-sm hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        
        {/* Minimal Status Line */}
        <div className={`w-1 h-10 rounded-full shrink-0 ${config.line}`} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-0.5">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
              {course}
            </span>
            <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${config.text}`}>
              {status}
            </span>
          </div>
          
          <h3 className="text-base font-bold text-slate-900 truncate tracking-tight">
            {title}
          </h3>
          
          <div className="flex items-center gap-1.5 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Due {date}
            </span>
          </div>
        </div>

        {/* Action Button: Minimalist Pill */}
        <div className="flex shrink-0">
          <button className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border text-slate-900 bg-slate-50 border-slate-100 hover:bg-slate-900 hover:text-white `}>
            <span>
              {status === "Overdue" ? "Late Submit" : 
               status === "Pending" ? "Turn In" : 
               status === "Submitted" ? "Review" : "Results"}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};



const Assignment = () => {

  return (
    <div className="w-full  font-sans text-slate-900">
      <div className="space-y-5">
      

        {/* Search & Filter Row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <div className="relative flex-grow h-11 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5  h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search assignments..." 
              className="w-full h-full pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="flex gap-2">
            <select className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:border-blue-400 shadow-sm transition-all appearance-none pr-10 relative">
              <option>All Courses</option>
              <option>History 101</option>
              <option>Calculus III</option>
            </select>
            <select className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:border-blue-400 shadow-sm transition-all appearance-none pr-10 relative">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Submitted</option>
            </select>
          </div>
        </div>

        {/* List of Assignment Cards */}
        <div className="grid grid-cols-1 gap-4">
          <AssignmentCard 
            status="Overdue"
            title="History Essay: The Roman Empire"
            course="History 101"
            date="Oct 15, 2023"
          />
          <AssignmentCard 
            status="Pending"
            title="Problem Set 5"
            course="Calculus III"
            date="Oct 26, 2023"
          />
          <AssignmentCard 
            status="Submitted"
            title="Lab Report: Projectile Motion"
            course="Physics 201"
            date="Nov 02, 2023"
          />
          <AssignmentCard 
            status="Graded"
            title='Poetry Analysis: "The Waste Land"'
            course="English Literature"
            date="Nov 08, 2023"
          />
        </div>
      </div>
    </div>
  );
};

export default Assignment;