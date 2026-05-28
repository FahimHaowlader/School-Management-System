import React, { useEffect, useState } from 'react';
import { MdLocationOn, MdBook, MdPrint } from "react-icons/md";

// Refocused card containing Class, Section, Subject, and Room
const SubjectBox = ({ className, section, subject, room }) => (
  <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 text-left">
    <div className="flex items-center justify-between gap-2 mb-1.5">
      <span className="text-[10px] font-black px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-slate-600 uppercase tracking-wide">
        {className} - {section}
      </span>
    </div>
    
    <div className="flex items-center gap-1.5 text-slate-800 mb-1">
      <MdBook size={13} className="text-slate-400 shrink-0" />
      <p className="font-bold text-[12px] uppercase tracking-tight leading-tight">
        {subject}
      </p>
    </div>
    
    <div className="flex items-center gap-1 text-slate-400">
      <MdLocationOn size={12} className="shrink-0" />
      <span className="text-[10px] font-semibold uppercase tracking-wider">
        Room {room}
      </span>
    </div>
  </div>
);

const Routine = () => {
  const [activeMode, setActiveMode] = useState('Mine');
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

  return (
    <div className="w-full font-sans text-slate-900">
      <main className="space-y-5">
        
        {/* Buttons-Only Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
          
          {/* Left Side: Scope Switcher (Mine / All) */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto shrink-0">
            {['Mine', 'All'].map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
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

          {/* Right Side: Duty Switcher & Print Action Wrapper */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            
            {/* Duty Switcher (Class / Exam) */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto shrink-0">
              {['Class', 'Exam'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setExamMode(mode)}
                  className={`flex-1 sm:flex-initial px-6 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
              className="flex items-center justify-center gap-2 h-[36px] px-4 bg-white text-slate-700 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-950 hover:text-white hover:border-slate-950 active:scale-95 cursor-pointer shadow-sm print:hidden shrink-0"
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
                        const displayClass = dIdx % 2 === 0 ? "Class Ten" : "Class Nine";
                        const displaySection = dIdx % 3 === 0 ? "A" : "B";
                        const displaySubject = dIdx % 2 === 0 ? "Mathematics" : "Physics";
                        const displayRoom = dIdx % 2 === 0 ? "402" : "305";

                        const isFreePeriod = (index === 1 && dIdx === 2) || (index === 4 && dIdx === 5);

                        return (
                          <td key={day} className="py-2 min-w-[160px]">
                            {isFreePeriod ? (
                              <div className="p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100 border-dashed flex items-center justify-center min-h-[96px]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Off Period</span>
                              </div>
                            ) : (
                              <SubjectBox 
                                className={examMode === 'Class' ? displayClass : "Exam Duty"}
                                section={displaySection}
                                subject={examMode === 'Class' ? displaySubject : "Invigilation"}
                                room={examMode === 'Class' ? displayRoom : "Hall " + displaySection}
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