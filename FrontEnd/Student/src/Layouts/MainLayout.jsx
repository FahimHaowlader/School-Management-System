import React, { useState } from 'react'
import { Outlet } from 'react-router'
import DashBoardFooter from '@Global/Components/DashBoardFooter'

const MainLayout = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className='flex flex-col min-h-screen'>
      
      {/* 1. Main Flex Container */}
      <div className='flex flex-grow'>
        
        {/* SIDEBAR */}
        <aside 
          className={`bg-gray-100 h-screen sticky top-0 transition-all duration-300 flex flex-col ${
            isMinimized ? 'w-20' : 'w-60'
          }`}
        >
          {/* Fixed Logo Section */}
          <div 
            onClick={() => setIsMinimized(!isMinimized)}
            className='bg-red-300 h-10 flex-shrink-0 flex items-center justify-center cursor-pointer hover:bg-red-400 sticky top-0 z-20'
          >
            <h1 className='font-bold text-white'>{isMinimized ? 'L' : 'LOGO'}</h1>
          </div>

          {/* SCROLLABLE Navigation Links */}
          {/* Use h-80 for fixed height, overflow-y-auto for the scrollbar */}
          <div className='h-screen overflow-y-auto p-4 flex flex-col gap-10'>
            <p className='truncate'>{isMinimized ? '🏠' : 'Homee'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Homee'}</p>
            {/* Adding extra items to demonstrate the scroll */}
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
            <p className='truncate'>{isMinimized ? '🏠' : 'Home'}</p>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className='flex-grow flex flex-col'>
          <header className='sticky top-0 bg-gray-200 h-10 flex-shrink-0 flex items-center px-4 border-b border-gray-300 z-10'>
            <h1 className='text-lg font-bold'>Main Layout Header</h1>
          </header>
          
          <div className='p-6 flex-grow'>
            <Outlet />
          </div>
        </main>
      </div>

      {/* 2. Full Width Footer */}
      <DashBoardFooter />
    </div>
  )
}

export default MainLayout