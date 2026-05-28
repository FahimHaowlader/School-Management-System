import React from "react";

const Profile = () => {
  const teacherData = {
    name: "Dr. Eleanor Vance",
    facultyId: "FAC-2015-8942",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    academic: {
      status: "Active Duty",
      type: "Full-Time Permanent",
      designation: "Lead Senior Educator",
      subject: "Physics & Astrophysics",
      joiningYear: "2015"
    },
    contact: {
      phone: "+1 (555) 234-5678",
      email: "e.vance@schoolms.edu",
      altEmail: "eleanor.vance@gmail.com",
      presentAddress: "742 Evergreen Terrace, Sector 4, Science District",
      permanentAddress: "128 Oakwood Lane, Greenfield, Hillsboro"
    },
    personal: {
      dob: "October 14, 1986",
      gender: "Female",
      bloodGroup: "O+",
      nationality: "Bangladeshi",
      religion: "Islam",
      nidOrPassport: "NID-8923748234"
    },
    emergency: {
      contactName: "Arthur Vance",
      relationship: "Spouse",
      phone: "+1 (555) 876-5432",
      altPhone: "+1 (555) 876-9911"
    },
    about: "Passionate and dedicated teacher with a strong commitment to inspiring and empowering students through engaging, creative, and personalized learning experiences. Skilled in fostering a positive classroom environment that encourages curiosity, critical thinking, and a love for lifelong learning. My journey into physics was driven by a fascination with the universe's fundamental laws, and I strive to share that wonder with my students. I believe in making complex topics accessible and exciting, using a blend of traditional instruction, hands-on experiments, and modern technology. Outside the classroom, I am an avid amateur astronomer and enjoy hiking.",
    qualifications: [
      { id: 1, title: "Ph.D. in Astrophysics", detail: "Stellar University, 2012" },
      { id: 2, title: "M.Sc. in Physics", detail: "Quantum College, 2008" },
      { id: 3, title: "Certified Physics Educator", detail: "National Board of Education, 2009" }
    ],
    professionalDevelopment: [
      "Advanced Teaching Methodologies Workshop",
      "Digital Classroom Integration Course",
      "Student-Centered Learning Conference"
    ],
    history: [
      {
        id: 1,
        role: "Lead Physics Teacher",
        institution: "Northwood High School",
        period: "2015 - Present",
        points: [
          "Developed AP Physics curriculum, resulting in a 15% increase in exam pass rates.",
          "Mentored the school's science club, achieving first place in the state science olympiad."
        ]
      },
      {
        id: 2,
        role: "Science Teacher",
        institution: "Oak Valley Middle School",
        period: "2010 - 2015",
        points: [
          "Taught general science and introductory physics to grades 7-8.",
          "Organized the annual school science fair, increasing student participation by 40%."
        ]
      }
    ],
    publications: [
      { id: 1, title: "Engaging Students in Physics through Gamification", detail: "Journal of Modern Teaching, Vol. 8, 2021" },
      { id: 2, title: "Observational Study of Binary Star Systems", detail: "Astrophysics Monthly, Vol. 12, 2012 (Doctoral Thesis)" }
    ]
  };

  return (
    <div className="w-full font-sans text-slate-900">
      <main className="space-y-5">
        
        {/* FIRST SECTION: COMPREHENSIVE IDENTIFICATION & META SUMMARY HEADER GRID */}
        <div className="col-span-1 xl:col-span-2">
          <div className="flex flex-col gap-y-5 rounded-xl shadow-sm bg-white p-6 border border-slate-100">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left Side: Avatar Panel & Basic Identity */}
              <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto flex-shrink-0 text-left">
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
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{teacherData.name}</h3>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-0.5">Faculty ID: {teacherData.facultyId}</p>
                  <div className="flex gap-2 mt-2.5 justify-center md:justify-start">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border border-blue-100">
                      {teacherData.academic.status}
                    </span>
                    <span className="bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border border-slate-200/60">
                      {teacherData.academic.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Sectioned Grid with 2 Vertical Elements Each */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 text-left w-full lg:flex-1 lg:justify-end">
                
                {/* Section 1: Academic Placement */}
                <div className="flex flex-col gap-y-4">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Designation</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.academic.designation}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Department Specialty</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.academic.subject}</p>
                  </div>
                </div>

                {/* Section 2: Timeline & Telephony */}
                <div className="flex flex-col gap-y-4">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Joining Year</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.academic.joiningYear}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Mobile Contact</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight whitespace-nowrap">{teacherData.contact.phone}</p>
                  </div>
                </div>

                {/* Section 3: Digital Channels & Location */}
                <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-y-4 min-w-0">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Institutional Email</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm break-all lg:break-words leading-tight">
                      {teacherData.contact.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Office Location</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">Science Wing, Room 402</p>
                  </div>
                </div>

              </div>
              
            </div>
          </div>
        </div>

        {/* PROFILE INFORMATION LAYERS MODULE */}
        <div className="space-y-5">
          
          {/* Row 1: Personal Info and Contact Info divided 50/50 split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            
            {/* Block 1: Personal Info */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-y-4">
              <div className="">
                <span className="text-md uppercase font-bold tracking-wider block">Personal Information</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Date of Birth</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.personal.dob}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Gender</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.personal.gender}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Blood Group</p>
                  <p className="font-bold mt-1 text-red-600 text-sm tracking-tight">{teacherData.personal.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Nationality</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.personal.nationality}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Identification Document (NID/Passport)</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.personal.nidOrPassport}</p>
                </div>
              </div>
            </div>

            {/* Block 2: Detailed Contact Info */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-y-4">
              <div className="">
                <span className="text-md uppercase font-bold tracking-wider block">Contact Information</span>
              </div>
              <div className="flex flex-col gap-y-4 min-w-0">
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Alternative Email</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm break-all leading-tight">{teacherData.contact.altEmail}</p>
                </div>
         
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Present Address</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight leading-snug">{teacherData.contact.presentAddress}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Permanent Address</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight leading-snug">{teacherData.contact.permanentAddress}</p>
                  </div>
                </div>
              
            </div>

          </div>

          {/* Row 2: Emergency Contact takes its own full-width line */}
          <div className="w-full text-left">
            {/* Block 3: Emergency Info */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-y-5">
              
              <div className="space-y-4">
                <div className="">
                  <span className="text-md uppercase font-bold tracking-wider text-red-500 block">Emergency Connections</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Primary Contact Name</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.emergency.contactName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Relationship</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{teacherData.emergency.relationship}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Emergency Phone</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight whitespace-nowrap">{teacherData.emergency.phone}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Alternative Phone</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight whitespace-nowrap">{teacherData.emergency.altPhone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="border-b border-slate-50 pb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Additional Details</span>
                </div>
                <div>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight leading-snug">
                    In case of emergency, please contact Arthur Vance first. He is available 24/7 and has been briefed on all necessary medical information. Alternative contact should be used if Arthur is unreachable.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ULTRA-MINIMAL MULTI-COLUMN PROFILE CONTENT GRID */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 text-left">
          
          {/* LEFT PANELS LAYER */}
          <div className="lg:col-span-1 space-y-5">
            
            {/* Academic Qualifications Segment */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="mb-2 pb-2">
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Academic Credentials</span>
              </div>
              <ul className="space-y-3.5">
                {teacherData.qualifications.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-[#135bec] mt-0.5">
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-xs">{item.title}</h3>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight mt-0.5">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Development Segment */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="mb-2 pb-2">
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Development Matrix</span>
              </div>
              <ul className="space-y-2">
                {teacherData.professionalDevelopment.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-600">
                    <svg className="w-4 h-4 text-emerald-500 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-xs font-semibold tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* MAIN CHRONOLOGY & STATEMENT OVERVIEW PANELS */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* Abstract Bio Summary Section */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="mb-4">
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">About Narrative</span>
              </div>
              <p className="text-[12px] leading-relaxed text-slate-600 font-semibold text-justify">
                {teacherData.about}
              </p>
            </div>

            {/* Teaching History Ledger Timeline Block */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="mb-2  pb-2">
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Instructional Background Timeline</span>
              </div>
              <div className="space-y-5">
                {teacherData.history.map((job, index) => (
                  <div key={job.id} className="space-y-1">
                    {index > 0 && <div className="border-t border-slate-200 pt-3.5 mb-2"></div>}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className="font-black text-slate-800 text-xs">{job.role}</h3>
                        <p className="text-[11px] font-bold text-[#135bec] uppercase tracking-wide">{job.institution}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-[9px] font-black text-slate-500 uppercase tracking-wider w-fit">
                        {job.period}
                      </span>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-xs text-slate-500 font-semibold space-y-1 pl-0.5">
                      {job.points.map((point, ptIdx) => (
                        <li key={ptIdx} className="marker:text-slate-200 tracking-tight leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications Panel */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="mb-2 pb-2">
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Publications & Research Records</span>
              </div>
              <div className="space-y-3">
                {teacherData.publications.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-slate-300 mt-0.5 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <div>
                      <a className="font-bold text-[#135bec] text-xs hover:underline" href="#publication">
                        "{item.title}"
                      </a>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">{item.detail}</p>
                    </div>
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