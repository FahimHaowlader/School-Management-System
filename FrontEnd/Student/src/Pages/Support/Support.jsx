import React from "react";

const Support = () => {
  const supportDirectory = [
    {
      department: "Academic Affairs",
      role: "Course Instructor / Teacher",
      description: "Inquiries regarding lectures, grading, and course curriculum.",
      icon: "👨‍🏫",
      contact: {
        name: "Dr. Ariful Islam",
        phone: "+880 1712-XXXXXX",
        email: "academic.support@myclass.com",
        hours: "09:00 AM - 04:00 PM"
      }
    },
    {
      department: "Administration",
      role: "Principal's Office",
      description: "Official approvals, registration issues, and institutional documentation.",
      icon: "🏛️",
      contact: {
        name: "Office of the Principal",
        phone: "+880 1823-XXXXXX",
        email: "admin.office@myclass.com",
        hours: "10:00 AM - 05:00 PM"
      }
    },
    {
      department: "Technical Support",
      role: "IT Technician",
      description: "Portal access, hardware troubleshooting, and connectivity assistance.",
      icon: "🛠️",
      contact: {
        name: "Internal IT Desk",
        phone: "+880 1934-XXXXXX",
        email: "tech.help@myclass.com",
        hours: "24/7 (Emergency Only)"
      }
    }
  ];

  return (
    <div className="min-h-screen w-full  font-san text-slate-900 ">
      <main className=" space-y-5">
        
        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-5">
          {supportDirectory.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden group hover:border-slate-200 transition-all">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left: Department Identity */}
                <div className="p-6 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm uppercase">{item.department}</h4>
                      <p className="text-blue-600 text-[11px] font-bold uppercase tracking-tighter">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Right: Contact Details (Enterprise Row Style) */}
                <div className="p-6 lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Primary Contact</p>
                    <p className="font-bold text-slate-800 mt-1">{item.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Office Hours</p>
                    <p className="font-bold text-slate-800 mt-1">{item.contact.hours}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Mobile Number</p>
                    <p className="font-bold text-slate-900 mt-1 flex items-center gap-2">
                      <span className="text-slate-300">📞</span> {item.contact.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Official Email</p>
                    <p className="font-bold text-slate-900 mt-1 flex items-center gap-2">
                      <span className="text-slate-300">✉️</span> {item.contact.email}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Bottom Action Bar */}
              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end gap-3">
                <button className="px-4 py-2 text-[10px] font-black uppercase text-slate-500 hover:text-slate-800 transition-colors">Copy Email</button>
                <button className="px-5 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm active:scale-95">
                  Direct Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section Matching the Theme */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-slate-900 rounded-full"></span>
              Common Questions
            </h4>
            <div className="space-y-4">
              {[
                "How to update my contact info?",
                "Class schedule mismatch help",
                "Library clearance procedure",
                "Fee payment verification"
              ].map((q, i) => (
                <div key={i} className="group cursor-pointer pb-3 border-b border-slate-50 last:border-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                      {q}
                    </p>
                    <span className="text-slate-300 group-hover:text-slate-900 transition-colors">→</span>
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

