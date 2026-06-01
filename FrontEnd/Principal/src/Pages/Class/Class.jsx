import React, { useState } from "react";

// Reusable Minimalist Vector Icons matching your core layout parameters
const Icon = ({ name, className = "" }) => {
  const icons = {
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.504a3.375 3.375 0 00-3.375-3.375H5.125c-.621 0-1.125.504-1.125 1.125v1.75c0 .621.504 1.125 1.125 1.125h6.5a3.375 3.375 0 003.375-3.375zM16.5 4.5a3 3 0 11-6 0 3 3 0 016 0zM18 19.5a3.375 3.375 0 00-3.375-3.375v-1.5a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0115 10.125v-1.5A3.375 3.375 0 0011.625 5.25H9.75M16.5 9a3 3 0 003-3 3 3 0 00-3-3" />,
    academic: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174L11.24 6.33a1.5 1.5 0 011.52 0l6.98 3.844m-14 0L12 13.911l6.98-3.737m-14 0v5.306c0 .57.382 1.077.935 1.214 1.486.37 3.25.689 5.065.689 1.815 0 3.579-.32 5.065-.689a1.247 1.247 0 00.935-1.214V10.174M12 13.911v6.98" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 fill-none stroke-current stroke-2 ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const Class = () => {
  // --- STATE MATRIX ---
  const [allClassesData, setAllClassesData] = useState([
    { id: 1, className: "Grade 09", totalSections: "4 Sections", totalStudents: "168" },
    { id: 2, className: "Grade 10", totalSections: "3 Sections", totalStudents: "124" },
    { id: 3, className: "Grade 11", totalSections: "5 Sections", totalStudents: "210" },
    { id: 4, className: "Grade 12", totalSections: "4 Sections", totalStudents: "195" },
  ]);

  // --- REVIEWS / PENDING EDITS SUBMITTED BY OTHER STAFF ---
  const [pendingEdits, setPendingEdits] = useState([
    {
      id: 991,
      targetClassId: 2, // Corresponds to Grade 10
      className: "Grade 10",
      requestedBy: "Asst. Principal Rahman",
      timestamp: "10 mins ago",
      oldValue: { totalSections: "3 Sections", totalStudents: "124" },
      newValue: { totalSections: "4 Sections", totalStudents: "155" }
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
      className: `Grade ${formClass.padStart(2, '0')}`,
      totalSections: `${formSections} ${Number(formSections) === 1 ? "Section" : "Sections"}`,
      totalStudents: formStudents
    };

    setAllClassesData([newClassCard, ...allClassesData]);
    
    setFormStudents("");
    setFormSections("1");
    setIsComposerOpen(false);
  };

  // --- ACTION HANDLERS FOR STAFF EDITS ---
  const handleApproveEdit = (editId, targetId, updatedValues) => {
    // Update the master classes matrix with the modifications approved by Principal
    setAllClassesData(allClassesData.map(cls => 
      cls.id === targetId 
        ? { ...cls, totalSections: updatedValues.totalSections, totalStudents: updatedValues.totalStudents }
        : cls
    ));
    // Remove the request item from the queue row
    setPendingEdits(pendingEdits.filter(edit => edit.id !== editId));
  };

  const handleRejectEdit = (editId) => {
    setPendingEdits(pendingEdits.filter(edit => edit.id !== editId));
  };

  return (
    <div className="font-sans w-full text-left">
      
      {/* --- PRINCIPAL REVIEW QUEUE: PENDING ADMINISTRATIVE EDITS BY OTHERS --- */}
      {pendingEdits.length > 0 && (
        <div className="mb-5 bg-amber-50/60 rounded-xl border border-amber-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-amber-200/60 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <Icon name="clock" className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h5 className="text-xs font-black text-amber-900 uppercase tracking-wider">Awaiting Executive Authorization</h5>
              <p className="text-[11px] text-amber-700/80 font-medium">Modifications proposed by internal academic coordinators require your final override sign-off.</p>
            </div>
          </div>
          
          <div className="divide-y divide-amber-200/40">
            {pendingEdits.map((edit) => (
              <div key={edit.id} className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white/50">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{edit.className}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold uppercase tracking-tight">Proposed Change</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Submitted by <strong className="text-slate-700 font-semibold">{edit.requestedBy}</strong> • <span className="italic">{edit.timestamp}</span>
                  </p>
                </div>

                {/* Compare Parameters */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="bg-slate-100/80 border border-slate-200/60 rounded-lg px-3 py-1.5 text-slate-500">
                    <span className="block text-[9px] uppercase font-bold text-slate-400">Current</span>
                    <span className="font-medium">{edit.oldValue.totalSections} ({edit.oldValue.totalStudents} Enrolled)</span>
                  </div>
                  <div className="text-slate-400 font-bold">➔</div>
                  <div className="bg-amber-100/80 border border-amber-200/80 rounded-lg px-3 py-1.5 text-amber-900">
                    <span className="block text-[9px] uppercase font-bold text-amber-500">Proposed</span>
                    <span className="font-bold">{edit.newValue.totalSections} ({edit.newValue.totalStudents} Enrolled)</span>
                  </div>
                </div>

                {/* Verification Control Actions */}
                <div className="flex items-center gap-2 w-full lg:w-auto self-end lg:self-center justify-end">
                  <button 
                    onClick={() => handleRejectEdit(edit.id)}
                    className="px-3 h-8 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Deny
                  </button>
                  <button 
                    onClick={() => handleApproveEdit(edit.id, edit.targetClassId, edit.newValue)}
                    className="px-4 h-8 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Approve Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COLLAPSIBLE ACADEMIC CONFIGURATION COMPOSER PANEL */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all mb-6">
        <div 
          onClick={() => setIsComposerOpen(!isComposerOpen)}
          className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer bg-slate-50/70 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <Icon name="plus" className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 block tracking-tight">Authorize Academic Division</span>
              <p className="text-slate-500 text-xs font-medium mt-0.5">Deploy new tier tracking, capacity metrics, and intake quotas</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-bold bg-slate-200/60 px-2.5 py-1 rounded-full">
              <Icon name="academic" className="w-3.5 h-3.5" />
              <span>{allClassesData.length} Active Tiers</span>
            </div>
            <button className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs hover:border-slate-300 transition-colors">
              {isComposerOpen ? "Collapse Form" : "Expand Console"}
            </button>
          </div>
        </div>

        {isComposerOpen && (
          <form onSubmit={handlePublishClass} className="p-6 border-t border-slate-200 space-y-5 bg-white text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Target Academic Grade</label>
                <select 
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                  className="w-full h-11 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer text-slate-800 shadow-xs"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(c => (
                    <option key={c} value={c.toString()}>Grade {c.toString().padStart(2, '0')}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Section Allocations</label>
                <select 
                  value={formSections}
                  onChange={(e) => setFormSections(e.target.value)}
                  className="w-full h-11 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors cursor-pointer text-slate-800 shadow-xs"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num.toString()}>{num} {num === 1 ? "Section Unit" : "Parallel Sections"}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Total Seats Capacity</label>
                <input 
                  type="number" required value={formStudents}
                  onChange={(e) => setFormStudents(e.target.value)}
                  placeholder="e.g., 120"
                  className="w-full h-11 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors text-slate-900 shadow-xs"
                />
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button 
                type="button" onClick={() => setIsComposerOpen(false)}
                className="h-10 px-4 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button 
                type="submit" 
                className="h-10 px-5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                Approve & Initialize Tier
              </button>
            </div>
          </form>
        )}
      </div>

      {/* RENDER PRINCIPAL INTELLIGENCE FEED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allClassesData.map((cls) => {
          return (
            <div
              key={cls.id}
              className="p-6 bg-white border border-slate-100 rounded-xl text-left flex flex-col justify-between h-40 shadow-sm hover:shadow-lg  transition-all select-none"
            >
              <div className="w-full">
                <div className="flex justify-between items-start gap-3 w-full">
                  <div>
                    <h4 className="text-xl font-bold tracking-tight text-slate-900">
                      {cls.className}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">Institutional Track</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shrink-0 border bg-slate-50 border-slate-100 text-slate-600 transition-colors">
                    {cls.totalSections}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4 w-full border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <Icon name="users" className="w-4 h-4 shrink-0 text-slate-400" />
                  <span><strong className="text-slate-900 font-bold">{cls.totalStudents}</strong> Enrolled</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Class;