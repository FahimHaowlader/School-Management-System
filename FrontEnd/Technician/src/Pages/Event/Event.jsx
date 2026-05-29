import React, { useState } from "react";

// Minimal Global Icon Component
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    location: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
    image: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
    paperclip: <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L10.5 10.5" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`stroke-current ${className}`} viewBox="0 0 24 24">
      {icons[name] || <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />}
    </svg>
  );
};

const EventCard = ({ category, techStatus, title, description, date, location, techNotes, imageUrl }) => {
  const badgeStyles = {
    "Academic / Exam": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Sports / Outdoors": "bg-amber-50 text-amber-700 border-amber-100",
    "Cultural / Arts": "bg-sky-50 text-sky-700 border-sky-100",
  };

  return (
    <div className="bg-white border border-slate-200/70 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between text-left">
      <div>
        {/* Cover Thumbnail Image */}
        <div className="w-full h-40 overflow-hidden bg-slate-50 border-b border-slate-100 relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded border border-slate-700">
            {techStatus}
          </div>
        </div>

        <div className="p-5">
          <div className="flex gap-1.5 mb-3">
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${badgeStyles[category] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
              {category}
            </span>
          </div>
          
          <h3 className="text-base font-bold text-slate-900 mb-1.5 line-clamp-1 group-hover:text-slate-700 transition-colors tracking-tight">
            {title}
          </h3>
          <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
          
          <div className="space-y-2  border-slate-100  ">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Icon name="calendar" className="w-3.5 h-3.5 text-slate-400 stroke-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Icon name="location" className="w-3.5 h-3.5 text-slate-400 stroke-2" />
              <span>{location}</span>
            </div>
          </div>

          {/* Technician Operational Meta-Notes */}
          {/* <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 font-mono text-[10px] text-slate-500 space-y-0.5">
            <span className="font-bold text-slate-700 block uppercase text-[8px] tracking-wider">IT Tech Infrastructure Notes:</span>
            <p className="line-clamp-2">{techNotes}</p>
          </div> */}
        </div>
      </div>

      {/* Admin Operations Row */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-2">
        <button 
          onClick={() => console.log("Edit requested")}
          className="h-8 flex-grow px-3 border border-slate-200 text-slate-600 font-bold text-xs bg-white rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Icon name="edit" className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Edit Logistics & Specs</span>
        </button>
        
        <button 
          onClick={() => console.log("Delete triggered")}
          className="h-8 w-8 shrink-0 border border-slate-200 text-slate-400 bg-white rounded-lg hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center shadow-sm cursor-pointer"
          title="Remove Window"
        >
          <Icon name="trash" className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

const Event = () => {
  const categories = ["All Schedules", "Academic / Exam", "Sports / Outdoors", "Cultural / Arts"];
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  
  return (
    <div className="w-full font-sans text-slate-900">
      <div className="space-y-5">
        
        {/* Management Context Header Board */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Campus Event Logistics & Tech Control</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Configure infrastructural setups, high-load portal parameters, and device deployments for upcoming school events.</p>
          </div>
          
          <div className="flex items-center gap-4 border-l border-transparent sm:border-slate-100 sm:pl-4">
            <div className="text-center sm:text-right">
              <span className="block text-xl font-black text-slate-900 leading-none">3</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Monitored Events</span>
            </div>
          </div>
        </div>

        {/* Action Form Event Composer Hub */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          <div 
            onClick={() => setIsComposerOpen(!isComposerOpen)}
            className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
                <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide">Provision New School Event Tech Setup</span>
            </div>
            <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">
              {isComposerOpen ? "Collapse Specs" : "Deploy Config Panel"}
            </span>
          </div>

          {isComposerOpen && (
            <div className="p-5 border-t border-slate-100 space-y-4 bg-white text-left animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Event Event Type</label>
                  <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                    <option>Academic / Exam</option>
                    <option>Sports / Outdoors</option>
                    <option>Cultural / Arts</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Infrastructure Requirement</label>
                  <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                    <option>High Traffic API Scaling</option>
                    <option>A/V Equipment & Dedicated PA</option>
                    <option>Local Network / Switch Array</option>
                    <option>Standard Power Allocation Only</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Campus Target Venue</label>
                  <input 
                    type="text"
                    placeholder="e.g., Main Auditorium, Field B"
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">School Event Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Annual Inter-School Science & Tech Fair" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Date & Duration Coordinates</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Oct 26, 2026 | 09:00 AM - 04:00 PM" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Event Frontend Description (For Students/Staff)</label>
                <textarea 
                  rows={2}
                  placeholder="Provide standard description regarding the school event..." 
                  className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Technician Runbook & Equipment Allocation Specs</label>
                <textarea 
                  rows={2}
                  className="w-full p-3 border border-slate-200 rounded-lg text-xs font-mono outline-none focus:border-slate-900 transition-colors resize-none bg-slate-50 text-slate-700"
                  placeholder="e.g., Deploy 4x wireless AP nodes. Configure secondary UPS fallback line. Monitor portal token load peaks..."
                />
              </div>

              {/* Media Asset and Blueprint Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Public Card Display Image</label>
                  <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/cover cursor-pointer relative min-h-[110px]">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => console.log("Cover chosen", e.target.files)} />
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/cover:text-slate-900 shadow-sm transition-colors">
                      <Icon name="image" className="w-4 h-4 stroke-[2.3]" />
                    </div>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">Upload a card thumbnail photo</p>
                    <p className="text-[10px] text-slate-400 font-medium">PNG, JPEG up to 5MB</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">A/V Schematics / Network Layout Blueprints</label>
                  <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/attach cursor-pointer relative min-h-[110px]">
                    <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => console.log("Runbooks attached", e.target.files)} />
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/attach:text-slate-900 shadow-sm transition-colors">
                      <Icon name="paperclip" className="w-4 h-4 stroke-[2.3]" />
                    </div>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">Attach infrastructure documents</p>
                    <p className="text-[10px] text-slate-400 font-medium">PDF, CAD layouts, or Asset Logs up to 12MB</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsComposerOpen(false)}
                  className="h-9 px-4 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel Configuration
                </button>
                <button 
                  type="submit" 
                  className="h-9 px-5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Deploy & Publish Event
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Outbox & Filtering Row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <div className="relative flex-grow h-11 group">
            <input 
              type="text" 
              placeholder="Search by school event, location node, or hardware flag..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all shadow-sm"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Icon name="search" className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
            {categories.map((filter, i) => (
              <button 
                key={filter} 
                className={`h-11 px-5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap cursor-pointer
                  ${i === 0 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <EventCard 
            category="Academic / Exam" 
            techStatus="API Peak-Load Warning"
            title="Annual Science Fair" 
            description="Showcasing secondary student projects from across all grades with interactive hardware and live system demonstrations." 
            date="Oct 26, 2026 | 9:00 AM" 
            location="Main Gymnasium & Lab Core" 
            techNotes="Deploy 4x extra power strips to row B. Allocate independent VLAN for student project setups to isolate core school servers."
            imageUrl="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400"
          />
          <EventCard 
            category="Sports / Outdoors" 
            techStatus="Outdoor Comm Cells"
            title="Varsity Basketball Finals" 
            description="Championship playoff match against Northwood High. Full student audience turnout anticipated." 
            date="Nov 05, 2026 | 7:00 PM" 
            location="Sports Arena Court" 
            techNotes="Configure outdoor scoreboard audio-relay matrix. Synchronize arena display backup controllers with central schedule script."
            imageUrl="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400"
          />
          <EventCard 
            category="Cultural / Arts" 
            techStatus="A/V Routing Standard"
            title="Winter Music Concert" 
            description="A festive community evening featuring complex acoustic arrangements by the school orchestra and vocal choir." 
            date="Dec 12, 2026 | 6:30 PM" 
            location="Central Auditorium Complex" 
            techNotes="Set up 12 mic line inputs on staging panel. Check backup audio feed pipeline and mixer system firmware stability."
            imageUrl="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=400"
          />
        </div>

      </div>
    </div>
  );
};

export default Event;