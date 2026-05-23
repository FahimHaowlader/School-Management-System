import React, { useState } from 'react';
import { 
  User, Mail, Phone, ShieldAlert, 
  Upload, CheckCircle2, ArrowRight, 
  Users, MapPin, Hash, Briefcase
} from 'lucide-react';

const TechnicianAddParent = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nidNumber: '',
    occupation: '',
    studentId: '', // Linking the student
    emergencyName: '',
    emergencyPhone: '',
    address: '',
    nidFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, nidFile: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent/Guardian Data (Technician Console):", formData);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: CORE IDENTITY */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-5">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <User size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Guardian Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Full Legal Name (NID)</label>
              <input name="fullName" type="text" placeholder="e.g. Mohammad Ali" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 flex items-center gap-1">
                <Hash size={14}/> NID Number
              </label>
              <input name="nidNumber" type="text" placeholder="199XXXXXXXXXX" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 flex items-center gap-1">
                <Mail size={14}/> Email Address
              </label>
              <input name="email" type="email" placeholder="parent@example.com" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 flex items-center gap-1">
                <Phone size={14}/> Phone Number
              </label>
              <input name="phone" type="tel" placeholder="+880 1XXX XXXXXX" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
            </div>
            <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 flex items-center gap-1">
                  <Briefcase size={14}/> Occupation
                </label>
                <input name="occupation" type="text" placeholder="e.g. Engineer, Teacher" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECTION 2: STUDENT LINKAGE */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-5">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Hash size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Student Connection</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Student ID (to link)</label>
              <input name="studentId" type="text" placeholder="S-2026-XXXX" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-gray-50/30 font-medium" onChange={handleChange} required />
            </div>
            <div className="md:col-span-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 flex items-center gap-1">
                  <MapPin size={14}/> Permanent Address
                </label>
                <input name="address" type="text" placeholder="House, Road, City" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECTION 3: EMERGENCY CONTACT */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-5">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
              <ShieldAlert size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Alternative Contact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Contact Name</label>
              <input name="emergencyName" type="text" placeholder="Second guardian name" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Emergency Phone</label>
              <input name="emergencyPhone" type="tel" placeholder="+880 1XXX XXXXXX" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECTION 4: DOCUMENT UPLOAD */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Upload size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Verifiable Documents</h3>
          </div>

          <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-12 bg-gray-50/10 flex flex-col items-center hover:border-indigo-400 hover:bg-indigo-50/10 transition-all group relative cursor-pointer">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform duration-500">
                <Upload className="text-slate-400 group-hover:text-indigo-600" size={32} />
            </div>
            <p className="text-sm font-bold text-slate-600">Parent NID Copy / Passport</p>
            <p className="text-xs text-slate-400 mb-6 mt-2 text-center max-w-xs">Upload a clear scan for student-parent verification.</p>
            
            <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            
            <div className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-200 group-hover:bg-indigo-600 transition-colors">
                Select File
            </div>

            {formData.nidFile && (
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 animate-in zoom-in">
                <CheckCircle2 size={16}/> {formData.nidFile.name}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-5 pt-4 pb-20">
          <button type="button" className="text-slate-400 font-bold hover:text-slate-600 transition-colors px-6 text-sm uppercase tracking-widest font-black">Discard</button>
          <button type="submit" className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 text-sm">
            Finalize Parent Account
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TechnicianAddParent;