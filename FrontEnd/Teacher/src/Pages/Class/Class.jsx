import React, { useState } from "react";

const Class = () => {
  // 1. Core navigation and active context tracking states
  const [activeClassId, setActiveClassId] = useState(1);
  const [activeTab, setActiveTab] = useState("roster"); // roster | attendance | marks | postings

  // 2. Local interactive input states for form actions
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Assignment");

  // 3. Multi-class localized database state matrix assigned to this specific teacher
  const [allClassesData, setAllClassesData] = useState([
    {
      id: 1,
      className: "Class 11",
      sectionName: "Section A (Alpha)",
      subject: "General Physics I",
      room: "Lab-A",
      schedule: "Sun, Tue, Thu — 09:00 AM",
      stats: { total: "42", presentToday: "39", assignmentsPending: "2" },
      students: [
        { id: "S11A01", name: "Abrar Fahim", attendance: "Present", midTerm: "88", assignmentStatus: "Submitted" },
        { id: "S11A02", name: "Tasmia Rahman", attendance: "Present", midTerm: "94", assignmentStatus: "Submitted" },
        { id: "S11A03", name: "Samiul Islam", attendance: "Absent", midTerm: "76", assignmentStatus: "Pending" },
        { id: "S11A04", name: "Nusrat Jahan", attendance: "Present", midTerm: "85", assignmentStatus: "Submitted" }
      ],
      announcements: [
        { id: 101, type: "Assignment", title: "Lab Report 3: Pendulum Mechanics", date: "Due: Jun 04, 2026" },
        { id: 102, type: "Notice", title: "Bring practical files tomorrow", date: "Posted: May 28, 2026" }
      ]
    },
    {
      id: 5,
      className: "Class 11",
      sectionName: "Section A (Alpha)",
      subject: "General Physics I",
      room: "Lab-A",
      schedule: "Sun, Tue, Thu — 09:00 AM",
      stats: { total: "42", presentToday: "39", assignmentsPending: "2" },
      students: [
        { id: "S11A01", name: "Abrar Fahim", attendance: "Present", midTerm: "88", assignmentStatus: "Submitted" },
        { id: "S11A02", name: "Tasmia Rahman", attendance: "Present", midTerm: "94", assignmentStatus: "Submitted" },
        { id: "S11A03", name: "Samiul Islam", attendance: "Absent", midTerm: "76", assignmentStatus: "Pending" },
        { id: "S11A04", name: "Nusrat Jahan", attendance: "Present", midTerm: "85", assignmentStatus: "Submitted" }
      ],
      announcements: [
        { id: 101, type: "Assignment", title: "Lab Report 3: Pendulum Mechanics", date: "Due: Jun 04, 2026" },
        { id: 102, type: "Notice", title: "Bring practical files tomorrow", date: "Posted: May 28, 2026" }
      ]
    },
    {
      id: 4,
      className: "Class 11",
      sectionName: "Section A (Alpha)",
      subject: "General Physics I",
      room: "Lab-A",
      schedule: "Sun, Tue, Thu — 09:00 AM",
      stats: { total: "42", presentToday: "39", assignmentsPending: "2" },
      students: [
        { id: "S11A01", name: "Abrar Fahim", attendance: "Present", midTerm: "88", assignmentStatus: "Submitted" },
        { id: "S11A02", name: "Tasmia Rahman", attendance: "Present", midTerm: "94", assignmentStatus: "Submitted" },
        { id: "S11A03", name: "Samiul Islam", attendance: "Absent", midTerm: "76", assignmentStatus: "Pending" },
        { id: "S11A04", name: "Nusrat Jahan", attendance: "Present", midTerm: "85", assignmentStatus: "Submitted" }
      ],
      announcements: [
        { id: 101, type: "Assignment", title: "Lab Report 3: Pendulum Mechanics", date: "Due: Jun 04, 2026" },
        { id: 102, type: "Notice", title: "Bring practical files tomorrow", date: "Posted: May 28, 2026" }
      ]
    },
    {
      id: 3,
      className: "Class 11",
      sectionName: "Section A (Alpha)",
      subject: "General Physics I",
      room: "Lab-A",
      schedule: "Sun, Tue, Thu — 09:00 AM",
      stats: { total: "42", presentToday: "39", assignmentsPending: "2" },
      students: [
        { id: "S11A01", name: "Abrar Fahim", attendance: "Present", midTerm: "88", assignmentStatus: "Submitted" },
        { id: "S11A02", name: "Tasmia Rahman", attendance: "Present", midTerm: "94", assignmentStatus: "Submitted" },
        { id: "S11A03", name: "Samiul Islam", attendance: "Absent", midTerm: "76", assignmentStatus: "Pending" },
        { id: "S11A04", name: "Nusrat Jahan", attendance: "Present", midTerm: "85", assignmentStatus: "Submitted" }
      ],
      announcements: [
        { id: 101, type: "Assignment", title: "Lab Report 3: Pendulum Mechanics", date: "Due: Jun 04, 2026" },
        { id: 102, type: "Notice", title: "Bring practical files tomorrow", date: "Posted: May 28, 2026" }
      ]
    },
    {
      id: 2,
      className: "Class 12",
      sectionName: "Section C (Cosmos)",
      subject: "Astrophysics Elective",
      room: "Room 402",
      schedule: "Mon, Wed — 11:30 AM",
      stats: { total: "35", presentToday: "32", assignmentsPending: "1" },
      students: [
        { id: "S12C01", name: "Fahim Haowlader", attendance: "Present", midTerm: "98", assignmentStatus: "Submitted" },
        { id: "S12C02", name: "Anika Tahsin", attendance: "Present", midTerm: "89", assignmentStatus: "Submitted" },
        { id: "S12C03", name: "Tahmid Hasan", attendance: "Absent", midTerm: "82", assignmentStatus: "Pending" }
      ],
      announcements: [
        { id: 201, type: "Notice", title: "Bring Stellar Maps for Tomorrow's Seminar", date: "Posted: May 29, 2026" }
      ]
    }
  ]);

  // Derive active context target item from state store arrays
  const currentClass = allClassesData.find((c) => c.id === activeClassId) || allClassesData[0];

  // --- RUNTIME MUTATION EVENT HANDLERS ---

  const toggleAttendance = (studentId) => {
    setAllClassesData(allClassesData.map(cls => {
      if (cls.id !== activeClassId) return cls;
      
      const updatedStudents = cls.students.map(s => 
        s.id === studentId ? { ...s, attendance: s.attendance === "Present" ? "Absent" : "Present" } : s
      );

      const presentCount = updatedStudents.filter(s => s.attendance === "Present").length;

      return {
        ...cls,
        stats: { ...cls.stats, presentToday: String(presentCount) },
        students: updatedStudents
      };
    }));
  };

  const handleMarkChange = (studentId, score) => {
    setAllClassesData(allClassesData.map(cls => {
      if (cls.id !== activeClassId) return cls;
      return {
        ...cls,
        students: cls.students.map(s => s.id === studentId ? { ...s, midTerm: score } : s)
      };
    }));
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost = {
      id: Date.now(),
      type: newType,
      title: newTitle,
      date: "Posted: Just now"
    };

    setAllClassesData(allClassesData.map(cls => {
      if (cls.id !== activeClassId) return cls;
      
      const isAssignment = newType === "Assignment";
      const pendingIncrement = isAssignment ? String(Number(cls.stats.assignmentsPending) + 1) : cls.stats.assignmentsPending;

      return {
        ...cls,
        stats: { ...cls.stats, assignmentsPending: pendingIncrement },
        announcements: [newPost, ...cls.announcements]
      };
    }));

    setNewTitle("");
  };

  return (
    <div className="relative flex min-h-screen w-full font-sans text-slate-900 ">
      <main className="flex-1 space-y-5">
        
        {/* TOP INTERFACE: Highly Visible Teacher's Class Selector Cards */}
        <div className="text-left">
          {/* <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-3 pl-1">Your Assigned Batches</span> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allClassesData.map((cls) => {
              const isSelected = activeClassId === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => {
                    setActiveClassId(cls.id);
                    setActiveTab("roster");
                    setNewTitle("");
                  }}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] flex flex-col justify-between h-36 ${
                    isSelected 
                      ? "bg-slate-950 text-white border-slate-950 ring-2  ring-offset-2" 
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start gap-2 w-full">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider opacity-75">
                        <span>{cls.className}</span>
                        <span>•</span>
                        <span>{cls.sectionName}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase shrink-0 border ${
                        isSelected 
                          ? "bg-white/10 border-white/20 text-white" 
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}>
                        {cls.room}
                      </span>
                    </div>
                    <h4 className="text-base font-black tracking-tight mt-1.5 truncate w-full">{cls.subject}</h4>
                  </div>
                  
                  <div className={`flex items-center gap-1.5 text-[11px] font-semibold border-t pt-3 w-full ${
                    isSelected ? "border-white text-slate-400" : "border-slate-200/80 text-slate-400"
                  }`}>
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span className="truncate">{cls.schedule}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE CLASS ACTIVE MANAGER HUB CONTAINER */}
        <div className="flex flex-col gap-y-5">
          
          {/* Active Class Meta Header Banner */}
          <div className="rounded-xl shadow-sm bg-white p-6 border border-slate-200 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">{currentClass.className}</span>
                  <span className="text-slate-300 text-sm">•</span>
                  <span className="text-sm font-bold text-slate-500">{currentClass.sectionName}</span>
                </div>
                <h2 className="text-md font-bold text-[#135bec] uppercase tracking-wide mt-1">{currentClass.subject}</h2>
                <p className="text-[11px] font-semibold text-slate-400 mt-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>Full Slot Timing: {currentClass.schedule}</span>
                </p>
              </div>

              {/* Real-time counters updated instantly based on selection state */}
              <div className="grid grid-cols-3 gap-3 sm:w-auto w-full">
                <div className="p-3 bg-slate-50/60 border border-slate-100 rounded-xl text-center min-w-[80px]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Enrolled</span>
                  <span className="text-md font-black text-slate-800 tracking-tight block mt-0.5">{currentClass.stats.total}</span>
                </div>
                <div className="p-3 bg-emerald-50/40 border border-emerald-100/60 rounded-xl text-center min-w-[80px]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 block">Present</span>
                  <span className="text-md font-black text-emerald-600 tracking-tight block mt-0.5">{currentClass.stats.presentToday}</span>
                </div>
                <div className="p-3 bg-blue-50/40 border border-blue-100/60 rounded-xl text-center min-w-[80px]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 block">Pending</span>
                  <span className="text-md font-black text-blue-600 tracking-tight block mt-0.5">{currentClass.stats.assignmentsPending}</span>
                </div>
              </div>
            </div>

            {/* Sub View Action Filters */}
            <div className="flex items-center gap-2 border-t border-slate-100 mt-6 pt-4 overflow-x-auto no-scrollbar">
              <button onClick={() => setActiveTab("roster")} className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all ${activeTab === "roster" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>Student Roster</button>
              <button onClick={() => setActiveTab("attendance")} className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all ${activeTab === "attendance" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>Daily Attendance</button>
              <button onClick={() => setActiveTab("marks")} className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all ${activeTab === "marks" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>Grades Entry</button>
              <button onClick={() => setActiveTab("postings")} className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all ${activeTab === "postings" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>Bulletins & Notices</button>
            </div>
          </div>

          {/* DYNAMIC COMPONENT PANEL SWITCHER */}
          <div className="w-full">
            
            {/* VIEW 1: STUDENT ROSTER SUB-PANEL */}
            {activeTab === "roster" && (
              <div className="rounded-xl shadow-sm bg-white p-6 border border-slate-200 text-left flex flex-col gap-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block border-b border-slate-50 pb-2">Roster Directory ({currentClass.className})</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        <th className="pb-3 pl-2">Roll / ID</th>
                        <th className="pb-3">Student Name</th>
                        <th className="pb-3 text-right pr-2">Task Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs font-bold text-slate-800">
                      {currentClass.students.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 pl-2 font-mono text-slate-400 text-[11px]">{student.id}</td>
                          <td className="py-3.5 text-sm tracking-tight text-slate-800">{student.name}</td>
                          <td className="py-3.5 text-right pr-2">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wide font-black ${student.assignmentStatus === "Submitted" ? "bg-emerald-50 text-emerald-600 border border-emerald-100/60" : "bg-amber-50 text-amber-600 border border-amber-100/60"}`}>
                              {student.assignmentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW 2: DAILY ATTENDANCE MANAGER SUB-PANEL */}
            {activeTab === "attendance" && (
              <div className="rounded-xl shadow-sm bg-white p-6 border border-slate-200 text-left flex flex-col gap-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block border-b border-slate-50 pb-2">Roll Call Roll Book</span>
                <div className="space-y-2.5">
                  {currentClass.students.map((student) => (
                    <div key={student.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50/30 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">{student.id}</span>
                        <span className="text-xs font-bold text-slate-800 tracking-tight">{student.name}</span>
                      </div>
                      <button 
                        onClick={() => toggleAttendance(student.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${student.attendance === "Present" ? "bg-emerald-500 border-emerald-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-400"}`}
                      >
                        {student.attendance}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 3: GRADES ENTRY MATRIX SUB-PANEL */}
            {activeTab === "marks" && (
              <div className="rounded-xl shadow-sm bg-white p-6 border border-slate-200 text-left flex flex-col gap-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block border-b border-slate-50 pb-2">Examination Data Entries</span>
                <div className="space-y-3">
                  {currentClass.students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between gap-4 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 tracking-tight">{student.name}</h4>
                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tight mt-0.5">{student.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={student.midTerm} 
                          onChange={(e) => handleMarkChange(student.id, e.target.value)}
                          className="w-14 px-2 py-1 text-center font-bold text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
                        />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">/ 100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 4: NOTICES & ASSIGNMENTS BULLETIN POSTER */}
            {activeTab === "postings" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="col-span-1 p-5 rounded-xl border border-slate-200 bg-white flex flex-col gap-y-4 text-left shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block border-b border-slate-50 pb-2">Publish Board</span>
                  <form onSubmit={handleAddPost} className="space-y-3.5">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1.5">Posting Category</label>
                      <select 
                        value={newType} 
                        onChange={(e) => setNewType(e.target.value)}
                        className="w-full text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
                      >
                        <option value="Assignment">Assignment Task</option>
                        <option value="Notice">Official Notice</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1.5">Topic Content Title</label>
                      <textarea 
                        rows="3"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Type updates or assignment name..."
                        className="w-full text-xs font-semibold p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white transition-all resize-none placeholder:text-slate-300"
                      />
                    </div>
                    <button type="submit" className="w-full py-2 bg-[#135bec] hover:bg-blue-700 text-white rounded-lg text-xs font-bold tracking-tight transition-colors shadow-sm">
                      Push to Stream
                    </button>
                  </form>
                </div>

                <div className="col-span-1 lg:col-span-2 p-5 rounded-xl border border-slate-200 bg-white text-left flex flex-col gap-y-4 shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block border-b border-slate-50 pb-2">Activity Stream ({currentClass.className})</span>
                  <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                    {currentClass.announcements.length === 0 ? (
                      <p className="text-xs font-medium text-slate-400 text-center py-6">No notices published yet for this class.</p>
                    ) : (
                      currentClass.announcements.map((post) => (
                        <div key={post.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/40 flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${post.type === "Assignment" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}>
                              {post.type}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-snug pt-0.5">{post.title}</h4>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">{post.date}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
};

export default Class;