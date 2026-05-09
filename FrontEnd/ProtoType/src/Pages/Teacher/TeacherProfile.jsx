import React from 'react';
import { 
  Star, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  History, 
  FileText, 
  Quote,
  CalendarPlus,
  MessageSquare,
  Users,
  Search,
  BookOpen,
  Briefcase
} from 'lucide-react';
import Pic from '../../Assets/p.jpg';

const TeacherProfile = () => {
  const qualifications = [
    { title: "Ph.D. in Astrophysics", school: "Stellar University, 2012", icon: <GraduationCap size={20} /> },
    { title: "M.Sc. in Physics", school: "Quantum College, 2008", icon: <GraduationCap size={20} /> },
    { title: "Certified Physics Educator", school: "National Board of Education, 2009", icon: <Award size={20} /> },
  ];

  const development = [
    "Advanced Teaching Methodologies Workshop",
    "Digital Classroom Integration Course",
    "Student-Centered Learning Conference"
  ];

  const teachingHistory = [
    {
      role: "Lead Physics Teacher",
      period: "Northwood High School | 2015 - Present",
      tasks: [
        "Developed AP Physics curriculum, resulting in a 15% increase in exam pass rates.",
        "Mentored the school's science club, achieving first place in the state olympiad."
      ]
    },
    {
      role: "Science Teacher",
      period: "Oak Valley Middle School | 2010 - 2015",
      tasks: [
        "Taught general science and introductory physics to grades 7-8.",
        "Organized the annual school science fair, increasing participation by 40%."
      ]
    }
  ];

  const testimonials = [
    { name: "John Doe", role: "Former Student", text: "Dr. Vance made physics understandable and fun. I wouldn't have passed my AP exam without her!" },
    { name: "Jane Smith", role: "Former Student", text: "An amazing teacher who genuinely cares about her students' success. Highly recommended." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      
      {/* LEFT COLUMN */}
      <div className="lg:col-span-1 space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
          <div className="relative">
            <img 
              src={Pic} 
              alt="Profile" 
              className="h-32 w-32 rounded-[2rem] object-cover border-4 border-white shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full h-6 w-6 border-4 border-white"></div>
          </div>
          
          <h1 className="text-2xl font-black text-gray-900 mt-6">Fahim Haowlader Jahid</h1>
          <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mt-1">Physics Senior Faculty</p>
          <p className="text-gray-400 text-xs mt-2 font-medium italic">12 Years of Experience</p>

          <div className="flex items-center gap-6 mt-8 w-full justify-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="font-black text-gray-900">4.9</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Rating</span>
            </div>
            <div className="h-8 w-px bg-gray-100"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-purple-500">
                <Users size={18} />
                <span className="font-black text-gray-900">1,500+</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Students</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 w-full">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3.5 text-white font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
              <CalendarPlus size={18} /> <span>Book a Lesson</span>
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-3.5 text-gray-700 font-black hover:bg-gray-100 transition-all active:scale-95">
              <MessageSquare size={18} /> <span>Send Message</span>
            </button>
          </div>
        </div>

        {/* Academic Qualifications */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <GraduationCap className="text-blue-600" size={20} /> Qualifications
          </h2>
          <div className="space-y-6">
            {qualifications.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">{item.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Development */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="text-blue-600" size={20} /> Development
          </h2>
          <div className="space-y-3">
            {development.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <CheckCircle size={16} className="text-emerald-500" />
                <span className="text-xs font-bold text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* About Me */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-500 font-medium leading-relaxed text-justify">
            Passionate and dedicated teacher with a strong commitment to inspiring and empowering students through engaging, creative, and personalized learning experiences. Skilled in fostering a positive classroom environment that encourages curiosity, critical thinking, and a love for lifelong learning. My journey into physics was driven by a fascination with the universe's fundamental laws, and I strive to share that wonder with my students.
          </p>
        </div>

        {/* Teaching History */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
          <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <History className="text-blue-600" /> Teaching History
          </h2>
          <div className="space-y-10">
            {teachingHistory.map((job, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-gray-100 last:border-0 pb-2">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
                <h3 className="font-black text-gray-900 text-lg">{job.role}</h3>
                <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-wider">{job.period}</p>
                <ul className="mt-4 space-y-2">
                  {job.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-500 font-medium">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0"></div>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Publications & Research */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="text-blue-600" /> Publications & Research
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gray-50 rounded-[2rem] hover:bg-blue-50 transition-all group">
              <h4 className="font-black text-gray-900 group-hover:text-blue-600 text-sm">"Engaging Students via Gamification"</h4>
              <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">Journal of Modern Teaching, 2021</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-[2rem] hover:bg-blue-50 transition-all group">
              <h4 className="font-black text-gray-900 group-hover:text-blue-600 text-sm">"Study of Binary Star Systems"</h4>
              <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">Astrophysics Monthly, 2012</p>
            </div>
          </div>
        </div>

        {/* Student Testimonials */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
          <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <Quote className="text-blue-600" /> Student Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-50 italic">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm leading-none">{t.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherProfile;