import React from "react";

const NotFound = () => {
  return (
    /* 
       1. h-[calc(100vh-64px)]: Subtracts the approximate height of your TopNav (usually 64px) 
       2. flex-1: Ensures it takes up the remaining space next to the Sidebar
    */
    <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-120px)] w-full px-6 transition-all duration-500">
      <div className="flex flex-col items-center w-full ">
        
        {/* Editorial Graphic */}
        <div className="relative h-24 w-px bg-slate-200 mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-blue-600 bg-white" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 animate-pulse" />
        </div>

        {/* Text Content */}
        <div className="text-center">
          <div className="inline-block px-2 py-1 mb-4">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
              Error Code 04
            </span>
          </div>
          
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-3">
            Unknown <span className="text-blue-600">Location</span>
          </h1>
          
          <p className="text-[12px] font-medium text-slate-500 leading-relaxed tracking-wide mb-8">
            The path you followed does not exist within the portal directory. 
            Please use the side navigation to return to your dashboard.
          </p>

          {/* Action Button */}
          <button 
            onClick={() => window.location.href = '/'}
            className="group flex items-center justify-center gap-3 mx-auto px-10 py-3.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all  active:scale-95 shadow-xl shadow-slate-200/50"
          >
            <span>Return to Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;