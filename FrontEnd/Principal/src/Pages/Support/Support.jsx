import React, { useState } from "react";

// Minimal Global SVG Icon Toolkit (Executive Governance Set)
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.48-5.141-3.797-6.617-6.617l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
    email: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
    scale: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M6 7l3-3 3 3M18 17l-3 3-3-3" />,
    briefcase: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4V14.15m16.5 0c0-.621-.504-1.125-1.125-1.125H18.75v-2.25A2.25 2.25 0 0016.5 8.5H7.5a2.25 2.25 0 00-2.25 2.25v2.25H4.875c-.621 0-1.125.504-1.125 1.125m16.5 0v-4.135a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25V14.15" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.74c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`stroke-current ${className}`} viewBox="0 0 24 24">
      {icons[name] || <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
};

const Support = () => {
  const [isDirectiveOpen, setIsDirectiveOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const executiveDirectory = [
    {
      department: "Legal, Compliance & Ministry Liaison",
      role: "Board Regulatory Desk",
      description: "Drafting regulatory compliance charters, interpreting statutory policies, handling formal institutional audits, and orchestrating Ministry of Education alignments.",
      icon: "scale",
      contact: {
        name: "Barrister Asif Rahman (Chief Counsel)",
        phone: "+880 1712-XXXXXX",
        email: "legal.compliance@myclass.com",
        hours: "09:00 AM - 04:00 PM (Sun - Thu)"
      }
    },
    {
      department: "Trustees, Finance & Procurement Board",
      role: "Strategic Fiscal Desk",
      description: "Managing capital allocation models, reviewing enterprise software acquisitions, balancing secondary school developmental grants, and handling board audits.",
      icon: "briefcase",
      contact: {
        name: "Treasury Secretariat Hub",
        phone: "+880 1823-XXXXXX",
        email: "board.treasury@myclass.com",
        hours: "10:00 AM - 05:00 PM (Board Days)"
      }
    },
    {
      department: "Institutional Security & Media Relations",
      role: "Public Affairs Secretariat",
      description: "Managing corporate institutional identity protocols, handling press statements, coordinating public-private partnerships, and enforcing high-level platform safety standard policies.",
      icon: "shield",
      contact: {
        name: "Director of Communications",
        phone: "+880 1934-XXXXXX",
        email: "media.desk@myclass.com",
        hours: "24/7 (Executive Crisis Channel)"
      }
    }
  ];

  const executiveFaqs = [
    { q: "Ratifying structural changes to institutional permission schemas", a: "Any updates overriding corporate access frameworks must be submitted alongside a signed board charter. The administrative platform will flag unapproved role shifts automatically during the next audit window." },
    { q: "Managing unexpected delays in student database transaction rollouts", a: "Under instances of heavy workload, wait loops can encounter brief delays. Do not alter parameters or restart core operations. Consult the Systems Directorate if states fail to sync within 5 fiscal minutes." },
    { q: "Standard protocol for executing cross-departmental financial requests", a: "Generate an asset allocation request inside the procurement section containing complete programmatic metrics, then forward it straight to the Board Secretariat for formal review." },
    { q: "Addressing external stakeholder authentication blockages", a: "Instruct the stakeholder support officer to issue a session cache flush (Ctrl + F5). If credential handshakes fail continuously, forward the instance straight to IT SysOps for high-tier directory cleansing." },
    { q: "Deploying revised grading rubrics ahead of national boards", a: "Confirm that your evaluation blueprints match regional curriculum decrees perfectly, run cryptographically signed validation summaries in staging, and clear the production deployment flag." },
    { q: "Validating technological equipment procurement proposals", a: "Direct the procurement office to prepare a comprehensive technical equipment invoice complete with structural benchmarks, then route it directly to the executive suite for final sign-off." }
  ];

  return (
    <div className="w-full font-sans text-slate-900">
      <main className="space-y-5">
        
        {/* --- EXECUTIVE MANAGEMENT DIAGNOSTIC PANEL --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Institutional Compliance Status", value: "Fully Certified / Clear", status: "bg-emerald-500", meta: "Next Audit: Q4" },
            { label: "Board Allocation Sync", value: "FY 2026 Balance Settled", status: "bg-emerald-500", meta: "99.94% Budget Accuracy" },
            { label: "Digital ERP Platform", value: "Build #4210 Live", status: "bg-blue-500", meta: "All Campus Nodes Active" },
            { label: "Data Integrity & Protection", value: "0 Security Incidents", status: "bg-emerald-500", meta: "ISO 27001 Compliant" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1 text-left">
              <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">{stat.label}</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${stat.status}`}></span>
                <p className="font-extrabold text-slate-800 text-xs tracking-tight">{stat.value}</p>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">{stat.meta}</p>
            </div>
          ))}
        </div>

        {/* --- MAIN GOVERNANCE CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-5">
          {executiveDirectory.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-200/60 overflow-hidden flex flex-col justify-between transition-all duration-200">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left: Governance Board Identity */}
                <div className="p-5 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/40 text-left">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-600">
                      <Icon name={item.icon} className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs uppercase tracking-tight leading-tight">{item.department}</h4>
                      <p className="text-blue-600 text-[10px] font-extrabold uppercase tracking-wider mt-0.5">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed text-justify">
                    {item.description}
                  </p>
                </div>

                {/* Right: Council Contact Details */}
                <div className="p-5 lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6 text-left bg-white">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="user" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Council Designee</p>
                      <p className="font-bold text-slate-800 text-xs mt-1">{item.contact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="clock" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Availability Window</p>
                      <p className="font-bold text-slate-800 text-xs mt-1">{item.contact.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="phone" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Official Direct Wire</p>
                      <p className="font-bold text-slate-900 text-xs mt-1 tracking-wide">{item.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="email" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Secure Mail Route</p>
                      <p className="font-bold text-blue-600 text-xs mt-1 break-all">{item.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Action Bar */}
              <div className="bg-slate-50/50 px-5 py-3 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${item.contact.name}: ${item.contact.phone} | ${item.contact.email}`);
                    alert("Executive committee channel details saved to clipboard memory.");
                  }}
                  className="h-8 px-3.5 border border-slate-200 text-slate-500 font-bold text-[10px] bg-white rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                >
                  Copy Directory Data
                </button>
                <button 
                  onClick={() => setIsDirectiveOpen(true)}
                  className="h-8 px-4 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
                >
                  Issue Executive Directive
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Accordion FAQ Section Tailored for Principal Operations */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 text-left">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <span className="w-1.5 h-4 bg-slate-900 rounded-full"></span>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">
              Administrative Policy Frameworks & Governance Briefs
            </h4>
          </div>
          <div className="border border-slate-100 rounded-lg divide-y divide-slate-100 overflow-hidden">
            {executiveFaqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="bg-white transition-colors">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full py-3.5 px-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/50 text-left cursor-pointer transition-colors outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {faq.q}
                      </p>
                    </div>
                    <Icon 
                      name="chevronDown" 
                      className={`w-3.5 h-3.5 text-slate-400 stroke-[3] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-slate-900" : ""}`} 
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-4 pb-4 bg-slate-50/30 animate-fadeIn">
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed pl-3 border-l-2 border-slate-300 ml-3 text-justify">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;