import React, { useState } from 'react';
import { 
  Share2, 
  Search,
  Filter
} from 'lucide-react';

const PrincipalTeacherPerformance = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Teachers', value: '74', trend: '+2 this month', trendType: 'pos' },
    { label: 'Avg. Teacher Rating', value: '4.7/5.0', trend: '+0.1 vs last term', trendType: 'pos' },
    { label: 'Most Improved', value: 'Anna Freud', trend: '+12% in score', trendType: 'pos' },
    { label: 'Pending Evaluations', value: '3', trend: 'Due this week', trendType: 'warn' },
    { label: 'Avg. Pass Rate', value: '89%', trend: '-1.5% vs last term', trendType: 'neg' },
  ];

  const teachers = [
    { name: 'James Sullivan', subject: 'Physics', passRate: '95%', feedback: '4.8/5', classes: 4, image: 'https://i.pravatar.cc/150?u=james' },
    { name: 'Maria Garcia', subject: 'History', passRate: '92%', feedback: '4.9/5', classes: 5, image: 'https://i.pravatar.cc/150?u=maria' },
    { name: 'Robert Chen', subject: 'Calculus', passRate: '78%', feedback: '4.1/5', classes: 3, image: 'https://i.pravatar.cc/150?u=robert' },
    { name: 'Anna Freud', subject: 'Literature', passRate: '91%', feedback: '4.6/5', classes: 4, image: 'https://i.pravatar.cc/150?u=anna' },
  ];

  return (
    <div className="flex text-slate-900 font-sans">
      <main className="flex-1 flex flex-col min-w-0">
        <div className="space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 mb-1">{stat.value}</p>
                <p className={`text-[10px] font-bold ${
                  stat.trendType === 'pos' ? 'text-emerald-600' : 
                  stat.trendType === 'warn' ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Main Table Area */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            {/* Tabs & Search */}
            <div className="flex flex-col md:flex-row border-b border-slate-50 px-8 items-center justify-between gap-4">
              <div className="flex">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`py-5 text-sm font-bold border-b-2 transition-all mr-8 ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
                >
                  Performance Overview
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`py-5 text-sm font-bold border-b-2 transition-all ${activeTab === 'analytics' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
                >
                  Detailed Analytics
                </button>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-slate-300" size={16} />
                  <input type="text" placeholder="Search teacher..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500 w-48" />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 flex flex-wrap gap-3 bg-slate-50/30 border-b border-slate-50">
               <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <Filter size={14} /> Filter By:
               </div>
               <FilterSelect options={['All Departments', 'Science', 'Mathematics']} />
               <FilterSelect options={['All Subjects', 'Physics', 'Calculus']} />
               <FilterSelect options={['All Classes', 'Grade 9', 'Grade 10']} />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Teacher</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Pass Rate</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Feedback</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Load</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {teachers.map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={t.image} className="size-10 rounded-full border border-slate-100 object-cover" alt={t.name} />
                            <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-700 block leading-none">{t.name}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 block">{t.subject}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-black">
                          {t.passRate}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-black text-slate-700">{t.feedback}</span>
                        <span className="text-[10px] text-slate-300 ml-1">/ 5</span>
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-bold text-slate-400">{t.classes} Classes</td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 shadow-sm transition-all active:scale-95">
                            Compare
                          </button>
                          <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all active:scale-95">
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer */}
            <div className="p-6 bg-slate-50/50 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400">Showing {teachers.length} of 74 staff members</p>
              <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">View All Teachers</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Sub-components */

const FilterSelect = ({ options }) => (
  <select className="bg-white border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-widest rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm">
    {options.map((opt, i) => <option key={i}>{opt}</option>)}
  </select>
);

export default PrincipalTeacherPerformance;