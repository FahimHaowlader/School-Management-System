import React, { useState } from "react";

// Minimal Global Icon Component
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.336 9.336 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    image: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`stroke-current ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const AnnouncementCard = ({ id, type, techPriority, title, description, date, imageUrl, targetAudience, status, onApprove, onDelete, onEdit }) => {
  const badgeStyles = {
    Academic: "bg-emerald-50 text-emerald-700 border-emerald-100",
    General: "bg-amber-50 text-amber-700 border-amber-100",
    Urgent: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between text-left ${status === 'pending' ? 'border-slate-100 bg-amber-50/5' : 'border-slate-200/70'}`}>
      <div>
        {/* Top Status & Context Header */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${badgeStyles[type] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
            {type}
          </span>
          
          {status === 'pending' ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wide animate-pulse">
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

        <div className="flex flex-col md:flex-row gap-6 p-5">
          {/* Thumbnail Cover Photo */}
          <div className="w-full md:w-48 lg:w-56 h-40 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 relative">
            <img 
              src={imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400"} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded border border-slate-700">
              {techPriority}
            </div>
          </div>
          
          {/* Management Content Area */}
          <div className="flex flex-col justify-between flex-1 py-0.5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {/* Target Audience Scope Badge */}
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100/70 border border-slate-200/60 px-2 py-0.5 rounded-md">
                  <Icon name="users" className="w-3 h-3 stroke-2" />
                  {targetAudience}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-slate-700 transition-colors tracking-tight">
                {title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">
                {description}
              </p>
            </div>
            
            {/* Action Row explicitly designed for Management */}
            <div className="flex items-center justify-between gap-4 mt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                {date}
              </span>
              
              {/* Quick Modifiers / CRUD Utilities */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                {status === 'pending' ? (
                  <button 
                    onClick={() => onApprove(id)}
                    className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    <Icon name="check" className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Approve & Authorize</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => onEdit(id)}
                    className="h-8 px-3 border border-slate-200 text-slate-600 font-bold text-xs bg-white rounded-lg hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Icon name="edit" className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Modify Dispatch</span>
                  </button>
                )}
                
                <button 
                  onClick={() => onDelete(id)}
                  className="h-8 w-8 border border-slate-200 text-slate-400 bg-white rounded-lg hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center shadow-sm cursor-pointer shrink-0"
                  title="Purge Broadcast From Database"
                >
                  <Icon name="trash" className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const Announcement = () => {
  const categories = ["All Logs", "Academic", "General", "Urgent"];
  
  // Pipeline Filter Dropdown Options
  const statusPipelines = ["All Pipelines", "Pending Logs", "Approved Live"];

  // State Hooks for Feed Pipeline
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Logs");
  const [selectedStatus, setSelectedStatus] = useState("All Pipelines");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Form Field State Inputs
  const [formCategory, setFormCategory] = useState("Academic");
  const [formAudience, setFormAudience] = useState("All Batches");
  const [formPriority, setFormPriority] = useState("Standard Priority");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Master Data Repository
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: "Academic",
      techPriority: "Low Cache Priority",
      title: "Final Term Project Evaluation Parameters & Submission Portals",
      description: "The assessment blueprints for laboratory portfolios and final assignments have been uploaded. Please ensure students submit files using native document formatting.",
      date: "24 May 2026",
      targetAudience: "Class 10-A",
      status: "approved",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      type: "General",
      techPriority: "API Load Warning",
      title: "Rescheduled Extra Lecture: Advanced Algorithms Seminar Room 4",
      description: "Due to the national holiday interruption, the pending review course module will be taken this Thursday morning. Attendance grids will lock at 09:15 AM.",
      date: "18 May 2026",
      targetAudience: "CSE Batches",
      status: "pending",
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      type: "Urgent",
      techPriority: "SMS Fallback Fired",
      title: "Annual STEM Symposium Coordinator Briefing",
      description: "All project mentors and team coordinators must gather in the central pavilion following the final lesson hour for review boards assignment check-ins.",
      date: "10 May 2026",
      targetAudience: "All Cohorts",
      status: "approved",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400"
    }
  ]);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return alert("Please complete all required broadcast elements.");

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-GB', options);

    const fallbackImages = {
      Academic: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
      General: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400",
      Urgent: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400"
    };

    const newDispatch = {
      id: Date.now(),
      type: formCategory,
      techPriority: formPriority === "High Priority" ? "SMS Fallback Fired" : "Standard Priority",
      title: formTitle,
      description: formDescription,
      date: formattedDate,
      targetAudience: formAudience,
      status: "pending", // Defaults to pending authorization pipeline
      imageUrl: fallbackImages[formCategory]
    };

    setNotices([newDispatch, ...notices]);
    setFormTitle("");
    setFormDescription("");
    setIsComposerOpen(false);
  };

  const handleApprove = (id) => {
    setNotices(notices.map(item => item.id === id ? { ...item, status: "approved" } : item));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this broadcast dispatch from database registries?")) {
      setNotices(notices.filter(item => item.id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log(`Modify distribution layer or data layout configurations for ID: ${id}`);
  };

  // Data Pipeline Filter Operations
  const filteredNotices = notices.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === "All Logs" || 
      item.type === selectedCategory;

    const matchesStatus = 
      selectedStatus === "All Pipelines" ||
      (selectedStatus === "Pending Logs" && item.status === "pending") ||
      (selectedStatus === "Approved Live" && item.status === "approved");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="w-full font-sans text-slate-900 ">
      <div className="space-y-5">
        
        {/* Dynamic Context Header Block for Technicians */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">School Notice System Control Board</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Maintain system notice databases, manage broadcast push strategies, and audit data payload properties.</p>
          </div>
          
          {/* Quick Stats Grid */}
          <div className="flex items-center gap-4 border-l border-transparent sm:border-slate-100 sm:pl-4">
            <div className="text-center sm:text-right">
              <span className="block text-xl font-black text-slate-900 leading-none">{notices.length}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Dispatches</span>
            </div>
          </div>
        </div>

        {/* Action Form Composer Hub */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          <div 
            onClick={() => setIsComposerOpen(!isComposerOpen)}
            className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
                <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide">Compose New School Notice & Configure Routing Parameters</span>
            </div>
            <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">
              {isComposerOpen ? "Collapse Config" : "Expand Config Panel"}
            </span>
          </div>

          {isComposerOpen && (
            <form onSubmit={handlePublish} className="p-5 border-t border-slate-100 space-y-4 bg-white text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Notice Category Classification</label>
                  <select 
                    value={formCategory} 
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer"
                  >
                    <option value="Academic">Academic Announcement</option>
                    <option value="General">General Circular</option>
                    <option value="Urgent">Urgent Alert</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Target Node Group / Audience</label>
                  <select 
                    value={formAudience} 
                    onChange={(e) => setFormAudience(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer"
                  >
                    <option value="All Batches">All Batches (Global Broadcast)</option>
                    <option value="Class 10-A">Class 10 - Section A Node</option>
                    <option value="CSE Batches">Class 12 - Science Wing Cluster</option>
                    <option value="All Cohorts">Parent Portal Viewports Only</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Server Push Strategy</label>
                  <select 
                    value={formPriority} 
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer"
                  >
                    <option value="High Priority">High Priority (App Push + Device SMS Queue)</option>
                    <option value="Standard Priority">Standard Priority (Silent Dashboard Database Entry)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Headline / Title String</label>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., Submission Deadlines for Lab Records Phase 1" 
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Notice Body Text (Public Presentation)</label>
                <textarea 
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide explicit text or directives for the student/staff body regarding this update..." 
                  className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors resize-none"
                />
              </div>

              {/* Notice Cover Photo Upload Interface */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Notice Graphic Asset / Banner File</label>
                <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/dropzone cursor-pointer relative min-h-[100px]">
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/dropzone:text-slate-900 shadow-sm transition-colors">
                    <Icon name="image" className="w-4 h-4 stroke-[2.3]" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Upload asset binary file</p>
                  <p className="text-[10px] text-slate-400 font-medium">PNG, JPEG, or WEBP layouts up to 5MB</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsComposerOpen(false)}
                  className="h-9 px-4 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Discard Payload
                </button>
                <button 
                  type="submit" 
                  className="h-9 px-5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Execute System Broadcast
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Search Outbox & Filtering Engine Controls Row */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-3 w-full">
          {/* Search Input Box */}
          <div className="relative flex-grow h-11 group">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search database records, memo keys, or infrastructure flags..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all duration-200 shadow-sm font-medium"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Dynamic Dropdown Pipeline Selector Matrix */}
            <div className="relative group w-full sm:w-44 h-11">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-full appearance-none pl-4 pr-9 text-left text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm outline-none cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5"
              >
                {statusPipelines.map((pipeline) => (
                  <option key={pipeline} value={pipeline}>
                    {pipeline === "Pending Logs" ? " Pending " : pipeline === "Approved Live" ? " Approved" : "All Status"}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Segmented Category Filters */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar shrink-0">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-center h-10 px-4 border text-[10px] font-black uppercase tracking-widest transition-all rounded-xl cursor-pointer shadow-sm shrink-0 active:scale-95 whitespace-nowrap
                    ${selectedCategory === cat 
                      ? "bg-slate-950 text-white border-slate-950" 
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-950 hover:text-white hover:border-slate-950"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Log Feed Display */}
        <div className="grid grid-cols-1 gap-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((item) => (
              <AnnouncementCard 
                key={item.id}
                {...item}
                onApprove={handleApprove}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-white">
              <p className="text-sm font-medium text-slate-400">No notice records match your current filter query.</p>
            </div>
          )}
        </div>

        {/* Minimal High-End Pagination */}
        <div className="flex items-center justify-between pt-2">
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">
            Previous Logs
          </button>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">1</span>
            <span className="text-slate-400 hover:bg-slate-100 hover:text-slate-900 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer">2</span>
          </div>
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">
            Next Logs
          </button>
        </div>

      </div>
    </div>
  );
};

export default Announcement;