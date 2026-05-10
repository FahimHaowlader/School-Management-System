import React, { useState } from 'react';
import { 
  User, Mail, Phone, Home, 
  Link, ShieldCheck, Key, 
  Briefcase, Heart, UserPlus,
  PlusCircle, X
} from 'lucide-react';

const PrincipalAddParent = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    relation: 'Father', // Father, Mother, Legal Guardian
    address: '',
    // Credentials
    username: '',
    password: '',
    // Student Linking
    linkedStudents: [] // Array of student IDs or names
  });

  const [studentInput, setStudentInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addStudentTag = () => {
    if (studentInput.trim() && !formData.linkedStudents.includes(studentInput)) {
      setFormData(prev => ({
        ...prev,
        linkedStudents: [...prev.linkedStudents, studentInput.trim()]
      }));
      setStudentInput("");
    }
  };

  const removeStudentTag = (name) => {
    setFormData(prev => ({
      ...prev,
      linkedStudents: prev.linkedStudents.filter(s => s !== name)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Parent Record:", formData);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Add New Parent/Guardian</h2>
        <p className="text-gray-500 font-medium mt-1">Register a guardian and link them to existing student records.</p>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: GUARDIAN PROFILE */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <User className="text-emerald-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Guardian Profile</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Relationship to Student</label>
              <select name="relation" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50 appearance-none" onChange={handleChange}>
                <option>Father</option>
                <option>Mother</option>
                <option>Legal Guardian</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input name="fullName" type="text" placeholder="e.g. Mr. Jahid Hossain" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input name="email" type="email" placeholder="guardian@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
              <input name="phone" type="text" placeholder="+880 1XXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50" onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Occupation</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={16} />
                <input name="occupation" type="text" placeholder="e.g. Software Engineer" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: STUDENT LINKING */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <Link className="text-emerald-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Linked Students</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStudentTag())}
                type="text" 
                placeholder="Search student name or ID..." 
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50"
              />
              <button 
                type="button"
                onClick={addStudentTag}
                className="px-6 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-colors"
              >
                Link
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.linkedStudents.length === 0 && (
                <p className="text-xs text-gray-400 italic">No students linked yet.</p>
              )}
              {formData.linkedStudents.map((student, index) => (
                <div key={index} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 text-sm font-bold">
                  {student}
                  <button onClick={() => removeStudentTag(student)} className="hover:text-red-500">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: SYSTEM ACCESS */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <ShieldCheck className="text-emerald-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Login Credentials</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Assigned Username</label>
              <input name="username" type="text" placeholder="parent.jahid" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Temporary Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-3.5 text-gray-400" size={16} />
                <input name="password" type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-12">
          <button type="button" className="px-8 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors">Cancel</button>
          <button type="submit" className="px-12 py-3 rounded-xl bg-emerald-600 text-white font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2">
            <UserPlus size={18} />
            Create Parent Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrincipalAddParent
