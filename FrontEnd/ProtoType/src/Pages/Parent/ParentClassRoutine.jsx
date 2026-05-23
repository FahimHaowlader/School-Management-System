import React,{useEffect} from 'react';
import { 
  MdChevronLeft, 
  MdChevronRight 
} from "react-icons/md";

const ParentClassRoutine = () => {
  // Define the time slots based on your 40-min period + 5-min break requirement
  const timeSlots = [
    "09:00 - 09:40",
    "09:45 - 10:25",
    "10:30 - 11:10",
    "11:15 - 11:55",
    "12:00 - 12:40",
    "12:40 - 01:20" // Transitioning to 1 PM area/Lunch
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  

  return (
    <div className="flex min-h-screen  font-sans text-gray-800">
      <main className="flex-1 flex flex-col ">
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

            <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-xl border border-gray-200">
              <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600">
                <MdChevronLeft size={20} />
              </button>
              <p className="text-sm font-bold text-gray-700">Current Week</p>
              <button className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600">
                <MdChevronRight size={20} />
              </button>
            </div>
          </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 w-40">Time Slot</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">Monday</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">Tuesday</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">Wednesday</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">Thursday</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {timeSlots.map((slot, index) => (
                  <React.Fragment key={slot}>
                    {/* Insert Lunch Break Row at 12:40 */}
                    {slot === "12:40 - 01:20" && (
                      <tr>
                        <td colSpan="6" className="p-3 text-center text-xs font-bold text-gray-400 bg-gray-50/50 uppercase tracking-[0.3em]">
                          Lunch & Prayer Break
                        </td>
                      </tr>
                    )}
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 align-top text-xs font-bold text-gray-500 whitespace-nowrap">
                        {slot}
                      </td>
                      {/* Sample Data Mapping */}
                      <td className="p-2 align-top"><ClassBox title="Mathematics" room="301" color="blue" /></td>
                      <td className="p-2 align-top"><ClassBox title="Physics" room="Lab 1" color="red" /></td>
                      <td className="p-2 align-top"><ClassBox title="English" room="202" color="amber" /></td>
                      <td className="p-2 align-top"><ClassBox title="Biology" room="Lab 4" color="green" /></td>
                      <td className="p-2 align-top"><ClassBox title="ICT" room="Comp Lab" color="purple" /></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Refined ClassBox for "MyClass" Identity --- */
const ClassBox = ({ title, room, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100"
  };

  return (
    <div className={`p-2.5 rounded-xl border ${colors[color] || colors.blue} shadow-sm transition-transform hover:scale-[1.02]`}>
      <p className="font-bold text-xs md:text-sm leading-tight">{title}</p>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Room {room}</span>
      </div>
    </div>
  );
};


export default ParentClassRoutine
