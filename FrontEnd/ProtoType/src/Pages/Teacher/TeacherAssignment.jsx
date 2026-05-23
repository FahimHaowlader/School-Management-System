import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  Users, 
  MoreHorizontal,
  ChevronRight,
  Filter,
  BarChart3
} from 'lucide-react';

const TeacherAssignment = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Quantum Mechanics Fundamentals",
      subject: "Physics 101",
      dueDate: "20 May, 2026",
      submissions: 42,
      totalStudents: 50,
      status: "Active",
      priority: "High"
    },
    {
      id: 2,
      title: "Special Relativity Quiz",
      subject: "Advanced Physics",
      dueDate: "15 May, 2026",
      submissions: 15,
      totalStudents: 30,
      status: "Draft",
      priority: "Normal"
    },
    {
      id: 3,
      title: "Optics Laboratory Report",
      subject: "General Science",
      dueDate: "12 May, 2026",
      submissions: 48,
      totalStudents: 48,
      status: "Closed",
      priority: "Low"
    }
  ]);

  return (
    <div className='min-h-screen  text-zinc-900 font-sans selection:bg-indigo-100'>
      <div className=''>
        
        {/* Navigation & Action Header */}
        <header className='flex flex-col md:flex-row md:items-end justify-end pb-8'>
          <div className='flex gap-3 mt-6 md:mt-0'>
            <button className='px-5 py-3 rounded-xl border border-zinc-200 font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all'>
              Export Data
            </button>
            <button className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all active:scale-95'>
              <Plus size={16} strokeWidth={3} /> Create Assignment
            </button>
          </div>
        </header>

        {/* Filter & Search System */}
        <div className='flex flex-col sm:flex-row gap-4 mb-10'>
          <div className='relative flex-1'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400' size={18} />
            <input 
              type="text" 
              placeholder="Search by student or title..." 
              className='w-full pl-12 pr-4 py-4 bg-zinc-50/50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-sm font-medium'
            />
          </div>
          <button className='flex items-center gap-2 px-6 py-4 bg-zinc-50/50 border border-zinc-100 rounded-2xl text-zinc-500 hover:text-indigo-600 transition-all'>
            <Filter size={18} />
          </button>
        </div>

        {/* Assignment Table-List */}
        <div className='space-y-4'>
          {assignments.map((item) => (
            <div key={item.id} className='group relative bg-white border border-zinc-100 rounded-3xl p-6 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer'>
              <div className='grid grid-cols-1 lg:grid-cols-12 items-center gap-6'>
                
                {/* Info Section */}
                <div className='lg:col-span-5'>
                  <div className='flex items-center gap-3 mb-2'>
                    <span className='text-[10px] font-black uppercase tracking-tighter text-zinc-400'>{item.subject}</span>
                    <div className='w-1 h-1 rounded-full bg-zinc-200'></div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                      item.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
                    }`}>{item.priority}</span>
                  </div>
                  <h3 className='text-xl font-bold text-zinc-800 leading-tight group-hover:text-indigo-600 transition-colors'>
                    {item.title}
                  </h3>
                </div>

                {/* Progress Tracking */}
                <div className='lg:col-span-3 flex items-center gap-4'>
                  <div className='flex-1'>
                    <div className='flex justify-between items-end mb-2'>
                      <span className='text-[10px] font-black uppercase text-zinc-400'>Submission Rate</span>
                      <span className='text-sm font-black'>{Math.round((item.submissions/item.totalStudents)*100)}%</span>
                    </div>
                    <div className='h-2 bg-zinc-100 rounded-full overflow-hidden'>
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.status === 'Closed' ? 'bg-zinc-400' : 'bg-indigo-600'
                        }`}
                        style={{ width: `${(item.submissions/item.totalStudents)*100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Meta Data */}
                <div className='lg:col-span-2 flex flex-row lg:flex-col justify-between lg:justify-center gap-2'>
                  <div className='flex items-center gap-2 text-zinc-400 text-xs font-bold'>
                    <Calendar size={14} className='text-indigo-500' /> {item.dueDate}
                  </div>
                  <div className='flex items-center gap-2 text-zinc-400 text-xs font-bold'>
                    <Users size={14} /> {item.submissions} Responses
                  </div>
                </div>

                {/* Quick Actions */}
                <div className='lg:col-span-2 flex justify-end gap-2 border-t lg:border-t-0 border-zinc-50 pt-4 lg:pt-0'>
                  <button className='w-11 h-11 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all'>
                    <Edit size={18} />
                  </button>
                  <button className='w-11 h-11 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 transition-all'>
                    <Trash2 size={18} />
                  </button>
                  <button className='w-11 h-11 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all'>
                    <MoreHorizontal size={18} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TeacherAssignment;