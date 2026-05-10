import React, { useState } from 'react';
import { 
  Megaphone, Users, Clock, Send, 
  AlertCircle, FileText, Upload, 
  X, ChevronRight, MoreVertical,
  CheckCircle2
} from 'lucide-react';

const PrincipalAnnouncement = () => {
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    target: 'All',
    priority: 'Normal',
    attachment: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setAnnouncement({ ...announcement, attachment: file });
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const removeFile = () => setAnnouncement({ ...announcement, attachment: null });

  return (
    <div className=" animate-in fade-in duration-700">
      
      {/* Header */}
     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <form className="space-y-6">
              
              {/* Field 1: Title */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Announcement Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Annual Sports Week 2026 Guidelines"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all font-bold text-slate-800"
                  onChange={(e) => setAnnouncement({...announcement, title: e.target.value})}
                />
              </div>

              {/* Field 2 & 3: Target & Priority (Row) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Target Audience</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <select 
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 appearance-none font-medium text-slate-700"
                      onChange={(e) => setAnnouncement({...announcement, target: e.target.value})}
                    >
                      <option>All</option>
                      <option>Teachers</option>
                      <option>Students</option>
                      <option>Parents</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Priority Level</label>
                  <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-2xl">
                    {['Normal', 'High', 'Urgent'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setAnnouncement({...announcement, priority: level})}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${
                          announcement.priority === level 
                          ? level === 'Urgent' ? 'bg-rose-600 text-white shadow-lg shadow-rose-100' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Field 4: Message Content */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Message Content</label>
                <textarea 
                  rows="5"
                  placeholder="Draft your message here..."
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all resize-none text-slate-700 leading-relaxed"
                  onChange={(e) => setAnnouncement({...announcement, content: e.target.value})}
                ></textarea>
              </div>

              {/* Field 5: PDF Attachment Section */}
              <div className="pt-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Official Document (Optional PDF)</label>
                
                {!announcement.attachment ? (
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 group-hover:border-indigo-300 group-hover:bg-indigo-50/30 transition-all">
                      <Upload className="text-slate-300 group-hover:text-indigo-500 mb-2 transition-colors" size={24} />
                      <p className="text-xs font-bold text-slate-500 group-hover:text-indigo-600">Click to upload official PDF notice</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-sm">
                        <FileText size={18} />
                      </div>
                      <span className="text-sm font-bold text-indigo-900 truncate max-w-[200px]">{announcement.attachment.name}</span>
                    </div>
                    <button onClick={removeFile} className="p-1.5 hover:bg-rose-100 hover:text-rose-600 rounded-full text-indigo-300 transition-all">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Sync with Class Library</span>
                </div>
                <button type="button" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3">
                  Post Now
                  <Send size={18} />
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Sidebar Status/Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-sm font-black text-slate-900 mb-4 px-1 tracking-tight">Active Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-xs font-bold text-slate-500">Total Audience</span>
                <span className="text-xs font-black text-indigo-600">1,240 Users</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-xs font-bold text-slate-500">Delivery Status</span>
                <span className="text-xs font-black text-emerald-500">Instant</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[32px] text-white">
            <AlertCircle className="text-amber-400 mb-4" size={24} />
            <h4 className="font-bold text-sm mb-2">Institutional Logic</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Announcements tagged as <span className="text-white">Urgent</span> override DND settings on the parent mobile app. Use responsibly for school-wide alerts.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrincipalAnnouncement
