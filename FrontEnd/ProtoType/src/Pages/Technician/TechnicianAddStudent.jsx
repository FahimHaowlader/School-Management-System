import React, { useState } from 'react';
import { 
  User, Hash, Calendar, School, 
  Users, Mail, Phone, HeartPulse, 
  MapPin, Upload, FileCheck, CheckCircle2,
  UserPlus
} from 'lucide-react';

const TechnicianAddStudent = () => {
  const [formData, setFormData] = useState({
    // Student Info
    fullName: '',
    studentId: '',
    dob: '',
    grade: '',
    section: '',
    address: '',
    // Guardian Info
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    // Health/Docs
    healthNotes: '',
    birthCertFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, birthCertFile: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically connect to your MERN backend (Mongoose/Express)
    console.log("Enrolling Student via Tech Console:", formData);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
     

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: STUDENT INFORMATION */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-5">
            <School className="text-indigo-600" size={20} />
            <h3 className="text-lg font-black text-gray-800 tracking-tight uppercase italic">Academic Profile</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Full Legal Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="fullName" type="text" placeholder="e.g. Fahim Jahi" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1">
                <Hash size={14}/> Unique Student ID
              </label>
              <input name="studentId" type="text" placeholder="S-2026-XXXX" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1">
                <Calendar size={14}/> Date of Birth
              </label>
              <input name="dob" type="date" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Class / Grade Assignment</label>
              <select name="grade" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium appearance-none" onChange={handleChange}>
                <option value="">Select Grade</option>
                <option>Class 1</option>
                <option>Class 5</option>
                <option>Class 10 (Science)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Section Assignment</label>
              <select name="section" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium appearance-none" onChange={handleChange}>
                <option value="">Select Shift</option>
                <option>Morning (A)</option>
                <option>Day (B)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1">
                <MapPin size={14}/> Current Address
              </label>
              <textarea name="address" rows="2" placeholder="Street, City, Postcode..." className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all resize-none font-medium" onChange={handleChange}></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 2: PARENT/GUARDIAN CONTACT */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-5">
            <Users className="text-indigo-600" size={20} />
            <h3 className="text-lg font-black text-gray-800 tracking-tight uppercase italic">Guardian Linkage</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Guardian Full Name</label>
              <input name="parentName" type="text" placeholder="e.g. John Doe" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1">
                <Phone size={14}/> Contact Number
              </label>
              <input name="parentPhone" type="tel" placeholder="+880 1XXX-XXXXXX" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1">
                <Mail size={14}/> Primary Email Address
              </label>
              <input name="parentEmail" type="email" placeholder="guardian@mail.com" className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all font-medium" onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* SECTION 3: DOCUMENTS & HEALTH */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-5">
            <FileCheck className="text-indigo-600" size={20} />
            <h3 className="text-lg font-black text-gray-800 tracking-tight uppercase italic">Digital Archive</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1">
                <HeartPulse size={14}/> Medical Disclosures
              </label>
              <textarea name="healthNotes" rows="3" placeholder="Blood group, allergies, or chronic conditions..." className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-gray-50/30 transition-all resize-none font-medium" onChange={handleChange}></textarea>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-10 bg-gray-50/30 flex flex-col items-center group hover:border-indigo-400 hover:bg-indigo-50/10 transition-all cursor-pointer relative overflow-hidden">
              <Upload className="text-gray-400 group-hover:text-indigo-600 mb-3 transition-transform group-hover:-translate-y-1 duration-300" size={32} />
              <p className="text-sm font-black text-gray-700 mb-1">Upload Digital Credentials</p>
              <p className="text-xs font-bold text-gray-400 mb-5 text-center">Accepted format: PDF (Max 5MB)<br/>(Birth Cert / NID / Previous Transcript)</p>
              
              <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              
              <button type="button" className="px-6 py-2 bg-white border border-gray-200 rounded-full text-xs font-black text-indigo-600 shadow-sm group-hover:shadow-indigo-100 transition-all">
                Select File
              </button>

              {formData.birthCertFile && (
                <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={14}/> {formData.birthCertFile.name}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-5 pt-4 pb-20">
          <button type="button" className="px-8 py-4 rounded-2xl text-gray-400 font-black hover:text-gray-600 hover:bg-gray-100 transition-all text-sm uppercase tracking-widest">
            Clear Form
          </button>
          <button type="submit" className="px-14 py-4 rounded-2xl bg-indigo-600 text-white font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 text-sm uppercase tracking-widest">
            <UserPlus size={18} />
            Finalize Enrollment
          </button>
        </div>
      </form>
    </div>
  );
};

export default TechnicianAddStudent;