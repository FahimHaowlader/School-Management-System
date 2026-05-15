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

const AnnouncementCard = ({ type, title, description, date, imageUrl, unread }) => {
  const badgeStyles = {
    Academic: "bg-emerald-50 text-emerald-700 border-emerald-100",
    General: "bg-amber-50 text-amber-700 border-amber-100",
    Events: "bg-sky-50 text-sky-700 border-sky-100",
  };

  return (
    <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail - Original Size */}
        <div className="w-full md:w-48 lg:w-64 h-40 shrink-0 overflow-hidden rounded-lg border border-slate-100">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Content Area */}
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyles[type] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
                {type}
              </span>
              {unread && (
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              )}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2 transition-colors">
              {title}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
              {date}
            </span>
            
            {/* Redesigned Button */}
               <div className="flex items-center justify-end mt-auto pt-2">
            <button className="group/btn flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-900 text-xs font-black rounded-xl border border-slate-100 transition-all hover:bg-slate-900 hover:text-white hover:shadow-lg active:scale-95">
              <span>Continue Reading</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Announcement = () => {
  const categories = ["All", "General", "Academic", "Events"];

  return (
    <div className="w-full font-sans text-slate-900">
      <div className="space-y-6">
        
        {/* Search & Filter Row - Unified Height */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <div className="relative flex-grow h-11 group">
            <input 
              type="text" 
              placeholder="Search announcements..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5  h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                className={`h-11 px-6 rounded-xl text-xs font-bold transition-all border whitespace-nowrap
                  ${i === 0 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div className="grid grid-cols-1 gap-5">
          <AnnouncementCard 
            type="Academic"
            unread={true}
            title="Final Exam Schedule for Fall Semester Released"
            description="The official final exam schedule is now available. Please review the dates and times for your courses to prepare accordingly and avoid overlaps."
            date="26 Oct 2023"
            imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400"
          />
          
          <AnnouncementCard 
            type="General"
            title="Campus Library Holiday Hours"
            description="Our library hours are changing for the winter break. Study spaces will be limited during the first week of January."
            date="25 Oct 2023"
            imageUrl="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400"
          />
          <AnnouncementCard 
            type="Events"
            title="Campus Library Holiday Hours"
            description="Our library hours are changing for the winter break. Study spaces will be limited during the first week of January."
            date="25 Oct 2023"
            imageUrl="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400"
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-6">
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-tighter">
            Previous
          </button>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-lg">1</span>
            <span className="text-slate-400 w-8 h-8 flex items-center justify-center">2</span>
          </div>
           <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-tighter">
            Next Page
          </button>
        </div>

      </div>
    </div>
  );
};

export default Announcement;