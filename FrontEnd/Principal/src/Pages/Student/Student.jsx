import React, { useState } from "react";

// Standard UI Icon Pack
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.336 9.336 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    image: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`stroke-current ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const StudentRow = ({ status, name, studentId, studentCohort, linkedGuardians, gradeLevel, imageUrl }) => {
  const badgeStyles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Suspended: "bg-amber-50 text-amber-700 border-amber-100",
    Withdrawn: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <tr className="border-b border-slate-200/70 hover:bg-slate-50/70 transition-colors">
      {/* Student Information Profile */}
      <td className="p-4 align-middle">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 tracking-tight">{name}</span>
            <span className="text-xs text-slate-400 font-medium">ID: {studentId}</span>
          </div>
        </div>
      </td>

      {/* Cohort Designator */}
      <td className="p-4 align-middle text-left font-mono text-xs font-semibold text-slate-600">
        {studentCohort}
      </td>

      {/* Linked Guardian Network */}
      <td className="p-4 align-middle text-left">
        <div className="flex flex-col items-start gap-1 max-w-xs">
          {linkedGuardians.map((guardian, i) => (
            <span key={i} className="inline-flex items-center text-[11px] font-semibold bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md whitespace-nowrap">
              {guardian}
            </span>
          ))}
        </div>
      </td>

      {/* Academic Grade Level */}
      <td className="p-4 align-middle text-left hidden md:table-cell">
        <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200/60 px-2.5 py-1 rounded-md tracking-wide">
          {gradeLevel}
        </span>
      </td>

      {/* Enrollment Status */}
      <td className="p-4 align-middle text-left">
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyles[status] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
          {status}
        </span>
      </td>

      {/* Row Custom Actions */}
      <td className="p-4 align-middle text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button 
            onClick={() => console.log("Edit student parameters")}
            className="h-8 px-2.5 border border-slate-200 text-slate-600 font-bold text-xs bg-white rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Icon name="edit" className="w-3.5 h-3.5 stroke-[2.3]" />
            <span className="hidden sm:inline">Modify</span>
          </button>
          
          <button 
            onClick={() => console.log("Delete profile item")}
            className="h-8 w-8 border border-slate-200 text-slate-400 bg-white rounded-lg hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center shadow-sm cursor-pointer"
          >
            <Icon name="trash" className="w-3.5 h-3.5 stroke-[2.3]" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Student = () => {
  const categories = ["All Enrolled", "Active", "Suspended", "Withdrawn"];
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // --- CORE DIRECTORY DATA MATRIX ---
  const [studentDirectory, setStudentDirectory] = useState([
    {
      id: 201,
      status: "Active",
      name: "Leo Vance",
      studentId: "STU-2026-0089",
      studentCohort: "Class 10-A",
      linkedGuardians: ["Marcus Vance (Father)"],
      gradeLevel: "10th Grade",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 202,
      status: "Active",
      name: "Maya Vance",
      studentId: "STU-2026-0112",
      studentCohort: "Class 7-B",
      linkedGuardians: ["Marcus Vance (Father)"],
      gradeLevel: "7th Grade",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 203,
      status: "Suspended",
      name: "Aleksei Rostov",
      studentId: "STU-2026-0441",
      studentCohort: "Class 12-C",
      linkedGuardians: ["Helena Rostova (Mother)"],
      gradeLevel: "12th Grade",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    }
  ]);

  // --- REVIEWS / PENDING STUDENT EDITS SUBMITTED BY TEACHERS / COACHES ---
  const [pendingEdits, setPendingEdits] = useState([
    {
      id: 991,
      targetStudentId: 203, // Corresponds to Aleksei Rostov
      name: "Aleksei Rostov",
      requestedBy: "Counselor Vance",
      timestamp: "5 mins ago",
      oldValue: { gradeLevel: "12th Grade", studentCohort: "Class 12-C" },
      newValue: { gradeLevel: "12th Grade (Honors)", studentCohort: "Class 12-H" }
    }
  ]);

  // --- ACTION HANDLERS FOR STAFF EDITS ---
  const handleApproveEdit = (editId, targetId, updatedValues) => {
    setStudentDirectory(studentDirectory.map(student => 
      student.id === targetId 
        ? { ...student, gradeLevel: updatedValues.gradeLevel, studentCohort: updatedValues.studentCohort }
        : student
    ));
    setPendingEdits(pendingEdits.filter(edit => edit.id !== editId));
  };

  const handleRejectEdit = (editId) => {
    setPendingEdits(pendingEdits.filter(edit => edit.id !== editId));
  };

  return (
    <div className="w-full font-sans text-slate-900 antialiased bg-slate-50/30">
      <div className="space-y-5">
        
        {/* Context Control Header Panel */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Student Information Directory Matrix</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Manage active pupil registries, map cohort classifications, and track emergency primary guard assets.</p>
          </div>
          
          <div className="flex items-center gap-4 border-l border-transparent sm:border-slate-100 sm:pl-4">
            <div className="text-center sm:text-right">
              <span className="block text-xl font-black text-slate-900 leading-none">{studentDirectory.length + 3420}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Pupils Matrixed</span>
            </div>
          </div>
        </div>

        {/* --- EXECUTIVE OVERRIDE AUTHORIZATION QUEUE PANEL --- */}
        {pendingEdits.length > 0 && (
          <div className="bg-amber-50/60 rounded-xl border border-amber-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-amber-200/60 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <Icon name="clock" className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-black text-amber-900 uppercase tracking-wider">Awaiting Executive Authorization</h5>
                <p className="text-[11px] text-amber-700/80 font-medium">Cohort reallocations or curriculum trackers proposed by academic advisers require final sign-off.</p>
              </div>
            </div>
            
            <div className="divide-y divide-amber-200/40">
              {pendingEdits.map((edit) => (
                <div key={edit.id} className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white/50">
                  <div className="space-y-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{edit.name}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold uppercase tracking-tight">Academic Adjustment</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Submitted by <strong className="text-slate-700 font-semibold">{edit.requestedBy}</strong> • <span className="italic">{edit.timestamp}</span>
                    </p>
                  </div>

                  {/* Operational Delta Evaluation Fields */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="bg-slate-100/80 border border-slate-200/60 rounded-lg px-3 py-1.5 text-slate-500 text-left">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Current</span>
                      <span className="font-medium">{edit.oldValue.gradeLevel} • {edit.oldValue.studentCohort}</span>
                    </div>
                    <div className="text-slate-400 font-bold">➔</div>
                    <div className="bg-amber-100/80 border border-amber-200/80 rounded-lg px-3 py-1.5 text-amber-900 text-left">
                      <span className="block text-[9px] uppercase font-bold text-amber-500">Proposed</span>
                      <span className="font-bold">{edit.newValue.gradeLevel} • {edit.newValue.studentCohort}</span>
                    </div>
                  </div>

                  {/* Verification Interactive Control Cluster */}
                  <div className="flex items-center gap-2 w-full lg:w-auto self-end lg:self-center justify-end">
                    <button 
                      onClick={() => handleRejectEdit(edit.id)}
                      className="px-3 h-8 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Deny
                    </button>
                    <button 
                      onClick={() => handleApproveEdit(edit.id, edit.targetStudentId, edit.newValue)}
                      className="px-4 h-8 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Approve Override
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Directory Entry Creation Form */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          <div 
            onClick={() => setIsComposerOpen(!isComposerOpen)}
            className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
                <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide">Register New Student Profile</span>
            </div>
            <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">
              {isComposerOpen ? "Collapse Form" : "Expand Form"}
            </span>
          </div>

          {isComposerOpen && (
            <div className="p-5 border-t border-slate-100 space-y-4 bg-white text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Enrollment Status</label>
                  <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                    <option>Active</option>
                    <option>Suspended</option>
                    <option>Withdrawn</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Cohort Designation</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Class 10-A" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Academic Grade Designation</label>
                  <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                    <option>9th Grade</option>
                    <option>10th Grade</option>
                    <option>11th Grade</option>
                    <option>12th Grade</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Student Legal Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Jane Doe" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Unique Student Identifier</label>
                  <input 
                    type="text" 
                    placeholder="e.g., STU-2026-XXXX" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Linked Primary Guardians</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Sarah Jenkins (Mother)" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              {/* Profile Image Interface */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Student Profile Portrait</label>
                <div className="border border-dashed border-slate-200 rounded-xl p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1.5 group/dropzone cursor-pointer relative">
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/dropzone:text-slate-900 shadow-sm transition-colors">
                    <Icon name="image" className="w-4 h-4 stroke-[2.3]" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Upload a verified registration photo</p>
                  <p className="text-[10px] text-slate-400 font-medium">PNG, JPEG, or WEBP layouts up to 5MB</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsComposerOpen(false)}
                  className="h-9 px-4 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Discard Form
                </button>
                <button 
                  type="submit" 
                  className="h-9 px-5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Commit Entry
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Search & Filter Component Group Row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <div className="relative flex-grow h-11 group">
            <input 
              type="text" 
              placeholder="Search directory by pupil profiles, cohorts, student IDs, or parent linkages..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all duration-200 shadow-sm font-medium"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
              <Icon name="search" className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                className={`h-11 px-5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer
                  ${i === 0 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Formatted Matrix Data Grid */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Student Profile Information</th>
                  <th className="p-4">Cohort Designator</th>
                  <th className="p-4">Linked Guardians</th>
                  <th className="p-4 hidden md:table-cell">Academic Tier</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentDirectory.map((student) => (
                  <StudentRow 
                    key={student.id}
                    status={student.status}
                    name={student.name}
                    studentId={student.studentId}
                    studentCohort={student.studentCohort}
                    linkedGuardians={student.linkedGuardians}
                    gradeLevel={student.gradeLevel}
                    imageUrl={student.imageUrl}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation Pagination Controls */}
        <div className="flex items-center justify-between">
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">
            Previous Page
          </button>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">1</span>
            <span className="text-slate-400 hover:bg-slate-100 hover:text-slate-900 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer">2</span>
          </div>
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">
            Next Page
          </button>
        </div>

      </div>
    </div>
  );
};

export default Student;