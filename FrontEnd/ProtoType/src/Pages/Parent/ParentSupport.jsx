import React from 'react';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileQuestion, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight,
  LifeBuoy,
  Clock,
  ExternalLink
} from 'lucide-react';

const ParentSupport = () => {
  const faqCategories = [
    { 
      title: "Academic Support", 
      desc: "Grades, attendance, and curriculum", 
      icon: <BookOpen size={20} />, 
      color: "text-blue-600 bg-blue-50" 
    },
    { 
      title: "Payments & Fees", 
      desc: "Invoices, scholarships, and methods", 
      icon: <ShieldCheck size={20} />, 
      color: "text-orange-600 bg-orange-50" 
    },
    { 
      title: "Technical Issues", 
      desc: "Login, app errors, and sync", 
      icon: <LifeBuoy size={20} />, 
      color: "text-purple-600 bg-purple-50" 
    },
  ];

  const popularArticles = [
    "How to track my child's daily attendance?",
    "Resetting your parent portal password",
    "Understanding the new grading system",
    "Upcoming parent-teacher conference schedule"
  ];

  return (
    <div className="flex w-full font-sans bg-gray-50 text-gray-900 pb-12">
      <main className="flex-1 space-y-8">
        
        {/* --- SEARCH HERO SECTION --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 flex flex-col items-center text-center">
          <div className="bg-blue-600 text-white p-4 rounded-[1.5rem] mb-6 shadow-lg shadow-blue-100">
            <MessageCircle size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">How can we help you today?</h1>
          <p className="text-gray-400 font-bold mt-2">Search our knowledge base or reach out to our support team.</p>
          
          <div className="relative w-full max-w-2xl mt-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or keywords..."
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-0 rounded-3xl text-sm font-bold focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none shadow-inner"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: FAQ CATEGORIES */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {faqCategories.map((cat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
                  <div className={`${cat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-black text-gray-900 text-sm mb-1">{cat.title}</h3>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight leading-tight">{cat.desc}</p>
                </div>
              ))}
            </div>

            {/* POPULAR ARTICLES */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <FileQuestion className="text-blue-600" size={24} /> Popular Articles
              </h2>
              <div className="divide-y divide-gray-50">
                {popularArticles.map((article, i) => (
                  <button key={i} className="w-full flex items-center justify-between py-5 group">
                    <span className="text-gray-600 font-bold group-hover:text-blue-600 transition-colors text-sm">{article}</span>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-600 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-gray-200">
              <h2 className="text-xl font-black mb-2">Direct Support</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Average Response: 15 mins</p>
              
              <div className="space-y-4">
                <ContactMethod 
                  icon={<MessageCircle size={18} />} 
                  label="Live Chat" 
                  value="Available Now" 
                  active 
                />
                <ContactMethod 
                  icon={<Mail size={18} />} 
                  label="Email Support" 
                  value="support@schoolsys.com" 
                />
                <ContactMethod 
                  icon={<Phone size={18} />} 
                  label="Call Center" 
                  value="+880 1712 345678" 
                />
              </div>

              <div className="mt-8 p-5 bg-white/5 rounded-[1.5rem] border border-white/10 flex items-center gap-4">
                <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Office Hours</p>
                  <p className="text-xs font-bold">Sun - Thu, 9AM - 6PM</p>
                </div>
              </div>
            </div>

            {/* RESOURCE LINKS */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <QuickLink label="Parent Handbook" />
                <QuickLink label="Privacy Policy" />
                <QuickLink label="Terms of Service" />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ContactMethod = ({ icon, label, value, active = false }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 transition-all cursor-pointer group">
    <div className={`p-2.5 rounded-xl transition-colors ${active ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400 group-hover:text-white'}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter leading-none mb-1">{label}</p>
      <p className={`text-sm font-bold ${active ? 'text-blue-400' : 'text-gray-200'}`}>{value}</p>
    </div>
  </div>
);

const QuickLink = ({ label }) => (
  <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-blue-600 transition-all group font-bold text-xs">
    {label}
    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

export default ParentSupport;