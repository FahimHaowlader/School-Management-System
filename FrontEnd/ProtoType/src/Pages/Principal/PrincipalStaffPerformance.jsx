import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  Search, 
  Filter, 
  BookOpen, 
  Download,
  MoreHorizontal
} from 'lucide-react';

const PrincipalStaffPerformance = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Staff', value: '48', trend: '+2 new hires', trendType: 'pos' },
    { label: 'Avg. Resolution Time', value: '14m', trend: '-2m vs last month', trendType: 'pos' },
    { label: 'Top Performer', value: 'Jane Cooper', trend: '98% Satisfaction', trendType: 'pos' },
    { label: 'Pending Reviews', value: '5', trend: 'Due by Friday', trendType: 'warn' },
    { label: 'Resource Growth', value: '12%', trend: '+4% vs target', trendType: 'pos' },
  ];

  const staff = [
    { name: 'Jane Cooper', role: 'Head Librarian', resolutionRate: '98%', rating: '4.9/5', tasks: 124, image: 'https://i.pravatar.cc/150?u=jane' },
    { name: 'Cody Fisher', role: 'Assistant', resolutionRate: '91%', rating: '4.7/5', tasks: 89, image: 'https://i.pravatar.cc/150?u=cody' },
    { name: 'Esther Howard', role: 'Intern', resolutionRate: '84%', rating: '4.2/5', tasks: 45, image: 'https://i.pravatar.cc/150?u=esther' },
    { name: 'Jenny Wilson', role: 'Assistant', resolutionRate: '94%', rating: '4.8/5', tasks: 112, image: 'https://i.pravatar.cc/150?u=jenny' },
  ];

  return (
    <div className="flex text-slate-900 font-sans ">
      <main className="flex-1 flex flex-col ">
        <div className="w-full space-y-8">
          
          {/* Page Heading */}
          {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Staff Performance</h1>
              <p className="text-slate-500 font-medium">Analyze library management efficiency and service metrics.</p>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
              <Download size={16} />
              Export Performance Data
            </button>
          </div> */}

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
                  Overview Metrics
                </button>
                <button 
                  onClick={() => setActiveTab('efficiency')}
                  className={`py-5 text-sm font-bold border-b-2 transition-all ${activeTab === 'efficiency' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
                >
                  Efficiency Reports
                </button>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-slate-300" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search staff..." 
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500 w-48" 
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 flex flex-wrap gap-3 bg-slate-50/30 border-b border-slate-50">
               <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <Filter size={14} /> Filter By:
               </div>
               <FilterSelect options={['All Roles', 'Head Librarian', 'Assistant', 'Intern']} />
               <FilterSelect options={['Active Status', 'On Leave', 'Contract']} />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff Member</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Resolution Rate</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Avg. Rating</th>
                    <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tasks Done</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {staff.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={s.image} className="size-10 rounded-full border border-slate-100 object-cover" alt={s.name} />
                            <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-indigo-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-700 block leading-none">{s.name}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 block">{s.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black ${
                          parseInt(s.resolutionRate) > 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
                        }`}>
                          {s.resolutionRate}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-black text-slate-700">{s.rating}</span>
                        <span className="text-[10px] text-slate-300 ml-1">/ 5</span>
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-bold text-slate-400">{s.tasks} Units</td>
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
              <p className="text-xs font-bold text-slate-400">Showing {staff.length} of 48 library staff</p>
              <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">View All Staff</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Internal Sub-component for Filters */
const FilterSelect = ({ options }) => (
  <select className="bg-white border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-widest rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm">
    {options.map((opt, i) => <option key={i}>{opt}</option>)}
  </select>
);
export default PrincipalStaffPerformance
