import React from "react";

const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    calendar: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    location: <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
    child: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-none stroke-current stroke-2 ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const EventCard = ({ category, type, title, description, date, location, targetedChild }) => {
  // Setup badge colors dynamically depending on urgency for parent attention
  const getUrgencyStyles = (type) => {
    switch (type.toLowerCase()) {
      case "mandatory":
        return "bg-red-50 text-red-700 border-red-100";
      case "action required":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="group bg-white border border-slate-200 shadow-sm rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
      <div>
        {/* Badges Matrix */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex gap-1.5">
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100 uppercase tracking-wider">
              {category}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getUrgencyStyles(type)}`}>
              {type}
            </span>
          </div>
          
          {/* Child context dynamic label */}
          <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            <Icon name="child" className="w-3 h-3 text-slate-400" />
            <span>{targetedChild}</span>
          </div>
        </div>
        
        {/* Header and Summary Content */}
        <h3 className="text-lg font-bold text-slate-900 transition-colors duration-200 mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mb-5 font-medium line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        {/* Logistics Breakdown Block */}
        <div className="space-y-2 border-t border-slate-100 pt-4 mb-5">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
            <Icon name="calendar" className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {date}
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
            <Icon name="location" className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {location}
          </div>
        </div>
      </div>

      {/* Unified Classic Action Button with Micro-interactions */}
      <button className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-[0.98]">
        View Details
      </button>
    </div>
  );
};

const Event = () => {
  const categories = ["All Events", "Olivia's Classes", "Liam's Classes", "School-Wide"];
  
  return (
    <div className="font-sans text-slate-900 p-1">
      <div className="max-w-7xl mx-auto">
        
        {/* Action Header bar */}
        <div className="flex flex-col xl:flex-row items-stretch justify-between gap-4 mb-6">
          
          {/* Search Field */}
          <div className="relative flex-grow h-11 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
              <Icon name="search" className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search student events, meetings, or holidays..." 
              className="w-full h-full pl-11 pr-4 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all text-sm font-medium"
            />
          </div>
          
          {/* Interactive filter array built for multi-child setups */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 xl:pb-0">
            {categories.map((filter, i) => (
              <button 
                key={filter} 
                className={`h-11 px-4 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                  i === 0 
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm" 
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <EventCard 
            category="Academic" 
            type="Action Required" 
            title="Parent-Teacher Conference" 
            description="Quarterly evaluation meeting to discuss academic progress, performance metrics, and classroom development." 
            date="May 28, 2026 | 3:30 PM - 6:00 PM" 
            location="Classroom 104 (Ms. Davison)" 
            targetedChild="Olivia"
          />
          <EventCard 
            category="Excursion" 
            type="Action Required" 
            title="Field Trip: National Science Museum" 
            description="Interactive educational tour supporting the STEM syllabus. Transport and lunch arrangements included." 
            date="June 04, 2026 | 8:30 AM - 2:00 PM" 
            location="Buses leave from Main Gate" 
            targetedChild="Liam"
          />
          <EventCard 
            category="School-Wide" 
            type="Mandatory" 
            title="Annual General Assembly" 
            description="Briefing regarding institutional curriculum modifications, budget reports, and safe campus policies." 
            date="June 12, 2026 | 6:30 PM" 
            location="Main Auditorium" 
            targetedChild="All Students"
          />
        </div>

      </div>
    </div>
  );
};

export default Event;