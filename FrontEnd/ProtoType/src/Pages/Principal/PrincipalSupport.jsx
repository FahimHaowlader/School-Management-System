import React, { useState } from 'react';
import { 
  LifeBuoy, MessageSquare, Clock, Send, 
  ShieldCheck, AlertTriangle, FileText, Upload, 
  X, Search, Filter, ArrowUpRight
} from 'lucide-react';

const PrincipalSupport = () => {
  const [ticket, setTicket] = useState({
    subject: '',
    category: 'Administrative',
    priority: 'Medium',
    description: '',
    attachment: null
  });

  const [recentTickets] = useState([
    { id: 'T-8802', subject: 'Server lag during result entry', status: 'In Progress', priority: 'High' },
    { id: 'T-8795', subject: 'Payroll module access issue', status: 'Resolved', priority: 'Medium' }
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setTicket({ ...ticket, attachment: file });
    } else {
      alert("Please upload a PDF document.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Header */}
      {/* <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
              <LifeBuoy size={24} />
            </div>
            Support & Help Desk
          </h1>
          <p className="text-slate-500 font-medium mt-1">Submit technical tickets or administrative queries directly to the IT cell.</p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Ticket Submission Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <MessageSquare size={20} className="text-indigo-600" />
              New Support Request
            </h2>

            <form className="space-y-6">
              {/* Subject */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Request Subject</label>
                <input 
                  type="text" 
                  placeholder="Summarize the issue (e.g., Attendance report mismatch)"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all font-bold text-slate-800"
                />
              </div>

              {/* Category & Priority Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Category</label>
                  <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 font-medium text-slate-700 appearance-none">
                    <option>Technical Issue</option>
                    <option>Administrative Policy</option>
                    <option>Finance & Payroll</option>
                    <option>Student Database</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Priority</label>
                  <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-2xl">
                    {['Low', 'Medium', 'High'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setTicket({...ticket, priority: p})}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${
                          ticket.priority === p 
                          ? p === 'High' ? 'bg-rose-600 text-white shadow-md' : 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Detailed Description</label>
                <textarea rows="5" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all resize-none text-slate-700" placeholder="Please provide specific details..."></textarea>
              </div>

              {/* PDF ATTACHMENT */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Attachment (Scanned Letters/Screenshots PDF)</label>
                {!ticket.attachment ? (
                  <div className="relative group">
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex items-center justify-center gap-3 bg-slate-50/50 group-hover:border-indigo-300 transition-all">
                      <Upload className="text-slate-300 group-hover:text-indigo-500" size={20} />
                      <span className="text-xs font-bold text-slate-500">Upload PDF Documentation</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-indigo-600" />
                      <span className="text-sm font-bold text-indigo-900 truncate max-w-[200px]">{ticket.attachment.name}</span>
                    </div>
                    <button onClick={() => setTicket({...ticket, attachment: null})} className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-full transition-all">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end pt-4">
                <button type="submit" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3">
                  Submit Ticket
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: History & Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center justify-between">
              Recent Requests
              <Search size={16} className="text-slate-300" />
            </h3>
            
            <div className="space-y-4">
              {recentTickets.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-indigo-600 tracking-tighter">{t.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">{t.subject}</h4>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Clock size={12} /> 2h ago
                    </div>
                    <div className={`h-1.5 w-1.5 rounded-full ${t.priority === 'High' ? 'bg-rose-500' : 'bg-indigo-500'}`} />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-indigo-300 hover:text-indigo-500 transition-all">
              View All Support History
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="bg-slate-900 p-8 rounded-[32px] text-white overflow-hidden relative">
            <div className="relative z-10">
              <ShieldCheck className="text-emerald-400 mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Direct Tech Line</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
                For server-down emergencies, use the dedicated secure line to the Lead Systems Engineer.
              </p>
              <button className="flex items-center gap-2 text-xs font-black text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">
                Call Support Team <ArrowUpRight size={14}/>
              </button>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrincipalSupport;