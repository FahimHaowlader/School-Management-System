import React, { useState } from "react";

// Reusable Minimalist Vector Icons matching your core layout parameters
const Icon = ({ name, className = "" }) => {
  const icons = {
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.504a3.375 3.375 0 00-3.375-3.375H5.125c-.621 0-1.125.504-1.125 1.125v1.75c0 .621.504 1.125 1.125 1.125h6.5a3.375 3.375 0 003.375-3.375zM16.5 4.5a3 3 0 11-6 0 3 3 0 016 0zM18 19.5a3.375 3.375 0 00-3.375-3.375v-1.5a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0115 10.125v-1.5A3.375 3.375 0 0011.625 5.25H9.75M16.5 9a3 3 0 003-3 3 3 0 00-3-3" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 fill-none stroke-current stroke-2 ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const Class = () => {
  // --- STATE MATRIX ---
  const [activeClassId, setActiveClassId] = useState(1);
  const [allClassesData, setAllClassesData] = useState([
    {
      id: 1,
      className: "Class 09",
      totalSections: "4 Sections",
      totalStudents: "168"
    },
    {
      id: 1,
      className: "Class 09",
      totalSections: "4 Sections",
      totalStudents: "168"
    },
    {
      id: 1,
      className: "Class 09",
      totalSections: "4 Sections",
      totalStudents: "168"
    },
    {
      id: 1,
      className: "Class 09",
      totalSections: "4 Sections",
      totalStudents: "168"
    },
    {
      id: 1,
      className: "Class 09",
      totalSections: "4 Sections",
      totalStudents: "168"
    },
    {
      id: 1,
      className: "Class 09",
      totalSections: "4 Sections",
      totalStudents: "168"
    },
    {
      id: 1,
      className: "Class 09",
      totalSections: "4 Sections",
      totalStudents: "168"
    },
    {
      id: 2,
      className: "Class 10",
      totalSections: "3 Sections",
      totalStudents: "124"
    }
  ]);

  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // --- FORM INPUT ENTRIES ---
  const [formClass, setFormClass] = useState("1");
  const [formSections, setFormSections] = useState("1");
  const [formStudents, setFormStudents] = useState("");

  // --- COMPOSER HANDLERS ---
  const handlePublishClass = (e) => {
    e.preventDefault();
    if (!formStudents.trim()) return;

    const newClassCard = {
      id: Date.now(),
      className: `Class ${formClass.padStart(2, '0')}`,
      totalSections: `${formSections} ${Number(formSections) === 1 ? "Section" : "Sections"}`,
      totalStudents: formStudents
    };

    setAllClassesData([newClassCard, ...allClassesData]);
    
    // Clear Input Fields
    setFormStudents("");
    setFormSections("1");
    setIsComposerOpen(false);
  };

  return (
    <div className="font-sans w-full text-left">
      
      {/* COLLAPSIBLE MANAGEMENT CONFIGURATION COMPOSER PANEL */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all mb-5">
        <div 
          onClick={() => setIsComposerOpen(!isComposerOpen)}
          className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
              <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-slate-800 tracking-wide">Configure New School Class</span>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">
            {isComposerOpen ? "Collapse Form" : "Expand Panel"}
          </span>
        </div>

        {isComposerOpen && (
          <form onSubmit={handlePublishClass} className="p-5 border-t border-slate-100 space-y-4 bg-white text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Target Class</label>
                <select 
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer text-slate-700"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(c => (
                    <option key={c} value={c.toString()}>Class {c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Total Sections</label>
                <select 
                  value={formSections}
                  onChange={(e) => setFormSections(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer text-slate-700"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num.toString()}>{num} {num === 1 ? "Section" : "Sections"}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Total Enrolled Students</label>
                <input 
                  type="number" required value={formStudents}
                  onChange={(e) => setFormStudents(e.target.value)}
                  placeholder="e.g., 120"
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors text-slate-800"
                />
              </div>

            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button 
                type="button" onClick={() => setIsComposerOpen(false)}
                className="h-9 px-4 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button 
                type="submit" 
                className="h-9 px-5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                Publish Class Card
              </button>
            </div>
          </form>
        )}
      </div>

      {/* RENDER GRID INTERFACE FEED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allClassesData.map((cls) => {
          return (
            <button
              key={cls.id}
              onClick={() => setActiveClassId(cls.id)}
              className="p-5 rounded-xl border text-left flex flex-col justify-between h-36 outline-none bg-white border-slate-100 text-slate-900 shadow-sm hover:shadow-lg select-none cursor-pointer"
            >
              <div className="w-full">
                <div className="flex justify-between items-start gap-2 w-full">
                  <h4 className="text-xl font-black tracking-tight leading-none text-slate-900">
                    {cls.className}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase shrink-0 border bg-slate-50 border-slate-200 text-slate-600">
                    {cls.totalSections}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[11px] font-semibold border-t pt-3 w-full border-slate-100 text-slate-500">
                <Icon name="users" className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{cls.totalStudents} Enrolled Students</span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default Class;