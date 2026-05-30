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
    paperclip: <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L10.5 10.5" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`stroke-current ${className}`} viewBox="0 0 24 24">
      {icons[name] || <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />}
    </svg>
  );
};

const EventCard = ({ id, category, techStatus, title, description, date, location, imageUrl, status, onApprove, onDelete, onEdit }) => {
  const badgeStyles = {
    "Academic / Exam": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Sports / Outdoors": "bg-amber-50 text-amber-700 border-amber-100",
    "Cultural / Arts": "bg-sky-50 text-sky-700 border-sky-100",
  };

  return (
    <div className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between text-left ${status === 'pending' ? 'border-slate-100 bg-amber-50/5' : 'border-slate-200/70'}`}>
      <div>
        {/* Top Status & Context Header */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${badgeStyles[category] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
            {category}
          </span>
          
          {status === 'pending' ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
              <Icon name="clock" className="w-3 h-3 stroke-[2.5]" />
              Pending Approval
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
              <Icon name="check" className="w-3 h-3 stroke-[2.5]" />
              Live / Approved
            </span>
          )}
        </div>

        {/* Cover Thumbnail Image Block */}
        <div className="w-full h-40 overflow-hidden bg-slate-50 border-b border-slate-100 relative">
          <img 
            src={imageUrl || "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400"} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
         
        </div>

        {/* Main Details Body */}
        <div className="p-5">
          <h3 className="text-base font-bold text-slate-900 mb-1.5 line-clamp-1 group-hover:text-slate-700 transition-colors tracking-tight">
            {title}
          </h3>
          <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Icon name="calendar" className="w-3.5 h-3.5 text-slate-400 stroke-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Icon name="location" className="w-3.5 h-3.5 text-slate-400 stroke-2" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Control Execution Center */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-2">
        {status === 'pending' ? (
          <button 
            onClick={() => onApprove(id)}
            className="h-8 flex-grow px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Icon name="check" className="w-3.5 h-3.5 stroke-[3]" />
            <span>Approve & Authorize</span>
          </button>
        ) : (
          <button 
            onClick={() => onEdit(id)}
            className="h-8 flex-grow px-3 border border-slate-200 text-slate-600 font-bold text-xs bg-white rounded-lg hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Icon name="edit" className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Modify Specs</span>
          </button>
        )}
        
        <button 
          onClick={() => onDelete(id)}
          className="h-8 w-8 shrink-0 border border-slate-200 text-slate-400 bg-white rounded-lg hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center shadow-sm cursor-pointer"
          title={status === 'pending' ? "Reject Proposal" : "Revoke Event Placement"}
        >
          <Icon name="trash" className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

const Event = () => {
  const categories = ["All Schedules", "Academic / Exam", "Sports / Outdoors", "Cultural / Arts"];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Schedules");
  const [selectedStatus, setSelectedStatus] = useState("All"); 
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Form Management State Inputs
  const [formCategory, setFormCategory] = useState("Academic / Exam");
  const [formTechStatus, setFormTechStatus] = useState("High Traffic API Scaling");
  const [formVenue, setFormVenue] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Institutional Event Feed Master Data
  const [eventsList, setEventsList] = useState([
    {
      id: 1,
      category: "Academic / Exam",
      techStatus: "API Load Monitoring Mandated",
      title: "Admission Form Fill-up & Submission Window",
      description: "Central registration matrix deployment for portal processing. Requires high availability verification logs.",
      date: "Jun 15, 2026 | 08:00 AM",
      location: "Online Campus Cloud Portal",
      status: "pending"
    },
    {
      id: 2,
      category: "Academic / Exam",
      techStatus: "Isolate Local Core Subnets",
      title: "Annual Science & Tech Fair",
      description: "Showcasing secondary student projects from across all grades with interactive hardware and live system demonstrations.",
      date: "Oct 26, 2026 | 09:00 AM",
      location: "Main Gymnasium & Lab Core",
      status: "approved"
    },
    {
      id: 3,
      category: "Sports / Outdoors",
      techStatus: "Outdoor Comms Interconnect",
      title: "Varsity Basketball Finals",
      description: "Championship playoff match against Northwood High. Full student audience turnout anticipated.",
      date: "Nov 05, 2026 | 7:00 PM",
      location: "Sports Arena Court",
      status: "approved"
    },
    {
      id: 4,
      category: "Cultural / Arts",
      techStatus: "Check Multi-channel Mixer Bus",
      title: "Inter-Class Drama Fest Submission",
      description: "Script submissions and digital audio allocation requests from student cultural clubs.",
      date: "Jul 02, 2026 | 12:30 PM",
      location: "Administrative Block Room 4",
      status: "pending"
    },
    {
      id: 5,
      category: "Cultural / Arts",
      techStatus: "Audio Routing System Confirmed",
      title: "Winter Music Concert",
      description: "A festive community evening featuring complex acoustic arrangements by the school orchestra and vocal choir.",
      date: "Dec 12, 2026 | 6:30 PM",
      location: "Central Auditorium Complex",
      status: "approved"
    }
  ]);

  const handleApprove = (id) => {
    setEventsList(eventsList.map(ev => ev.id === id ? { ...ev, status: "approved" } : ev));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you certain you want to remove this schedule mapping from active records?")) {
      setEventsList(eventsList.filter(ev => ev.id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log(`Modify structural configuration specifications for payload target ID: ${id}`);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formVenue.trim()) return alert("Please populate all required validation fields.");

    const newEvent = {
      id: Date.now(),
      category: formCategory,
      techStatus: formTechStatus,
      title: formTitle,
      description: formDescription || "No generic information entry was specified for this operational catalog.",
      date: formDate || "TBD / Pending Final Notice",
      location: formVenue,
      status: "approved" // Principal creation immediately bypasses approval filters
    };

    setEventsList([newEvent, ...eventsList]);
    
    // Reset Form Assets
    setFormTitle("");
    setFormVenue("");
    setFormDate("");
    setFormDescription("");
    setIsComposerOpen(false);
  };

  // Filter Stream Parsing Logic
  const filteredEvents = eventsList.filter(ev => {
    const matchesSearch = 
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === "All Schedules" || 
      ev.category === selectedCategory;

    const matchesStatus = 
      selectedStatus === "All" || 
      ev.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="w-full font-sans text-slate-900 ">
      <div className="space-y-5">
        
        {/* Executive Management Control Panel Status */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Campus Event Logistics & Executive Tech Control</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Authorise faculty submissions, register runbooks, and direct scheduling priorities across system databases.</p>
          </div>
          
          <div className="flex items-center gap-4 border-l border-transparent sm:border-slate-100 sm:pl-4 justify-between sm:justify-end">
            <div className="text-center px-2">
              <span className="block text-lg font-black text-amber-600 leading-none">
                {eventsList.filter(e => e.status === 'pending').length}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Awaiting Review</span>
            </div>
            <div className="text-center px-2 border-l border-slate-100">
              <span className="block text-lg font-black text-slate-900 leading-none">
                {eventsList.length}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Total Tracked</span>
            </div>
          </div>
        </div>

        {/* Executive Form Event Composer Hub */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          <div 
            onClick={() => setIsComposerOpen(!isComposerOpen)}
            className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
                <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide">Directly Ratify & Publish Approved Event</span>
            </div>
            <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">
              {isComposerOpen ? "Collapse Specs" : "Deploy Config Panel"}
            </span>
          </div>

          {isComposerOpen && (
            <form onSubmit={handlePublish} className="p-5 border-t border-slate-100 space-y-4 bg-white text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Event Scheduling Group</label>
                  <select 
                    value={formCategory} 
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer"
                  >
                    <option>Academic / Exam</option>
                    <option>Sports / Outdoors</option>
                    <option>Cultural / Arts</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Infrastructure Tag</label>
                  <select 
                    value={formTechStatus} 
                    onChange={(e) => setFormTechStatus(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer"
                  >
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
                    value={formVenue}
                    onChange={(e) => setFormVenue(e.target.value)}
                    placeholder="e.g., Main Gymnasium & Lab Core"
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">School Event Title</label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., Mid-Term Assessment Module Sync" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Date & Duration Coordinates</label>
                  <input 
                    type="text" 
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="e.g., Oct 26, 2026 | 09:00 AM" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Event Public Description</label>
                <textarea 
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide brief informational description targeting student dashboards..." 
                  className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors resize-none"
                />
              </div>

              {/* Blueprint Upload Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Operational Asset Banner</label>
                  <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/cover cursor-pointer relative min-h-[100px]">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/cover:text-slate-900 shadow-sm transition-colors">
                      <Icon name="image" className="w-4 h-4 stroke-[2.3]" />
                    </div>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">Upload asset identity card</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Technical Runbooks & Documentation</label>
                  <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/attach cursor-pointer relative min-h-[100px]">
                    <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/attach:text-slate-900 shadow-sm transition-colors">
                      <Icon name="paperclip" className="w-4 h-4 stroke-[2.3]" />
                    </div>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">Attach optional floor sheets or plans</p>
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
                  Authorize & Publish Live
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Filter Optimization Control Row */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-3 w-full">
          {/* Search Box Input */}
          <div className="relative flex-grow h-11 group">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by school event string indices, venue targets or description logs..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all shadow-sm"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Icon name="search" className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Status Pipeline Selection Matrix */}
            <div className="relative group w-full sm:w-44 h-11">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-full appearance-none pl-4 pr-9 text-left text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm outline-none cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all focus:border-blue-200 focus:ring-4 focus:ring-blue-500/5"
              >
                <option value="All">All  States</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

        {/* Schedule Categories Segmented Picker */}
<div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar shrink-0">
  {categories.map((filter) => (
    <button 
      key={filter} 
      onClick={() => setSelectedCategory(filter)}
      className={`flex items-center justify-center h-11 px-4 border text-[10px] font-black uppercase tracking-widest transition-all rounded-xl cursor-pointer shadow-sm shrink-0 active:scale-95 whitespace-nowrap
        ${selectedCategory === filter 
          ? "bg-slate-950 text-white border-slate-950" 
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-950 hover:text-white hover:border-slate-950"
        }`}
    >
      {filter}
    </button>
  ))}
</div>
          </div>
        </div>

        {/* Dynamic Event Feed Master Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev) => (
              <EventCard 
                key={ev.id}
                {...ev}
                onApprove={handleApprove}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 border border-dashed border-slate-200 rounded-xl bg-white">
              <p className="text-sm font-medium text-slate-400">No events found matching your filter parameters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Event;