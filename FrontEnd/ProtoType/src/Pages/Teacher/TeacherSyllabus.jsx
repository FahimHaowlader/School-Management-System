import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  BookOpen, 
  Search,
  Save,
  X,
  FilePlus,
  ChevronRight,
  Layers,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  Calendar,
  GraduationCap
} from 'lucide-react';

const TeacherSyllabus = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const syllabusCards = [
    { id: 1, subject: 'Higher Mathematics', class: 'Class 9', section: 'Science', units: 14, status: 'Published', date: '12 May 2026' },
    { id: 2, subject: 'Physics', class: 'Class 10', section: 'Science', units: 10, status: 'Draft', date: '08 May 2026' },
    { id: 3, subject: 'General Science', class: 'Class 8', section: 'General', units: 18, status: 'Published', date: '01 May 2026' },
    { id: 3, subject: 'General Science', class: 'Class 8', section: 'General', units: 18, status: 'Published', date: '01 May 2026' },
  ];

  return (
    <div className='animate-in fade-in slide-in-from-bottom-4 duration-700 '>
      
      {/* --- HEADER SECTION --- */}
      <div className='flex flex-col lg:flex-row justify-end items-start lg:items-center mb-6
     gap-6'>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl ${
            isAdding 
              ? 'bg-gray-100 text-gray-500 hover:bg-gray-200 shadow-transparent' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
          }`}
        >
          {isAdding ? <><X size={18} /> Close Editor</> : <><Plus size={18} /> Create Syllabus</>}
        </button>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-12 gap-8 items-start'>
        
        {/* --- LEFT SIDE: LIST VIEW --- */}
        <div className={`${isAdding ? 'xl:col-span-5' : 'xl:col-span-12'} transition-all duration-500 space-y-6`}>
          
          {/* Sub-Header Filter */}
          <div className='flex items-center justify-between bg-white border border-gray-100 p-2 rounded-2xl shadow-sm'>
            
            {!isAdding && (
              <div className='hidden md:flex px-4 items-center gap-3 text-gray-600 border-l border-gray-100 ml-2'>
                <Search size={16} />
                <input type="text" placeholder="Search subject..." className='text-xs font-bold outline-none bg-transparent min-w-96' />
              </div>
            )}
            <div className='flex gap-1 overflow-x-auto no-scrollbar'>
              {['All', 'Published', 'Draft'].map((f) => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === f ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className={`grid grid-cols-1 ${isAdding ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {syllabusCards.map((item) => (
              <div key={item.id} className='group bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 relative'>
                <div className='flex justify-between items-start mb-10'>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    item.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {item.status}
                  </div>
                  <button className='text-gray-200 hover:text-gray-900 transition-colors'><MoreVertical size={20} /></button>
                </div>

                <div className='mb-10'>
                  <div className='flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2'>
                    <GraduationCap size={14} /> {item.class}
                  </div>
                  <h3 className='text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight'>
                    {item.subject}
                  </h3>
                  <p className='text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter italic'>Section: {item.section}</p>
                </div>

                <div className='flex items-center justify-between pt-6 border-t border-gray-50'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400'>
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <p className='text-xs font-black text-gray-900'>{item.units} Units</p>
                      <p className='text-[9px] font-bold text-gray-400 uppercase tracking-widest'>Curriculum</p>
                    </div>
                  </div>
                  <button className='w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all'>
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: THE EDITOR --- */}
        {isAdding && (
          <div className='xl:col-span-7 animate-in slide-in-from-right-10 fade-in duration-500'>
            <div className='bg-white border-2 border-gray-900 rounded-[3rem] p-10 shadow-2xl shadow-gray-200 relative overflow-hidden'>
              {/* Decorative Accent */}
              <div className='absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-[5rem] -mr-10 -mt-10'></div>
              
              <div className='flex items-center gap-4 mb-10'>
                <div className='w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center'>
                  <FilePlus size={28} />
                </div>
                <div>
                  <h2 className='text-2xl font-black text-gray-900'>Create Syllabus</h2>
                  <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>New Academic Entry</p>
                </div>
              </div>

              <div className='space-y-8'>
                {/* Meta Inputs */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-3'>
                    <label className='text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1'>Course Subject</label>
                    <input type="text" placeholder="e.g. Higher Math" className='w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:border-blue-600 focus:bg-white transition-all outline-none' />
                  </div>
                  <div className='space-y-3'>
                    <label className='text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1'>Target Class</label>
                    <select className='w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:border-blue-600 focus:bg-white transition-all outline-none appearance-none'>
                      <option>Class 9 (Science)</option>
                      <option>Class 10 (Science)</option>
                      <option>Class 12 (Science)</option>
                    </select>
                  </div>
                </div>

                {/* Content Input */}
                <div className='space-y-3'>
                  <div className='flex justify-between items-end ml-1'>
                    <label className='text-[10px] font-black uppercase text-gray-400 tracking-widest'>Unit Breakdown</label>
                    <span className='text-[9px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded'>Shift + Enter for new unit</span>
                  </div>
                  <textarea 
                    rows={8} 
                    placeholder="Unit 01: Linear Algebra&#10;Unit 02: Trigonometry..." 
                    className='w-full bg-gray-50 border border-gray-100 rounded-[2rem] px-8 py-8 text-sm font-medium focus:border-blue-600 focus:bg-white transition-all resize-none shadow-inner'
                  />
                </div>

                {/* Confirm Actions */}
                <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                  <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 group'>
                    <Save size={18} className='group-hover:scale-110 transition-transform' /> Deploy to Class
                  </button>
                  <button onClick={() => setIsAdding(false)} className='px-10 bg-gray-50 hover:bg-gray-100 text-gray-400 py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all'>
                    Discard
                  </button>
                </div>

                <div className='flex items-center gap-3 justify-center text-emerald-500'>
                  <CheckCircle2 size={16} />
                  <span className='text-[10px] font-black uppercase tracking-widest'>Changes are auto-saved to cloud</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default TeacherSyllabus;