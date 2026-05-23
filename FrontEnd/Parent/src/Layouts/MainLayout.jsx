// import Package components
import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink } from "react-router";

// import Global Components
import DashBoardFooter from "@Global/Components/DashBoardFooter";

// Local Asset Placeholder (Replace with your actual import path)
import Pic from "../Assets/p.jpg";

const MainLayout = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTitle, setActiveTitle] = useState("Profile");
  const [isGridLayout, setIsGridLayout] = useState(true);

  // Active student switching state data
  const childrenList = [
    { id: "c1", name: "Samiha Haowlader", class: "Class 8, Sec A", roll: "12" },
    { id: "c2", name: "Zayan Haowlader", class: "Class 3, Sec B", roll: "45" }
  ];
  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close child selection dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logic: Scroll the entire window to the top when the title changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [activeTitle]);

  const handleBackToWork = () => {
    console.log("Switching application ecosystem context back to active development workflows...");
  };

  // Handle Logout Action
  const handleLogout = () => {
    console.log("Logging out user...");
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-san text-sm font-semibold transition-all duration-200 group relative ${
      isActive
        ? "text-white bg-slate-900 shadow-sm border border-slate-950 font-bold"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
    }`;

  return (
    <div className="relative flex flex-col min-h-screen bg-slate-50 font-san select-none">
      <div className="flex flex-grow">
        
        {/* SIDEBAR */}
        <aside
          className={`bg-white h-screen sticky top-0 transition-all duration-300 flex flex-col z-30 flex-shrink-0 border-r border-slate-100 ${
            isMinimized ? "w-20" : "w-64"
          }`}
        >
          {/* Logo/Toggle Section */}
          <div
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-16 flex-shrink-0 bg-white flex items-center  justify-between px-6 cursor-pointer transition-colors sticky top-0 z-20 dashboard-logo-header"
          >
            {!isMinimized ? (
              <span className="font-black text-slate-900 text-xl tracking-tight">
                My<span className="text-slate-500 font-medium">class</span>
              </span>
            ) : (
              <div className="w-full flex items-center justify-center">
                <span className="font-black text-slate-900 text-lg bg-slate-100 w-10 h-10 px-4 flex items-center justify-center rounded-xl shadow-inner">
                  M
                </span>
              </div>
            )}

            {/* Elegant Modern Bottom Border Replacement */}
            <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-70" />
          </div>

          {/* Navigation Links Scroll Container */}
          <div
            className="overflow-y-auto p-3 flex-grow custom-scrollbar"
            style={{ direction: "rtl" }}
          >
            <div style={{ direction: "ltr" }} className="space-y-4">
              
              {/* SECTION I: GUARDIAN SETTINGS */}
              <div className="space-y-1">
                {!isMinimized && (
                  <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Guardian Data
                  </p>
                )}
                
                <NavLink to="/profile" onClick={() => setActiveTitle("Profile")} className={navLinkClasses}>
                  <div className="flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  {!isMinimized ? <span className="truncate tracking-wide">Profile</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Profile</div>}
                </NavLink>

                <NavLink to="/event" onClick={() => setActiveTitle("Event")} className={navLinkClasses}>
                  <div className="flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeDasharray="4 3" />
                      <circle cx="12" cy="12" r="3.5" className="fill-current opacity-80" />
                    </svg>
                  </div>
                  {!isMinimized ? <span className="truncate tracking-wide">Events</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Event</div>}
                </NavLink>

                <NavLink to="/announcement" onClick={() => setActiveTitle("Announcement")} className={navLinkClasses}>
                  <div className="flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                  </div>
                  {!isMinimized ? <span className="truncate tracking-wide">Announcement</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Announcement</div>}
                </NavLink>

                <NavLink to="/support" onClick={() => setActiveTitle("Support")} className={navLinkClasses}>
                  <div className="flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l8.982-2.246M18 3.618l1.743-1.307a1.875 1.875 0 1 1 2.25 3l-1.2 1.2m-3.193-2.893a9.96 9.96 0 0 0-6.108-.344l-2.09-.523a1.94 1.94 0 0 0-2.316 2.315l.522 2.09a9.961 9.961 0 0 0 .345 6.108m13.136-9.64a9.959 9.959 0 0 1 .344 6.108l.523 2.09a1.94 1.94 0 0 1-2.315 2.316l-2.09-.522a9.961 9.961 0 0 1-6.108-.345M18 3.618l-3.193 2.893m-3.193 6.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </div>
                  {!isMinimized ? <span className="truncate tracking-wide">Help Desk</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Support</div>}
                </NavLink>
              </div>

              {/* SECTION II: ACADEMICS DISCOVERY */}
              <div className="space-y-1">
                {!isMinimized ? (
                  <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Student Data
                  </p>
                ) : (
                  <div className="h-[1px] bg-slate-100 my-3" />
                )}

                <NavLink to="/student-profile" onClick={() => setActiveTitle("Student Profile")} className={navLinkClasses}>
                  <div className="flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a48.47 48.47 0 0 1 15.482 0m-15.482 0L12 5.606l7.74 4.541M12 21v-4.665c0-.663-.434-1.248-1.071-1.423a49.938 49.938 0 0 0-3.878-1.012M12 21v-4.665c0-.663.434-1.248 1.071-1.423a49.938 49.938 0 0 1 3.878-1.012M9 11.25v1.5a3.375 3.375 0 0 0 6.75 0v-1.5" />
                    </svg>
                  </div>
                  {!isMinimized ? <span className="truncate tracking-wide">Student Profile</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Student Profile</div>}
                </NavLink>

                <NavLink to="/syllabus" onClick={() => setActiveTitle("Syllabus")} className={navLinkClasses}>
                  <div className="flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  {!isMinimized ? <span className="truncate tracking-wide">Syllabus</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Syllabus</div>}
                </NavLink>

                <NavLink to="/routine" onClick={() => setActiveTitle("Routine")} className={navLinkClasses}>
                  <div className="flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  {!isMinimized ? <span className="truncate tracking-wide">Routine</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Routine</div>}
                </NavLink>

                <NavLink to="/assignment" onClick={() => setActiveTitle("Assignment")} className={navLinkClasses}>
                  <div className="flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0 1 12 3c1.2 0 2.392.049 3.573.145m-1.787 12.233A3.75 3.75 0 0 0 13.75 11.5H8.25a3.75 3.75 0 0 0-3.682 3.12l-.652 3.911A8.917 8.917 0 0 0 12 21a8.917 8.917 0 0 0 8.084-5.231l-.652-3.911Z"
                    />
                  </svg>
                </div>
                  {!isMinimized ? <span className="truncate tracking-wide">Assignment</span> : <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">Assignment</div>}
                </NavLink>
              </div>

            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow flex flex-col min-w-0">
          
          {/* HIGH-END MINIMAL DASHBOARD HEADER */}
          <header className="h-16 bg-slate-50/60 backdrop-blur-md w-full flex items-center justify-between px-5 sticky top-0 z-20 shadow-sm shadow-slate-100/40">
            <div className="flex flex-col text-left">
              <h1 className="text-xl uppercase font-black text-slate-900 tracking-tight leading-none">
                {activeTitle}
              </h1>

              {/* Dynamic Minimal Breadcrumb Section */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Dashboard
                </span>
                <span className="text-[10px] text-slate-300 font-medium">
                  /
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  {activeTitle}
                </span>
              </div>
            </div>

            {/* Right-aligned Control Utilities */}
            <div className="flex items-center gap-4">
              
              {/* CHILD SWITCHER SELECTOR DROPDOWN CONTAINER */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="h-12 px-4 border border-slate-200 bg-white text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all shadow-sm flex items-center gap-3 group flex-shrink-0"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Viewing Data for</span>
                    <span className="text-xs font-extrabold text-slate-800 mt-1 tracking-wide leading-none">{selectedChild.name}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown Options List */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Child Account</p>
                    </div>
                    {childrenList.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => {
                          setSelectedChild(child);
                          setIsDropdownOpen(false);
                          console.log(`Switched context to active student: ${child.name}`);
                        }}
                        className={`w-full px-4 py-2.5 text-left flex flex-col hover:bg-slate-50 transition-colors ${selectedChild.id === child.id ? 'bg-slate-50/50' : ''}`}
                      >
                        <span className={`text-xs font-bold ${selectedChild.id === child.id ? 'text-blue-600' : 'text-slate-800'}`}>
                          {child.name}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                          {child.class} • Roll {child.roll}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Badge - Explicitly Locked at h-12 */}
              <div className="h-12 flex items-center gap-3 bg-white pl-1.5 pr-4 rounded-xl border border-slate-200/80 shadow-sm flex-shrink-0 box-border">
                <img
                  src={Pic}
                  alt="profile"
                  className="w-9 h-9 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                />
                <div className="flex flex-col text-left hidden sm:flex justify-center">
                  <span className="text-sm font-bold text-slate-800 leading-none tracking-wide">
                    Fahim Haowlader Jahid
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wider leading-none">
                    Guardian Account
                  </span>
                </div>
              </div>

              {/* BACK TO WORK ACTION BUTTON */}
              <button 
                onClick={handleBackToWork}
                className="h-12 px-4 border cursor-pointer border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all shadow-sm flex items-center gap-2.5 group box-border flex-shrink-0"
                title="Back to Work"
              >
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 transform group-hover:rotate-180 transition-transform duration-500 ease-out text-slate-400 group-hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 tracking-wide transition-colors hidden md:inline">
                  Back to Work
                </span>
              </button>

              {/* Minimal Slate Action Button for Logout - Explicitly Locked at h-12 w-12 */}
              <button
                onClick={handleLogout}
                className="h-12 w-12 border cursor-pointer border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-900 hover:border-slate-950 hover:text-white transition-all shadow-sm flex items-center justify-center group box-border flex-shrink-0"
                title="Logout Account"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Main Workspace Body */}
          <div className="p-5 flex-grow bg-slate-50 min-h-[200vh]">
            <div>
              {/* Context hooks inject selectedChild straight downward cleanly */}
              <Outlet context={{ selectedChild, isGridLayout }} />
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