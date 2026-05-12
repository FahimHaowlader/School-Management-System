import React, { useState } from 'react'

const ProxyLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Define widths for easy maintenance
  const sidebarWidth = isCollapsed ? 'w-16' : 'w-1/4';
  const contentWidth = isCollapsed ? 'w-[calc(100%-4rem)]' : 'w-3/4';

  return (
    <div className='relative'>
      {/* 1. STICKY HEADER */}
      <div className='flex sticky top-0 z-10 bg-white border-b h-16 items-center transition-all duration-300'>
        {/* LOGO SECTION: Shrinks when collapsed */}
        <div className={`${sidebarWidth} flex items-center justify-center border-r h-full overflow-hidden transition-all duration-300`}>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="font-bold whitespace-nowrap"
          >
            {isCollapsed ? 'L' : 'Logo'}
          </button>
        </div>
        
        {/* TOP NAV SECTION: Expands when sidebar shrinks */}
        <div className={`${contentWidth} px-4 transition-all duration-300`}>
          My Layout
        </div>
      </div>

      <div className='flex'>
        {/* 2. SIDEBAR SECTION */}
        <div className={`${sidebarWidth} h-[calc(100vh-64px)] overflow-y-scroll border-r sticky top-16 transition-all duration-300 bg-white`}>
          {Array(50).fill(0).map((_, i) => (
            <p key={i} className="p-2 whitespace-nowrap overflow-hidden">
              {isCollapsed ? '🏠' : `Link ${i + 1}`}
            </p>
          ))}
        </div>

        {/* 3. MAIN CONTENT SECTION */}
        <div className={`${contentWidth} p-10 transition-all duration-300`}>
          <div className='h-[250vh] bg-gray-50 p-4 rounded-lg'>
            <h2 className="text-xl font-bold">Main Content Area</h2>
            <p>The sidebar is currently: <b>{isCollapsed ? 'Minimized' : 'Expanded'}</b></p>
            <p className="mt-4">Scroll down to see the footer slide over the top.</p>
          </div>
        </div>
      </div>

      {/* 4. FOOTER: Higher z-index to cover everything */}
      <div className='relative z-20 h-screen bg-slate-800 text-white flex items-center justify-center'>
        <h1 className="text-4xl">Footer (Covers Screen)</h1>
      </div>
    </div>
  )
}

export default ProxyLayout