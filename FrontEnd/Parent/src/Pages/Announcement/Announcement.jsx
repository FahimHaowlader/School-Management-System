import React from "react";

const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    child: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-none stroke-current stroke-2 ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

// const AnnouncementCard = ({ type, title, description, date, imageUrl, unread, targetedChild }) => {
//   return (
//     <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row gap-6">
      
//       {/* Thumbnail Image Frame */}
//       <div className="w-full md:w-48 lg:w-64 h-40 shrink-0 overflow-hidden rounded-lg border border-slate-100 relative">
//         <img 
//           src={imageUrl} 
//           alt={title} 
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
//         />
//       </div>
      
//       {/* Content Meta Area */}
//       <div className="flex flex-col justify-between flex-1 py-0.5">
//         <div>
//           <div className="flex items-center justify-between gap-3 mb-2.5">
//             <div className="flex items-center gap-2">
//               {/* Standard Unified General-Style Type Badge */}
//               <span className="px-2.5 py-0.5 bg-slate-50 text-slate-600 border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
//                 {type}
//               </span>
//               {unread && (
//                 <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
//               )}
//             </div>

//             {/* Child Identifier Context Tag */}
//             <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-100">
//               <Icon name="child" className="w-3 h-3 text-slate-400" />
//               <span>{targetedChild}</span>
//             </div>
//           </div>
          
//           <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
//             {title}
//           </h3>
          
//           <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
//             {description}
//           </p>
//         </div>
        
//         {/* Footer actions bar */}
//         <div className="flex items-center justify-between mt-4 md:mt-0 pt-3 border-t border-slate-50">
//           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
//             {date}
//           </span>
          
//           <button className="group/btn flex items-center gap-2 px-4 py-2 bg-white text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95">
//             <span>Continue Reading</span>
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" 
//               viewBox="0 0 20 20" 
//               fill="currentColor"
//             >
//               <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const AnnouncementCard = ({ type, title, description, date, imageUrl, unread,targetedChild }) => {
   const badgeStyles = {
  Academic: "bg-emerald-50 text-emerald-700 border-emerald-100",
  General: "bg-amber-50 text-amber-700 border-amber-100",
  Events: "bg-sky-50 text-sky-700 border-sky-100",
  Urgent: "bg-rose-50 text-rose-700 border-rose-100",
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
            <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              {/* Standard Unified General-Style Type Badge */}
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyles[type] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
                {type}
              </span>
              {unread && (
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              )}
            </div>

            {/* Child Identifier Context Tag */}
            <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-100">
              <Icon name="child" className="w-3 h-3 text-slate-400" />
              <span>{targetedChild}</span>
            </div>
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
            <button className="group/btn font-bold flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-900 text-xs font-black rounded-xl border border-slate-100 transition-all hover:bg-slate-900 hover:text-white hover:shadow-lg active:scale-95">
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
  const categories = ["All Notices", "Olivia's Class", "Liam's Class", "Urgent Only"];

  return (
    <div className="w-full font-sans text-slate-900">
      <div className="space-y-5">
        
        {/* Search & Filter Row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <div className="relative flex-grow h-11 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
              <Icon name="search" className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search circulars, academic notices, or news..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all font-medium shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                className={`h-11 px-5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap
                  ${i === 0 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Content Mapping */}
        <div className="grid grid-cols-1 gap-5">
          <AnnouncementCard 
            type="Urgent"
            unread={true}
            title="Rescheduled First Terminal Examination Timings"
            description="Please note that the morning session exams scheduled for this week will commence at 9:30 AM instead of 9:00 AM due to the upcoming flash transportation maintenance layout."
            date="24 May 2026"
            imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400"
            targetedChild="Olivia"
          />
          
          <AnnouncementCard 
            type="Academic"
            unread={false}
            title="Release of Grade 2 Creative Art Assessment Portfolios"
            description="The mid-term creative assessment compilations are finished. Parents can now access and view their student's project files and remarks in the evaluation portal tab."
            date="22 May 2026"
            imageUrl="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400"
            targetedChild="Liam"
          />

          <AnnouncementCard 
            type="Events"
            unread={false}
            title="Inter-School Athletic Registration Guidelines"
            description="Signups for the upcoming summer sports league track events close this Friday afternoon. Medical fitness verification uploads are required to complete onboarding updates."
            date="19 May 2026"
            imageUrl="https://images.unsplash.com/photo-1526676023333-d15fa8c39531?auto=format&fit=crop&q=80&w=400"
            targetedChild="All Students"
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider disabled:opacity-50" disabled>
            Previous
          </button>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">1</span>
            <span className="text-slate-500 hover:bg-slate-100 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer">2</span>
          </div>
          <button className="text-slate-600 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider">
            Next Page
          </button>
        </div>

      </div>
    </div>
  );
};

export default Announcement;