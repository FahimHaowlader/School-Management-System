import React, { useState } from "react";

// Minimal Global SVG Icon Toolkit
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.48-5.141-3.797-6.617-6.617l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
    email: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    paperclip: <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L10.5 10.5" />,
    chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
    briefcase: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .414-.336.75-.75.75H4.5a.75.75 0 01-.75-.75v-4.25m16.5 0a3 3 0 00-3-3H7.5a3 3 0 00-3 3m16.5 0V9a2.25 2.25 0 00-2.25-2.25H15M3.75 14.15V9A2.25 2.25 0 016 6.75h3M9 3.5h6" />,
    cpu: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M12 3v1.5m3.75-1.5V4.5m0 15V21M12 19.5V21M8.25 19.5V21m-4.5-10.5H4.5m-1.5 3.75H4.5m-1.5 3.75H4.5m15-11.25H21m-1.5 3.75H21m-1.5 3.75H21M6.75 6.75h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V7.5a.75.75 0 01.75-.75z" />,
    document: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`stroke-current ${className}`} viewBox="0 0 24 24">
      {icons[name] || <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
};

const Support = () => {
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const supportDirectory = [
    {
      department: "Human Resources & Payroll",
      role: "HR Operations Desk",
      description: "Inquiries regarding salary disbursement, leave approval, institutional provident funds, and appraisals.",
      icon: "briefcase",
      contact: {
        name: "Mst. Sharmin Akter (HR Lead)",
        phone: "+880 1712-XXXXXX",
        email: "hr.ops@myclass.com",
        hours: "09:00 AM - 05:00 PM (Sun - Thu)"
      }
    },
    {
      department: "Systems & Infrastructure",
      role: "SysAdmin / DevOps Team",
      description: "Server access, database management (MongoDB clusters), deployment issues, and institutional domain migration help.",
      icon: "cpu",
      contact: {
        name: "Core IT Infrastructure Desk",
        phone: "+880 1823-XXXXXX",
        email: "sysadmin@myclass.com",
        hours: "24/7 (Emergency Service)"
      }
    },
    {
      department: "Controller of Examinations",
      role: "Academic Coordination Office",
      description: "Exam routine management, final grade submission issues, room allocations, and invigilation duties.",
      icon: "document",
      contact: {
        name: "Office of the Controller",
        phone: "+880 1934-XXXXXX",
        email: "exam.control@myclass.com",
        hours: "09:00 AM - 04:30 PM"
      }
    }
  ];

  const faqs = [
    { q: "How do I request leave approval via the portal?", a: "Navigate to the HR Operations tab within your employee self-service platform, select 'Leave Application', specify dates, and attach matching substitute schedule details." },
    { q: "Database sync lag during peak exam submission hours", a: "During intense grading cycles, state synchronizations might take up to 45 seconds. Do not reload your viewport while the saving transaction dialog spins." },
    { q: "Updating multi-tenant permissions for class moderators", a: "Submit an authorization checklist signed by your department lead to the SysAdmin branch via internal ticket routing for access privilege escalation." },
    { q: "Procedure for requesting hardware components / servers", a: "Submit an operational resource acquisition request via the Internal Helpdesk with asset specs and departmental balance clearance." },
    { q: "MERN stack portal login failure using institutional credentials", a: "Clear system cookies and refresh local cache (Ctrl + F5). If login faults continue, contact IT infrastructure to clear invalid JWT allocations." },
    { q: "Submitting semester grade sheets to the Controller Office", a: "Export final grades to PDF format, apply your digital seal token signature, and upload the encrypted asset to the Examination module before the deadline window closes." }
  ];

  return (
    <div className="w-full font-sans text-slate-900">
      <main className="space-y-5">
        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-5">
          {supportDirectory.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between transition-all duration-200">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left: Department Identity */}
                <div className="p-5 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/40 text-left">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-600">
                      <Icon name={item.icon} className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-tight">{item.department}</h4>
                      <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mt-0.5">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Right: Contact Details */}
                <div className="p-5 lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6 text-left bg-white">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="user" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Primary Coordinate</p>
                      <p className="font-bold text-slate-800 text-xs mt-1">{item.contact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="clock" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Available Windows</p>
                      <p className="font-bold text-slate-800 text-xs mt-1">{item.contact.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="phone" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Direct Extension / Mobile</p>
                      <p className="font-bold text-slate-900 text-xs mt-1 tracking-wide">{item.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="email" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Official Desk Email</p>
                      <p className="font-bold text-slate-900 text-xs mt-1 break-all">{item.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Action Bar */}
              <div className="bg-slate-50/50 px-5 py-3 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${item.contact.name}: ${item.contact.phone} | ${item.contact.email}`);
                    alert("Contact parameters stored to clipboard.");
                  }}
                  className="h-8 px-3.5 border border-slate-200 text-slate-500 font-bold text-[10px] bg-white rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                >
                  Copy Desk Parameters
                </button>
                <button 
                  onClick={() => setIsTicketOpen(true)}
                  className="h-8 px-4 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
                >
                  File Urgent Desk Ticket
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Accordion FAQ Section Tailored for Staff Operations */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 text-left">
          <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2 tracking-tight">
            <span className="w-1.5 h-4 bg-slate-900 rounded-full"></span>
            Administrative & Faculty Operations FAQ
          </h4>
          <div className="border border-slate-100 rounded-lg divide-y divide-slate-100 overflow-hidden">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="bg-white transition-colors">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full py-3.5 px-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/50 text-left cursor-pointer transition-colors outline-none"
                  >
                    <p className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                      {faq.q}
                    </p>
                    <Icon 
                      name="chevronDown" 
                      className={`w-3.5 h-3.5 text-slate-400 stroke-[3] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-slate-900" : ""}`} 
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-4 pb-4 bg-slate-50/30 animate-fadeIn">
                      <p className="text-xs text-slate-500 font-medium leading-relaxed pl-1 border-l-2 border-slate-200">
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