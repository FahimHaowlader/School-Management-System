// import Package components
import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router";

// import Global Components
import DashBoardFooter from "@Global/Components/DashBoardFooter";

// Local Asset Placeholder (Replace with your actual import path)
import Pic from "../Assets/p.jpg";

const MainLayout = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTitle, setActiveTitle] = useState("Tasks");
  const [isGridLayout, setIsGridLayout] = useState(true);

  // Logic: Scroll the entire window to the top when the section changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [activeTitle]);

  // Handle Logout Action
  const handleLogout = () => {
    console.log("Logging out staff user...");
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold transition-all duration-200 group relative ${
      isActive
        ? "text-white bg-slate-900 shadow-sm border border-slate-950 font-bold"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
    }`;

  return (
    <div className="relative flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="flex flex-grow">
        
        {/* SIDEBAR */}
        <aside
          className={`bg-white h-screen sticky top-0 transition-all duration-300 flex flex-col z-30 flex-shrink-0 ${
            isMinimized ? "w-20" : "w-64"
          }`}
        >
          {/* Logo/Toggle Section */}
          <div
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-16 flex-shrink-0 bg-white flex items-center justify-between px-6 cursor-pointer transition-colors sticky top-0 z-20 dashboard-logo-header relative"
          >
            {!isMinimized ? (
              <span className="font-black text-slate-900 text-xl tracking-tight">
                My<span className="text-slate-500 font-medium">class</span>
               
              </span>
            ) : (
              <div className="w-full flex items-center justify-center">
                <span className="font-black text-slate-900 text-lg bg-slate-100 px-5 w-10 h-10 flex items-center justify-center rounded-xl shadow-inner">
                  M
                </span>
              </div>
            )}

            {/* Elegant Modern Bottom Border Replacement */}
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-70" />
          </div>

          {/* Navigation Links */}
          <div className="overflow-y-auto p-3 flex-grow custom-scrollbar" style={{ direction: "rtl" }}>
            <div style={{ direction: "ltr" }} className="space-y-1">
              
              {/* Task List Dashboard */}
              <NavLink to="/tasks" onClick={() => setActiveTitle("Tasks")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75 2.25 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0 1 12 3c1.2 0 2.392.049 3.573.145m-1.787 12.233A3.75 3.75 0 0 0 13.75 11.5H8.25a3.75 3.75 0 0 0-3.682 3.12l-.652 3.911A8.917 8.917 0 0 0 12 21a8.917 8.917 0 0 0 8.084-5.231l-.652-3.911Z" />
                  </svg>
                </div>
                {!isMinimized ? <span className="truncate tracking-wide">My Tasks</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">My Tasks</div>}
              </NavLink>

              {/* Typing Work / Document Processor */}
              <NavLink to="/typing" onClick={() => setActiveTitle("Typing")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
                {!isMinimized ? <span className="truncate tracking-wide">Typing Desk</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Typing Desk</div>}
              </NavLink>

              {/* Teacher Help Requests */}
              <NavLink to="/teacher-help" onClick={() => setActiveTitle("Teacher Assistance")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174c-.053-.45-.101-.937-.101-1.424 0-4.707 3.53-8.5 7.841-8.5s7.842 3.793 7.842 8.5c0 .487-.048.974-.101 1.424M3 19.5h18M4.5 19.5v-3a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v3m-15 0h15" />
                  </svg>
                </div>
                {!isMinimized ? <span className="truncate tracking-wide">Help Teachers</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Help Teachers</div>}
              </NavLink>

              {/* Notice Board Management */}
              <NavLink to="/notices" onClick={() => setActiveTitle("Notices")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                {!isMinimized ? <span className="truncate tracking-wide">Notice Updates</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Notice Updates</div>}
              </NavLink>

              {/* General Records & Files */}
              <NavLink to="/records" onClick={() => setActiveTitle("Records")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0A2.25 2.25 0 003 14.25v4.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 19.5v-4.5a2.25 2.25 0 00-2.25-1.5m-19.5 0h19.5" />
                  </svg>
                </div>
                {!isMinimized ? <span className="truncate tracking-wide">Files & Records</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Files & Records</div>}
              </NavLink>

            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow flex flex-col">
          
          {/* HIGH-END MINIMAL DASHBOARD HEADER */}
          <header className="h-16 bg-slate-50/60 backdrop-blur-md w-full flex items-center justify-between px-5 sticky top-0 z-20 shadow-sm shadow-slate-100/40"> 
            <div className="flex flex-col text-left">
              <h1 className="text-xl uppercase font-black text-slate-900 tracking-tight leading-none">{activeTitle}</h1>
              
              {/* Dynamic Minimal Breadcrumb Section */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Office Desk</span>
                <span className="text-[10px] text-slate-300 font-medium">/</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{activeTitle}</span>
              </div>
            </div>
            
            {/* Right-aligned Control Utilities */}
            <div className="flex items-center gap-4">

              {/* Profile Badge */}
              <NavLink 
                to="/profile" 
                onClick={() => setActiveTitle("Tasks")}
                className="h-12 flex items-center gap-3 bg-white pl-1.5 pr-4 rounded-xl border border-slate-200/80 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer group/profile box-border"
              >
                <img src={Pic} alt="profile" className="w-9 h-9 rounded-lg object-cover border border-slate-100 flex-shrink-0" />
                <div className="flex flex-col text-left hidden sm:flex justify-center">
                  <span className="text-sm font-bold text-slate-800 leading-none tracking-wide group-hover/profile:text-slate-900 transition-colors">
                    Fahim Haowlader Jahid
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wider leading-none">
                    Office Assistant / IT Support
                  </span>
                </div>
              </NavLink>

              {/* High-End Minimal Switch to Parent Button */}
              <button 
                onClick={() => {
                  console.log("Switching to Parent Dashboard view...");
                }}
                className="h-12 px-4 border cursor-pointer border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all shadow-sm flex items-center gap-2.5 group box-border flex-shrink-0"
                title="Switch to Parent View"
              >
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 transform group-hover:rotate-180 transition-transform duration-500 ease-out text-slate-400 group-hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 tracking-wide transition-colors hidden md:inline">
                  Switch to Guardian 
                </span>
              </button>

              {/* Minimal Slate Action Button for Logout */}
              <button 
                onClick={handleLogout}
                className="h-12 w-12 border cursor-pointer border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-900 hover:border-slate-950 hover:text-white transition-all shadow-sm flex items-center justify-center group box-border flex-shrink-0"
                title="Logout Account"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25" />
                </svg>
              </button>
            </div>
          </header>
          
          {/* Main Workspace Body */}
          <div className="p-5 flex-grow bg-slate-50 min-h-[250vh]">
            <div>
               <Outlet context={{ isGridLayout }} />
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <div className="relative z-20 bg-white border-t border-slate-100"> 
         <DashBoardFooter />
      </div>
    </div>
  );
};

export default MainLayout;