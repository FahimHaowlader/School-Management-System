import React, { useEffect,useState } from 'react';
import { MdChevronLeft, MdChevronRight,MdSchool,MdLayers } from "react-icons/md";

const SubjectBox = ({ subject, teacher }) => (
  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
    <p className="font-bold text-[12px] text-slate-800 uppercase tracking-tight text-center leading-tight">
      {subject}
    </p>
    <p className="text-[10px] font-medium text-slate-500 text-center mt-1 uppercase tracking-wider">
      {teacher}
    </p>
  </div>
);

const Routine = () => {
  const [activeMode, setActiveMode] = useState('Class');
  // Using the time slots from the previous university-style version
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

  return (
    <div className="font-sans text-slate-900">
      <main className="">
        
        {/* Minimal Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-5 px-2">
          
          {/* Left Side: Brand + Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Segmented Control (Class/Exam) */}
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
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Navigation + Identity */}
          <div className="flex flex-wrap items-center gap-4">
  {/* Modernized Identity Badge */}
  <div className="group flex items-center gap-2 p-1.5 pr-5 bg-slate-50 border border-slate-200/60 rounded-full shadow-sm hover:border-indigo-200 transition-colors duration-300">
    
    {/* Left Icon: Class Identity */}
    <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full shadow-md shadow-indigo-100">
      <MdSchool className="text-white" size={16} />
    </div>

    {/* Content Area */}
    <div className="flex items-center gap-3 ml-1">
      <div className="flex flex-col leading-none">
        <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">Class</span>
        <span className="text-xs font-black text-slate-800 text-center">Ten</span>
      </div>

      {/* Vertical Divider */}
      <div className="h-6 w-[1.5px] bg-slate-200 rounded-full"></div>

      <div className="flex flex-col leading-none">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Section</span>
        <span className="text-xs font-black text-slate-800 text-center">A</span>
      </div>
    </div>
    
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
                    
                    {days.map((day, dIdx) => (
                      <td key={day} className="py-2 min-w-[140px]">
                        <SubjectBox 
                          subject={dIdx % 2 === 0 ? "Mathematics" : "Physics"} 
                          teacher="A. Haowlader"
                        />
                      </td>
                    ))}
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