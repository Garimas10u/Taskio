import React from "react";

const TaskCardShimmer = () => {
  return (
    <div className="animate-pulse p-4 rounded-2xl shadow bg-white border border-gray-200">
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
      
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
        <div className="h-3 w-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default TaskCardShimmer;
