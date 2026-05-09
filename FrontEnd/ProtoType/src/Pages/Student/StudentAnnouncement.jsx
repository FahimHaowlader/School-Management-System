import React, { useState,useEffect } from 'react';
import { 
  Megaphone, 
  Search, 
  ArrowLeft, 
  ArrowRight,
  Clock
} from 'lucide-react';



// --- Sub-components ---

const AnnouncementCard = ({ category, title, description, date, imageUrl, isNew }) => {
  const categoryColors = {
    Academic: "bg-green-50 text-green-700 border-green-100",
    General: "bg-orange-50 text-orange-700 border-orange-100",
    Events: "bg-blue-50 text-blue-700 border-blue-100",
  };

  return (
    <div className="p-5 bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Container */}
        <div 
          className="w-full lg:w-72 aspect-video bg-center bg-cover rounded-xl shrink-0 shadow-sm" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Content Container */}
        <div className="flex flex-col justify-center gap-3 grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${categoryColors[category] || categoryColors.General}`}>
                {category}
              </span>
              {isNew && (
                <span className="flex items-center gap-1.5 text-blue-600 text-xs font-bold animate-pulse">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  NEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
              <Clock size={12} />
              {date}
            </div>
          </div>

          <h3 className="text-gray-900 text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-end mt-2">
            <button className="px-5 py-2 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 text-sm font-bold rounded-xl transition-all border border-gray-100">
              Read Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const StudentAnnouncement = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const filters = ["All", "General", "Academic", "Administrative", "Events"];

  const announcements = [
    {
      id: 1,
      category: "Academic",
      title: "Final Exam Schedule for Fall Semester Released",
      description: "The official final exam schedule is now available. Please review the dates and times for your courses to prepare accordingly.",
      date: "Oct 26, 2023",
      isNew: true,
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      category: "General",
      title: "Campus Library Holiday Hours",
      description: "Please be advised of the updated operating hours for the main library during the upcoming winter break. Plan your visits accordingly.",
      date: "Oct 25, 2023",
      isNew: false,
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      category: "Events",
      title: "Annual Tech Symposium - Call for Papers",
      description: "The annual tech symposium is approaching! We invite all students to submit papers for presentation. The deadline for submission is November 15th.",
      date: "Oct 24, 2023",
      isNew: false,
      imageUrl: "https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?auto=format&fit=crop&w=400&q=80"
    }
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900">
      
      <main className="">
        <div className="">
          
          {/* Title and Search Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-gray-500 mt-2 font-medium">Stay updated with the latest campus news and academic alerts.</p>
            </div>
            
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Find an update..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                  activeFilter === filter 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100" 
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Announcement List */}
          <div className="flex flex-col gap-5">
            {announcements
              .filter(a => (activeFilter === "All" || a.category === activeFilter) && 
                           a.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item) => (
                <AnnouncementCard key={item.id} {...item} />
              ))
            }
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-12 border-t border-gray-200 pt-8">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors">
              <ArrowLeft size={18} /> Previous
            </button>
            
            <div className="hidden md:flex items-center gap-2">
              {[1, 2, 3].map(page => (
                <button 
                  key={page}
                  className={`size-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                    page === 1 
                      ? "bg-blue-50 text-blue-600 border-2 border-blue-600" 
                      : "bg-white text-gray-400 hover:text-gray-600 border border-transparent"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              Next <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default StudentAnnouncement;