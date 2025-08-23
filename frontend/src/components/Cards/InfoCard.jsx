import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm">
      <div className={`w-3 h-3 ${color} rounded-full`} />
      <div className='flex gap-1 items-center'>
        <p className="text-sm md:text-[15px] text-black font-semibold flex items-center gap-1">
           {value} 
        </p>
        <p className="text-xs md:text-[13px] text-gray-500">{label}</p>
      </div>
    </div>
  )
}

export default InfoCard
