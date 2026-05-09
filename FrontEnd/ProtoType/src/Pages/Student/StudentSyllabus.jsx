import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Calendar, 
  Settings, 
  LogOut, 
  Search, 
  ChevronDown, 
  ArrowUpDown,
  Eye,
  Download,
  CalendarDays
} from 'lucide-react';



const SyllabusCard = ({ code, title, instructor, semester, fileType = "PDF" }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex-grow">
      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
        {code}
      </span>
      <h3 className="text-lg font-bold text-gray-900 mt-2">{title}</h3>
      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{instructor}</span>
        <span>•</span>
        <span>{semester}</span>
      </div>
    </div>
    <div className="flex gap-2 shrink-0 w-full md:w-auto">
      <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-gray-50 text-gray-700 text-sm font-semibold border border-gray-200 hover:bg-gray-100 transition-colors">
        <Eye size={16} />
        <span>View</span>
      </button>
      <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all">
        <Download size={16} />
        <span>{fileType}</span>
      </button>
    </div>
  </div>
);

// --- Main Component ---

const StudentSyllabus = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const syllabi = [
    { id: 1, code: "CHEM-101", title: "Introduction to Chemistry", instructor: "Prof. Evelyn Reed", semester: "Fall 2024", type: "PDF" },
    { id: 2, code: "HIST-240", title: "Modern World History", instructor: "Dr. Samuel Carter", semester: "Fall 2024", type: "PDF" },
    { id: 3, code: "MATH-150", title: "Calculus I", instructor: "Prof. Maria Gonzalez", semester: "Fall 2024", type: "PDF" },
    { id: 4, code: "ENGL-101", title: "Composition and Rhetoric", instructor: "Dr. Ben Williams", semester: "Fall 2024", type: "DOCX" },
  ];

  const filteredSyllabi = syllabi.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      
   

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="">
          
          <header className="mb-10">
            <p className="text-gray-500 mt-2">Access and download your course curriculum for the current semester.</p>
          </header>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                placeholder="Search by course or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <CalendarDays size={16} className="text-gray-400" />
                <span>Fall 2024</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <ArrowUpDown size={16} className="text-gray-400" />
                <span>Sort</span>
              </button>
            </div>
          </div>

          {/* Syllabus List */}
          <div className="grid gap-4">
            {filteredSyllabi.length > 0 ? (
              filteredSyllabi.map((item) => (
                <SyllabusCard 
                  key={item.id}
                  code={item.code}
                  title={item.title}
                  instructor={item.instructor}
                  semester={item.semester}
                  fileType={item.type}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-300" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No syllabi found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>

          {/* Help Footer */}
          <footer className="mt-16 py-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h4 className="text-blue-900 font-bold">Need help?</h4>
                <p className="text-blue-700/70 text-sm">Can't find a specific syllabus or having trouble downloading?</p>
              </div>
              <a href="#" className="px-6 py-2 bg-white text-blue-700 text-sm font-bold rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors shadow-sm">
                Contact Registrar
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default StudentSyllabus;