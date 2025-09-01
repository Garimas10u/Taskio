import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from 'moment'
import InfoCard from "../../components/Cards/InfoCard";
import { LuArrowDown, LuArrowRight } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import TaskListTable from "../../components/layouts/TaskListTable";
import {IoMdCard} from 'react-icons/io';
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";


const COLORS = ['#8D51FF', '#00B8DB', '#7BCE00']

const UserDashboard = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const prepareChartData=(data)=> {
    const taskDistribution = data?.taskDistribution || null;
    const TaskPriorityLevels = data?.TaskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const priorityLevelsData = [
      { priority: "Low", count: TaskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: TaskPriorityLevels?.Medium || 0 },
      { priority: "High", count: TaskPriorityLevels?.High || 0 },
    ];
    setBarChartData(priorityLevelsData);
    
  } 
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null )
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login", { replace: true });
      } else {
        getDashboardData();
      }
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <p>Fetching...</p>;
  }

  return (
    <Dashboardlayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Welcome {user?.name}!</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">{moment().format("dddd Do MMM YYYY")}

            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard icon={<IoMdCard />} label="Total Tasks" 
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}  color="bg-pink-500" />

          <InfoCard icon={<IoMdCard />} label="Pending Tasks" 
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}  color="bg-violet-400" />

          <InfoCard icon={<IoMdCard />} label="In Progress Tasks" 
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}  color="bg-blue-400" />

          <InfoCard icon={<IoMdCard />} label="Completed Tasks" 
          value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}  color="bg-lime-400" />

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 my-4 md:my-6">
        
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Task Priority Levels</h5>
            </div>
            <CustomPieChart data={pieChartData}  colors={COLORS} />
          </div>
          <div className="card">
            <div className="flex items-center justify-between ">
              <h5 className="font-medium">Task Distribution</h5>
            </div>

            <CustomBarChart data={barChartData}  colors={COLORS} />
         

        </div>
      </div>
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex item-center justify-between">
              <h5 className="text-lg">Recent Tasks</h5>

              <button className="card-btn" >See All <LuArrowDown className="text-base" /></button>

              
            </div>
            <TaskListTable  tableData={dashboardData?.recentTasks || []}
              />
          </div>
          
        </div>
      
      
    </Dashboardlayout>
  );
};

export default UserDashboard;
