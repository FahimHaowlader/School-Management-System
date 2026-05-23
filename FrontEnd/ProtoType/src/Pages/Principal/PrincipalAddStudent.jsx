import React, { useState } from 'react';
import { 
  User, Hash, Calendar, School, 
  Users, Mail, Phone, HeartPulse, 
  MapPin, Upload, FileCheck, CheckCircle2 
} from 'lucide-react';

const PrincipalAddStudent = () => {
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
    console.log("Enrolling Student:", formData);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      {/* <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Add New Student</h2>
        <p className="text-gray-500 font-medium mt-1">Enroll a new student and link their guardian contact details.</p>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: STUDENT INFORMATION */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <School className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Academic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input name="fullName" type="text" placeholder="e.g. Jane Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                <Hash size={14}/> Student ID
              </label>
              <input name="studentId" type="text" placeholder="S-2026-001" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                <Calendar size={14}/> Date of Birth
              </label>
              <input name="dob" type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Class / Grade</label>
              <select name="grade" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50 appearance-none" onChange={handleChange}>
                <option value="">Select Grade</option>
                <option>Grade 1</option>
                <option>Grade 2</option>
                <option>Grade 3</option>
                <option>Grade 10</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Section</label>
              <select name="section" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50 appearance-none" onChange={handleChange}>
                <option value="">Select Section</option>
                <option>A (Morning)</option>
                <option>B (Day)</option>
                <option>C (Evening)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                <MapPin size={14}/> Permanent Address
              </label>
              <textarea name="address" rows="2" placeholder="Enter current residential address..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50 resize-none" onChange={handleChange}></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 2: PARENT/GUARDIAN CONTACT */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <Users className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Guardian Contact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Guardian Full Name</label>
              <input name="parentName" type="text" placeholder="e.g. John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                <Phone size={14}/> Phone Number
              </label>
              <input name="parentPhone" type="tel" placeholder="+880 1XXX XXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                <Mail size={14}/> Email Address
              </label>
              <input name="parentEmail" type="email" placeholder="parent@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* SECTION 3: DOCUMENTS & HEALTH */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <FileCheck className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Health & Documentation</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                <HeartPulse size={14}/> Health Notes & Special Requirements
              </label>
              <textarea name="healthNotes" rows="3" placeholder="e.g. Allergic to peanuts. Requires an inhaler." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50 resize-none" onChange={handleChange}></textarea>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50/30 flex flex-col items-center group hover:border-indigo-300 transition-colors">
              <Upload className="text-gray-400 group-hover:text-indigo-500 mb-2 transition-colors" size={24} />
              <p className="text-sm font-bold text-gray-600 mb-4">Birth Certificate or NID (PDF)</p>
              <input type="file" accept=".pdf" onChange={handleFileChange} className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white cursor-pointer" />
              {formData.birthCertFile && (
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-green-600">
                  <CheckCircle2 size={14}/> {formData.birthCertFile.name}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-12">
          <button type="button" className="px-8 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-12 py-3 rounded-xl bg-indigo-600 text-white font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2">
            Enroll Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrincipalAddStudent
