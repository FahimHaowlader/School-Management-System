import React, { useState,useEffect } from 'react';
import { 
  MdSearch, 
  MdCalendarToday, 
  MdCheckCircle, 
  MdErrorOutline, 
  MdOutlineFeedback, 
  MdVisibility 
} from "react-icons/md";
import { HiOutlineAdjustments } from "react-icons/hi";

const assignmentsData = [
  {
    id: 1,
    title: 'History Essay: The Roman Empire',
    course: 'History 101',
    dueDate: 'Oct 15, 2023, 11:59 PM',
    status: 'Overdue',
    type: 'danger'
  },
  {
    id: 2,
    title: 'Problem Set 5',
    course: 'Calculus III',
    dueDate: 'Oct 26, 2023, 11:59 PM',
    status: 'Pending',
    type: 'warning'
  },
  {
    id: 3,
    title: 'Lab Report: Projectile Motion',
    course: 'Physics 201',
    dueDate: 'Nov 02, 2023, 11:59 PM',
    status: 'Submitted',
    type: 'info'
  },
  {
    id: 4,
    title: 'Poetry Analysis: "The Waste Land"',
    course: 'English Literature',
    dueDate: 'Nov 08, 2023, 11:59 PM',
    status: 'Graded',
    type: 'success'
  }
];

const ParentAssignment = () => {
  const [activeTab, setActiveTab] = useState('current');
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  

  return (
    <div className="flex flex-col gap-6 min-h-screen font-sans">
      
      {/* Header */}
      {/* <div className="flex flex-wrap justify-between items-center gap-3">
        <h1 className="text-4xl font-black tracking-tight text-gray-900">My Assignments</h1>
      </div> */}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveTab('current')}
            className={`pb-3 pt-2 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'current' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Current Assignments
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`pb-3 pt-2 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'past' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Past Assignments
          </button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <MdSearch size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search by assignment title..." 
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        
        <div className="flex gap-3">
          <select className="h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none">
            <option>All Courses</option>
            <option>History 101</option>
            <option>Physics 201</option>
          </select>
          <select className="h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Submitted</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {assignmentsData.map((item) => (
          <AssignmentCard key={item.id} data={item} />
        ))}
      </div>

    </div>
  );
};

/* --- Sub-Components --- */

const AssignmentCard = ({ data }) => {
  // Logic to determine styles based on status
  const statusStyles = {
    danger: "bg-red-100 text-red-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
    success: "bg-emerald-100 text-emerald-700"
  };

  const getButtonProps = () => {
    switch (data.status) {
      case 'Overdue': return { label: 'Submit Late', icon: null, primary: true };
      case 'Pending': return { label: 'Submit Now', icon: null, primary: true };
      case 'Submitted': return { label: 'View Submission', icon: <MdVisibility />, primary: false };
      case 'Graded': return { label: 'View Feedback', icon: <MdOutlineFeedback />, primary: false };
      default: return { label: 'Details', icon: null, primary: false };
    }
  };

  const btn = getButtonProps();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-transparent hover:border-blue-200 transition-all group">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Title & Course */}
        <div className="md:col-span-4">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {data.title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{data.course}</p>
        </div>

        {/* Due Date */}
        <div className="md:col-span-3 flex items-center gap-2">
          <MdCalendarToday className={data.type === 'danger' ? 'text-red-500' : 'text-gray-400'} size={18} />
          <span className={`text-sm font-medium ${data.type === 'danger' ? 'text-red-500' : 'text-gray-600'}`}>
            Due: {data.dueDate}
          </span>
        </div>

        {/* Status Badge */}
        <div className="md:col-span-2">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[data.type]}`}>
            {data.status}
          </span>
        </div>

        {/* Action Button */}
        <div className="md:col-span-3 flex justify-end">
          <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
            btn.primary 
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            {btn.icon}
            {btn.label}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ParentAssignment
