import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  LogOut, 
  ExternalLink,
  Phone,
  MapPin,
  ShieldCheck,
  Users,
  Star,
  Camera,
  Heart
} from 'lucide-react';


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
    <div className="flex min-h-screen w-full font-sans bg-gray-50 text-gray-900">
      
      {/* 1. SIDEBAR (Same as before) */}
      <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-100 p-6 flex flex-col justify-between sticky top-0 h-screen">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">P</div>
            <h1 className="text-xl font-black tracking-tight text-gray-900">ParentPortal</h1>
          </div>

          <nav className="flex flex-col gap-2">
            <NavItem icon={<User size={18}/>} label="Personal Info" active />
            <NavItem icon={<Users size={18}/>} label="Child Progress" />
            <NavItem icon={<Mail size={18}/>} label="Messages" />
            <NavItem icon={<ShieldCheck size={18}/>} label="Security" />
          </nav>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all font-bold text-sm">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* --- PROFILE HERO CARD (Teacher Profile Style) --- */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img 
                src={Pic} 
                alt="Parent Profile" 
                className="h-40 w-40 rounded-[2.5rem] object-cover border-4 border-white shadow-2xl"
              />
              <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2.5 rounded-2xl border-4 border-white shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{formData.fullName}</h1>
                <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">Verified Guardian</span>
              </div>
              <p className="text-gray-400 font-medium mt-2">Guardian of 2 Active Students</p>
              
              <div className="flex items-center gap-6 mt-6 justify-center md:justify-start">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <Heart size={18} fill="currentColor" />
                    <span className="font-black text-gray-900">Highly Active</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Engagement Level</span>
                </div>
                <div className="h-8 w-px bg-gray-100"></div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Users size={18} />
                    <span className="font-black text-gray-900">2 Children</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Registered</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px]">
               <button className="bg-gray-900 text-white px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-95">Edit Profile</button>
               <button className="bg-gray-50 text-gray-600 px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all">Download Report</button>
            </div>
          </div>

          {/* --- FORM SECTION --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-gray-900 mb-8">Personal Details</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" value={formData.fullName} icon={<User size={16}/>} />
                    <InputField label="Email Address" value={formData.email} icon={<Mail size={16}/>} />
                    <InputField label="Phone Number" value={formData.phone} icon={<Phone size={16}/>} />
                    <InputField label="Emergency Contact" value={formData.emergencyContact} icon={<Phone size={16}/>} />
                  </div>
                  <InputField label="Residential Address" value={formData.address} icon={<MapPin size={16}/>} />
                  <div className="flex justify-end pt-4">
                    <button type="submit" className="px-8 py-4 rounded-2xl text-sm font-black text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95">
                      Save All Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* --- CHILDREN COLUMN --- */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-black text-gray-900 px-2 flex items-center justify-between">
                My Children
                <span className="text-[10px] bg-gray-200 px-2 py-1 rounded-md uppercase">Current</span>
              </h2>
              {children.map((child, index) => (
                <div key={index} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all group">
                  <img className="h-16 w-16 rounded-[1.2rem] object-cover" src={child.image} alt={child.name} />
                  <div className="flex-grow">
                    <h3 className="font-black text-gray-900 text-sm leading-tight">{child.name}</h3>
                    <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase">{child.details}</p>
                  </div>
                  <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <ExternalLink size={16} />
                  </button>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 font-bold text-sm hover:border-blue-400 hover:text-blue-500 transition-all">
                + Add Another Child
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const NavItem = ({ icon, label, active = false }) => (
  <button className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 text-left ${
    active ? 'text-blue-600 bg-blue-50 font-black shadow-sm ring-1 ring-blue-100' : 'text-gray-500 hover:bg-gray-50 font-bold hover:text-gray-900'
  }`}>
    {icon} <span className="text-sm">{label}</span>
  </button>
);

const InputField = ({ label, value, icon }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">{icon}</div>
      <input 
        defaultValue={value}
        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-[1.2rem] text-sm text-gray-900 font-bold focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none"
      />
    </div>
  </div>
);

export default ParentProfile;