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
  const [isGridLayout] = useState(true);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  
  const navContainerRef = useRef(null);

  // Logic: Scroll the entire window to the top when the section changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [activeTitle]);

  // Logic: Detect if the sidebar container has a vertical scrollbar active
  useEffect(() => {
    const checkScrollbar = () => {
      if (navContainerRef.current) {
        const hasScroll = navContainerRef.current.scrollHeight > navContainerRef.current.clientHeight;
        setHasScrollbar(hasScroll);
      }
    };

    // Check on mount, when minimized toggle happens, or window resizes
    checkScrollbar();
    window.addEventListener("resize", checkScrollbar);
    
    // Tiny delay to catch DOM state updates after transitions complete
    const timeoutId = setTimeout(checkScrollbar, 350);

    return () => {
      window.removeEventListener("resize", checkScrollbar);
      clearTimeout(timeoutId);
    };
  }, [isMinimized]);

  // Handle Logout Action
  const handleLogout = () => {
    console.log("Logging out staff user...");
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold transition-all duration-200 group relative select-none w-full box-border ${
      isActive
        ? "text-white bg-slate-900 shadow-sm border border-slate-950 font-bold"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
    }`;

  // Helper component to render Tooltips when sidebar is minimized
  const SidebarTooltip = ({ title }) => (
    <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800 z-50">
      {title}
    </div>
  );

  // Dynamic Sidebar Width Calculator
  const getSidebarWidthClass = () => {
    if (!isMinimized) return "w-64";
    return hasScrollbar ? "w-24" : "w-20";
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="flex flex-grow items-start">
        
        {/* SIDEBAR */}
        <aside
          className={`bg-white h-screen sticky top-0 transition-all duration-300 flex flex-col z-30 flex-shrink-0 border-r border-slate-200/60 ${getSidebarWidthClass()}`}
        >
          {/* Logo/Toggle Section */}
          <div
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-16 flex-shrink-0 bg-white flex items-center justify-between px-6 cursor-pointer sticky top-0 z-20 dashboard-logo-header relative select-none"
          >
            {!isMinimized ? (
              <span className="font-black text-slate-900 text-xl tracking-tight transition-all duration-200 whitespace-nowrap">
                My<span className="text-slate-500 font-medium">class</span>
              </span>
            ) : (
              <div className="w-full flex items-center justify-center transition-all duration-200">
                <span className="font-black text-slate-900 px-5 text-lg bg-slate-100 w-10 h-10 flex items-center justify-center rounded-xl shadow-inner">
                  M
                </span>
              </div>
            )}

            {/* Elegant Modern Bottom Border Replacement */}
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-70" />
          </div>

          {/* Navigation Links Area — Scrollbar set to Left Side via RTL */}
          <div 
            ref={navContainerRef}
            className="overflow-y-auto overflow-x-hidden p-3 flex-grow custom-scrollbar" 
            style={{ direction: "rtl" }}
          >
            {/* Inner content container to force content back to standard LTR layout reading pattern */}
            <div style={{ direction: "ltr" }} className="space-y-1 w-full flex flex-col items-center">
              
              {/* Profile */}
              <NavLink to="/profile" onClick={() => setActiveTitle("Profile")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7zm0-11a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Profile
                </span>
                {isMinimized && <SidebarTooltip title="My Profile" />}
              </NavLink>

              {/* Teacher / Faculty Desk */}
              <NavLink to="/teacher" onClick={() => setActiveTitle("Teachers")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Faculties
                </span>
                {isMinimized && <SidebarTooltip title="Faculty Desk" />}
              </NavLink>

              {/* Staff Management */}
              <NavLink to="/staff" onClick={() => setActiveTitle("Staff")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 2.47a48.11 48.11 0 0 1 3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a2.25 2.25 0 0 1 2.508 1.94A47.11 47.11 0 0 0 5.105 14c-.07.41-.129.824-.176 1.24m-.176 1.24a2.25 2.25 0 0 1-2.247 1.978H3.5a2.25 2.25 0 0 1-2.247-1.978 48.59 48.59 0 0 1-.176-1.24M1.077 14c.343.05.684.105 1.025.165m0 0a2.25 2.25 0 0 1 2.508-1.94c.315-3.642.962-7.18 1.908-10.518" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Staffs
                </span>
                {isMinimized && <SidebarTooltip title="Staff Management" />}
              </NavLink>

              {/* Student Directory */}
              <NavLink to="/student" onClick={() => setActiveTitle("Students")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Students
                </span>
                {isMinimized && <SidebarTooltip title="Student Directory" />}
              </NavLink>

              {/* Parent / Guardian */}
              <NavLink to="/parent" onClick={() => setActiveTitle("Parents")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Guardians
                </span>
                {isMinimized && <SidebarTooltip title="Guardians" />}
              </NavLink>

              {/* Routine */}
              <NavLink to="/routine" onClick={() => setActiveTitle("Routine")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Routine
                </span>
                {isMinimized && <SidebarTooltip title="Class Routine" />}
              </NavLink>

              {/* Classrooms */}
              <NavLink to="/class" onClick={() => setActiveTitle("Classes")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8v5H8V7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 3v15a2 2 0 002 2h3" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 3v15a2 2 0 01-2 2h-3" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 16h4" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Class
                </span>
                {isMinimized && <SidebarTooltip title="Classrooms" />}
              </NavLink>

              {/* Assignment Link */}
              <NavLink to="/assignment" onClick={() => setActiveTitle("Assignment")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0 1 12 3c1.2 0 2.392.049 3.573.145m-1.787 12.233A3.75 3.75 0 0 0 13.75 11.5H8.25a3.75 3.75 0 0 0-3.682 3.12l-.652 3.911A8.917 8.917 0 0 0 12 21a8.917 8.917 0 0 0 8.084-5.231l-.652-3.911Z" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Assignment
                </span>
                {isMinimized && <SidebarTooltip title="Assignment" />}
              </NavLink>

              {/* Announcement */}
              <NavLink to="/announcement" onClick={() => setActiveTitle("Announcement")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Announcement
                </span>
                {isMinimized && <SidebarTooltip title="Announcement" />}
              </NavLink>

              {/* Event Link */}
              <NavLink to="/event" onClick={() => setActiveTitle("Event")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeDasharray="4 3" />
                    <circle cx="12" cy="12" r="3.5" className="fill-current opacity-80" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Event
                </span>
                {isMinimized && <SidebarTooltip title="Event" />}
              </NavLink>

              {/* Syllabus Link */}
              <NavLink to="/syllabus" onClick={() => setActiveTitle("Syllabus")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Syllabus
                </span>
                {isMinimized && <SidebarTooltip title="Syllabus" />}
              </NavLink>
             

              {/* Support */}
              <NavLink to="/support" onClick={() => setActiveTitle("Support")} className={navLinkClasses}>
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l8.982-2.246M18 3.618l1.743-1.307a1.875 1.875 0 1 1 2.25 3l-1.2 1.2m-3.193-2.893a9.96 9.96 0 0 0-6.108-.344l-2.09-.523a1.94 1.94 0 0 0-2.316 2.315l.522 2.09a9.961 9.961 0 0 0 .345 6.108m13.136-9.64a9.959 9.959 0 0 1 .344 6.108l.523 2.09a1.94 1.94 0 0 1-2.315 2.316l-2.09-.522a9.961 9.961 0 0 1-6.108-.345M18 3.618l-3.193 2.893m-3.193 6.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <span className={`truncate tracking-wide whitespace-nowrap transition-all duration-200 ${isMinimized ? "w-0 opacity-0 pointer-events-none inline-block overflow-hidden" : "w-auto opacity-100"}`}>
                  Support
                </span>
                {isMinimized && <SidebarTooltip title="Help & Support" />}
              </NavLink>
             
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow flex flex-col min-w-0">
          
          {/* HIGH-END MINIMAL DASHBOARD HEADER */}
          <header className="h-16 bg-slate-50/60 backdrop-blur-md w-full flex items-center justify-between px-5 sticky top-0 z-60 shadow-sm shadow-slate-100/40"> 
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
                onClick={() => setActiveTitle("Profile")}
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