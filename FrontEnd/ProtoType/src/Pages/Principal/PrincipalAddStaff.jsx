import React, { useState } from 'react';
import { 
  User, Mail, Phone, Briefcase, 
  MapPin, FileText, ShieldAlert, 
  Upload, FileCheck, Landmark,
  GraduationCap, Hash
} from 'lucide-react';

const PrincipalAddStaff = () => {
  const [formData, setFormData] = useState({
    // Basic
    fullName: '',
    email: '',
    phone: '',
    staffId: '',
    // Position
    role: 'Librarian',
    positionTitle: '', // e.g., Senior Librarian
    department: 'Main Library',
    employmentType: 'Full-time', // Full-time, Part-time, Contract
    startDate: '',
    // Background
    address: '',
    qualification: '',
    // Documents & Finance
    nidFile: null,
    bankAccountName: '',
    bankAccountNumber: '',
    bankName: '',
    // Emergency
    emergencyContactName: '',
    emergencyRelationship: '',
    emergencyPhone: ''
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
    console.log("Submitting Comprehensive Staff Data:", formData);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Register Staff Member</h2>
        <p className="text-gray-500 font-medium mt-1">Complete all mandatory fields to create a new employment record.</p>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: PROFESSIONAL IDENTITY */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <Briefcase className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Job & Position</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Staff ID / Employee No</label>
              <div className="relative">
                <Hash className="absolute left-3 top-3.5 text-gray-400" size={16} />
                <input name="staffId" type="text" placeholder="EMP-2026-001" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Position Title</label>
              <input name="positionTitle" type="text" placeholder="e.g. Lead Librarian" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Employment Type</label>
              <select name="employmentType" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50 appearance-none" onChange={handleChange}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contractual</option>
                <option>Probation</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: PERSONAL & EDUCATION */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <User className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Personal & Background</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input name="fullName" type="text" placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                <GraduationCap size={14}/> Highest Qualification
              </label>
              <input name="qualification" type="text" placeholder="e.g. Masters in Library Science" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Contact Email</label>
              <input name="email" type="email" placeholder="jane.doe@school.edu" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Permanent Address</label>
              <textarea name="address" rows="2" placeholder="Street, City, State..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50 resize-none" onChange={handleChange}></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 3: BANK DETAILS (For Payroll) */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <Landmark className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Payroll / Bank Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Bank Name</label>
              <input name="bankName" type="text" placeholder="e.g. City Bank" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Account Holder Name</label>
              <input name="bankAccountName" type="text" placeholder="Exact name on card" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Account Number</label>
              <input name="bankAccountNumber" type="text" placeholder="0000 0000 0000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/50" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECTION 4: NID UPLOAD */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <FileCheck className="text-indigo-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Identity Documents</h3>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50/30 flex flex-col items-center">
            <Upload className="text-gray-400 mb-2" size={24} />
            <p className="text-sm font-bold text-gray-600 mb-4">Click to upload NID PDF</p>
            <input type="file" accept=".pdf" onChange={handleFileChange} className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white cursor-pointer" />
          </div>
        </div>

        {/* SECTION 5: EMERGENCY */}
        <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm ring-1 ring-red-50/50">
          <div className="flex items-center gap-2 mb-6 border-b border-red-50 pb-4">
            <ShieldAlert className="text-red-500" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Emergency Contact</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input name="emergencyContactName" type="text" placeholder="Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none bg-gray-50/50" onChange={handleChange} />
            <input name="emergencyRelationship" type="text" placeholder="Relationship" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none bg-gray-50/50" onChange={handleChange} />
            <input name="emergencyPhone" type="text" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none bg-gray-50/50" onChange={handleChange} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-12">
          <button type="button" className="px-8 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors">Cancel</button>
          <button type="submit" className="px-12 py-3 rounded-xl bg-indigo-600 text-white font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">Register Staff</button>
        </div>
      </form>
    </div>
  );
};

export default PrincipalAddStaff
