import React from "react";

//import local components
import GuardianCard from "../../Components/GuardianCard";

const Profile = () => {
  return (
    <div className="relative flex min-h-screen w-full font-san text-slate-900 ">
      <main className="flex-1">
        <div className="">
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            
            {/* Combined Profile & Academic Section */}
            <div className="col-span-1 xl:col-span-2">
              <div className="flex flex-col gap-y-5 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                  {/* Left Side: Profile Pic & Name */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative flex-shrink-0 group cursor-pointer">
                      <div className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-sm bg-slate-200 overflow-hidden relative">
                        <img 
                          src="https://via.placeholder.com/150" 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                        {/* Change Photo Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] text-white font-bold uppercase">Change</span>
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold text-slate-900">Fahim Haowlader</h3>
                      <p className="text-slate-500 text-sm font-medium">Student ID: 2021331XXX</p>
                      <div className="flex gap-2 mt-2 justify-center md:justify-start">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">Active</span>
                        <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-100">Regular</span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-5 text-sm">
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Program</p>
                      <p className="font-semibold mt-1 text-slate-900">B.Sc. in CSE</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Faculty</p>
                      <p className="font-semibold mt-1 text-slate-900">Science & Tech</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Session</p>
                      <p className="font-semibold mt-1 text-slate-900">2021-22</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Semester</p>
                      <p className="font-semibold mt-1 text-slate-900">6th</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Section</p>
                      <p className="font-semibold mt-1 text-slate-900">A</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">CGPA</p>
                      <p className="font-semibold mt-1 text-slate-900">3.XX</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg text-slate-800">Personal Information</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 text-sm">
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Full Name</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize overflow-auto">Fahim Haowlader</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Date Of Birth</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">01 Jan 2000</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Gender</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">Male</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Nationality</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize overflow-auto">{"Bangladeshi"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg text-slate-800">Contact Details</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 text-sm">
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold mt-1 text-slate-800 overflow-auto">fahim@example.com</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">+8801XXXXXXXXX</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Address</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">Sylhet, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Information Section */}
            <GuardianCard
              guardian={{
                relation: "father",
                name: "Ahmed Haowlader",
                phone: "+8801...",
                email: "ahmed@example.com",
              }}
            />
            <GuardianCard
              guardian={{
                relation: "mother",
                name: "Maria Begum",
                phone: "+8801...",
                email: "maria@example.com",
              }}
            />
            <GuardianCard
              guardian={{
                relation: "mother",
                name: "Maria Begum",
                phone: "+8801...",
                email: "maria@example.com",
              }}
            />

            {/* Emergency Contact */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <h4 className="font-bold text-lg text-red-400">Emergency Contact</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-5 text-sm">
                  <div className="col-span-5">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Full Name</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize overflow-auto">Jahid Hassan</p>
                  </div>
                  <div className="col-span-7">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">+880 1555-XXX</p>
                  </div>
                  <div className="col-span-5">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Relation</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">Brother</p>
                  </div>
                  <div className="col-span-7">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold mt-1 text-slate-800 overflow-auto">{"jahid@example.com"}</p>
                  </div>
                  <div className="col-span-12">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Address</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">Sylhet, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- NEW SECURITY SECTION AT BOTTOM --- */}
            <div className="col-span-1 xl:col-span-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                    🔑
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Account Security</h4>
                    <p className="text-slate-500 text-xs font-medium">Manage your account protection and password settings</p>
                  </div>
                </div>
                <button className="w-full md:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm">
                  Change Password
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;