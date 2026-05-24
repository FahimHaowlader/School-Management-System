import React from "react";

const Profile = () => {
  // Mock parent data block for easy state integration
  const parentData = {
    name: "John Doe",
    parentId: "PRN-2026-89X",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Maple Street, Anytown, USA 12345",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1 (555) 765-4321",
      relation: "Spouse",
      email: "jane.doe@example.com"
    }
  };

  return (
    <div className="relative flex min-h-screen w-full font-sans text-slate-900 bg-slate-50/50">
      <main className="flex-1 ">
        <div className="">
          
          {/* Dashboard Grid Matrix */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            
            {/* Combined Profile Header Card */}
            <div className="col-span-1 xl:col-span-2">
              <div className="flex flex-col gap-y-5 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                  {/* Left Side: Profile Photo & Identification Metadata */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative flex-shrink-0 group cursor-pointer">
                      <div className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-sm bg-slate-200 overflow-hidden relative">
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiAldkvKy5hgXB0X4OS8x3xrWFH8VwD6NYW4qapCYJQ6peaXy2FTCPz8OSBZBrjOylN0rTMmQKJbSJvzTbu42fG-_VekZ_dkqUNVcHEt97uzkJf5FdJT3_cdeExOTimb1p_tzNK6SQ2hoplq6QQ-Wwp4vYVdOXyME_v00rzNjNOI4l_e9J0HXr2-BriduYOLnpVwmFhHIVjo0ZZ7m5amYWxY6ycl2VH1jnIiSigiWeaKuG3gcTMpqDcieJKnMy5nuG9oizJESvYOkH" 
                          alt="Parent Profile" 
                          className="w-full h-full object-cover"
                        />
                        {/* Change Photo Hover Overlay Trigger */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] text-white font-bold uppercase">Change</span>
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold text-slate-900">{parentData.name}</h3>
                      <p className="text-slate-500 text-sm font-medium">Account ID: {parentData.parentId}</p>
                      <div className="flex gap-2 mt-2 justify-center md:justify-start">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">Parent Account</span>
                        <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-100">Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Context Info Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 text-sm">
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Registered Children</p>
                      <p className="font-semibold mt-1 text-slate-900">2 Students</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Portal Access</p>
                      <p className="font-semibold mt-1 text-slate-900">Full Access</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Relationship</p>
                      <p className="font-semibold mt-1 text-slate-900">Primary Guardian</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information Module */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg text-slate-800">Personal Information</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 text-sm">
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Full Name</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize overflow-auto">{parentData.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Nationality</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">American</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Language Preference</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">English (US)</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Communication Channel</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">Email & SMS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details Module */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg text-slate-800">Contact Details</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 text-sm">
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold mt-1 text-slate-800 overflow-auto">{parentData.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">{parentData.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Residential Address</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">{parentData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact (Secondary) */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200 xl:col-span-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <h4 className="font-bold text-lg text-red-400">Emergency Contact (Secondary)</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-5 text-sm">
                  <div className="col-span-12 sm:col-span-5">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Full Name</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize overflow-auto">{parentData.emergencyContact.name}</p>
                  </div>
                  <div className="col-span-12 sm:col-span-7">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">{parentData.emergencyContact.phone}</p>
                  </div>
                  <div className="col-span-12 sm:col-span-5">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Relation</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">{parentData.emergencyContact.relation}</p>
                  </div>
                  <div className="col-span-12 sm:col-span-7">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold mt-1 text-slate-800 overflow-auto">{parentData.emergencyContact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Children Section with Modern Interactive Hovers */}
            <div className="col-span-1 xl:col-span-2 mt-4">
              <h2 className="text-slate-800 text-2xl font-bold leading-tight tracking-tight mb-4">My Children</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Child Card 1 */}
                <div className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
                  <div className="relative overflow-hidden rounded-full w-16 h-16 flex-shrink-0">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out" 
                      alt="Liam Doe" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCeaULitcgDmt1CRZGrnbMUaaMNnH4iBDI7fM-78cZvsmu3fekBHOn47gQq80KK1uOHFRfma86Xxbu213e3yV4mXDI3lHJvm94pWXQCfRUoVak_aIEeaSHIY6SnMQmmXr6WADnfPNLQO65k9asWkO71o5Zs2_T_6wQgpDvMyNZrbpxOKdxKi6-q3gmOnmb_AqhBrSZADUTgGXMXJm3IFgvjPzG6PLibrK95BmoSaW_yqhg8hpxrlPDer-T6W37N3gXwCWXThRac-fC"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-slate-900  transition-colors duration-200">Liam Doe</h3>
                    <p className="text-sm text-slate-500">Grade 2 - Mr. Smith</p>
                  </div>
                  <a className="text-slate-800 text-sm font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 group-hover:after:w-full after:bg-slate-800 after:transition-all after:duration-300 pb-0.5" href="#child-liam">
                    View Profile
                  </a>
                </div>
                {/* Child Card 2 */}
                <div className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
                  <div className="relative overflow-hidden rounded-full w-16 h-16 flex-shrink-0">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out" 
                      alt="Liam Doe" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCeaULitcgDmt1CRZGrnbMUaaMNnH4iBDI7fM-78cZvsmu3fekBHOn47gQq80KK1uOHFRfma86Xxbu213e3yV4mXDI3lHJvm94pWXQCfRUoVak_aIEeaSHIY6SnMQmmXr6WADnfPNLQO65k9asWkO71o5Zs2_T_6wQgpDvMyNZrbpxOKdxKi6-q3gmOnmb_AqhBrSZADUTgGXMXJm3IFgvjPzG6PLibrK95BmoSaW_yqhg8hpxrlPDer-T6W37N3gXwCWXThRac-fC"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-slate-900  transition-colors duration-200">Liam Doe</h3>
                    <p className="text-sm text-slate-500">Grade 2 - Mr. Smith</p>
                  </div>
                  <a className="text-slate-800 text-sm font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 group-hover:after:w-full after:bg-slate-800 after:transition-all after:duration-300 pb-0.5" href="#child-liam">
                    View Profile
                  </a>
                </div>

              </div>
            </div>

            {/* Account Settings / Security Section at Bottom */}
            <div className="col-span-1 xl:col-span-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                    🔑
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Account Security</h4>
                    <p className="text-slate-500 text-xs font-medium">Manage your portal access protection and configurations</p>
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