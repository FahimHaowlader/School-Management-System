import React from 'react'


const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    download: <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    file: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 fill-none stroke-current stroke-2 ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const SyllabusItem = ({ subject, className, teacher, term }) => (
  <div className="group bg-white border border-slate-100 shadow-sm rounded-xl p-5 transition-all duration-200 hover:shadow-md cursor-default">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <Icon name="file" />
        </div>
        <div>
          {/* <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-black text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded uppercase">Class {className}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{term}</span>
          </div> */}
          <h3 className="text-base font-bold text-slate-900  transition-colors tracking-tight">
            {subject}
          </h3>
          <p className="text-xs font-medium text-slate-500">Teacher: {teacher}</p>
        </div>
      </div>
      <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95">
        <Icon name="download" className="w-3.5 h-3.5" />
        Download PDF
      </button>
    </div>
  </div>
);

const Syllabus = () => {
  const syllabi = [
    { subject: "General Mathematics", className: "09", teacher: "Mr. Abdur Rahman", term: "Annual 2026" },
    { subject: "Physics", className: "10", teacher: "Dr. Nasir Uddin", term: "Mid-Term" },
    { subject: "English Literature", className: "09", teacher: "Ms. Fatema Zohra", term: "Annual 2026" },
  ];

  return (
    <div>
    <div className=" font-sans ">
      <div className="">
        {/* Search Bar Section */}
        <div className="relative mb-5 group">
           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5  h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          <input 
            type="text" 
            placeholder="Search subject ..." 
            className="w-full pl-12 pr-4 py-[11px] bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all text-sm font-medium placeholder:text-slate-400"
          />
        </div>

        {/* Card List Container */}
        <div className="grid grid-cols-1 gap-4">
          {syllabi.map((item, index) => (
            <SyllabusItem key={index} {...item} />
          ))}
        </div>

      </div>
    </div>
    </div>
  );
};
  

export default Syllabus;