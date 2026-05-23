import React, { useEffect, useState } from 'react';

// Subject Box with normalized height and padding properties for consistent spatial footprint
const SubjectBox = ({ className, section, subject, room }) => {
  if (!subject) return (
    <div className="p-3 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center transition-all duration-300">
      <p className="font-bold text-[12px] text-slate-400 uppercase tracking-tight leading-tight">
        Free Period
      </p>
      {/* Structural line match to match height properties of active modules */}
      <p className="text-[10px] font-medium opacity-0 mt-1 select-none">
        Spacer
      </p>
    </div>
  );

  return (
    <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <p className="font-bold text-[12px] text-slate-800 uppercase tracking-tight text-center leading-tight">
        {subject}
      </p>
      <p className="text-[10px] font-medium text-slate-500 text-center mt-1 uppercase tracking-wider">
        Class {className}-{section} • {room}
      </p>
    </div>
  );
};

const Routine = () => {
  const [activeMode, setActiveMode] = useState('Class');
  
  // State for selectable Class and Section
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');

  const periods = [
    "09:00 - 09:40",
    "09:45 - 10:25",
    "10:30 - 11:10",
    "11:15 - 11:55",
    "12:00 - 12:40",
    "12:40 - 01:20"
  ];

  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

  // Mapping matrix: [periodIndex][dayIndex]
  const staffSchedule = [
    [
      { className: selectedClass, section: selectedSection, subject: "Physics", room: "R-402" },
      { className: "9", section: "B", subject: "Chemistry", room: "Lab-3" },
      { className: selectedClass, section: selectedSection, subject: "Physics", room: "R-402" },
      null,
      { className: "10", section: "B", subject: "Biology", room: "R-405" },
      { className: "9", section: "A", subject: "Physics", room: "R-101" }
    ],
    [
      { className: "11", section: "A", subject: "Higher Math", room: "R-501" },
      { className: selectedClass, section: selectedSection, subject: "Physics", room: "R-402" },
      null,
      { className: "9", section: "A", subject: "Physics", room: "R-101" },
      { className: selectedClass, section: selectedSection, subject: "Physics", room: "R-402" },
      null
    ],
    [
      null,
      { className: "10", section: "B", subject: "General Science", room: "R-405" },
      { className: "11", section: "B", subject: "Chemistry", room: "Lab-3" },
      { className: selectedClass, section: selectedSection, subject: "Physics", room: "R-402" },
      null,
      { className: "9", section: "B", subject: "Physics", room: "R-102" }
    ],
    [
      { className: "9", section: "A", subject: "Physics", room: "R-101" },
      null,
      { className: selectedClass, section: selectedSection, subject: "Physics", room: "R-402" },
      { className: "11", section: "A", subject: "Higher Math", room: "R-501" },
      { className: "9", section: "B", subject: "Physics", room: "R-102" },
      { className: "10", section: "B", subject: "Biology", room: "R-405" }
    ],
    [
      { className: "10", section: "B", subject: "General Science", room: "R-405" },
      { className: "9", section: "A", subject: "Physics", room: "R-101" },
      null,
      { className: "10", section: "B", subject: "Biology", room: "R-405" },
      { className: "11", section: "B", subject: "Chemistry", room: "Lab-3" },
      null
    ],
    [
      null,
      { className: "11", section: "A", subject: "Higher Math", room: "R-501" },
      { className: "9", section: "B", subject: "Physics", room: "R-102" },
      null,
      { className: selectedClass, section: selectedSection, subject: "Physics", room: "R-402" },
      { className: "9", section: "A", subject: "Physics", room: "R-101" }
    ]
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="font-sans text-slate-900">
      <main className="">
        
        {/* Minimal Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-5 px-2">
          
          {/* Left Side: Brand + Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Segmented Control (Routine/Exam Duty) */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['Class', 'Exam'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activeMode === mode 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {mode === 'Class' ? 'Routine' : 'Exam Duty'}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Selectable Class and Section Fields */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 p-1.5 px-4 rounded-full shadow-sm">
            
            {/* Class Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Class</span>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-transparent text-xs font-black text-slate-800 outline-none cursor-pointer pr-1"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Vertical Divider */}
            <div className="h-5 w-[1.5px] bg-slate-200 rounded-full"></div>

            {/* Section Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Section</span>
              <select 
                value={selectedSection} 
                onChange={(e) => setSelectedSection(e.target.value)}
                className="bg-transparent text-xs font-black text-slate-800 outline-none cursor-pointer pr-1"
              >
                {['A', 'B', 'C', 'D'].map(letter => (
                  <option key={letter} value={letter}>{letter}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Ultra-Light Table */}
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full border-separate border-spacing-x-2 border-spacing-y-0">
            <thead>
              <tr>
                <th className="pb-4 pl-1 text-left text-[12px] font-black uppercase tracking-[0.2em] text-slate-600">Time</th>
                {days.map(day => (
                  <th key={day} className="pb-4 text-center text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((slot, index) => (
                <React.Fragment key={slot}>
                  <tr>
                    <td className="py-2 whitespace-nowrap">
                      <div className="text-[12px] font-black text-slate-900">{slot.split(' - ')[0]}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">to {slot.split(' - ')[1]}</div>
                    </td>
                    
                    {days.map((day, dIdx) => {
                      const session = staffSchedule[index][dIdx];
                      return (
                        <td key={day} className="py-2 min-w-[140px]">
                          <SubjectBox 
                            className={session?.className}
                            section={session?.section}
                            subject={session?.subject}
                            room={session?.room}
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Minimal Break Line */}
                  {index === 2 && (
                    <tr>
                      <td colSpan="7" className="py-4">
                        <div className="flex items-center justify-center gap-8">
                           <div className="h-[1px] flex-1 bg-slate-200"></div>
                           <span className="text-[12px] font-black text-slate-900 uppercase tracking-[0.8em] whitespace-nowrap">
                             Lunch & Prayer Break
                           </span>
                           <div className="h-[1px] flex-1 bg-slate-200"></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Routine;