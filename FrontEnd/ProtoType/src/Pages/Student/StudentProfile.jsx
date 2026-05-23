import React from 'react';
// Importing specific icons from react-icons
import { 
  HiOutlineUser, 
  HiOutlineBookOpen, 
  HiOutlineAcademicCap, 
  HiOutlineLogout,
  HiOutlineBell,
  HiOutlineLockOpen
} from "react-icons/hi";
import { 
  MdOutlineDashboard, 
  MdOutlineSettings, 
  MdEdit,
  MdOutlineMail,
  MdOutlinePhone,
  MdOutlineLocationOn
} from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";

const StudentProfile = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-slate-900">
      
      {/* Sidebar */}
      {/* <aside className="sticky top-0 h-screen w-64 bg-white p-4 shadow-sm hidden lg:flex flex-col border-r border-gray-200">
        <div className="flex flex-col gap-4 flex-grow">
          <div className="flex items-center gap-3 p-2 text-blue-600">
            <HiOutlineAcademicCap size={32} />
            <h1 className="text-xl font-bold text-slate-800">UniPortal</h1>
          </div>

          <div className="flex items-center gap-3 mt-6 p-2 bg-gray-50 rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" 
              alt="Alex" 
              className="rounded-full size-12 object-cover border-2 border-white shadow-sm"
            />
            <div className="flex flex-col">
              <h1 className="text-sm font-bold">Alex Johnson</h1>
              <p className="text-gray-500 text-xs">ID: 91008236</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 mt-6">
            <SidebarLink icon={<MdOutlineDashboard size={22}/>} label="Dashboard" />
            <SidebarLink icon={<HiOutlineBookOpen size={22}/>} label="Courses" />
            <SidebarLink icon={<HiOutlineUser size={22}/>} label="Grades" />
            <SidebarLink icon={<HiOutlineUser size={22}/>} label="Profile" active />
          </nav>
        </div>

        <div className="flex flex-col gap-1 border-t pt-4">
          <SidebarLink icon={<MdOutlineSettings size={22}/>} label="Settings" />
          <SidebarLink icon={<HiOutlineLogout size={22}/>} label="Logout" />
        </div>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 pb-4 ">
        <div className="">
          
          {/* <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm">
            <span>Home</span> <span>/</span> <span className="text-gray-600 font-medium">Student Profile</span>
          </div> */}

          {/* <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Student Profile</h1>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">
              <MdEdit size={18} />
              Edit Profile
            </button>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Personal Info */}
            <Card title="Personal Information">
              <DataRow label="Full Name" value="Alex Johnson" />
              <DataRow label="Date of Birth" value="August 15, 2002" />
              <DataRow label="Gender" value="Male" />
              <DataRow label="Nationality" value="Canadian" />
            </Card>

            {/* Contact Details */}
            <Card title="Contact Details">
              <DataRow label="Email" value="alex.j@university.edu" />
              <DataRow label="Phone" value="+1 (123) 456-7890" />
              <div className="col-span-2">
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Mailing Address</p>
                <p className="font-medium mt-0.5">123 University Ave, Toronto, ON, Canada</p>
              </div>
            </Card>

            {/* Parent Info - Full Width */}
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-6 border-b pb-3">Parent / Guardian Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
                    <BiMaleFemale size={18}/> Father's Info
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <DataRow label="Name" value="Robert Johnson" />
                    <DataRow label="Phone" value="+1 (555) 012-3456" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase">
                    <BiMaleFemale size={18}/> Mother's Info
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <DataRow label="Name" value="Maria Johnson" />
                    <DataRow label="Phone" value="+1 (555) 098-7654" />
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Program */}
            <Card title="Academic Program">
              <DataRow label="Program" value="B.Sc. Computer Science" />
              <DataRow label="Enrollment" value="Sept 2021" />
            </Card>

            {/* Account Settings */}
            <Card title="Account Settings">
              <div className="flex flex-col gap-3 col-span-2 mt-2">
                <button className="flex items-center gap-3 w-full p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm font-semibold border border-gray-100">
                  <HiOutlineLockOpen className="text-blue-600" size={20}/> Change Password
                </button>
                <button className="flex items-center gap-3 w-full p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm font-semibold border border-gray-100">
                  <HiOutlineBell className="text-blue-600" size={20}/> Manage Notifications
                </button>
              </div>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Helper Components for Cleanliness --- */

const SidebarLink = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
    active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-red-900 hover:bg-gray-50 hover:text-gray-800'
  }`}>
    {icon}
    <span className="text-sm">{label}</span>
  </a>
);

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
    <h3 className="text-lg font-bold mb-5 border-b pb-3 text-slate-800">{title}</h3>
    <div className="grid grid-cols-2 gap-y-5 gap-x-4">
      {children}
    </div>
  </div>
);

const DataRow = ({ label, value }) => (
  <div>
    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{label}</p>
    <p className="font-semibold mt-0.5 text-slate-700">{value}</p>
  </div>
);

export default StudentProfile;