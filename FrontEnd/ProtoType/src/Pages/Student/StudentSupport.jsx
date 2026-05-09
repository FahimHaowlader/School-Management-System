import React, { useState } from 'react';
import { 
  MdSearch, 
  MdSchool, 
  MdSpa, 
  MdHeadsetMic, 
  MdLocalLibrary, 
  MdWork, 
  MdCelebration, 
  MdAdd, 
  MdRemove,
  MdNotificationsNone,
  MdChevronRight
} from 'react-icons/md';

const ResourceCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
    <div className="flex items-center gap-4">
      <div className="bg-blue-50 text-blue-600 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={26} />
      </div>
      <p className="text-gray-900 text-lg font-bold leading-normal">{title}</p>
    </div>
    <p className="text-gray-500 text-sm font-medium leading-relaxed">
      {description}
    </p>
    <a className="text-blue-600 text-sm font-bold leading-normal mt-2 flex items-center gap-1 hover:gap-2 transition-all" href="#">
      Learn More <MdChevronRight size={18} />
    </a>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between py-5 text-left focus:outline-none"
      >
        <span className="text-gray-800 font-semibold">{question}</span>
        <span className="text-gray-400">
          {isOpen ? <MdRemove size={22} className="text-blue-600" /> : <MdAdd size={22} />}
        </span>
      </button>
      {isOpen && (
        <div className="text-gray-500 pb-5 text-sm leading-relaxed animate-in fade-in duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const StudentSupport = () => {
  const resources = [
    { icon: MdSchool, title: "Academic Advising", description: "Get guidance on course selection, degree requirements, and academic planning." },
    { icon: MdSpa, title: "Counseling & Wellness", description: "Confidential support for personal, emotional, and mental health concerns." },
    { icon: MdHeadsetMic, title: "Technical (IT) Support", description: "Assistance with password resets, software issues, and campus Wi-Fi." },
    { icon: MdLocalLibrary, title: "Library Services", description: "Access research databases, book study rooms, and get help from librarians." },
    { icon: MdWork, title: "Career Services", description: "Get help with resumes, interviews, and finding internships or jobs." },
    { icon: MdCelebration, title: "Student Life", description: "Find information on clubs, events, and other campus activities." },
  ];

  const faqs = [
    { 
      question: "How do I declare my major?", 
      answer: "To declare your major, you typically need to fill out a form from the registrar's office and get it signed by your academic advisor. Please schedule a meeting with your advisor through the Academic Advising portal." 
    },
    { 
      question: "Where can I get help with my password?", 
      answer: "For password-related issues, please contact the IT Support help desk. You can visit their office in the library or submit a ticket through the IT Support section." 
    },
    { 
      question: "What are the library's hours?", 
      answer: "The library is open from 8:00 AM to 11:00 PM, Monday through Friday, and 10:00 AM to 8:00 PM on weekends." 
    }
  ];

  return (
    <div className="min-h-screen font-['Lexend'] text-gray-900">
   

      {/* Main Content */}
      <main className="flex flex-col items-center pb-10">
        <div className="w-full space-y-5">
          
          {/* Hero Section */}
          <div className="text-center md:text-left space-y-4">
           
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl font-medium">
              Find the assistance and guidance you need to thrive in your academic journey.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative group max-w-3xl">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <MdSearch size={26} />
            </div>
            <input 
              type="text" 
              placeholder="Search for resources (e.g., 'career advice', 'IT help')"
              className="w-full h-16 pl-14 pr-6 rounded-2xl border-none bg-white text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-xl shadow-blue-900/5 placeholder:text-gray-400 font-medium"
            />
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((res, idx) => (
              <ResourceCard key={idx} {...res} />
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
            <h2 className="text-gray-900 text-3xl font-black mb-8">FAQs</h2>
            <div className="divide-y divide-gray-50">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default StudentSupport;