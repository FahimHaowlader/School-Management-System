import React, { useState } from "react";

// Minimal Global SVG Icon Toolkit (Technician Set)
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.48-5.141-3.797-6.617-6.617l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
    email: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
    wrench: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.048.58.024 1.193-.14 1.743m-1.153 2.872a4.5 4.5 0 00-3.083 3.083m0 0l-.001.001v.001z" />,
    terminal: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />,
    server: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 3h13.5m-13.5-6h13.5m-13.5-3h13.5m-16.5 12h19.5c.621 0 1.125-.504 1.125-1.125V3.375c0-.621-.504-1.125-1.125-1.125H3c-.621 0-1.125.504-1.125 1.125v14.25c0 .621.504 1.125 1.125 1.125z" />
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
      department: "Hardware & Helpdesk Operations",
      role: "Tier-2 Infrastructure Team",
      description: "Physical hardware lifecycle management, workspace workstation configurations, hardware diagnostics, and enterprise device registration logs.",
      icon: "wrench",
      contact: {
        name: "Mst. Sharmin Akter (Ops Lead)",
        phone: "+880 1712-XXXXXX",
        email: "hardware.support@myclass.com",
        hours: "09:00 AM - 05:00 PM (Sun - Thu)"
      }
    },
    {
      department: "Systems, Database & DevOps",
      role: "Cluster Admin / SysOps Desk",
      description: "Distributed database architecture orchestration (MongoDB clusters), microservice endpoint routes, pipeline tracking, and server instance maintenance.",
      icon: "terminal",
      contact: {
        name: "Core IT Infrastructure Desk",
        phone: "+880 1823-XXXXXX",
        email: "sysadmin@myclass.com",
        hours: "24/7 (Critical Incident Response)"
      }
    },
    {
      department: "Network Engineering & Telephony",
      role: "NOC & Fiber Infrastructure Hub",
      description: "Campus backbone VLAN provisioning, internal DNS configuration, network security policies, and firewall proxy logs.",
      icon: "server",
      contact: {
        name: "Network Operations Center",
        phone: "+880 1934-XXXXXX",
        email: "noc.networking@myclass.com",
        hours: "09:00 AM - 06:00 PM (Sun - Thu)"
      }
    }
  ];

  const faqs = [
    { q: "Updating multi-tenant permissions for database space moderators", a: "Verify the scope parameters inside your authorization configurations. If permissions remain locked, dispatch an access ticket signed by your operations lead to SysOps to trigger JWT parameter updates." },
    { q: "Resolving database sync lag during peak transaction hours", a: "When system input spikes, distributed states may show write delays up to 45 seconds. Do not terminate standard execution commands or restart the cluster shell until the primary loop settles." },
    { q: "Standard procedure for provisioning internal testing instances", a: "Submit an operational infrastructure application through the technician panel detailing target dependencies, resource limits, and environment tags." },
    { q: "MERN application stack login failures and credential faults", a: "Purge local cache and drop stored browser session tokens (Ctrl + F5). If handshake failures persist, access the server terminal to clear invalid authentication blocks." },
    { q: "Deploying updated grading systems to the Examination module", a: "Build out the latest system package to staging, confirm the cryptographic validation hash matches the deploy log, and trigger the production pipeline flag before the active window closes." },
    { q: "How to process hardware resource acquisitions on the grid", a: "Access the inventory module, generate a technical components asset invoice containing specific vendor hardware metrics, and routing it to tech ops for review." }
  ];

  return (
    <div className="w-full font-sans text-slate-900">
      <main className="space-y-5">
        
        {/* --- LIVE SYSTEM DIAGNOSTIC PANEL --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "MongoDB Status", value: "Primary Cluster Online", status: "bg-emerald-500", meta: "Ping: 4ms" },
            { label: "Gateway Node", value: "10.240.0.1 / Active", status: "bg-emerald-500", meta: "99.98% Uptime" },
            { label: "CI/CD Pipeline", value: "Build #4210 Verified", status: "bg-blue-500", meta: "Staging Settled" },
            { label: "Security Incident Logs", value: "0 Critical Vulns", status: "bg-emerald-500", meta: "Audited Daily" }
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

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-5">
          {supportDirectory.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-200/60 overflow-hidden flex flex-col justify-between transition-all duration-200">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left: Department Identity */}
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

                {/* Right: Contact Details */}
                <div className="p-5 lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6 text-left bg-white">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="user" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">System Assignee</p>
                      <p className="font-bold text-slate-800 text-xs mt-1">{item.contact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="clock" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">SLA Support Matrix</p>
                      <p className="font-bold text-slate-800 text-xs mt-1">{item.contact.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="phone" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Telecom Terminal / Comms</p>
                      <p className="font-bold text-slate-900 text-xs mt-1 tracking-wide">{item.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-slate-400"><Icon name="email" className="w-4 h-4 stroke-2" /></div>
                    <div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider leading-none">Network Mail Exchange</p>
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
                    alert("System terminal details stored to clipboard memory.");
                  }}
                  className="h-8 px-3.5 border border-slate-200 text-slate-500 font-bold text-[10px] bg-white rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                >
                  Copy Parameters
                </button>
                <button 
                  onClick={() => setIsTicketOpen(true)}
                  className="h-8 px-4 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
                >
                  Initialize Console Ticket
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Accordion FAQ Section Tailored for Technician Operations */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 text-left">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <span className="w-1.5 h-4 bg-slate-900 rounded-full"></span>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">
              Active Infrastructure Runbooks & Incident FAQ
            </h4>
          </div>
          <div className="border border-slate-100 rounded-lg divide-y divide-slate-100 overflow-hidden">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="bg-white transition-colors">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full py-3.5 px-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/50 text-left cursor-pointer transition-colors outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/60 font-bold">
                        SYS-{400 + i * 14}
                      </span>
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
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed pl-3 border-l-2 border-slate-300 ml-12 text-justify">
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