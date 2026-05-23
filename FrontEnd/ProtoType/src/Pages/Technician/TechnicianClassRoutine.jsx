import React, { useState, useEffect } from 'react';
import { 
  MdChevronLeft, 
  MdChevronRight,
  MdFilterList,
  MdSettingsInputComponent,
  MdRefresh
} from "react-icons/md";

const TechnicianClassRoutine = () => {
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedSection, setSelectedSection] = useState("A");

  const timeSlots = [
    "09:00 - 09:40",
    "09:45 - 10:25",
    "10:30 - 11:10",
    "11:15 - 11:55",
    "12:00 - 12:40",
    "12:40 - 01:20" 
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex font-sans text-gray-800">
      <main className="flex-1 flex flex-col max-w-7xl mx-auto">
        
        {/* Navigation & Controls - Styled exactly like Principal */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
            <button className="p-1 rounded-lg hover:bg-slate-50 transition-all text-slate-600">
              <MdChevronLeft size={24} />
            </button>
            <p className="text-xs font-black text-slate-700 uppercase tracking-widest px-2">Schedule Overview</p>
            <button className="p-1 rounded-lg hover:bg-slate-50 transition-all text-slate-600">
              <MdChevronRight size={24} />
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 px-3 border-r border-slate-100">
              <MdFilterList className="text-slate-400" size={18} />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Node Filter</span>
            </div>
            
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer px-2 py-1 hover:text-indigo-600 transition-colors"
            >
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>

            <select 
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer px-2 py-1 hover:text-indigo-600 transition-colors border-l border-slate-100"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>

            <button className="ml-2 p-2 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-md">
              <MdRefresh size={18} />
            </button>
          </div>
        </div>

        {/* Routine Table */}
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100 w-40">Time Slot</th>
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map(day => (
                    <th key={day} className="p-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {timeSlots.map((slot, index) => (
                  <React.Fragment key={slot}>
                    {slot === "12:40 - 01:20" && (
                      <tr>
                        <td colSpan="6" className="p-4 text-center text-[10px] font-black text-slate-400 bg-slate-50/30 uppercase tracking-[0.4em]">
                          Mid-Day Maintenance Break
                        </td>
                      </tr>
                    )}
                    <tr className="group hover:bg-slate-50/30 transition-colors">
                      <td className="p-5 align-top">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-8 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
                          <span className="text-xs font-black text-slate-500">{slot}</span>
                        </div>
                      </td>
                      <td className="p-3 align-top"><SessionBox title="Mathematics" id="MTH-101" color="blue" /></td>
                      <td className="p-3 align-top"><SessionBox title="Physics" id="PHY-202" color="red" /></td>
                      <td className="p-3 align-top"><SessionBox title="English" id="ENG-303" color="amber" /></td>
                      <td className="p-3 align-top"><SessionBox title="Biology" id="BIO-404" color="green" /></td>
                      <td className="p-3 align-top"><SessionBox title="ICT" id="ICT-505" color="purple" /></td>
                    </tr>
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

/* --- Simplified Session Box --- */
const SessionBox = ({ title, id, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100"
  };

  return (
    <div className={`p-3 rounded-2xl border ${colors[color] || colors.blue} shadow-sm hover:shadow-md transition-all cursor-pointer group/box`}>
      <div className="flex items-center justify-between mb-1">
        <p className="font-black text-xs leading-tight">{title}</p>
        <div className="w-1 h-1 rounded-full bg-current opacity-40"></div>
      </div>
      <p className="text-[10px] font-bold opacity-60 flex items-center gap-1 font-mono">
        <MdSettingsInputComponent size={10} className="group-hover/box:rotate-180 transition-transform duration-500" />
        {id}
      </p>
    </div>
  );
};

export default TechnicianClassRoutine;