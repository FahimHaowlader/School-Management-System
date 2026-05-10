import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Users, 
  Trophy, Plus, Image as ImageIcon, 
  ChevronRight, Star, ArrowRight, X,
  FileText, Upload, CheckCircle2
} from 'lucide-react';

const PrincipalEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'Academic',
    description: '',
    eventDoc: null
  });

  const categories = [
    { name: 'Academic', icon: <Calendar size={14}/> },
    { name: 'Sports', icon: <Trophy size={14}/> },
    { name: 'Cultural', icon: <Star size={14}/> },
    { name: 'Holiday', icon: <Clock size={14}/> }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setEventData(prev => ({ ...prev, eventDoc: file }));
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const removeFile = () => setEventData(prev => ({ ...prev, eventDoc: null }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" animate-in fade-in duration-500">
      
      {/* Header */}
      {/* <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Campus Events</h1>
          <p className="text-slate-500 font-medium mt-1">Schedule and manage school-wide activities.</p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Event Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8 pb-5 border-b border-slate-50">
              <div className="p-2 bg-indigo-600 rounded-xl text-white">
                <Plus size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Create New Event</h2>
            </div>

            <form className="space-y-8">
              {/* Event Title */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Event Name</label>
                <input 
                  name="title"
                  type="text" 
                  placeholder="e.g. Science Fair 2026"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all font-bold text-slate-800"
                  onChange={handleChange}
                />
              </div>

              {/* Category Picker */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Event Category</label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setEventData({...eventData, category: cat.name})}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                        eventData.category === cat.name 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {cat.icon}
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input name="date" type="date" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 font-medium" onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input name="startTime" type="time" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 font-medium" onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input name="location" type="text" placeholder="Main Hall" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 font-medium" onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Event Description</label>
                <textarea rows="4" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all resize-none text-slate-700" placeholder="Details about the agenda..."></textarea>
              </div>

              {/* PDF ATTACHMENT SECTION */}
              <div className="pt-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Event Resources (PDF)</label>
                
                {!eventData.eventDoc ? (
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 group-hover:border-indigo-300 group-hover:bg-indigo-50/30 transition-all">
                      <Upload className="text-slate-300 group-hover:text-indigo-500 mb-2 transition-colors" size={24} />
                      <p className="text-xs font-bold text-slate-500 group-hover:text-indigo-600 text-center">
                        Upload Event Routine / Rules (PDF)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-sm">
                        <FileText size={18} />
                      </div>
                      <span className="text-sm font-bold text-indigo-900 truncate max-w-[200px]">{eventData.eventDoc.name}</span>
                    </div>
                    <button onClick={removeFile} type="button" className="p-1.5 hover:bg-rose-100 hover:text-rose-600 rounded-full text-indigo-300 transition-all">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <CheckCircle2 size={16} className="text-indigo-500"/>
                  Auto-sync with Calendar
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3">
                  Create Event
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Upcoming Preview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 px-1">Active Timeline</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                <div className="bg-white h-12 w-12 rounded-xl flex flex-col items-center justify-center border border-slate-100">
                   <span className="text-[10px] font-bold text-indigo-600">MAY</span>
                   <span className="text-sm font-black">25</span>
                </div>
                <div>
                   <h4 className="text-sm font-bold text-slate-800">Exam Prep Week</h4>
                   <p className="text-[10px] font-bold text-slate-400">Main Campus</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[32px] text-white">
            <Trophy className="text-amber-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Event Highlights</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-medium mb-6">
              Scheduled events are automatically published to student dashboards and the class resource library.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrincipalEvent
