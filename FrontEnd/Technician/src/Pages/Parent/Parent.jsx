import React, { useState } from "react";

// Standard UI Icon Pack
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.336 9.336 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    image: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.454-5.112-3.74-6.566-6.566l1.294-.97a1.242 1.242 0 00.416-1.173L6.878 3.16a1.124 1.124 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`stroke-current ${className}`} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const ParentRow = ({ status, name, emailAddress, phoneNumber, linkedStudents, relationRole, imageUrl }) => {
  const badgeStyles = {
    Verified: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Pending Invite": "bg-amber-50 text-amber-700 border-amber-100",
    Unlinked: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <tr className="border-b border-slate-200/70 hover:bg-slate-50/70 transition-colors">
      
      {/* Parent Information Profile */}
      <td className="p-4 align-middle">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 tracking-tight">{name}</span>
            <span className="text-xs text-slate-400 font-medium">{emailAddress}</span>
          </div>
        </div>
      </td>

      {/* Primary Phone Number */}
      <td className="p-4 align-middle text-left font-mono text-xs font-semibold text-slate-600">
        {phoneNumber}
      </td>

      {/* Linked Student Network */}
      <td className="p-4 align-middle text-left">
        <div className="flex flex-wrap gap-1.5 max-w-xs">
          {linkedStudents.map((student, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md">
              {student}
            </span>
          ))}
        </div>
      </td>

      {/* Family Tree Relation Node */}
      <td className="p-4 align-middle text-left hidden md:table-cell">
        <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200/60 px-2.5 py-1 rounded-md tracking-wide">
          {relationRole}
        </span>
      </td>

      {/* Registration System Status */}
      <td className="p-4 align-middle text-left">
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyles[status] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
          {status}
        </span>
      </td>

      {/* Row Custom Actions */}
      <td className="p-4 align-middle text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button 
            onClick={() => console.log("Edit entity parameters")}
            className="h-8 px-2.5 border border-slate-200 text-slate-600 font-bold text-xs bg-white rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Icon name="edit" className="w-3.5 h-3.5 stroke-[2.3]" />
            <span className="hidden sm:inline">Modify</span>
          </button>
          
          <button 
            onClick={() => console.log("Delete profile item")}
            className="h-8 w-8 border border-slate-200 text-slate-400 bg-white rounded-lg hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center shadow-sm cursor-pointer"
          >
            <Icon name="trash" className="w-3.5 h-3.5 stroke-[2.3]" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Parent = () => {
  const categories = ["All Households", "Verified", "Pending Invite", "Unlinked"];
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="w-full font-sans text-slate-900">
      <div className="space-y-5">
        
        {/* Context Control Header Panel */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Parent & Family Directory Matrix</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Manage parent guardian profiles, map direct family relationships, and assign phone credentials.</p>
          </div>
          
          <div className="flex items-center gap-4 border-l border-transparent sm:border-slate-100 sm:pl-4">
            <div className="text-center sm:text-right">
              <span className="block text-xl font-black text-slate-900 leading-none">1,402</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Households Enrolled</span>
            </div>
          </div>
        </div>

        {/* Directory Entry Creation Form */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          <div 
            onClick={() => setIsComposerOpen(!isComposerOpen)}
            className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-inner">
                <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide">Register New Household Entry</span>
            </div>
            <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">
              {isComposerOpen ? "Collapse Form" : "Expand Form"}
            </span>
          </div>

          {isComposerOpen && (
            <div className="p-5 border-t border-slate-100 space-y-4 bg-white text-left animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Verification Status</label>
                  <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                    <option>Verified Account</option>
                    <option>Pending System Invite</option>
                    <option>Unlinked Placeholder Profile</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Linked Student Cohorts</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Tommy Jenkins (Class 10-A)" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Household Core Relation Role</label>
                  <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-semibold bg-white outline-none focus:border-slate-900 transition-colors">
                    <option>Mother</option>
                    <option>Father</option>
                    <option>Grandmother</option>
                    <option>Grandfather</option>
                    <option>Legal Guardian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Guardian Legal Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Sarah Jenkins" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="e.g., s.jenkins@mail.com" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Primary Phone Contact</label>
                  <input 
                    type="text" 
                    placeholder="e.g., (555) 019-8831" 
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              {/* Profile Image Interface */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Household Profile Avatar</label>
                <div className="border border-dashed border-slate-200 rounded-xl p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1.5 group/dropzone cursor-pointer relative">
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover/dropzone:text-slate-900 shadow-sm transition-colors">
                    <Icon name="image" className="w-4 h-4 stroke-[2.3]" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Upload a family reference photograph</p>
                  <p className="text-[10px] text-slate-400 font-medium">PNG, JPEG, or WEBP layouts up to 5MB</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsComposerOpen(false)}
                  className="h-9 px-4 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Discard Form
                </button>
                <button 
                  type="submit" 
                  className="h-9 px-5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Commit Entry
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Search & Filter Component Group Row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <div className="relative flex-grow h-11 group">
            <input 
              type="text" 
              placeholder="Search directory by parent profiles, relations, phone indexes, or child identities..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all duration-200 shadow-sm font-medium"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
              <Icon name="search" className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                className={`h-11 px-5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer
                  ${i === 0 
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Formatted Matrix Data Grid */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Parent / Guardian Information</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4">Linked Students</th>
                  <th className="p-4 hidden md:table-cell">Relation</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <ParentRow 
                  status="Verified"
                  name="Marcus Vance"
                  emailAddress="m.vance@centralnet.org"
                  phoneNumber="(555) 019-8831"
                  linkedStudents={["Leo Vance (10-A)", "Maya Vance (7-B)"]}
                  relationRole="Father"
                  imageUrl="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=150"
                />
                
                <ParentRow 
                  status="Pending Invite"
                  name="Helena Rostova"
                  emailAddress="h.rostova@academic-node.io"
                  phoneNumber="(555) 014-2900"
                  linkedStudents={["Aleksei Rostov (12-C)"]}
                  relationRole="Mother"
                  imageUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
                />
                
                <ParentRow 
                  status="Verified"
                  name="Arthur Jenkins"
                  emailAddress="a.jenkins@domain.com"
                  phoneNumber="(555) 017-4412"
                  linkedStudents={["Tommy Jenkins (9-A)"]}
                  relationRole="Grandfather"
                  imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation Pagination Controls */}
        <div className="flex items-center justify-between">
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">
            Previous Page
          </button>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">1</span>
            <span className="text-slate-400 hover:bg-slate-100 hover:text-slate-900 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer">2</span>
          </div>
          <button className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">
            Next Page
          </button>
        </div>

      </div>
    </div>
  );
};

export default Parent;