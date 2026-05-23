import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  ExternalLink,
  Phone,
  MapPin,
  Users,
  Camera,
  Heart,
  CreditCard,
  Bell,
  Download,
  Settings
} from 'lucide-react';
import Pic from '../../Assets/p.jpg';

const ParentProfile = () => {
  const [formData] = useState({
    fullName: "Fahim Haowlader Jahid",
    email: "fahim.jahid@example.com",
    phone: "+880 1234 567890",
    emergencyContact: "+880 1234 999999",
    address: "123 Green Road, Dhaka, Bangladesh"
  });

  const children = [
    {
      name: "Olivia Doe",
      details: "Grade 5 - Ms. Davison",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Liam Doe",
      details: "Grade 2 - Mr. Smith",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  return (
    <div className="flex w-full font-sans bg-gray-50 text-gray-900">
      <main className="flex-1 overflow-y-auto">
        <div className="space-y-8">
          
          {/* --- PROFILE HERO CARD --- */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 flex flex-col lg:flex-row items-center gap-8">
            <div className="relative">
              <img 
                src={Pic} 
                alt="Parent Profile" 
                className="h-40 w-40 rounded-[2.5rem] object-cover border-4 border-white shadow-2xl shadow-blue-100"
              />
              <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl border-4 border-white shadow-lg hover:bg-blue-700 hover:scale-110 transition-all">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{formData.fullName}</h1>
                <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mx-auto lg:mx-0 border border-blue-100">
                  Verified Guardian
                </span>
              </div>
              <p className="text-gray-400 font-bold mt-2 text-sm md:text-base tracking-tight">Guardian of 2 Active Students</p>
              
              <div className="flex items-center gap-8 mt-6 justify-center lg:justify-start">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <Heart size={18} fill="currentColor" />
                    <span className="font-black text-gray-900">Highly Active</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Engagement Level</span>
                </div>
                <div className="h-10 w-px bg-gray-100"></div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Users size={20} />
                    <span className="font-black text-gray-900">2 Children</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Registered</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-3 min-w-[240px] w-full lg:w-auto">
              <button className="group flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-200">
                <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                <span>Edit Profile</span>
              </button>

              <button 
                onClick={() => alert("Password Reset Triggered")}
                className="group flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-700 px-6 py-3.5 rounded-2xl font-black text-sm hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-95"
              >
                <div className="bg-rose-100 text-rose-600 p-1.5 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <Lock size={16} />
                </div>
                <span>Change Password</span>
              </button>
            </div>
          </div>

          {/* --- BOTTOM SECTION --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            
            {/* LEFT: FORM */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                   <User className="text-blue-600" size={22} /> Personal Details
                </h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" value={formData.fullName} icon={<User size={16}/>} />
                    <InputField label="Email Address" value={formData.email} icon={<Mail size={16}/>} />
                    <InputField label="Phone Number" value={formData.phone} icon={<Phone size={16}/>} />
                    <InputField label="Emergency Contact" value={formData.emergencyContact} icon={<Phone size={16}/>} />
                  </div>
                  <InputField label="Residential Address" value={formData.address} icon={<MapPin size={16}/>} />
                  <div className="flex justify-end pt-4">
                    <button type="submit" className="px-10 py-4 rounded-2xl text-sm font-black text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT: CHILDREN & QUICK ACTIONS */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-black text-gray-900 px-2 flex items-center justify-between">
                My Children
                <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-lg uppercase font-black">Active</span>
              </h2>
              
              <div className="space-y-4">
                {children.map((child, index) => (
                  <div key={index} className="bg-white p-4 rounded-[2rem] border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:shadow-gray-200/40 transition-all group border-b-4 border-b-transparent hover:border-b-blue-600">
                    <img className="h-14 w-14 rounded-[1.2rem] object-cover shadow-sm" src={child.image} alt={child.name} />
                    <div className="flex-grow">
                      <h3 className="font-black text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">{child.name}</h3>
                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{child.details}</p>
                    </div>
                    <button className="w-9 h-9 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// --- REFINED SUB-COMPONENTS ---

const InputField = ({ label, value, icon }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
        {icon}
      </div>
      <input 
        defaultValue={value}
        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-[1.2rem] text-sm text-gray-900 font-bold focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-200 transition-all outline-none shadow-inner"
      />
    </div>
  </div>
);

const QuickIconButton = ({ icon, color }) => (
  <button className={`flex-1 flex justify-center py-3 rounded-2xl ${color} hover:scale-105 active:scale-95 transition-all shadow-sm border border-transparent hover:border-current/10`}>
    {icon}
  </button>
);

export default ParentProfile;