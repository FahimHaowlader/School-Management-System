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

const AnnouncementCard = ({ type, title, description, date, imageUrl, unread }) => {
  const badgeStyles = {
    Administrative: "bg-amber-50 text-amber-700 border-amber-100",
    Academic: "bg-emerald-50 text-emerald-700 border-emerald-100",
    HR: "bg-sky-50 text-sky-700 border-sky-100",
  };

  return (
    <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-200 group">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Thumbnail Responsive Controller */}
        <div className="w-full lg:w-56 h-40 shrink-0 overflow-hidden rounded-lg border border-slate-100">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Content Matrix Block */}
        <div className="flex flex-col justify-between flex-1 py-0.5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyles[type] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
                {type}
              </span>
              {unread && (
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              )}
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 transition-colors group-hover:text-blue-600">
              {title}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 lg:mb-0">
              {description}
            </p>
          </div>
          
          <div className="flex items-center justify-between border-t border-slate-50 lg:border-none pt-3 lg:pt-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {date}
            </span>
            
            <button className="group/btn flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-900 text-xs font-black rounded-xl border border-slate-100 transition-all duration-200 hover:bg-slate-900 hover:text-white hover:shadow-md active:scale-95">
              <span>Read Circular</span>
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
  );
};

const Announcement = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Administrative", "Academic", "HR"];

  const staffNotices = [
    {
      type: "Administrative",
      unread: true,
      title: "RJSC Incorporation Documents & Domain Migration Notice",
      description: "Official confirmation regarding legal registration protocols. All project repositories under the organization domain are migrating to the new centralized structural server framework this weekend.",
      date: "24 May 2026",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"
    },
    {
      type: "Academic",
      unread: false,
      title: "CourseBank Management Update: Resource Schema Deployment",
      description: "The peer-review modules and resource sharing sub-components have been updated on the main staging cluster. Faculty heads are requested to verify their respective semester syllabus entries.",
      date: "22 May 2026",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400"
    },
    {
      type: "HR",
      unread: false,
      title: "Fiscal Year Performance Evaluations & Payroll Adjustments",
      description: "Human Resources has initiated the yearly appraisal pipeline. Please ensure all performance self-evaluations and task sheets are updated inside the portal dashboard before the final lock date.",
      date: "15 May 2026",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const filteredNotices = activeFilter === "All"
    ? staffNotices
    : staffNotices.filter((notice) => notice.type === activeFilter);

  return (
    <div className="w-full font-sans text-slate-900">
      <div className="space-y-6">
        
        {/* Search & Filter Row - Preserving the Exact Blue Glow Focus Match */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <div className="relative flex-grow h-11 group">
            <input 
              type="text" 
              placeholder="Search internal circulars, memos, or notices..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all duration-200 shadow-sm font-medium"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categories Filter Box */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`h-11 px-6 rounded-xl text-xs font-bold transition-all duration-200 border whitespace-nowrap
                  ${activeFilter === cat 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Feed Grid */}
        <div className="grid grid-cols-1 gap-5">
          {filteredNotices.map((notice, index) => (
            <AnnouncementCard 
              key={index}
              type={notice.type}
              unread={notice.unread}
              title={notice.title}
              description={notice.description}
              date={notice.date}
              imageUrl={notice.imageUrl}
            />
          ))}

          {filteredNotices.length === 0 && (
            <div className="py-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">No Circulars Found in this Category</p>
            </div>
          )}
        </div>

        {/* Pagination Container */}
        <div className="flex items-center justify-between pt-4">
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider disabled:opacity-40" disabled>
            Previous
          </button>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-xl shadow-sm">1</span>
            <span className="text-slate-400 hover:bg-slate-50 w-8 h-8 flex items-center justify-center rounded-xl cursor-pointer transition-colors">2</span>
          </div>
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider">
            Next Page
          </button>
        </div>

      </div>
    </div>
  );
};

export default Announcement;