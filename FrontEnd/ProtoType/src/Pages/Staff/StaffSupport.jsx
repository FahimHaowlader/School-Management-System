import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import Pic from '../../Assets/p.jpg';
import { 
  User, 
  Megaphone, 
  CalendarDays, 
  Settings, 
  LifeBuoy,
  ShieldCheck,
  MessageCircle,
  Mail,
  FileQuestion,
  Wrench,
  HeartPulse,
  CreditCard,
  ChevronDown,
  Search
} from 'lucide-react';

const StaffSupport = () => {
  const [activeTitle, setActiveTitle] = useState('Staff Support');
  const [openFaq, setOpenFaq] = useState(null);
  const scrollContainerRef = useRef(null);

  const supportCategories = [
    { id: 1, title: "IT & Tech Support", icon: <Wrench size={24} />, color: "blue", desc: "Software access & hardware help" },
    { id: 2, title: "HR & Payroll", icon: <CreditCard size={24} />, color: "emerald", desc: "Salary, leave & benefits" },
    { id: 3, title: "Health & Wellbeing", icon: <HeartPulse size={24} />, color: "rose", desc: "Counseling & medical insurance" },
    { id: 4, title: "General Inquiry", icon: <FileQuestion size={24} />, color: "purple", desc: "Office supplies & facility help" },
  ];

  const faqs = [
    { q: "How do I apply for casual leave?", a: "You can apply for leave through the HR Portal under the 'Leave Management' tab. Ensure you submit your request at least 48 hours in advance for approval." },
    { q: "Where can I find my monthly payslip?", a: "Payslips are generated on the 1st of every month and can be downloaded from the 'Finance' section of your staff dashboard." },
    { q: "How do I report a hardware issue in my office?", a: "Please open a ticket in the IT Support section or contact the tech department at extension 404 for immediate assistance." }
  ];

  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'text-blue-600 bg-blue-50 font-bold shadow-sm ring-1 ring-blue-100' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className='flex flex-row w-full  overflow-hidden font-sans bg-white'>
     
     

      {/* Main Content */}
      <div ref={scrollContainerRef} className='flex-1  bg-gray-50/50 overflow-y-auto'>
     

        <main className=''>
          {/* Hero Section */}
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-black text-gray-900 mb-4 tracking-tight'>How can we assist you?</h2>
            <p className='text-gray-500 font-medium mb-8'>Access the support center for all your administrative and technical needs.</p>
            <div className='relative max-w-2xl mx-auto'>
              <Search className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
              <input 
                type="text" 
                placeholder="Search for topics (leave, payroll, IT)..." 
                className='w-full pl-14 pr-6 py-5 bg-white rounded-3xl shadow-sm border border-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium'
              />
            </div>
          </div>

          {/* Quick Support Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12'>
            {supportCategories.map((cat) => (
              <div key={cat.id} className='bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all group cursor-pointer text-center'>
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-transform group-hover:scale-110 
                  ${cat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                    cat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                    cat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 
                    'bg-purple-50 text-purple-600'}`}>
                  {cat.icon}
                </div>
                <h3 className='font-black text-gray-900 text-sm mb-1'>{cat.title}</h3>
                <p className='text-gray-400 text-[11px] font-bold leading-tight'>{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className='bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm'>
            <h3 className='text-2xl font-black text-gray-900 mb-8 flex items-center gap-3'>
              <FileQuestion className='text-blue-600' size={28} /> Frequently Asked Questions
            </h3>
            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <div key={index} className='border-b border-gray-50 pb-4 last:border-0'>
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className='w-full flex items-center justify-between text-left py-2 hover:text-blue-600 transition-colors'
                  >
                    <span className='font-bold text-gray-700'>{faq.q}</span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 mt-3' : 'max-h-0'}`}>
                    <p className='text-gray-500 text-sm font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl'>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Footer */}
          <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex items-center gap-4 bg-blue-600 p-8 rounded-[2rem] text-white shadow-lg shadow-blue-100'>
              <div className='bg-white/20 p-4 rounded-2xl'><Mail size={32} /></div>
              <div>
                <h4 className='font-black text-lg'>Email Support</h4>
                <p className='text-blue-100 text-sm font-medium'>Response within 24 hours</p>
                <p className='font-bold mt-1'>support@myclass.edu</p>
              </div>
            </div>
            <div className='flex items-center gap-4 bg-gray-900 p-8 rounded-[2rem] text-white shadow-lg shadow-gray-100'>
              <div className='bg-white/10 p-4 rounded-2xl'><MessageCircle size={32} /></div>
              <div>
                <h4 className='font-black text-lg'>Live Helpdesk</h4>
                <p className='text-gray-400 text-sm font-medium'>Available 9 AM - 5 PM</p>
                <p className='font-bold mt-1 text-blue-400'>Ext. 102 / 105</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffSupport;