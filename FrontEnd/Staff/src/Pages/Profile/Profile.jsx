import React from "react";

const Profile = () => {
  // Mock teacher data structure matching the layout fields
  const teacherData = {
    name: "Dr. Eleanor Vance",
    facultyId: "T-2014331XXX",
    avatar: "https://via.placeholder.com/150",
    academic: {
      designation: "Associate Professor",
      department: "Physics",
      faculty: "Science & Tech",
      joiningSession: "2013-14",
      roomNo: "Phy-402",
      status: "Active",
      type: "Permanent"
    },
    personal: {
      fullName: "Eleanor Vance",
      dob: "14 Oct 1985",
      gender: "Female",
      nationality: "Bangladeshi",
      bloodGroup: "O+"
    },
    contact: {
      email: "eleanor.vance@schoolms.edu",
      phone: "+8801XXXXXXXXX",
      address: "Sylhet, Bangladesh"
    },
    emergency: {
      name: "Thomas Vance",
      phone: "+880 1552-XXX",
      relation: "Spouse",
      email: "thomas.v@example.com",
      address: "Sylhet, Bangladesh"
    },
    about: "Passionate and dedicated teacher with a strong commitment to inspiring and empowering students through engaging, creative, and personalized learning experiences. Skilled in fostering a positive classroom environment that encourages curiosity and critical thinking.",
    qualifications: [
      { title: "Ph.D. in Astrophysics", detail: "Stellar University, 2012" },
      { title: "M.Sc. in Physics", detail: "Quantum College, 2008" },
      { title: "Certified Physics Educator", detail: "National Board of Education, 2009" }
    ],
    professionalDevelopment: [
      "Advanced Teaching Methodologies Workshop",
      "Digital Classroom Integration Course",
      "Student-Centered Learning Conference"
    ],
    history: [
      {
        role: "Lead Physics Teacher",
        institution: "Northwood High School",
        period: "2015 - Present",
        points: [
          "Developed AP Physics curriculum, resulting in a 15% increase in exam pass rates.",
          "Mentored the school's science club, achieving first place in the state science olympiad."
        ]
      }
    ]
  };

  return (
    <div className="relative flex min-h-screen w-full font-sans text-slate-900">
      <main className="flex-1">
        <div>
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            
            {/* Combined Profile & Academic Section */}
       <div className="col-span-1 xl:col-span-2">
  <div className="flex flex-col gap-y-5 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
    
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
      {/* Left Side: Profile Pic & Name */}
      <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto flex-shrink-0">
        <div className="relative flex-shrink-0 group cursor-pointer">
          <div className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-sm bg-slate-200 overflow-hidden relative">
            <img 
              src={teacherData.avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] text-white font-bold uppercase">Change</span>
            </div>
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-slate-900">{teacherData.name}</h3>
          <p className="text-slate-500 text-sm font-medium">Faculty ID: {teacherData.facultyId}</p>
          <div className="flex gap-2 mt-2 justify-center md:justify-start">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">{teacherData.academic.status}</span>
            <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-100">{teacherData.academic.type}</span>
          </div>
        </div>
      </div>

      {/* Right Side: Sectioned Grid with 2 Vertical Elements Each */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 text-sm w-full lg:flex-1 lg:justify-end">
        
        {/* Section 1: Academic Basics */}
        <div className="flex flex-col gap-y-4">
          <div>
            <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Designation</p>
            <p className="font-semibold mt-1 text-slate-900">{teacherData.academic.designation}</p>
          </div>
          <div>
            <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Subject</p>
            <p className="font-semibold mt-1 text-slate-900">{teacherData.academic.subject || "Physics"}</p>
          </div>
        </div>

        {/* Section 2: Timing & Connection */}
        <div className="flex flex-col gap-y-4">
          <div>
            <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Joining Year</p>
            <p className="font-semibold mt-1 text-slate-900">
              {teacherData.academic.joiningYear || teacherData.academic.joiningSession.split("-")[0]}
            </p>
          </div>
          <div>
            <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Mobile Number</p>
            <p className="font-semibold mt-1 text-slate-900 whitespace-nowrap">{teacherData.contact.phone}</p>
          </div>
        </div>

        {/* Section 3: Primary Point of Contact (Dedicated space for long items) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-y-4 min-w-0">
          <div>
            <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
            <p className="font-semibold mt-1 text-slate-900 break-all lg:break-words leading-relaxed">
              {teacherData.contact.email}
            </p>
          </div>
          {/* Leaving room for a second vertical element in this block if needed later, e.g., Alternative Email or Website */}
          <div>
            <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Workplace Room</p>
            <p className="font-semibold mt-1 text-slate-900">Room 402</p>
          </div>
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
                    <p className="font-semibold mt-1 text-slate-800 capitalize overflow-auto">{teacherData.personal.fullName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Date Of Birth</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">{teacherData.personal.dob}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Gender</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">{teacherData.personal.gender}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Nationality</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize overflow-auto">{teacherData.personal.nationality}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Blood Group</p>
                    <p className="font-semibold mt-1 text-slate-800 uppercase">{teacherData.personal.bloodGroup}</p>
                  </div>
                </div>
              </div>
            </div>

       {/* Contact Details */} {/* This section can be moved up or down as needed, currently placed at the end for better flow */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg text-slate-800">Contact Details</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 text-sm">
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold mt-1 text-slate-800 overflow-auto">{teacherData.contact.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">{teacherData.contact.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Address</p>
                    <p className="font-semibold mt-1 text-slate-800 capitalize">{teacherData.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Emergency Contact */}
<div className="col-span-1 xl:col-span-2 flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
  <div className="flex flex-col gap-4">
    <div className="flex items-center">
      <h4 className="font-bold text-lg text-red-500 tracking-wide">Emergency Contact</h4>
    </div>
    
    {/* Optimized grid layout for full-width horizontal scanning */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-sm">
      <div>
        <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Full Name</p>
        <p className="font-semibold mt-1 text-slate-800 capitalize overflow-auto">{teacherData.emergency.name}</p>
      </div>
      
      <div>
        <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Relation</p>
        <p className="font-semibold mt-1 text-slate-800 capitalize">{teacherData.emergency.relation}</p>
      </div>
      
      <div>
        <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
        <p className="font-semibold mt-1 text-slate-800 capitalize whitespace-nowrap">{teacherData.emergency.phone}</p>
      </div>
      
      <div className="min-w-0">
        <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
        <p className="font-semibold mt-1 text-slate-800 break-all lg:break-words">{teacherData.emergency.email}</p>
      </div>
      
      <div className="col-span-1 sm:col-span-2 md:col-span-4 border-t border-slate-100 pt-4">
        <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Address</p>
        <p className="font-semibold mt-1 text-slate-800 capitalize">{teacherData.emergency.address}</p>
      </div>
    </div>
  </div>
</div>

            {/* About Me */}
            <div className="col-span-1 xl:col-span-2 flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <h4 className="font-bold text-lg text-slate-800">About Me</h4>
              <p className="text-sm leading-relaxed text-slate-600 text-justify">{teacherData.about}</p>
            </div>

            {/* Academic Qualifications */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <h4 className="font-bold text-lg text-slate-800">Academic Qualifications</h4>
              <div className="flex flex-col gap-y-4">
                {teacherData.qualifications.map((item, index) => (
                  <div key={index} className="text-sm border-l-2 border-blue-100 pl-3 py-0.5">
                    <h5 className="font-semibold text-slate-900 leading-snug">{item.title}</h5>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Development */}
            <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <h4 className="font-bold text-lg text-slate-800">Professional Development</h4>
              <div className="flex flex-col gap-y-3">
                {teacherData.professionalDevelopment.map((item, index) => (
                  <div key={index} className="text-sm border-l-2 border-slate-200 pl-3 py-0.5">
                    <p className="font-semibold text-slate-800 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching History */}
            <div className="col-span-1 xl:col-span-2 flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
              <h4 className="font-bold text-lg text-slate-800">Teaching History</h4>
              <div className="flex flex-col gap-y-5">
                {teacherData.history.map((job, index) => (
                  <div key={index} className="flex flex-col text-sm">
                    <div className="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:justify-between">
                      <h5 className="font-bold tracking-tight text-slate-900">{job.role}</h5>
                      <span className="inline-flex items-center rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 w-fit">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-blue-700 mt-0.5">{job.institution}</p>
                    <ul className="mt-3 list-disc list-inside space-y-1.5 pl-0.5 text-xs leading-relaxed text-slate-600">
                      {job.points.map((pt, i) => (
                        <li key={i} className="break-words marker:text-slate-300">{pt}</li>
                      ))}
                    </ul>
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

export default Profile;