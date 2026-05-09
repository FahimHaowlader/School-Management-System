import React, { useState } from 'react';
import { 
  LifeBuoy, 
  MessageSquare, 
  FileQuestion, 
  BookOpen, 
  ShieldAlert, 
  Send,
  Search,
  ChevronRight,
  Clock,
  PhoneCall
} from 'lucide-react';

const TeacherSupport = () => {
  const [ticketSubject, setTicketSubject] = useState('');

  const faqCategories = [
    { id: 1, title: 'Academic Tools', icon: BookOpen, desc: 'Classroom management & LMS help', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, title: 'Technical Issue', icon: ShieldAlert, desc: 'Account access & software bugs', color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 3, title: 'Student Data', icon: FileQuestion, desc: 'Privacy & grading discrepancies', color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className='animate-in fade-in slide-in-from-bottom-3 duration-500'>
      {/* Top Search Banner */}
      <div className='relative overflow-hidden bg-blue-600 rounded-[2rem] p-8 md:p-12 mb-10 text-white shadow-xl shadow-blue-100'>
        <div className='relative z-10 max-w-2xl'>
          <h2 className='text-3xl font-black tracking-tight mb-4'>How can we help you today?</h2>
          <p className='text-blue-100 font-medium mb-8'>Access faculty resources, report technical glitches, or connect with the administrative support team.</p>
          
          <div className='relative group'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 group-focus-within:text-blue-600 transition-colors' size={20} />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or tutorials..." 
              className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all placeholder:text-blue-200'
            />
          </div>
        </div>
        {/* Decorative background circle */}
        <div className='absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-50'></div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
        {/* Left Column: Quick Actions & FAQs */}
        <div className='lg:col-span-2 space-y-8'>
          <section>
            <h3 className='text-sm font-black uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2'>
              <Clock size={16} /> Common Support Categories
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {faqCategories.map((cat) => (
                <button key={cat.id} className='bg-white border border-gray-100 p-6 rounded-2xl text-left hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group'>
                  <div className={`${cat.bg} ${cat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <cat.icon size={24} />
                  </div>
                  <h4 className='text-gray-900 font-bold mb-1'>{cat.title}</h4>
                  <p className='text-gray-400 text-xs leading-relaxed'>{cat.desc}</p>
                </button>
              ))}
            </div>
          </section>

          <section className='bg-white border border-gray-100 rounded-[2rem] p-8'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-black text-gray-900'>Recent Documentation</h3>
              <button className='text-blue-600 text-xs font-bold uppercase tracking-widest hover:underline'>View All</button>
            </div>
            <div className='space-y-3'>
              {[
                'How to export semester grade sheets?',
                'Configuring automated attendance alerts',
                'Setting up multi-period assignments',
                'Teacher-Parent communication protocols'
              ].map((doc, i) => (
                <div key={i} className='flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group'>
                  <div className='flex items-center gap-4'>
                    <div className='w-2 h-2 rounded-full bg-blue-400 group-hover:scale-150 transition-transform'></div>
                    <span className='text-sm font-medium text-gray-700'>{doc}</span>
                  </div>
                  <ChevronRight size={16} className='text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all' />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Contact Form */}
        <div className='space-y-6'>
          <div className='bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm'>
            <div className='bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 mb-6'>
              <MessageSquare size={24} />
            </div>
            <h3 className='text-xl font-black text-gray-900 mb-2'>Open a Ticket</h3>
            <p className='text-gray-400 text-sm mb-6'>Our technical staff usually responds within 2 business hours.</p>
            
            <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className='text-[10px] font-black uppercase text-gray-400 mb-1.5 block ml-1'>Issue Type</label>
                <select className='w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-medium'>
                  <option>Software Feature Request</option>
                  <option>Login/Auth Issue</option>
                  <option>Hardware Replacement</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className='text-[10px] font-black uppercase text-gray-400 mb-1.5 block ml-1'>Message</label>
                <textarea 
                  rows={4}
                  className='w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-medium resize-none'
                  placeholder='Describe your concern...'
                ></textarea>
              </div>

              <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg shadow-blue-100 transition-all active:scale-95'>
                <Send size={16} /> Submit Ticket
              </button>
            </form>
          </div>

          <div className='bg-gray-900 rounded-[2rem] p-8 text-white'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='bg-white/10 p-3 rounded-xl'>
                <PhoneCall size={20} className='text-blue-400' />
              </div>
              <div>
                <p className='text-[10px] font-bold uppercase text-gray-400 tracking-widest'>Urgent Support</p>
                <p className='text-lg font-black'>+880 1234 5678</p>
              </div>
            </div>
            <p className='text-xs text-gray-400 leading-relaxed font-medium'>
              Available 8 AM - 4 PM for critical classroom emergencies and hardware failures.
            </p>
          </div>
        </div>
      </div>

      <footer className='mt-12 pt-8 border-t border-gray-100 text-center'>
        <p className='text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]'>
          Faculty Support Portal Powered by My class technologies
        </p>
      </footer>
    </div>
  );
};

export default TeacherSupport;