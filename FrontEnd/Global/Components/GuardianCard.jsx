import React from 'react'

const GuardianCard = ({guardian}) => {
  return (
    <div className="flex flex-col gap-y-4 rounded-xl shadow-sm bg-white p-6 border border-slate-200">
    <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
    <h4 className="font-bold text-lg text-slate-800">
  {guardian.relation === "father" 
    ? "Father's Information" 
    : guardian.relation === "mother" 
      ? "Mother's Information" 
      : "Guardian's Information"}
</h4>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-5 text-sm">
        <div className='col-span-5'>
          <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Full Name</p>
          <p className='font-semibold mt-1 text-slate-800 capitalize overflow-auto'>{guardian.name}</p>  
        </div>
        <div className='col-span-7'>
          <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Phone Number</p>
          <p className='font-semibold mt-1 text-slate-800 capitalize'>{guardian.phone}</p>  
        </div>
        <div className='col-span-5'>
          <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Relation</p>
          <p className='font-semibold mt-1 text-slate-800 capitalize'>{guardian.relation}</p>  
        </div>
        <div className='col-span-7'>
          <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Email Address</p>
          <p className='font-semibold mt-1 text-slate-800 overflow-auto'>{'fahimhaowladerjahidfb@gmail.com'}</p>  
        </div>
       <div className="sm:col-span-12">
        <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Address</p>
        <p className='font-semibold mt-1 text-slate-800 capitalize'>{"drfger erertert ereree reer reere rerer ererer erer ddffdf dfdffd dffdfd fdffd dffdfddff dffffdfddffdff dffffd"}</p>  
      </div>
    </div>
  </div>
  </div>
  )
}

export default GuardianCard
