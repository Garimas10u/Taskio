import React from 'react'

const UserCard = ({userInfo}) => {
  return (
    <div className='user-card p-2'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-items gap-3'>
                <img src={userInfo?.profileImageURL} alt={`Avatar`} className='w-12 h-12 rounded-full border-2 border-white'
                />
                <div>
                    <p className="text-sm font-medium">{userInfo?.name}</p>
                    <p className='text-xs text-gray-500'>{userInfo?.email}</p>
                </div>
            </div>
        </div>
        <div className='flex flex-wrap gap-3 mt-5 '>
            <StatCard label="Pending" count={userInfo?.pendingTasks || 0}  status="Pending" />
            <StatCard label="In Progress" count={userInfo?.inProgressTasks || 0}  status="In Progress" />
            <StatCard label="Completed" count={userInfo?.completedTasks || 0}  status="Completed" />
        </div>
    </div>
  )
}

export default UserCard

const StatCard= ({
    label, count, status
}) => {
    const getStatusTagColor=() => {
        switch (status) {
      case "Completed":
        return "bg-green-100 text-green-500";
      case "Pending":
        return "bg-yellow-100 text-yellow-500";
      case "In Progress":
        return "bg-blue-100 text-blue-500";
      default:
        return "bg-violet-100 text-violet-500 ";
        }
        
    }
    return (
        <div className={`flex-1 text-[10px] font-md ${getStatusTagColor()} px-4 py-0.5 rounded-md`}>
            <span className='text-[12px] font-semibold'>{count}</span> <br />
            {label}        
        </div>
    )
        
    
}
    
