import React from "react";

const Support = () => {
  const supportDirectory = [
    {
      department: "Human Resources & Payroll",
      role: "HR Operations Desk",
      description: "Inquiries regarding salary disbursement, leave approval, institutional provident funds, and appraisals.",
      icon: "💼",
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
      icon: "🖥️",
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
      icon: "📝",
      contact: {
        name: "Office of the Controller",
        phone: "+880 1934-XXXXXX",
        email: "exam.control@myclass.com",
        hours: "09:00 AM - 04:30 PM"
      }
    }
  ];

  return (
    <div className="w-full font-sans text-slate-900">
      <main className="space-y-6">
        
        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-5">
          {supportDirectory.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden group hover:border-slate-200 transition-all duration-200">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left: Department Identity */}
                <div className="p-6 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{item.department}</h4>
                      <p className="text-blue-600 text-[11px] font-bold uppercase tracking-wider mt-0.5">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Right: Contact Details */}
                <div className="p-6 lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Primary Contact</p>
                    <p className="font-bold text-slate-800 mt-1">{item.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Available Hours</p>
                    <p className="font-bold text-slate-800 mt-1">{item.contact.hours}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Direct Extension / Mobile</p>
                    <p className="font-bold text-slate-900 mt-1 flex items-center gap-2">
                      <span className="text-slate-400 text-xs">📞</span> {item.contact.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Official Support Email</p>
                    <p className="font-bold text-slate-900 mt-1 flex items-center gap-2">
                      <span className="text-slate-400 text-xs">✉️</span> {item.contact.email}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Bottom Action Bar */}
              <div className="bg-slate-50/70 px-6 py-3 border-t border-slate-100 flex justify-end gap-3">
                <button className="px-4 py-2 text-[10px] font-black uppercase text-slate-500 hover:text-slate-800 transition-colors tracking-wider">
                  Copy Contact
                </button>
                <button className="px-5 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm active:scale-95">
                  Raise Internal Ticket
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section Tailored for Staff Operations */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6">
          <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
            <span className="w-1.5 h-4 bg-slate-900 rounded-full"></span>
            Administrative & Faculty FAQ
          </h4>
          <div className="grid grid-cols-1  gap-x-8 gap-y-1">
            {[
              "How do I request leave approval via the portal?",
              "Database sync lag during peak exam submission hours",
              "Updating multi-tenant permissions for class moderators",
              "Procedure for requesting hardware components / servers",
              "MERN stack portal login failure using institutional credentials",
              "Submitting semester grade sheets to the Controller Office"
            ].map((q, i) => (
              <div key={i} className="group cursor-pointer py-3 border-b border-slate-100 last:border-none md:last:border-b">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    {q}
                  </p>
                  <span className="text-slate-300 group-hover:text-slate-900 transition-colors transform group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;