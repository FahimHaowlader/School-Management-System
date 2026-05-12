import React, { useState } from 'react'
import { Outlet } from 'react-router'
import DashBoardFooter from '@Global/Components/DashBoardFooter'

const MainLayout = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    // relative allows z-index to function correctly against children
    <div className='relative flex flex-col min-h-screen'>
      
      {/* 1. Main Flex Container */}
      <div className='flex flex-grow'>
        
        {/* SIDEBAR - Lower z-index so footer can cover it */}
        <aside 
          className={`bg-gray-100 h-screen sticky top-0 transition-all duration-300 flex flex-col z-10 border-r border-gray-200 ${
            isMinimized ? 'w-20' : 'w-60'
          }`}
        >
          {/* Fixed Logo Section */}
          <div 
            onClick={() => setIsMinimized(!isMinimized)}
            className='bg-red-500 h-10 flex-shrink-0 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors sticky top-0'
          >
            <h1 className='font-bold text-white'>{isMinimized ? 'L' : 'LOGO'}</h1>
          </div>

          {/* SCROLLABLE Navigation Links */}
         <div 
  className='overflow-y-auto p-4 flex-grow custom-scrollbar' 
  style={{ direction: 'rtl' }} 
>
  {/* 2. We set direction back to 'ltr' so the text/icons look normal */}
  <div style={{ direction: 'ltr' }} className='space-y-8' >
            
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              {/* <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p>
              <p className='truncate font-medium text-gray-700'>
                {isMinimized ? '🏠' : `Navigation ${ 1}`}
              </p> */}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className='flex-grow flex flex-col'>
          {/* Header - Lower z-index than footer */}
          <header className='sticky top-0 bg-white h-10 flex-shrink-0 flex items-center px-4 border-b border-gray-300 z-10'>
            <h1 className='text-lg font-bold text-gray-800'>Main Layout Header</h1>
          </header>
          
          {/* Content - Ensure enough height to test scrolling */}
          <div className='p-6 flex-grow bg-white'>
            <div className="min-h-[150vh]">
               <Outlet />
               <p className="mt-4 text-gray-500">Scroll down to see the footer cover the sidebar and header...</p>
            </div>
          </div>
        </main>
      </div>

      {/* 2. Full Width Footer - Higher z-index + relative + solid background */}
      <div className='relative z-20 bg-white'> 
         <DashBoardFooter />
      </div>
    </div>
  )
}

export default MainLayout