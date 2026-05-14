import React from "react";

const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    calendar: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    location: <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-none stroke-current stroke-2 ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const EventCard = ({ category, type, title, description, date, location }) => (
  <div className="group bg-white border border-slate-100 shadow-sm rounded-xl p-6 transition-all duration-100 hover:shadow-lg ">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-2">
        <span className="bg-white  text-[10px] font-black px-2 py-0.5 rounded uppercase ">
          {category}
        </span>
        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          {type}
        </span>
      </div>
    </div>
    
    <h3 className="text-lg font-bold text-slate-900 transition-colors mb-2 tracking-tight">
      {title}
    </h3>
    <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2 leading-relaxed">
      {description}
    </p>
    
    <div className="space-y-2 border-t border-slate-50 pt-4 mb-6">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <Icon name="calendar" className="w-3.5 h-3.5 text-slate-400" />
        {date}
      </div>
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <Icon name="location" className="w-3.5 h-3.5 text-slate-400" />
        {location}
      </div>
    </div>

    <button className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95">
      View Details
    </button>
  </div>
);

const Event = () => {
  const categories = ["All", "Academic", "Sports", "Cultural"];
  
  return (
    <div className="min-h-screen font-sans text-slate-900">
      <div className="">
        {/* Action Bar with matched heights */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 mb-5">
          {/* Search Input Container */}
          <div className="relative flex-grow h-11">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon name="search" className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              placeholder="Search for events..." 
              className="w-full h-full pl-11 pr-4 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all text-sm font-medium"
            />
          </div>
          
          {/* Filter Options - Heights match the search input */}
          <div className="flex items-center gap-2">
            {categories.map((filter, i) => (
              <button 
                key={filter} 
                className={`h-11 px-5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                  i === 0 
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm" 
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <EventCard 
            category="Academic" 
            type="Required" 
            title="Annual Science Fair" 
            description="Showcasing the best student projects from across all grades with live demonstrations." 
            date="Oct 26, 2024 | 9:00 AM" 
            location="Main Gymnasium" 
          />
          <EventCard 
            category="Sports" 
            type="Optional" 
            title="Varsity Basketball Finals" 
            description="Cheer on our team in the championship game against Northwood High!" 
            date="Nov 05, 2024 | 7:00 PM" 
            location="Sports Arena" 
          />
          <EventCard 
            category="Cultural" 
            type="Optional" 
            title="Winter Music Concert" 
            description="A festive evening featuring performances by the school orchestra and choir." 
            date="Dec 12, 2024 | 6:30 PM" 
            location="Auditorium" 
          />
        </div>

      </div>
    </div>
  );
};

export default Event;