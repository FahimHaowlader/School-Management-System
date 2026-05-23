import React from 'react';
import Pic from '../../Assets/p.jpg';
import { 
  User, Mail, Phone, Star, 
  Activity, Award, Briefcase, 
  Building2, FileText, Terminal,
  ShieldCheck, Cpu, Database, Server
} from 'lucide-react';

const TechnicianProfile = () => {
  return (
    <div className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className="bg-white overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          
          {/* Left Column: Stats & Avatar */}
          <div className="p-8 bg-gray-50/50 border-r border-gray-100 flex flex-col items-center text-center">
            <div className="relative group">
              <img 
                src={Pic} 
                alt="Technician Avatar" 
                className="h-40 w-40 rounded-[2.5rem] object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 bg-indigo-500 rounded-full h-6 w-6 border-4 border-white shadow-sm"></div>
            </div>

            <h2 className="text-2xl font-black text-gray-900 mt-6 leading-tight">Fahim Haowlader</h2>
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mt-1">Lead Systems Developer</p>
            <p className="text-gray-400 text-xs mt-2 font-medium italic">Security Clearance: Level 5 (Root)</p>

            <div className="w-full mt-8 space-y-3">
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 text-indigo-500"><Activity size={18}/> <span className="text-gray-700 font-bold text-sm">System Uptime</span></div>
                <span className="text-gray-900 font-black">99.9%</span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 text-emerald-500"><ShieldCheck size={18}/> <span className="text-gray-700 font-bold text-sm">Integrity</span></div>
                <span className="text-gray-900 font-black">Verified</span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 text-amber-500"><Server size={18}/> <span className="text-gray-700 font-bold text-sm">Deployments</span></div>
                <span className="text-gray-900 font-black">42+</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2 p-10">
            <section>
              <h3 className="flex items-center gap-2 text-xl font-black text-gray-900 mb-4">
                <Terminal className="text-indigo-600" size={24} /> Professional Summary
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium text-justify">
                Specialized MERN Stack Developer and Systems Administrator for the **MyClass** ecosystem. 
                Expertise in architecting high-scale backend services, managing self-hosted MongoDB clusters, 
                and designing secure RESTful APIs. Focused on optimizing institutional performance 
                through robust server-side logic and modular component architecture.
              </p>
            </section>

            {/* Department & Role Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <div className="flex flex-col gap-1">
                <h4 className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  <Building2 size={16} className="text-indigo-600" /> Department
                </h4>
                <p className="text-sm text-gray-800 font-bold">System Engineering & <br/>Infrastructure Operations</p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  <Briefcase size={16} className="text-indigo-600" /> Primary Role
                </h4>
                <p className="text-sm text-gray-800 font-bold">Full Stack Architecture <br/>& Security Management</p>
              </div>
            </div>

            <section className="mt-12">
              <h3 className="flex items-center gap-2 text-xl font-black text-gray-900 mb-6">
                <FileText className="text-indigo-600" size={24} /> Official Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50 transition-all group">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400 group-hover:text-indigo-600 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Dev Email</p>
                    <p className="text-sm font-bold text-gray-700">fahim.dev@myclass.com.bd</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50 transition-all group">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400 group-hover:text-indigo-600 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">System Access</p>
                    <p className="text-sm font-bold text-gray-700">Ext: 001-ALPHA</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
                Update Core Systems
              </button>
              <button className="flex-1 bg-white text-gray-900 border-2 border-gray-100 font-black py-4 rounded-2xl hover:bg-gray-50 transition-all active:scale-95">
                Access Logs
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;