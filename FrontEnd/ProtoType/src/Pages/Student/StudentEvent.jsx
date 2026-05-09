import React, { useState,useEffect } from 'react';
import { 
  MdSchool, 
  MdNotifications, 
  MdDarkMode, 
  MdSearch, 
  MdCalendarMonth, 
  MdLocationOn,
  MdEventBusy
} from "react-icons/md";

const eventsData = [
  {
    id: 1,
    category: 'Academic',
    status: 'Required',
    title: 'Annual Science Fair',
    description: 'Showcasing the best student projects from across all grades.',
    date: 'Oct 26, 2026',
    time: '9:00 AM - 4:00 PM',
    location: 'Main Gymnasium',
    type: 'primary'
  },
  {
    id: 2,
    category: 'Sports',
    status: 'Optional',
    title: 'Varsity Basketball Finals',
    description: 'Cheer on our team in the championship game against Northwood High!',
    date: 'Nov 05, 2026',
    time: '7:00 PM',
    location: 'Sports Arena',
    type: 'teal'
  },
  {
    id: 3,
    category: 'Cultural',
    status: 'Optional',
    title: 'Winter Music Concert',
    description: 'A festive evening featuring performances by the school orchestra and choir.',
    date: 'Dec 12, 2026',
    time: '6:30 PM',
    location: 'Auditorium',
    type: 'purple'
  }
];

const StudentEvent = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}, []);

  return (
    <div className="min-h-screen font-sans text-[#111318]">
      {/* Top Navigation */}
      {/* <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-3">
          <MdSchool className="text-[#135bec] text-3xl" />
          <h2 className="text-lg font-bold tracking-tight">MyClass Portal</h2>
        </div>
        <div className="hidden md:flex gap-8">
          {['Dashboard', 'Grades', 'Events', 'Classes', 'Library'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className={`text-sm font-medium transition-colors ${item === 'Events' ? 'text-[#135bec] font-bold' : 'text-gray-500 hover:text-[#135bec]'}`}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <IconButton icon={<MdNotifications size={20} />} />
          <IconButton icon={<MdDarkMode size={20} />} />
          <div className="size-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" alt="Profile" />
          </div>
        </div>
      </header> */}

      <div className="flex">
        {/* Sidebar Filters */}
        {/* <aside className="w-72 border-r border-gray-200 bg-white p-6 hidden md:block sticky top-16 h-[calc(100vh-64px)]">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-blue-100" />
              <div>
                <h1 className="text-sm font-bold">Alex Johnson</h1>
                <p className="text-xs text-gray-500 font-medium">Grade 11</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Filters</h3>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Date Range</label>
                <input type="date" className="w-full rounded-xl border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none h-10 px-3" />
              </div>

              <FilterGroup title="Category" options={['Academic', 'Sports', 'Cultural', 'Social', 'Workshops']} type="checkbox" />
              <FilterGroup title="Attendance" options={['All', 'Required', 'Optional']} type="radio" name="attendance" />
            </div>
          </div>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 ">
          <div className="">
            {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <h1 className="text-4xl font-black tracking-tight">School Events</h1>
              <div className="relative w-full md:w-80">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  placeholder="Search for events..." 
                  className="w-full h-12 pl-12 pr-4 rounded-xl border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div> */}

            {/* Tab Navigation */}
            <div className="flex gap-8 border-b border-gray-200 mb-8">
              <TabButton label="Upcoming Events" active={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')} />
              <TabButton label="Past Events" active={activeTab === 'past'} onClick={() => setActiveTab('past')} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {eventsData.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            {/* Empty State (Hidden by default) */}
            {eventsData.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                <MdEventBusy size={64} className="mb-4 text-gray-400" />
                <h3 className="text-xl font-bold">No Events Found</h3>
                <p className="text-sm">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const IconButton = ({ icon }) => (
  <button className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
    {icon}
  </button>
);

const FilterGroup = ({ title, options, type, name }) => (
  <div>
    <h4 className="text-xs font-bold text-gray-700 mb-3">{title}</h4>
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
          <input 
            type={type} 
            name={name}
            className={`rounded border-gray-300 text-[#135bec] focus:ring-[#135bec] ${type === 'radio' ? 'form-radio' : 'form-checkbox'}`} 
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`pb-4 text-sm font-bold transition-all border-b-2 ${active ? 'border-[#135bec] text-[#135bec]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
  >
    {label}
  </button>
);

const EventCard = ({ category, status, title, description, date, time, location }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between">
      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
        {category}
      </span>
      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${status === 'Required' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
        {status}
      </span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#135bec] transition-colors">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed flex-grow">{description}</p>
    <div className="pt-4 border-t border-gray-50 flex flex-col gap-2">
      <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
        <MdCalendarMonth size={18} className="text-gray-400" />
        {date} | {time}
      </div>
      <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
        <MdLocationOn size={18} className="text-gray-400" />
        {location}
      </div>
    </div>
    <button className="mt-2 w-full h-11 rounded-xl bg-[#135bec] text-white text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
      View Details
    </button>
  </div>
);

export default StudentEvent;