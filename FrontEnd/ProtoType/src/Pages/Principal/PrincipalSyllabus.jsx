import React, { useState } from 'react';
import { 
  BookOpen, Calendar, Layers, Upload, 
  FileText, X, CheckCircle2, Search, 
  Download, Eye, MoreHorizontal, ArrowRight 
} from 'lucide-react';

const PrincipalSyllabus = () => {
  const [syllabus, setSyllabus] = useState({
    title: '',
    grade: '',
    academicYear: '2026-27',
    subject: '',
    file: null
  });

  const [activeList] = useState([
    { id: 1, subject: 'Mathematics', grade: 'Class 10', year: '2026', status: 'Approved' },
    { id: 2, subject: 'Physics', grade: 'Class 12', year: '2026', status: 'Pending' },
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSyllabus({ ...syllabus, file: file });
    } else {
      alert("Please upload a PDF document.");
    }
  };

  const removeFile = () => setSyllabus({ ...syllabus, file: null });

  return (
    <div className=" animate-in fade-in duration-500">
      
      {/* Header */}
      {/* <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
              <BookOpen size={24} />
            </div>
            Curriculum & Syllabus
          </h1>
          <p className="text-slate-500 font-medium mt-1">Review, upload, and approve school-wide academic syllabi.</p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Syllabus Upload Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <Layers size={20} className="text-indigo-600" />
              Publish New Syllabus
            </h2>

            <form className="space-y-6">
              {/* Syllabus Title */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Syllabus Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mid-Term Syllabus for SSC 2026"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all font-bold text-slate-800"
                />
              </div>

              {/* Grade & Subject Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Grade / Class</label>
                  <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 font-medium text-slate-700 appearance-none">
                    <option>Select Class</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Subject</label>
                  <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 font-medium text-slate-700 appearance-none">
                    <option>All Subjects</option>
                    <option>Mathematics</option>
                    <option>English</option>
                    <option>Higher Math</option>
                    <option>Physics</option>
                  </select>
                </div>
              </div>

              {/* PDF ATTACHMENT */}
              <div className="pt-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Official Syllabus File (PDF)</label>
                {!syllabus.file ? (
                  <div className="relative group">
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50/50 group-hover:border-indigo-300 group-hover:bg-indigo-50/30 transition-all">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-300 group-hover:text-indigo-500 transition-colors">
                        <Upload size={24} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-600">Click to upload official curriculum</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest text-center">PDF Documents Only</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-5 bg-indigo-50 rounded-2xl border border-indigo-100 animate-in zoom-in-95">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-indigo-900 truncate max-w-[200px]">{syllabus.file.name}</p>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Ready to Publish</p>
                      </div>
                    </div>
                    <button onClick={removeFile} type="button" className="p-2 hover:bg-rose-100 text-rose-600 rounded-full transition-all">
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Session 2026-27</span>
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3">
                  Publish Syllabus
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Published Syllabus List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Active Syllabi</h3>
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                <Search size={16} />
              </div>
            </div>

            <div className="space-y-4">
              {activeList.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 transition-all group shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-slate-100 text-[10px] font-black text-slate-500 rounded-md uppercase">{item.grade}</span>
                    <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={16}/></button>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.subject}</h4>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                       <div className={`h-1.5 w-1.5 rounded-full ${item.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                       <span className="text-[10px] font-bold text-slate-400">{item.status}</span>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Eye size={14}/></button>
                       <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Download size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-indigo-300 hover:text-indigo-500 transition-all">
              View Academic Archives
            </button>
          </div>

          {/* Guidelines Card */}
          <div className="bg-slate-900 p-8 rounded-[32px] text-white relative overflow-hidden">
             <CheckCircle2 className="text-emerald-400 mb-4" size={32} />
             <h3 className="text-lg font-bold mb-2">Principal Review</h3>
             <p className="text-slate-400 text-[11px] leading-relaxed font-medium">
               Uploading a syllabus here automatically pushes it to all registered students of the selected grade. Ensure the PDF includes lesson plans and marks distribution.
             </p>
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrincipalSyllabus
