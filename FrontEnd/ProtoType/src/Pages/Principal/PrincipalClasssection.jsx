import React, { useState } from 'react';
import { 
  Layers, Plus, Users, UserCheck, 
  MoreVertical, Search, Edit3, Trash2, 
  ArrowRight, Hash, GraduationCap, ChevronRight
} from 'lucide-react';

const PrincipalClassSection = () => {
  const [classes] = useState([
    { id: 1, name: 'Class 10', sections: ['A', 'B', 'C'], students: 124, lead: 'Rahman Sir' },
    { id: 2, name: 'Class 9', sections: ['A', 'B'], students: 88, lead: 'Farhana Ma\'am' },
    { id: 3, name: 'Class 8', sections: ['A', 'B', 'C', 'D'], students: 156, lead: 'Jahi Sir' },
  ]);

  return (
    <div className=" animate-in fade-in duration-500">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Interactive Class List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-2 rounded-[32px] shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-3 text-slate-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Search classes or teachers..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {classes.map((cls) => (
                <div key={cls.id} className="p-6 hover:bg-slate-50/50 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <span className="text-[10px] font-black uppercase opacity-60">Grade</span>
                        <span className="text-lg font-black leading-none">{cls.name.split(' ')[1]}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                          {cls.name}
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded uppercase">Active</span>
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                            <Users size={14} /> {cls.students} Students
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                            <Hash size={14} /> {cls.sections.length} Sections
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">In-Charge</p>
                        <p className="text-sm font-bold text-slate-700">{cls.lead}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2.5 text-slate-300 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm">
                          <Edit3 size={18} />
                        </button>
                        <button className="p-2.5 text-slate-300 hover:text-rose-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Section Pills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cls.sections.map(sec => (
                      <div key={sec} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-black text-slate-500 hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center gap-2">
                        Section {sec}
                        <ChevronRight size={12} className="opacity-40" />
                      </div>
                    ))}
                    <button className="px-3 py-2 border border-dashed border-slate-200 rounded-xl text-slate-300 hover:text-indigo-500 hover:border-indigo-300 transition-all">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Insights & Quick Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Quick Section Add</h3>
            <form className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Target Class</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-sm font-bold text-slate-700 outline-none">
                  <option>Class 10</option>
                  <option>Class 9</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Section Name</label>
                <input type="text" placeholder="e.g. Science - D" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-sm font-bold outline-none" />
              </div>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all mt-2">
                Deploy Section
              </button>            
                 <button className="w-full bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3">
          <Plus size={20} />
          Create New Class
        </button>
            </form>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[32px] text-white relative overflow-hidden group">
            <div className="relative z-10">
              <GraduationCap className="mb-4 opacity-80" size={32} />
              <h3 className="text-xl font-bold mb-2">Teacher Allocation</h3>
              <p className="text-indigo-100 text-xs leading-relaxed font-medium mb-6">
                All 9 sections currently have an assigned Class Teacher. No structural gaps found.
              </p>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
                Audit Assignments <ArrowRight size={14} />
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-10 right-10 w-12 h-12 bg-white/5 rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrincipalClassSection
