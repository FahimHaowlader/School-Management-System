import React, { useState } from "react";

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

const EventCard = ({ category, status, title, description, date, location }) => (
  <div className="group bg-white border border-slate-100 shadow-sm rounded-xl p-6 transition-all duration-200 hover:shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-2">
        <span className="bg-slate-50 border border-slate-200/60 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
          {category}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
          status === "Mandatory" || status === "Duty Assigned"
            ? "bg-red-50 text-red-600 border border-red-100"
            : "bg-slate-100 text-slate-600"
        }`}>
          {status}
        </span>
      </div>
    </div>
    
    <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
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

    <button className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 active:scale-95">
      View Details & Roster
    </button>
  </div>
);

const Event = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Meeting", "Academic", "Training", "Duty"];
  
  const staffEvents = [
    {
      category: "Meeting",
      status: "Mandatory",
      title: "Academic Council Briefing",
      description: "Reviewing final curriculum revisions, semester lesson planning, and upgrading student monitoring systems.",
      date: "May 28, 2026 | 02:00 PM",
      location: "Main Faculty Lounge"
    },
    {
      category: "Duty",
      status: "Duty Assigned",
      title: "Term-Final Invigilation Duty",
      description: "Assigned room invigilation rosters and script coordination duties for the incoming high school cluster assessment.",
      date: "Jun 02, 2026 | 09:00 AM",
      location: "Exam Hall A & B"
    },
    {
      category: "Training",
      status: "Optional",
      title: "MERN Stack ERP Workshop",
      description: "Hands-on professional development track outlining database integrations for our new campus portals.",
      date: "Jun 10, 2026 | 11:30 AM",
      location: "Computer Lab 3"
    },
    {
      category: "Academic",
      status: "Mandatory",
      title: "Parent-Teacher Conference",
      description: "Mid-term performance evaluations and feedback processing sessions with registered guardians.",
      date: "Jun 18, 2026 | 08:30 AM",
      location: "Respective Classrooms"
    }
  ];

  const filteredEvents = activeFilter === "All" 
    ? staffEvents 
    : staffEvents.filter(event => event.category === activeFilter);

  return (
    <div className="font-sans text-slate-900">
      <div className="">
        {/* Action Bar with matched heights */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3 mb-6">
          
          {/* Search Input Container with your exact blue active states */}
          <div className="relative flex-grow h-11 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
              <Icon name="search" className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search staff events, duties, or schedules..." 
              className="w-full h-full pl-11 pr-4 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all duration-200 text-sm font-medium"
            />
          </div>
          
          {/* Filter Options */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((filter) => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`h-11 px-5 rounded-xl text-xs font-bold border transition-all duration-200 whitespace-nowrap ${
                  activeFilter === filter 
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm" 
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Card Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((item, index) => (
            <EventCard 
              key={index}
              category={item.category} 
              status={item.status} 
              title={item.title} 
              description={item.description} 
              date={item.date} 
              location={item.location} 
            />
          ))}

          {filteredEvents.length === 0 && (
            <div className="col-span-full py-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">No Events Listed under this Category</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Event;