import React, { useState } from 'react';
import { 
  Layers, Plus, Users, Terminal, 
  MoreVertical, Search, Settings, Trash2, 
  Cpu, Hash, Globe, ChevronRight, Activity, 
  Database, ShieldCheck, Zap
} from 'lucide-react';

const TechnicianClassSection = () => {
  const [classes] = useState([
    { id: 1, name: 'Class 10', sections: ['A', 'B', 'C'], students: 124, syncStatus: 'Healthy', version: 'v4.2' },
    { id: 2, name: 'Class 9', sections: ['A', 'B'], students: 88, syncStatus: 'Warning', version: 'v4.1' },
    { id: 3, name: 'Class 8', sections: ['A', 'B', 'C', 'D'], students: 156, syncStatus: 'Healthy', version: 'v4.2' },
  ]);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Infrastructure Node List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-2 rounded-[32px] shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-3 text-slate-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by Grade ID or Node..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                />
              </div>
              <div className="flex gap-2">
                 <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-colors">
                    <Activity size={18} />
                 </button>
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {classes.map((cls) => (
                <div key={cls.id} className="p-6 hover:bg-slate-50/50 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      {/* Technical Grade Icon */}
                      <div className="h-14 w-14 bg-slate-900 rounded-2xl flex flex-col items-center justify-center border border-slate-800 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all shadow-lg shadow-slate-100">
                        <span className="text-[9px] font-black uppercase text-slate-400 group-hover:text-indigo-200">Node</span>
                        <span className="text-lg font-black leading-none text-white">{cls.name.split(' ')[1]}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                          {cls.name}
                          <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${
                            cls.syncStatus === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {cls.syncStatus}
                          </span>
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                            <Database size={14} /> {cls.students} Records
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                            <Globe size={14} /> Cluster {cls.version}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Latency</p>
                        <p className="text-sm font-mono font-bold text-slate-700">14ms</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2.5 text-slate-300 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm border border-transparent hover:border-slate-100">
                          <Settings size={18} />
                        </button>
                        <button className="p-2.5 text-slate-300 hover:text-rose-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm border border-transparent hover:border-slate-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Virtual Section Nodes */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cls.sections.map(sec => (
                      <div key={sec} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-black text-slate-500 hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center gap-2 group/pill">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover/pill:animate-pulse"></div>
                        Section_{sec}
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

        {/* Right: DevOps & Deployment Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Provision New Node</h3>
            <form className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Environment</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-sm font-bold text-slate-700 outline-none appearance-none">
                  <option>Production - Class 10</option>
                  <option>Staging - Class 9</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Node Identifier</label>
                <input type="text" placeholder="e.g. SEC-A-INFRA" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-sm font-mono font-bold outline-none" />
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all mt-2 flex items-center justify-center gap-2">
                <Zap size={16} /> Deploy Instance
              </button>            
              <button className="w-full bg-slate-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                <Plus size={18} />
                Add New Class
              </button>
            </form>
          </div>

          {/* System Health Card */}
          <div className="bg-slate-900 p-8 rounded-[32px] text-white relative overflow-hidden group">
            <div className="relative z-10">
              <Terminal className="mb-4 text-indigo-400" size={32} />
              <h3 className="text-xl font-bold mb-2">Sync Engine</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-medium mb-6">
                Identity Resolution Service is currently mapping 368 active tokens across all sections. 
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">SSL Secure</span>
                </div>
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-all">
                  Open Logs <ChevronRight size={14} />
                </button>
              </div>
            </div>
            {/* Background Tech Detail */}
            <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
              <Cpu size={160} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechnicianClassSection;