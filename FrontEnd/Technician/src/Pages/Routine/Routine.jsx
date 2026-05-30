import React, { useEffect, useState } from 'react';
import { MdLocationOn, MdBook, MdPrint, MdEdit, MdPerson } from "react-icons/md";

// Updated card with a larger icon-only edit button next to the room number
const SubjectBox = ({ subject, teacher, room, onEdit }) => (
  <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between min-h-[105px]">
    
    <div>
      {/* Subject Line */}
      <div className="flex items-center gap-1.5 text-slate-800 mb-1">
        <MdBook size={13} className="text-slate-400 shrink-0" />
        <p className="font-bold text-[12px] uppercase tracking-tight leading-tight truncate">
          {subject}
        </p>
      </div>

      {/* Teacher Line */}
      <div className="flex items-center gap-1.5 text-slate-500 mb-2">
        <MdPerson size={13} className="text-slate-400 shrink-0" />
        <p className="text-[11px] font-medium leading-tight truncate">
          {teacher}
        </p>
      </div>
    </div>
    
    {/* Bottom Row: Room Info + Larger Icon-Only Edit Button */}
    <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-50">
      <div className="flex items-center gap-1 text-slate-400">
        <MdLocationOn size={12} className="shrink-0" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">
          Room {room}
        </span>
      </div>

      <button 
        onClick={onEdit}
        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer print:hidden"
        title="Edit Period"
      >
        <MdEdit size={18} />
      </button>
    </div>

  </div>
);

const Routine = () => {
  // --- STATE MATRIX ---
  const [selectedClass, setSelectedClass] = useState('9');
  const [selectedSection, setSelectedSection] = useState('A');
  const [examMode, setExamMode] = useState('Class');
  
  const periods = [
    "09:00 - 09:40",
    "09:45 - 10:25",
    "10:30 - 11:10",
    "11:15 - 11:55",
    "12:00 - 12:40",
    "12:40 - 01:20"
  ];

  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleEditPeriod = (day, slotIndex) => {
    console.log(`Editing period for ${day} at slot index ${slotIndex}`);
  };

  return (
    <div className="w-full font-sans text-slate-900">
      <main className="space-y-5">
        
        {/* Buttons & Selectors Control Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left Side: Dynamic School Class & Section View Filter Matrix */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            
            {/* Class Dropdown Filter */}
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

            {/* Section Dropdown Filter */}
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

          {/* Right Side: Duty Switcher & Print Action Wrapper */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            
            {/* Duty Switcher (Class / Exam) */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto shrink-0">
              {['Class', 'Exam'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setExamMode(mode)}
                  className={`flex-1 sm:flex-initial h-8 px-6 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    examMode === mode 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {mode} Duty
                </button>
              ))}
            </div>

            {/* Print Button at the Absolute Right */}
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 h-10 px-4 bg-white text-slate-700 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-950 hover:text-white hover:border-slate-950 active:scale-95 cursor-pointer shadow-sm print:hidden shrink-0"
            >
              <MdPrint size={14} />
              <span className="hidden md:inline">Print Routine</span>
            </button>
          </div>

        </div>

        {/* Ultra-Light Timetable Grid Module */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm print:border-none print:shadow-none">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full border-separate border-spacing-x-2 border-spacing-y-0">
              <thead>
                <tr>
                  <th className="pb-4 pl-1 text-left text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 w-[120px]">Time Slot</th>
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
                        <div className="text-[12px] font-black text-slate-900">{slot.split(' - ')[0]}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">to {slot.split(' - ')[1]}</div>
                      </td>
                      
                      {days.map((day, dIdx) => {
                        const displaySection = selectedSection;
                        
                        const displaySubject = dIdx % 2 === 0 ? "Mathematics" : "Physics";
                        const displayTeacher = dIdx % 2 === 0 ? "Dr. Alex Smith" : "Prof. Sarah Connor";
                        const displayRoom = dIdx % 2 === 0 ? "402" : "305";

                        const isFreePeriod = (index === 1 && dIdx === 2) || (index === 4 && dIdx === 5);

                        return (
                          <td key={day} className="py-2 min-w-[165px]">
                            {isFreePeriod ? (
                              <div className="p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100 border-dashed flex items-center justify-center min-h-[105px]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Off Period</span>
                              </div>
                            ) : (
                              <SubjectBox 
                                subject={examMode === 'Class' ? displaySubject : "Invigilation"}
                                teacher={examMode === 'Class' ? displayTeacher : "Staff Scout"}
                                room={examMode === 'Class' ? displayRoom : "Hall " + displaySection}
                                onEdit={() => handleEditPeriod(day, index)}
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
                            <div className="h-[1px] flex-grow bg-slate-100"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] whitespace-nowrap bg-white px-2">
                              Lunch & Prayer Recess Break
                            </span>
                            <div className="h-[1px] flex-grow bg-slate-100"></div>
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

      </main>
    </div>
  );
};

export default Routine;