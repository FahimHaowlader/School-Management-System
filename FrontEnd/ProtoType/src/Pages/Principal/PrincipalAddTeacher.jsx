import React, { useState } from 'react';
import { 
  User, Mail, Phone, GraduationCap, 
  Building2, Briefcase, ShieldAlert, 
  MapPin, Upload, CheckCircle2, ArrowRight
} from 'lucide-react';

const PrincipalAddTeacher = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nidNumber: '',
    department: '',
    position: '',
    emergencyName: '',
    emergencyPhone: '',
    address: '',
    qualifications: '',
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
    console.log("Teacher Profile Data:", formData);
  };

  return (
    <div className="min-h-screen font-sans animate-in fade-in duration-700">
      {/* Header */}
      {/* <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add Teacher Profile</h1>
          <p className="text-slate-500 font-medium mt-1">Create an official employment record for the department.</p>
        </div>
        <div className="hidden md:block">
            <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100">
                Staff Registration
            </span>
        </div>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: CORE IDENTITY */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-50 pb-5">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <User size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Basic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Full Name (As per NID)</label>
              <input name="fullName" type="text" placeholder="e.g. Dr. Fahim Jahi" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all placeholder:text-slate-300" onChange={handleChange} required />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">NID / Passport No.</label>
              <input name="nidNumber" type="text" placeholder="199XXXXXXXXXX" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all placeholder:text-slate-300" onChange={handleChange} required />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Official Email</label>
              <input name="email" type="email" placeholder="name@school.edu.bd" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all placeholder:text-slate-300" onChange={handleChange} />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Mobile Number</label>
              <input name="phone" type="tel" placeholder="+880 1XXX XXXXXX" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all placeholder:text-slate-300" onChange={handleChange} />
            </div>
            <div className="md:col-span-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Personal Address</label>
                <input name="address" type="text" placeholder="House, Road, City" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50/30 transition-all placeholder:text-slate-300" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECTION 2: POSITION & DEPARTMENT */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-50 pb-5">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Building2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Employment Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Department</label>
              <select name="department" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50/30 appearance-none" onChange={handleChange}>
                <option value="">Select Department</option>
                <option>Science & Technology</option>
                <option>Business Studies</option>
                <option>Arts & Humanities</option>
                <option>Administration</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Position / Rank</label>
              <select name="position" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50/30 appearance-none" onChange={handleChange}>
                <option value="">Select Position</option>
                <option>Assistant Teacher</option>
                <option>Senior Teacher</option>
                <option>Head of Department</option>
                <option>Lecturer</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: EMERGENCY CONTACT */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-50 pb-5">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
              <ShieldAlert size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Emergency Contact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Contact Name</label>
              <input name="emergencyName" type="text" placeholder="Name of family member" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none bg-slate-50/30 transition-all placeholder:text-slate-300" onChange={handleChange} />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Emergency Phone</label>
              <input name="emergencyPhone" type="tel" placeholder="+880 1XXX XXXXXX" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none bg-slate-50/30 transition-all placeholder:text-slate-300" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECTION 4: DOCUMENT UPLOAD */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Upload size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Verifiable Documents</h3>
          </div>

          <div className="border-2 border-dashed border-slate-100 rounded-[24px] p-10 bg-slate-50/20 flex flex-col items-center hover:border-indigo-300 transition-all group">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <Upload className="text-slate-400 group-hover:text-indigo-500" size={32} />
            </div>
            <p className="text-sm font-bold text-slate-600">NID Copy / Appointment Letter</p>
            <p className="text-xs text-slate-400 mb-6 mt-1 text-center max-w-xs">Please upload a clear PDF or scanned JPG image for verification.</p>
            
            <input type="file" onChange={handleFileChange} className="text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:bg-slate-900 file:text-white file:font-bold cursor-pointer" />
            
            {formData.nidFile && (
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                <CheckCircle2 size={16}/> {formData.nidFile.name}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-5 pt-4 pb-20">
          <button type="button" className="text-slate-400 font-bold hover:text-slate-600 transition-colors px-6">Discard</button>
          <button type="submit" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3">
            Save Teacher Profile
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrincipalAddTeacher
