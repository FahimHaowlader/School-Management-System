import React from "react";

const Profile = () => {
  // Mock data structure - easily replaceable with props or server state context
  const teacherData = {
    name: "Dr. Eleanor Vance",
    role: "Physics Teacher",
    experience: "12 Years of Experience",
    rating: "4.9",
    reviewsCount: 213,
    studentsCount: "1,500+",
    email: "eleanor.vance@schoolms.edu",
    phone: "+880 1712-XXXXXX",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlJVCELwSlEy1TdVaCZknSHCaj03P4US-pH7Pc1DY3Nz5SrLkpkJLdyZFRU0yFjDtxafY2lafelo-Fv3hPKjStmHHIwAbjOzepV6VRDmRapLDeRgwLwsPEwMZCKT8_zu45ZjL9l8YNH5EuN95zjibfrsSNa2dYM-lrBDeoQR3bPJpReInCqArlKo5juGhbWyQ1KI4dUzSoijO2ZlJubLIJ9URCOv3n7A0J4Fy3xopqq0Mob_BNl3fLwVElA-aZrzYdXnl_LjlCNAO8",
    personal: {
      fullName: "Eleanor Vance",
      dob: "14 Oct 1985",
      gender: "Female",
      nationality: "Bangladeshi",
      bloodGroup: "O+",
      joiningDate: "12 Jan 2014"
    },
    emergency: {
      name: "Thomas Vance",
      relation: "Spouse",
      phone: "+880 1552-XXXXXX",
      email: "thomas.v@example.com",
      address: "Dhaka, Bangladesh"
    },
    about: "Passionate and dedicated teacher with a strong commitment to inspiring and empowering students through engaging, creative, and personalized learning experiences. Skilled in fostering a positive classroom environment that encourages curiosity, critical thinking, and a love for lifelong learning. My journey into physics was driven by a fascination with the universe's fundamental laws, and I strive to share that wonder with my students. I believe in making complex topics accessible and exciting, using a blend of traditional instruction, hands-on experiments, and modern technology. Outside the classroom, I am an avid amateur astronomer and enjoy hiking.",
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
      },
      {
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
      { title: "Engaging Students in Physics through Gamification", source: "Journal of Modern Teaching, Vol. 8, 2021" },
      { title: "Observational Study of Binary Star Systems", source: "Astrophysics Monthly, Vol. 12, 2012 (Doctoral Thesis)" }
    ]
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50 font-sans text-slate-900 selection:bg-blue-500/10 selection:text-blue-600">
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        
        {/* Main Adaptive Layout Grid */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          
          {/* Left Side Sidebar / Contact & Accreditations */}
          <div className="flex flex-col gap-5 xl:col-span-1">
            
            {/* Identity Profile & Base Contact Card */}
            <div className="flex flex-col items-center border border-slate-200 bg-white p-6 text-center shadow-sm rounded-xl">
              <div className="relative group select-none">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-slate-50 bg-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                  <img 
                    src={teacherData.avatar} 
                    alt={teacherData.name} 
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Active Indicator Pulse */}
                <span className="absolute bottom-1 right-1 flex h-5 w-5 rounded-full border-2 border-white bg-green-500 shadow-sm">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                </span>
              </div>

              <h1 className="mt-4 text-xl font-bold text-slate-900">{teacherData.name}</h1>
              <p className="text-sm font-medium text-slate-500">{teacherData.role}</p>
              
              <div className="flex gap-2 mt-2 justify-center">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                  Faculty
                </span>
                <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-100">
                  {teacherData.experience}
                </span>
              </div>

              {/* Identity Micro Stats Matrix */}
              <div className="mt-5 flex w-full items-center justify-center gap-4 border-t border-slate-100 pt-4 text-xs font-bold">
                <div className="flex items-center gap-1" title="Teacher Rating">
                  <span className="text-slate-500 font-medium">Rating:</span>
                  <span className="text-slate-900">{teacherData.rating}</span>
                  <span className="font-medium text-slate-400">({teacherData.reviewsCount})</span>
                </div>
                <div className="h-3 w-px bg-slate-200" aria-hidden="true" />
                <div className="flex items-center gap-1" title="Total Retained Students">
                  <span className="text-slate-900">{teacherData.studentsCount}</span>
                  <span className="font-medium text-slate-400 ml-1">Students</span>
                </div>
              </div>

              {/* Public Contact Direct Channels */}
              <div className="mt-5 w-full border-t border-slate-100 pt-4 flex flex-col gap-y-3.5 text-left text-sm">
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
                  <p className="font-semibold text-slate-800 mt-1 break-all select-all hover:text-blue-700 transition-colors">
                    {teacherData.email}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
                  <p className="font-semibold text-slate-800 mt-1 select-all hover:text-blue-700 transition-colors">
                    {teacherData.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Qualifications Module */}
            <div className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm rounded-xl">
              <h2 className="font-bold text-base text-slate-800 mb-4">Academic Qualifications</h2>
              <div className="flex flex-col gap-y-4">
                {teacherData.qualifications.map((item, index) => (
                  <div key={index} className="text-sm border-l-2 border-blue-100 pl-3 py-0.5">
                    <h3 className="font-semibold text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Development Module */}
            <div className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm rounded-xl">
              <h2 className="font-bold text-base text-slate-800 mb-4">Professional Development</h2>
              <div className="flex flex-col gap-y-3">
                {teacherData.professionalDevelopment.map((item, index) => (
                  <div key={index} className="text-sm border-l-2 border-slate-200 pl-3 py-0.5">
                    <p className="font-semibold text-slate-800 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side In-Depth Professional Dossier */}
          <div className="flex flex-col gap-5 xl:col-span-2">
            
            {/* Personal Information Grid - Match Student Layout */}
            <div className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm rounded-xl">
              <h2 className="font-bold text-base text-slate-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 text-sm">
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Full Name</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.personal.fullName}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Date Of Birth</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.personal.dob}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Gender</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.personal.gender}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Nationality</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.personal.nationality}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Blood Group</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.personal.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Joining Date</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.personal.joiningDate}</p>
                </div>
              </div>
            </div>

            {/* About Block */}
            <div className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm rounded-xl">
              <h2 className="font-bold text-base text-slate-800 mb-3">About Me</h2>
              <p className="text-justify text-sm leading-relaxed text-slate-600">
                {teacherData.about}
              </p>
            </div>

            {/* Structured Teaching Timeline Matrix */}
            <div className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm rounded-xl">
              <h2 className="font-bold text-base text-slate-800 mb-5">Teaching History</h2>
              <div className="flex flex-col gap-y-5">
                {teacherData.history.map((job, index) => (
                  <div key={index} className="flex flex-col text-sm">
                    <div className="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-bold tracking-tight text-slate-900">{job.role}</h3>
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
                    
                    {index !== teacherData.history.length - 1 && (
                      <div className="mt-5 border-t border-slate-100" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Publications Portfolio Grid */}
            <div className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm rounded-xl">
              <h2 className="font-bold text-base text-slate-800 mb-4">Publications & Research</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {teacherData.publications.map((pub, index) => (
                  <div key={index} className="flex flex-col justify-between rounded-xl border border-slate-200/60 bg-slate-50/50 p-4 transition-all duration-200 hover:border-blue-100 hover:bg-blue-50/20 group">
                    <div>
                      <a 
                        href="#publication-link" 
                        className="block text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 hover:underline decoration-1 underline-offset-2 transition-colors"
                      >
                        "{pub.title}"
                      </a>
                    </div>
                    <p className="mt-4 text-xs text-slate-500 font-medium tracking-tight break-words">{pub.source}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact Block - Match Student Layout */}
            <div className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm rounded-xl">
              <h2 className="font-bold text-base text-slate-800 mb-4">Emergency Contact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 text-sm">
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Contact Name</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.emergency.name}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Relationship</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.emergency.relation}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.emergency.phone}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
                  <p className="font-semibold mt-1 text-slate-800 break-all">{teacherData.emergency.email}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Address</p>
                  <p className="font-semibold mt-1 text-slate-800">{teacherData.emergency.address}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;