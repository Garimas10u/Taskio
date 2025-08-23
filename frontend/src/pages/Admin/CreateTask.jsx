import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/Dashboardlayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuTrash2 } from 'react-icons/lu'
import SelectDropDown from '../../components/Inputs/SelectDropDown'
import SelectUsers from '../../components/Inputs/SelectUsers'


const CreateTask = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low", 
    dueDate: "",
    assignedTo: [],
    todoCheckList: [],
    attachments: []
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key, value) => {
    setTaskData(prevData => ({ ...prevData, [key]: value }))
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoCheckList: [],
      attachments: []
    })
  }

  const createTask = async () => {
    try {
      setLoading(true)
      await axiosInstance.post(API_PATHS.CREATE_TASK, taskData)
      toast.success("Task created successfully")
      clearData()
      navigate("/admin/tasks")
    } catch (error) {
      setError("Failed to create task")
      toast.error("Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  const taskId = location.state?.taskId

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 gap-6">
          <div className="form-data">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete Task
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Create App UI"
                value={taskData.title}
                onChange={e => handleValueChange("title", e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Task Description
              </label>
              <textarea
                className="form-input"
                placeholder="Describe the task"
                value={taskData.description}
                onChange={e =>
                  handleValueChange("description", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-12 gap-3 mt-2">
              <div className="col-span-6 md:col-span-4 ">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropDown 
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                 
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({target})=> handleValueChange("dueDate", target.value)}
                  type="date"
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask
