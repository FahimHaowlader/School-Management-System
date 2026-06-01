import React, { useEffect, useState } from 'react';
import { 
  MdLocationOn, MdBook, MdPrint, MdEdit, MdPerson, 
  MdNotificationsActive, MdCheck, MdLayers, MdShuffle, MdSearch, MdSchool 
} from "react-icons/md";

// Card with text-left style, border-t, and larger 18px edit button next to room number
const SubjectBox = ({ subject, teacher, room, onEdit, scheduleType }) => (
  <div className="group relative p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between min-h-[105px] w-full box-border">
    <div>
      {/* Subject Line */}
      <div className="flex items-center gap-1.5 text-slate-800 mb-1">
        <MdBook size={13} className="text-slate-400 shrink-0" />
        <p className="font-bold text-[12px] uppercase tracking-tight leading-tight truncate w-full" title={subject}>
          {subject}
        </p>
      </div>

      {/* Teacher / Context Line */}
      <div className="flex items-center gap-1.5 text-slate-500 mb-2">
        <MdPerson size={13} className="text-slate-400 shrink-0" />
        <p className="text-[11px] font-medium leading-tight truncate w-full" title={teacher}>
          {scheduleType === 'Class' ? teacher : `Class: ${teacher}`}
        </p>
      </div>
    </div>
    
    {/* Bottom Row: Room Info + Larger Icon-Only Edit Button */}
    <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-50 mt-auto">
      <div className="flex items-center gap-1 text-slate-400 shrink-0">
        <MdLocationOn size={12} className="shrink-0" />
        <span className="text-[10px] font-semibold uppercase tracking-wider block truncate max-w-[100px]">
          Room {room}
        </span>
      </div>

      <button 
        onClick={onEdit}
        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer print:hidden shrink-0"
        title="Edit Period"
      >
        <MdEdit size={18} />
      </button>
    </div>
  </div>
);

const Routine = () => {
  // --- STATE MATRIX ---
  const [activeMode, setActiveMode] = useState('Class');      // 'Class' vs 'Exam' Duty switcher
  const [scheduleType, setScheduleType] = useState('Class'); // 'Class' (Student View) vs 'Teacher' View
  const [selectedClass, setSelectedClass] = useState('9');
  const [selectedSection, setSelectedSection] = useState('A');
  
  // Teacher Search States
  const [teacherSearch, setTeacherSearch] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('Dr. Alex Smith');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Pending Adjustments State
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, teacher: "Prof. Sarah Connor", change: "Mon, Slot 3 -> Physics to Math", reason: "Lab Renovations" }
  ]);

  const periods = [
    "09:00 - 09:40", "09:45 - 10:25", "10:30 - 11:10", 
    "11:15 - 11:55", "12:00 - 12:40", "12:40 - 01:20"
  ];
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  
  const teacherList = [
    "Dr. Alex Smith", 
    "Prof. Sarah Connor", 
    "Mst. Rahat Karim", 
    "Dr. Emily Blunt", 
    "Prof. Alan Turing"
  ];

  const filteredTeachers = teacherList.filter(t => 
    t.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getClassLabel = (numStr) => {
    const mapping = { '9': 'Nine', '10': 'Ten', '11': 'Eleven', '12': 'Twelve' };
    return mapping[numStr] || `Class ${numStr}`;
  };

  return (
    <div className="w-full font-sans text-slate-900 antialiased bg-slate-50/30">
      <main className="space-y-5">
        
        {/* ROW 1: NOTIFICATION APPROVAL QUEUE - HIGH CONTRAST AMBER/YELLOW THEME */}
        {pendingRequests.length > 0 && (
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 shadow-sm transition-all duration-300 print:hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-5 h-5 bg-amber-100 rounded-md border border-amber-200/50">
                <MdNotificationsActive className="text-amber-800" size={12} />
              </div>
              <h3 className="font-black text-[10px] uppercase tracking-widest text-amber-900">Pending Adjustments</h3>
            </div>
            
            <div className="space-y-2">
              {pendingRequests.map(req => (
                <div key={req.id} className="flex items-center justify-between bg-white border border-amber-200/60 rounded-xl p-3.5 text-xs max-w-xl shadow-sm">
                  <div className="space-y-0.5">
                    <p className="font-extrabold text-slate-900 tracking-tight">{req.teacher}</p>
                    <p className="font-semibold text-amber-800 font-mono text-[11px]">{req.change}</p>
                  </div>
                  <div className="flex gap-1 shrink-0 ml-4">
                    <button 
                      onClick={() => setPendingRequests([])} 
                      className="flex items-center justify-center w-8 h-8 bg-amber-600 text-white hover:bg-amber-700 transition-all rounded-lg cursor-pointer outline-none shadow-sm"
                      title="Approve Change"
                    >
                      <MdCheck size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROW 2: PRIMARY INTERFACE SWITCHERS & VIEW TOGGLES */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1 print:hidden">
          
          {/* Left Block: Duty Switcher (Class / Exam) */}
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['Class', 'Exam'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                    activeMode === mode 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {mode} Duty
                </button>
              ))}
            </div>
          </div>

          {/* Right Block: View Toggles & Modern Identity Badge */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* View Layer Selector Buttons */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setScheduleType('Class')}
                className={`flex items-center gap-1.5 px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                  scheduleType === 'Class' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <MdLayers size={12} />
                Student View
              </button>
              <button
                onClick={() => setScheduleType('Teacher')}
                className={`flex items-center gap-1.5 px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                  scheduleType === 'Teacher' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <MdShuffle size={12} />
                Teacher View
              </button>
            </div>

            {/* Modern Identity Dynamic Badge - FIXED & PLACED UNDER ROW 2 CONTAINER ALIGNMENT */}
            {/* <div className="group flex items-center gap-2 p-1.5 pr-5 bg-white border border-slate-200/60 rounded-full shadow-sm hover:border-indigo-200 transition-colors duration-300">
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full shadow-md shadow-indigo-100">
                <MdSchool className="text-white" size={16} />
              </div>
              <div className="flex items-center gap-3 ml-1">
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">
                    {scheduleType === 'Class' ? 'Class' : 'Instructor'}
                  </span>
                  <span className="text-xs font-black text-slate-800 text-center">
                    {scheduleType === 'Class' ? getClassLabel(selectedClass) : (selectedTeacher.split('. ')[1] || selectedTeacher)}
                  </span>
                </div>
                {scheduleType === 'Class' && (
                  <>
                    <div className="h-6 w-[1.5px] bg-slate-200 rounded-full"></div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Section</span>
                      <span className="text-xs font-black text-slate-800 text-center">{selectedSection}</span>
                    </div>
                  </>
                )}
              </div>
            </div> */}

          </div>
        </div>

        {/* ROW 3: SEPARATE DEDICATED CONTEXT CONTROLS ROW (TEACHER SEARCH BAR VS CLASS/SECTION FILTERS) */}
        <div className="px-1 pb-1 print:hidden">
          {scheduleType === 'Class' ? (
            
            /* Student View Segmented Dropdowns Layout */
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl h-10 min-w-[120px]">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full h-full px-3 text-xs font-bold text-slate-700 bg-transparent outline-none cursor-pointer"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                    <option key={c} value={c.toString()}>Class {c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl h-10 min-w-[110px]">
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full h-full px-3 text-xs font-bold text-slate-700 bg-transparent outline-none cursor-pointer"
                >
                  {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                    <option key={sec} value={sec}>Section {sec}</option>
                  ))}
                </select>
              </div>
            </div>

          ) : (

            /* Teacher View Registration Dropdown Search Bar Row Layout */
            <div className="relative max-w-sm w-full z-20">
              <div className="flex items-center bg-white px-3 rounded-xl h-10 border border-slate-200 transition-all outline-none shadow-sm focus-within:border-slate-300">
                <MdSearch size={18} className="text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={teacherSearch}
                  placeholder="Search instructor profile..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  className="w-full h-full text-xs font-bold text-slate-800 bg-transparent border-none outline-none focus:ring-0 placeholder:text-slate-400"
                />
              </div>

              {isSearchFocused && (
                <div className="absolute top-11 left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto mt-1 z-50">
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <button
                        key={teacher}
                        onMouseDown={() => {
                          setSelectedTeacher(teacher);
                          setTeacherSearch('');
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-none cursor-pointer outline-none"
                      >
                        {teacher}
                      </button>
                    ))
                  ) : (
                    <p className="p-3 text-xs text-slate-400 italic text-center">No instructors match query</p>
                  )}
                </div>
              )}
            </div>

          )}
        </div>
       
        {/* ROW 4: TIMETABLE DATAGRID MANAGEMENT BOX MODULE */}
        <div className="">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full border-separate border-spacing-x-2 border-spacing-y-0">
              <thead>
                <tr>
                  <th className="pb-4 pl-1 text-left text-[11px] font-black uppercase tracking-[0.15em]  w-[120px]">Time </th>
                  {days.map(day => (
                    <th key={day} className="pb-4 text-center text-[12px] font-black uppercase tracking-[0.15em] text-slate-800">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((slot, index) => (
                  <React.Fragment key={slot}>
                    <tr className="align-middle">
                      <td className="py-3 whitespace-nowrap text-left border-r border-slate-50 pr-2">
                        <div className="text-[12px] font-black text-slate-900 leading-none">{slot.split(' - ')[0]}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">to {slot.split(' - ')[1]}</div>
                      </td>
                      
                      {days.map((day, dIdx) => {
                        const isFreePeriod = (index === 1 && dIdx === 2) || (index === 4 && dIdx === 5);
                        
                        const displaySubject = activeMode === 'Class' 
                          ? (dIdx % 2 === 0 ? "Mathematics" : "Physics") 
                          : "Invigilation";
                        
                        const displaySecondaryInfo = activeMode === 'Class'
                          ? (scheduleType === 'Class' ? (dIdx % 2 === 0 ? "Dr. Alex Smith" : "Prof. Sarah Connor") : `Class ${dIdx % 2 === 0 ? '9-A' : '11-C'}`)
                          : "Staff Scout";
                        
                        const displayRoom = activeMode === 'Class' ? (dIdx % 2 === 0 ? "402" : "305") : "Hall " + selectedSection;

                        return (
                          <td key={day} className="py-2 min-w-[165px]">
                            {isFreePeriod ? (
                              <div className="group relative p-3.5 rounded-2xl bg-slate-50/40 border border-slate-200/60 border-dashed flex flex-col justify-between min-h-[105px] w-full box-border select-none transition-colors duration-300 hover:bg-slate-50/80">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-400 transition-colors" />
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Off Slot
                                  </span>
                                </div>
                                <div className="text-left">
                                  <p className="text-[10px] font-semibold text-slate-400/80 leading-none uppercase tracking-tight">
                                    No Assignment
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <SubjectBox 
                                subject={displaySubject}
                                teacher={displaySecondaryInfo}
                                room={displayRoom}
                                scheduleType={scheduleType}
                                onEdit={() => console.log(`Editing target: ${day}, Period Index ${index}`)}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Integrated Break Grid Alignment Spacer Row */}
                    {index === 2 && (
                      <tr>
                        <td colSpan="7" className="py-4">
                          <div className="flex items-center justify-center gap-6">
                            <div className="h-[1px] flex-grow bg-slate-300"></div>
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] whitespace-nowrap px-2">
                              Lunch & Prayer Recess Break
                            </span>
                            <div className="h-[1px] flex-grow bg-slate-300"></div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROW 5: ACTION FOOTER ROW CONTROL LAYER */}
        <div className="flex justify-end pt-1 print:hidden">
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 h-10 px-4 bg-white text-slate-700 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-950 hover:text-white hover:border-slate-950 active:scale-95 cursor-pointer shadow-sm w-full sm:w-auto outline-none"
          >
            <MdPrint size={14} />
            <span>Print Routine Log</span>
          </button>
        </div>

      </main>
    </div>
  );
};

export default Routine;