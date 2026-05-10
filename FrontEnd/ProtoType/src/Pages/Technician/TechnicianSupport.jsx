import React from 'react';
import { 
  LifeBuoy, 
  MessageSquare, 
  Wrench, 
  AlertTriangle, 
  ShieldCheck, 
  Terminal, 
  ExternalLink,
  Clock,
  Send,
    Building2,
    ArrowRight,

} from 'lucide-react';

const TechnicianSupport = () => {
  const supportTickets = [
    { id: "TK-882", issue: "Database latency in Block B", priority: "High", status: "Open" },
    { id: "TK-879", issue: "Fingerprint scanner sync error", priority: "Medium", status: "In-Progress" },
    { id: "TK-870", issue: "Update SSL certificates", priority: "Low", status: "Resolved" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        
        {/* Left Col: Ticket Submission */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-8 border-b border-slate-50 pb-5">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Open Technical Ticket</h3>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Issue Category</label>
                  <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 font-medium appearance-none">
                    <option>Hardware/Terminal Malfunction</option>
                    <option>Database/Software Bug</option>
                    <option>Network/Connectivity</option>
                    <option>Account/Permission Reset</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Priority Level</label>
                  <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-gray-50/30 font-medium appearance-none text-rose-600">
                    <option>Low - Routine</option>
                    <option>Medium - Standard</option>
                    <option>High - Urgent</option>
                    <option>Critical - System Down</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Subject</label>
                <input type="text" placeholder="Brief summary of the technical issue" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 font-medium" />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Technical Logs / Description</label>
                <textarea rows="4" placeholder="Describe the error codes or physical symptoms..." className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 font-medium resize-none"></textarea>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 text-sm">
                  Send Ticket to Devs
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Recent Tickets Table */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Recent Active Tickets</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-slate-400 font-black uppercase tracking-tighter border-b border-slate-50">
                      <th className="pb-4">Ticket ID</th>
                      <th className="pb-4">Issue</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {supportTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-slate-50/50 group">
                        <td className="py-4 font-black text-indigo-600">{ticket.id}</td>
                        <td className="py-4 text-slate-700 font-medium">{ticket.issue}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            ticket.status === 'Open' ? 'bg-rose-50 text-rose-600' : 
                            ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><ExternalLink size={16}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Right Col: System Status & Resources */}
        <div className="space-y-8">
          
          {/* System Health Card */}
          <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl shadow-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={120} />
            </div>
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-6">System Integrity</h3>
            
            <div className="space-y-6 relative z-10">
               <div className="flex items-center justify-between">
                 <span className="text-slate-400 text-xs font-medium">Main Server</span>
                 <span className="flex items-center gap-2 text-emerald-400 text-xs font-black">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> OPERATIONAL
                 </span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-slate-400 text-xs font-medium">Database (MongoDB)</span>
                 <span className="flex items-center gap-2 text-emerald-400 text-xs font-black">
                   <div className="w-2 h-2 rounded-full bg-emerald-400"></div> STABLE
                 </span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-slate-400 text-xs font-medium">SMS Gateway</span>
                 <span className="flex items-center gap-2 text-rose-400 text-xs font-black">
                   <div className="w-2 h-2 rounded-full bg-rose-400"></div> DELAYED
                 </span>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
               <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                 <Terminal size={14} /> Run Diagnostics
               </button>
            </div>
          </div>

          {/* Emergency Guide */}
          <div className="bg-amber-50 border border-amber-100 p-8 rounded-[32px]">
            <div className="flex items-center gap-3 mb-4 text-amber-700">
              <AlertTriangle size={20} />
              <h3 className="font-black text-sm uppercase tracking-tight italic">Root Recovery</h3>
            </div>
            <p className="text-xs text-amber-900/70 font-medium leading-relaxed mb-6">
              In case of total frontend failure, use the physical server terminal to bypass authentication and reset root keys.
            </p>
            <a href="#" className="flex items-center gap-2 text-[10px] font-black text-amber-800 uppercase tracking-widest hover:underline">
              View Manual <ExternalLink size={12}/>
            </a>
          </div>

          {/* Technical Docs Link */}
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm group cursor-pointer hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                    <Wrench size={20} className="text-slate-400 group-hover:text-indigo-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-800">Knowledge Base</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase">API & Hardware Docs</p>
                 </div>
              </div>
              <ArrowRight size={18} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TechnicianSupport;
