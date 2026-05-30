import React, { useState } from 'react';

// Reusable Vector Icons (Curriculum & Governance Focused)
const Icon = ({ name, className = "" }) => {
  const icons = {
    download: <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    file: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    fileText: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    shieldCheck: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 fill-none stroke-current stroke-2 ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const SyllabusItem = ({ subject, className, term, teacher, status, onDownload, onReplace, onDelete, onApprove }) => (
  <div className={`group bg-white border rounded-xl p-5 transition-all duration-200 hover:shadow-lg cursor-default ${status === 'pending' ? 'border-slate-100 bg-amber-50/10' : 'border-slate-100'}`}>
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      
      <div className="flex items-center gap-4">
        <div className={`flex-shrink-0 w-16 h-20 rounded-lg bg-slate-50 flex items-center justify-center transition-colors ${status === 'pending' ? 'text-amber-500 group-hover:bg-amber-50' : 'text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase">
              Class {className}
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {term}
            </span>
            {status === 'pending' ? (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase">
                <Icon name="clock" className="w-2.5 h-2.5 stroke-[2.5]" />
                Pending Review
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase">
                <Icon name="shieldCheck" className="w-2.5 h-2.5 stroke-[2.5]" />
                Approved
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {subject}
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Assigned Faculty: <span className="font-semibold text-slate-700">{teacher}</span></p>
        </div>
      </div>

      {/* Action Suite Contextualized by State */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 justify-end">
        <button 
          onClick={onDownload}
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all active:scale-95 cursor-pointer"
        >
          <Icon name="download" className="w-3.5 h-3.5" />
          <span>Review Doc</span>
        </button>

        {status === 'pending' ? (
          <button 
            onClick={onApprove}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-700 hover:border-emerald-700 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Icon name="check" className="w-3.5 h-3.5 stroke-[3]" />
            <span>Approve Submission</span>
          </button>
        ) : (
          <button 
            onClick={onReplace}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all active:scale-95 cursor-pointer"
          >
            Override Blueprint
          </button>
        )}
        
        <button 
          onClick={onDelete}
          className="flex items-center justify-center p-2 text-xs font-bold text-red-500 bg-white border border-slate-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 cursor-pointer"
          title={status === 'pending' ? "Reject Submission" : "Revoke Blueprint Mandate"}
        >
          <Icon name="trash" className="w-4 h-4" />
        </button>
      </div>

    </div>
  </div>
);

const Syllabus = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All"); // Added Status State
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Executive Panel Mandate Input States
  const [formClass, setFormClass] = useState("1");
  const [formTerm, setFormTerm] = useState("Mid-Term 2026");
  const [formSubject, setFormSubject] = useState("");
  const [formTeacher, setFormTeacher] = useState("Vice Principal");

  // Integrated Institutional Master Registry Feed
  const [syllabiList, setSyllabiList] = useState([
    { id: 101, subject: "ICT & Digital Literacy", className: "08-A", term: "Mid-Term 2026", teacher: "Mr. Fahim Shakil", status: "pending" },
    { id: 1, subject: "General Mathematics", className: "10-A", term: "Annual 2026", teacher: "Mr. Masud Alam", status: "approved" },
    { id: 102, subject: "Geography & Global Studies", className: "09-B", term: "Annual 2026", teacher: "Mrs. Nilofer Yasmin", status: "pending" },
    { id: 2, subject: "Higher Mathematics", className: "10-A", term: "Mid-Term 2026", teacher: "Mr. Masud Alam", status: "approved" },
    { id: 3, subject: "Physics", className: "10-A", term: "Mid-Term 2026", teacher: "Dr. Nasir Uddin", status: "approved" },
    { id: 4, subject: "English Literature", className: "09-C", term: "Annual 2026", teacher: "Ms. Fatema Zohra", status: "approved" },
    { id: 5, subject: "Chemistry", className: "10-A", term: "Mid-Term 2026", teacher: "Mr. Rafiqul Islam", status: "approved" },
    { id: 6, subject: "General Science", className: "06-B", term: "First Term 2026", teacher: "Mrs. Akhter", status: "approved" },
  ]);

  const handleDownload = (subject) => console.log(`Downloading core framework documentation: ${subject}`);
  const handleReplace = (id) => console.log(`Triggering blueprint deployment patch updates for schema ID: ${id}`);
  
  const handleApproveSyllabus = (id) => {
    setSyllabiList(syllabiList.map(item => 
      item.id === id ? { ...item, status: "approved" } : item
    ));
  };
  
  const handleDelete = (id, status) => {
    const promptMessage = status === 'pending'
      ? "Are you sure you want to reject this faculty-submitted syllabus?"
      : "Are you sure you want to revoke and completely remove this active curricular mandate?";
      
    if (window.confirm(promptMessage)) {
      setSyllabiList(syllabiList.filter(item => item.id !== id));
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!formSubject.trim()) return alert("Please specify a course classification target.");
    if (!formTeacher.trim()) return alert("Please assign a course faculty lead.");

    const newSyllabus = {
      id: Date.now(),
      subject: formSubject,
      className: formClass.padStart(2, '0') + "-A", 
      term: formTerm,
      teacher: formTeacher,
      status: "approved" // Principal creation bypasses review queues entirely
    };

    setSyllabiList([newSyllabus, ...syllabiList]);
    setFormSubject("");
    setFormTeacher("Vice Principal");
    setIsComposerOpen(false);
  };

  const filteredSyllabi = syllabiList.filter(item => {
    const matchesSearch = 
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchTerm.toLowerCase());

    const targetClassString = selectedClass.padStart(2, '0');
    const matchesClassDropdown = 
      selectedClass === "All" || 
      item.className.startsWith(targetClassString);

    // Added Status Conditional Logic
    const matchesStatusDropdown =
      selectedStatus === "All" ||
      item.status === selectedStatus;

    return matchesSearch && matchesClassDropdown && matchesStatusDropdown;
  });

  return (
    <div className="font-sans w-full pt-2">
      
      {/* Executive Mandate Upload Center */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all mb-5">
        <div 
          onClick={() => setIsComposerOpen(!isComposerOpen)}
          className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
              <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-slate-800 tracking-wide">Directly Ratify & Mandate New Institutional Syllabus</span>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">
            {isComposerOpen ? "Collapse Console" : "Open Mandate Panel"}
          </span>
        </div>

        {isComposerOpen && (
          <form onSubmit={handlePublish} className="p-5 border-t border-slate-100 space-y-4 bg-white text-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Target Grid Class</label>
                <select 
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(c => (
                    <option key={c} value={c}>Class {c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Academic Term Scope</label>
                <select 
                  value={formTerm}
                  onChange={(e) => setFormTerm(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer"
                >
                  <option>Mid-Term 2026</option>
                  <option>Annual Exam 2026</option>
                  <option>First Terminal 2026</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Subject Classification</label>
                <input 
                  type="text"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="e.g., Higher Mathematics"
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Assigned Faculty Owner</label>
                <input 
                  type="text"
                  value={formTeacher}
                  onChange={(e) => setFormTeacher(e.target.value)}
                  placeholder="e.g., Dr. Nasir Uddin"
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors"
                />
              </div>
            </div>

            {/* Media Asset Verification Spaces */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Approved Curriculum Blueprint</label>
                <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/cover cursor-pointer relative min-h-[110px]">
                  <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/cover:text-slate-900 shadow-sm transition-colors">
                    <Icon name="fileText" className="w-4 h-4 stroke-[2]" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Upload verified board syllabus resource</p>
                  <p className="text-[10px] text-slate-400 font-medium">Cryptographic signed PDF up to 10MB</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Institutional Lesson Timetables & Mandates</label>
                <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/attach cursor-pointer relative min-h-[110px]">
                  <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/attach:text-slate-900 shadow-sm transition-colors">
                    <Icon name="download" className="w-4 h-4 stroke-[2]" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Attach optional pedagogical guide matrices</p>
                  <p className="text-[10px] text-slate-400 font-medium">PDF or spreadsheet formats up to 15MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsComposerOpen(false)} className="h-9 px-4 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
              <button type="submit" className="h-9 px-5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer">Approve & Enforce Mandate</button>
            </div>
          </form>
        )}
      </div>

      {/* Audit Dashboard Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-5 items-center w-full">
        {/* Search Bar Input */}
        <div className="w-full flex-grow relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search academic fields, class codes or assigned faculty..." 
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all text-sm font-medium placeholder:text-slate-400"
          />
        </div>

        {/* Action Controls Dropdown Container */}
        <div className="flex w-full sm:w-auto gap-3 flex-shrink-0">
          {/* Class Selector Dropdown */}
          <div className="relative w-full sm:w-40 group">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full appearance-none pl-4 pr-9 py-2.5 text-left text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm outline-none cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5"
            >
              <option value="All">All Class</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num.toString()}>Class {num}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* New Status Selector Dropdown */}
          <div className="relative w-full sm:w-40 group">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none pl-4 pr-9 py-2.5 text-left text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm outline-none cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5"
            >
              <option value="All">All Status</option>
              <option value="pending">Pending </option>
              <option value="approved">Approved</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Institutional Master Feed */}
      <div className="grid grid-cols-1 gap-5">
        {filteredSyllabi.length > 0 ? (
          filteredSyllabi.map((item) => (
            <SyllabusItem 
              key={item.id} 
              {...item} 
              onDownload={() => handleDownload(item.subject)}
              onReplace={() => handleReplace(item.id)}
              onApprove={() => handleApproveSyllabus(item.id)}
              onDelete={() => handleDelete(item.id, item.status)}
            />
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-white">
            <p className="text-sm font-medium text-slate-400">
              No matching curriculum blueprints found on this institutional index.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Syllabus;