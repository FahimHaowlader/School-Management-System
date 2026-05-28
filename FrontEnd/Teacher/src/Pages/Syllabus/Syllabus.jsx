import React, { useState } from 'react';

// Reusable Vector Icons (For internal item listings)
const Icon = ({ name, className = "" }) => {
  const icons = {
    download: <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    file: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    fileText: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    paperclip: <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L10.5 10.5" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 fill-none stroke-current stroke-2 ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const SyllabusItem = ({ subject, className, term, teacher, isEditable, onEdit, onDelete }) => (
  <div className="group bg-white border border-slate-100 shadow-sm rounded-xl p-5 transition-all duration-200 hover:shadow-lg cursor-default">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-16 h-20 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-6 h-6 fill-none stroke-current stroke-2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
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
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {subject}
          </h3>
          <p className="text-xs font-medium text-slate-400 mt-0.5">Teacher: {teacher}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 justify-end">
        {isEditable ? (
          <>
            <button 
              onClick={onEdit}
              className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all active:scale-95"
            >
              Replace PDF
            </button>
            <button 
              onClick={onDelete}
              className="flex items-center justify-center p-2 text-xs font-bold text-red-500 bg-white border border-slate-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95"
              title="Delete Syllabus"
            >
              <Icon name="trash" className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all active:scale-95">
            <Icon name="download" className="w-3.5 h-3.5" />
            Download PDF
          </button> 
        )}
      </div>

    </div>
  </div>
);

const Syllabus = () => {
  const [activeMode, setActiveMode] = useState("My Class");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const [mySyllabi, setMySyllabi] = useState([
    { id: 1, subject: "General Mathematics", className: "10-A", term: "Annual 2026", teacher: "You" },
    { id: 2, subject: "Higher Mathematics", className: "10-A", term: "Mid-Term 2026", teacher: "You" },
  ]);

  const allSchoolSyllabi = [
    { id: 1, subject: "General Mathematics", className: "10-A", term: "Annual 2026", teacher: "You" },
    { id: 2, subject: "Higher Mathematics", className: "10-A", term: "Mid-Term 2026", teacher: "You" },
    { id: 3, subject: "Physics", className: "10-A", term: "Mid-Term 2026", teacher: "Dr. Nasir Uddin" },
    { id: 4, subject: "English Literature", className: "09-C", term: "Annual 2026", teacher: "Ms. Fatema Zohra" },
    { id: 5, subject: "Chemistry", className: "10-A", term: "Mid-Term 2026", teacher: "Mr. Rafiqul Islam" },
    { id: 6, subject: "General Science", className: "06-B", term: "First Term 2026", teacher: "Mrs. Akhter" },
  ];

  const handleEdit = (id) => console.log(`Edit resource ID: ${id}`);
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this entry?")) {
      setMySyllabi(mySyllabi.filter(item => item.id !== id));
    }
  };

  const targetDataset = activeMode === "My Class" ? mySyllabi : allSchoolSyllabi;

  const filteredSyllabi = targetDataset.filter(item => {
    const matchesSearch = 
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClassDropdown = 
      selectedClass === "All" || 
      parseInt(item.className) === parseInt(selectedClass);

    return matchesSearch && matchesClassDropdown;
  });

  return (
    <div className="font-sans w-full">
      
      {/* Upper Navigation Row: Header Description and Switcher Only */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 text-left">
        
        {/* Segmented Control Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto shrink-0">
          {['My Class', 'All Class'].map((mode) => (
            <button
              key={mode}
              onClick={() => { 
                setActiveMode(mode); 
                setSearchTerm(""); 
                setSelectedClass("All"); 
              }}
              className={`flex-1 sm:flex-initial px-6 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeMode === mode 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Syllabus Indexing Control Board</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Program academic curriculums, organize institutional metrics, and monitor student rosters.</p>
        </div> */}

        
      </div>

      {/* Action Form Event Composer Hub Panel */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all mb-5">
        <div 
          onClick={() => setIsComposerOpen(!isComposerOpen)}
          className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
              <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-slate-800 tracking-wide">Upload New Course Syllabus</span>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">
            {isComposerOpen ? "Collapse Form" : "Expand Panel"}
          </span>
        </div>

        {isComposerOpen && (
          <div className="p-5 border-t border-slate-100 space-y-4 bg-white text-left animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Target Course Class</label>
                <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(c => (
                    <option key={c}>Class {c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Academic Term Sequence</label>
                <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                  <option>Mid-Term 2026</option>
                  <option>Annual Exam 2026</option>
                  <option>First Terminal 2026</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Subject Classification</label>
                <input 
                  type="text"
                  placeholder="e.g., General Mathematics"
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors"
                />
              </div>
            </div>

            {/* Media Assets Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Primary Syllabus Document</label>
                <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/cover cursor-pointer relative min-h-[110px]">
                  <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/cover:text-slate-900 shadow-sm transition-colors">
                    <Icon name="fileText" className="w-4 h-4 stroke-[2]" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Upload core course documentation</p>
                  <p className="text-[10px] text-slate-400 font-medium">PDF formats accepted up to 10MB</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Additional Reference Annexes</label>
                <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 group/attach cursor-pointer relative min-h-[110px]">
                  <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/attach:text-slate-900 shadow-sm transition-colors">
                    <Icon name="paperclip" className="w-4 h-4 stroke-[2]" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Attach optional lesson plan timetables</p>
                  <p className="text-[10px] text-slate-400 font-medium">DOCX, PDF or spreadsheets up to 15MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setIsComposerOpen(false)}
                className="h-9 px-4 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button 
                type="submit" 
                className="h-9 px-5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                Publish Syllabus
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter Toolbar Row: Dropdown Left, Search Bar Automatically Grows on Right */}
      <div className="flex flex-col sm:flex-row gap-5 mb-5 items-center w-full">
         
        {/* Search Input Box */}
        <div className="w-full flex-grow relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/xl" className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subject ..." 
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all text-sm font-medium placeholder:text-slate-400"
          />
        </div>

        {/* Persistent Class Dropdown Filter Container */}
        <div className="w-full sm:w-48 flex-shrink-0">
          <div className="relative w-full group">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full appearance-none pl-5 pr-10 py-3 text-left text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm outline-none cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5"
            >
              <option value="All">All Classes</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  Class {num}
                </option>
              ))}
            </select>
            
            {/* Clean Inline SVG Chevron Arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid Lists */}
      <div className="grid grid-cols-1 gap-5">
        {filteredSyllabi.length > 0 ? (
          filteredSyllabi.map((item) => (
            <SyllabusItem 
              key={item.id} 
              {...item} 
              isEditable={activeMode === "My Class"}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-white">
            <p className="text-sm font-medium text-slate-400">
              {activeMode === "My Class" 
                ? "No custom syllabus entries uploaded for your active classes yet." 
                : "No matching institution records found for this specific selection scale."}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Syllabus;