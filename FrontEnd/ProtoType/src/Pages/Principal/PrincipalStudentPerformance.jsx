import React, { useState } from 'react';
import { 
  School, 
  LayoutGrid, 
  Layers, 
  UserCircle, 
  Search, 
  Filter, 
  Download,
  ChevronRight,
  TrendingUp,
  Users
} from 'lucide-react';

const PrincipalStudentPerformance = () => {
  // Options: 'school', 'class', 'section', 'student'
  const [viewLevel, setViewLevel] = useState('school');

  // Mock data tailored for each view level
  const analyticsData = {
    school: [
      { id: 'INST-01', name: 'Main Campus', totalStudents: 1240, avgGpa: '3.62', attendance: '94%', performance: 'Excellence' },
      { id: 'INST-02', name: 'Junior Branch', totalStudents: 850, avgGpa: '3.45', attendance: '91%', performance: 'Stable' },
    ],
    class: [
      { id: 'GR-12', name: 'Grade 12', totalStudents: 210, avgGpa: '3.80', attendance: '96%', performance: 'Excellence' },
      { id: 'GR-11', name: 'Grade 11', totalStudents: 245, avgGpa: '3.20', attendance: '88%', performance: 'At-Risk' },
      { id: 'GR-10', name: 'Grade 10', totalStudents: 280, avgGpa: '3.55', attendance: '92%', performance: 'Stable' },
    ],
    section: [
      { id: '12-A', name: 'Science A', totalStudents: 45, avgGpa: '3.92', attendance: '98%', performance: 'Excellence' },
      { id: '12-B', name: 'Science B', totalStudents: 42, avgGpa: '3.30', attendance: '89%', performance: 'Stable' },
      { id: '11-C', name: 'Arts C', totalStudents: 38, avgGpa: '2.85', attendance: '82%', performance: 'At-Risk' },
    ],
    student: [
      { id: 'S24-001', name: 'Fahim Haowlader', totalStudents: '12-A', avgGpa: '3.95', attendance: '98%', performance: 'Honor Roll' },
      { id: 'S24-042', name: 'Sarah Ahmed', totalStudents: '11-C', avgGpa: '2.40', attendance: '72%', performance: 'At-Risk' },
    ]
  };

  const currentRows = analyticsData[viewLevel];

  return (
    <div className="flex text-slate-900 font-sans">
      <main className="flex-1  space-y-8">
        
        {/* Header Section */}
        {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Institutional Intelligence</h1>
            <p className="text-slate-500 font-medium mt-1">Comprehensive breakdown of performance across all academic tiers.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
            <Download size={18} />
            Generate {viewLevel.toUpperCase()} Report
          </button>
        </div> */}

        {/* TOP LEVEL SWITCHER */}
        <div className="flex p-1.5 bg-slate-200/40 backdrop-blur-md rounded-[24px] w-fit border border-white/50">
          <LevelTab active={viewLevel === 'school'} onClick={() => setViewLevel('school')} icon={<School size={16}/>} label="School" />
          <LevelTab active={viewLevel === 'class'} onClick={() => setViewLevel('class')} icon={<LayoutGrid size={16}/>} label="Class" />
          <LevelTab active={viewLevel === 'section'} onClick={() => setViewLevel('section')} icon={<Layers size={16}/>} label="Section" />
          <LevelTab active={viewLevel === 'student'} onClick={() => setViewLevel('student')} icon={<UserCircle size={16}/>} label="Student" />
        </div>

        {/* Data Container */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <TrendingUp size={24}/>
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 capitalize">{viewLevel} Insights</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Live Academic Feed</p>
              </div>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={`Search ${viewLevel}...`} 
                className="pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold outline-none focus:ring-4 focus:ring-indigo-50 w-80 transition-all" 
              />
            </div>
          </div>

          {/* Dynamic Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {viewLevel === 'student' ? 'Full Name' : `${viewLevel} Identity`}
                  </th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                    {viewLevel === 'student' ? 'Section' : 'Total Students'}
                  </th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Avg. GPA</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Attendance</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Health Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-10 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-all shadow-sm">
                           {viewLevel === 'student' ? <UserCircle size={20}/> : <School size={20}/>}
                        </div>
                        <div>
                          <span className="text-sm font-black text-slate-700 block">{row.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">ID: {row.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                       <span className={`text-xs font-black ${viewLevel === 'student' ? 'text-indigo-600' : 'text-slate-500'}`}>
                        {row.totalStudents} {viewLevel !== 'student' && 'Registered'}
                       </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border border-slate-100 text-indigo-600 text-xs font-black shadow-sm">
                        {row.avgGpa}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-black text-slate-700">{row.attendance}</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: row.attendance }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg ${
                         row.performance === 'Excellence' || row.performance === 'Honor Roll' ? 'text-emerald-600 bg-emerald-50' :
                         row.performance === 'At-Risk' ? 'text-rose-600 bg-rose-50 animate-pulse' : 'text-slate-500 bg-slate-100'
                      }`}>
                        {row.performance}
                      </span>
                    </td>
                    <td className="px-10 py-5 text-right">
                       <button className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-300 hover:text-indigo-600 transition-all">
                          <ChevronRight size={20} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Metrics */}
          <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                 <div className="size-2 bg-emerald-500 rounded-full"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Online</span>
               </div>
               <p className="text-xs font-bold text-slate-400">Total Records in {viewLevel}: {currentRows.length}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-[10px] font-black uppercase text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">Previous</button>
              <button className="px-4 py-2 text-[10px] font-black uppercase text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 transition-all">Next Page</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const LevelTab = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-8 py-3 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
      active 
        ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-100/50 scale-105' 
        : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
    }`}
  >
    {icon}
    {label}
  </button>
);
export default PrincipalStudentPerformance
