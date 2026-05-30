import React from "react";

const Profile = () => {
  const principalData = {
    name: "Dr. Eleanor Vance",
    executiveId: "PRN-2015-0001",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    academic: {
      status: "Active Duty",
      type: "Full-Time Appointed",
      designation: "Principal & Chief Administrator",
      governance: "Executive Board & Ministry Liaison",
      appointedYear: "2015"
    },
    contact: {
      phone: "+1 (555) 234-5678",
      email: "e.vance@schoolms.edu",
      altEmail: "eleanor.vance@gov.edu.bd",
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
    about: "Visionary and results-driven Educational Administrator with over a decade of executive leadership experience directing comprehensive institutional operations, curriculum engineering, and fiscal planning. Expert in fostering collaborative ecosystems among board governance, faculty departments, and regulatory authorities to elevate academic milestones and optimize infrastructure. Adept at navigating modern digital transformations in high-scale enterprise resources, ensuring stringent internal compliance, and establishing multi-tenant institutional frameworks. Driven by a philosophy that positions rigorous pedagogical benchmarks alongside scalable administrative systems to cultivate global-standard talent assets.",
    qualifications: [
      { id: 1, title: "Ph.D. in Educational Leadership & Policy", detail: "Stellar University, 2012" },
      { id: 2, title: "M.Sc. in Academic Administration", detail: "Quantum College, 2008" },
      { id: 3, title: "Executive Certification in Fiscal Management", detail: "National Institute of Governance, 2010" }
    ],
    governanceCompetencies: [
      "Strategic Institutional Budgeting & Auditing",
      "Regulatory Compliance & Accreditation Management",
      "High-Scale Digital Transformation Oversight",
      "Public-Private Partnership Development"
    ],
    history: [
      {
        id: 1,
        role: "Principal & Chief Executive Officer",
        institution: "Northwood International Academy",
        period: "2015 - Present",
        points: [
          " Spearheaded a $12M campus expansion roadmap and introduced modular hybrid ERP frameworks across 5 separate departments.",
          "Engineered institutional reform programs that amplified collective national-board passing parameters by 18% inside 3 fiscal cycles.",
          "Negotiated strategic board directives and aligned campus operational frameworks with regional regulatory protocols and international accreditations."
        ]
      },
      {
        id: 2,
        role: "Vice Principal / Academic Dean",
        institution: "Oak Valley Apex Campus",
        period: "2010 - 2015",
        points: [
          "Supervised 120+ senior faculty members and managed centralized scheduling, institutional policy drafting, and annual budget evaluations.",
          "Directed the institution's comprehensive accreditation self-study review process, achieving a perfect clean-record renewal matrix."
        ]
      }
    ],
    publications: [
      { id: 1, title: "Frameworks for Scalable Infrastructure in Modern Educational ERPs", detail: "Journal of Institutional Governance, Vol. 14, 2024" },
      { id: 2, title: "Optimizing Fiscal Assets in Multi-Tenant Campus Implementations", detail: "Academic Administration Quarterly, Vol. 9, 2019" }
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
                      src={principalData.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white font-bold uppercase">Update Sign</span>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{principalData.name}</h3>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-0.5">Executive ID: {principalData.executiveId}</p>
                  <div className="flex gap-2 mt-2.5 justify-center md:justify-start">
                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border border-emerald-100">
                      {principalData.academic.status}
                    </span>
                    <span className="bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border border-slate-200/60">
                      {principalData.academic.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Sectioned Grid with 2 Vertical Elements Each */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 text-left w-full lg:flex-1 lg:justify-end">
                
                {/* Section 1: Executive Placement */}
                <div className="flex flex-col gap-y-4">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Designation</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.academic.designation}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Governance Wing</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.academic.governance}</p>
                  </div>
                </div>

                {/* Section 2: Timeline & Telephony */}
                <div className="flex flex-col gap-y-4">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Appointment Year</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.academic.appointedYear}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Direct Hotline</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight whitespace-nowrap">{principalData.contact.phone}</p>
                  </div>
                </div>

                {/* Section 3: Digital Channels & Location */}
                <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-y-4 min-w-0">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Secretariat Email</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm break-all lg:break-words leading-tight">
                      {principalData.contact.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Office Chamber</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">Executive Suite, Block Alpha</p>
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
              <div>
                <span className="text-md uppercase font-bold tracking-wider block">Personal Credentials</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Date of Birth</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.personal.dob}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Gender</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.personal.gender}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Blood Group</p>
                  <p className="font-bold mt-1 text-red-600 text-sm tracking-tight">{principalData.personal.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Nationality</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.personal.nationality}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">National Identification (NID/Passport)</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.personal.nidOrPassport}</p>
                </div>
              </div>
            </div>

            {/* Block 2: Detailed Contact Info */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-y-4">
              <div>
                <span className="text-md uppercase font-bold tracking-wider block">Contact Matrix</span>
              </div>
              <div className="flex flex-col gap-y-4 min-w-0">
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Government Network Email</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm break-all leading-tight">{principalData.contact.altEmail}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Present Residence Address</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight leading-snug">{principalData.contact.presentAddress}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Permanent Demographics Address</p>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight leading-snug">{principalData.contact.permanentAddress}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Emergency Contact takes its own full-width line */}
          <div className="w-full text-left">
            {/* Block 3: Emergency Info */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-y-5">
              
              <div className="space-y-4">
                <div>
                  <span className="text-md uppercase font-bold tracking-wider text-red-500 block">Emergency Security Connections</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Primary Escrow Contact</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.emergency.contactName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Relationship</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight">{principalData.emergency.relationship}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Secure Phone Line</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight whitespace-nowrap">{principalData.emergency.phone}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Alternative Secure Line</p>
                    <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight whitespace-nowrap">{principalData.emergency.altPhone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="border-b border-slate-50 pb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Administrative Protocols</span>
                </div>
                <div>
                  <p className="font-bold mt-1 text-slate-800 text-sm tracking-tight leading-snug">
                    In the event of an executive emergency or absolute communication failure, the Board of Trustees and Arthur Vance must be appended to the communication loop immediately. All credential handovers adhere strictly to standard organizational safety measures.
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
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Executive Credentials</span>
              </div>
              <ul className="space-y-3.5">
                {principalData.qualifications.map((item) => (
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

            {/* Governance Competencies Segment */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="mb-2 pb-2">
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Governance Matrix</span>
              </div>
              <ul className="space-y-2">
                {principalData.governanceCompetencies.map((item, idx) => (
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
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Executive Narrative</span>
              </div>
              <p className="text-[12px] leading-relaxed text-slate-600 font-semibold text-justify">
                {principalData.about}
              </p>
            </div>

            {/* Administration History Ledger Timeline Block */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="mb-2 pb-2">
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Institutional Leadership Timeline</span>
              </div>
              <div className="space-y-5">
                {principalData.history.map((job, index) => (
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

            {/* Research & Strategic Treatises Panel */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="mb-2 pb-2">
                <span className="text-md uppercase font-bold tracking-wider text-slate-900 block">Strategic Treatises & Management Papers</span>
              </div>
              <div className="space-y-3">
                {principalData.publications.map((item) => (
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