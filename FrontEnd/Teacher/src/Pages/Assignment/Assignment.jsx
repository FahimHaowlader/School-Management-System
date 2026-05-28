import React, { useState } from 'react';

// Reusable Icon Engine for internal actions
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    checkCircle: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    fileText: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    paperclip: <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L10.5 10.5" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`stroke-current ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const AssignmentCard = ({ title, course, date, status, submissions, gradedCount, totalStudents, onGradeAction }) => {
  const statusConfig = {
    "Needs Grading": { line: "bg-amber-500", text: "text-amber-600", btnText: "Review & Grade" },
    "Completed": { line: "bg-emerald-500", text: "text-emerald-600", btnText: "View Grades" },
    "No Submissions": { line: "bg-slate-300", text: "text-slate-400", btnText: "Edit Details" },
  };

  const config = statusConfig[status] || statusConfig["Needs Grading"];

  return (
    <div className="group relative bg-white px-6 py-4 rounded-xl border border-slate-100 transition-all duration-300 shadow-sm hover:shadow-lg text-left">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Left indicators & Core Data */}
        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
          <div className={`w-1 h-12 rounded-full shrink-0 ${config.line}`} />
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                {course}
              </span>
              <span className="text-slate-300 text-[10px]">•</span>
              <span className={`text-[10px] font-black uppercase tracking-[0.12em] ${config.text}`}>
                {status}
              </span>
            </div>
            
            <h3 className="text-base font-bold text-slate-900 truncate tracking-tight">
              {title}
            </h3>
            
            <div className="flex items-center gap-1.5 mt-1 text-slate-400">
              <Icon name="clock" className="h-3 w-3 stroke-[2.5]" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Due {date}
              </span>
            </div>
          </div>
        </div>

        {/* Live Submission Analytics Trackers */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 border-t lg:border-t-0 border-b lg:border-b-0 border-slate-50 py-3 lg:py-0 px-1 shrink-0">
          <div>
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Icon name="users" className="w-3.5 h-3.5 stroke-[2]" />
              <span className="text-[9px] uppercase font-bold tracking-wider">Turned In</span>
            </div>
            <p className="text-sm font-bold text-slate-800">
              {submissions} <span className="text-xs font-medium text-slate-400">/ {totalStudents}</span>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Icon name="checkCircle" className="w-3.5 h-3.5 stroke-[2]" />
              <span className="text-[9px] uppercase font-bold tracking-wider">Graded</span>
            </div>
            <p className="text-sm font-bold text-slate-800">
              {gradedCount} <span className="text-xs font-medium text-slate-400">/ {submissions}</span>
            </p>
          </div>
        </div>

        {/* Action Button: White Base transitioning to Black Theme on Hover */}
        <div className="flex shrink-0 justify-end">
          <button 
            onClick={onGradeAction}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-950 hover:text-white hover:border-slate-950 active:scale-95 cursor-pointer shadow-sm"
          >
            <span>{config.btnText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 stroke-[4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

const Assignment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const [assignments, setAssignments] = useState([
    { id: 1, title: "History Essay: The Roman Empire", course: "History 101", date: "June 04, 2026", status: "Needs Grading", submissions: 24, gradedCount: 12, totalStudents: 28 },
    { id: 2, title: "Problem Set 5: Integral Proofs", course: "Calculus III", date: "June 08, 2026", status: "Needs Grading", submissions: 19, gradedCount: 0, totalStudents: 22 },
    { id: 3, title: "Lab Report: Projectile Motion", course: "Physics 201", date: "May 20, 2026", status: "Completed", submissions: 30, gradedCount: 30, totalStudents: 30 },
    { id: 4, title: "Poetry Analysis: The Waste Land", course: "English Literature", date: "June 18, 2026", status: "No Submissions", submissions: 0, gradedCount: 0, totalStudents: 25 },
  ]);

  const handleGradePipeline = (id, title) => {
    console.log(`Loading grade interface for assignment: ${id} - "${title}"`);
  };

  const filteredAssignments = assignments.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse === "All Courses" || item.course === selectedCourse;
    const matchesStatus = selectedStatus === "All Statuses" || item.status === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-1 font-sans text-slate-900">
      <div className="space-y-5">
        
        {/* Header Dashboard Metrics Summary Banner */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Assignment Management Desk</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Publish coursework tasks, manage evaluations criteria, and monitor rolling class scores.</p>
          </div>
          
          <div className="flex items-center gap-6 border-l border-transparent sm:border-slate-100 sm:pl-4 min-w-[140px] justify-between sm:justify-end">
            <div className="text-center">
              <span className="block text-xl font-black text-amber-500 leading-none">
                {assignments.filter(a => a.status === "Needs Grading").length}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Pending Grade</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-black text-slate-900 leading-none">{filteredAssignments.length}</span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Total Displayed</span>
            </div>
          </div>
        </div>

        {/* Expandable Creation Event Panel Hub */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          <div 
            onClick={() => setIsComposerOpen(!isComposerOpen)}
            className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Standard Layout Icon Indicator (No theme inversion on hover) */}
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
                <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide">Create New Class Assignment</span>
            </div>
            {/* Clean Static Label (No theme inversion on hover) */}
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
              {isComposerOpen ? "Collapse Form" : "Expand Panel"}
            </span>
          </div>

          {isComposerOpen && (
            <div className="p-5 border-t border-slate-100 space-y-4 bg-white text-left animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Target Course</label>
                  <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                    <option>History 101</option>
                    <option>Calculus III</option>
                    <option>Physics 201</option>
                    <option>English Literature</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Due Calendar Date</label>
                  <input 
                    type="date"
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Assignment Title</label>
                  <input 
                    type="text"
                    placeholder="e.g., Mid-Term Research Paper"
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Instructions & Grading Rubric Parameters</label>
                <textarea 
                  rows="3" 
                  placeholder="Outline criteria protocols, submission parameters, and link resource indexes..." 
                  className="w-full p-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors resize-none"
                />
              </div>

              {/* Media & Document Assets Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Primary Assignment Brief / Rubric</label>
                  <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer relative min-h-[110px]">
                    <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                      <Icon name="fileText" className="w-4 h-4 stroke-[2]" />
                    </div>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">Upload core assignment prompt sheet</p>
                    <p className="text-[10px] text-slate-400 font-medium">PDF formats accepted up to 10MB</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Additional Source Materials / Datasets</label>
                  <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer relative min-h-[110px]">
                    <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                      <Icon name="paperclip" className="w-4 h-4 stroke-[2]" />
                    </div>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">Attach optional datasets or reference guides</p>
                    <p className="text-[10px] text-slate-400 font-medium">DOCX, PDF or spreadsheets up to 15MB</p>
                  </div>
                </div>
              </div>

              {/* Form Actions: White Theme transitioning to Black Theme on Hover */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsComposerOpen(false)}
                  className="h-9 px-4 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all cursor-pointer shadow-sm"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  onClick={() => setIsComposerOpen(false)}
                  className="h-9 px-5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all cursor-pointer shadow-sm"
                >
                  Publish to Students
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Toolbar Layout Row */}
        <div className="flex flex-col md:flex-row gap-3 items-center w-full">
          
          <div className="flex gap-2 w-full md:w-auto shrink-0">
            <div className="relative flex-1 sm:w-44 group">
              <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full appearance-none h-11 pl-4 pr-10 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:border-blue-400 shadow-sm transition-all cursor-pointer hover:bg-slate-50"
              >
                <option>All Courses</option>
                <option>History 101</option>
                <option>Calculus III</option>
                <option>Physics 201</option>
                <option>English Literature</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative flex-1 sm:w-44 group">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full appearance-none h-11 pl-4 pr-10 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:border-blue-400 shadow-sm transition-all cursor-pointer hover:bg-slate-50"
              >
                <option>All Statuses</option>
                <option>Needs Grading</option>
                <option>Completed</option>
                <option>No Submissions</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Bar Input */}
          <div className="w-full flex-grow relative group h-11">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Icon name="search" className="w-5 h-5 stroke-[2.5]" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assignments by parameters..." 
              className="w-full h-full pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>

        </div>

        {/* Master Active Assignment Registry Lists */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <AssignmentCard 
                key={assignment.id}
                {...assignment}
                onGradeAction={() => handleGradePipeline(assignment.id, assignment.title)}
              />
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-white">
              <p className="text-sm font-medium text-slate-400">
                No active class assignment records match your filters.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Assignment;