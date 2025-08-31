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
import TodoListInput from '../../components/layouts/TodoListInput'
import AddAttachmentsInput from '../../components/Inputs/AddAttachmentsInput'

const CreateTask = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low", 
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
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
      todoChecklist: [],
      attachments: []
    })
  }

  const createTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }))

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      })
      toast.success("Task created Successfully")
      clearData()
    } catch (error) {
      console.error("Error creating task:", error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async () => {

  }

  const handleSubmit = async () => {
    setError(null)

    if (!taskData.title.trim()) {
      setError("Title is Required")
      return
    }
    if (!taskData.description.trim()) {
      setError("Description is required")
      return
    }
    if (!taskData.dueDate.trim()) {
      setError("Due Date is required")
      return
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task is not assigned to any member")
      return
    }
    if (taskData.todoChecklist.length === 0) {
      setError("Add atleast one todo task")
      return
    }
    if (taskId) {
      updateTask()
      return
    }
    createTask()
  }

  const getTaskDetailsById = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if(response.data) {
        const taskInfo =  response.data;
        setCurrentTask(taskInfo);

        setTaskData((prevState) => (
          {
            title:taskInfo.title,
            description: taskInfo.description,
            priority: taskInfo.priority,
            dueDate: taskInfo.dueDate ? moment(taskInfo.dueDate).format("YYYY-MM-DD"): null,
            assignedTo: taskInfo?.assignedTo?.map((item) => item?._id)|| [],
            todoChecklist: taskInfo?.todoChecklist?.map((item) => item?.text) || [],
            attachments: taskInfo?.attachments || [],
          
          })
       
        )}
    }catch(error){
      console.error("Error fetching Users: ", error)
    }
  }

  const taskId = location.state?.taskId

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 col-span-3 border border-cyan-100">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 via-cyan-500 to-pink-500 text-transparent bg-clip-text">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-lg px-3 py-1.5 border border-pink-100 hover:bg-pink-100 hover:shadow-md transition"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete Task
                </button>
              )}
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold text-blue-600">
                Task Title
              </label>
              <input
                type="text"
                className="form-input w-full mt-1 rounded-xl border  border-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Create App UI"
                value={taskData.title}
                onChange={e => handleValueChange("title", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold text-blue-600">
                Task Description
              </label>
              <textarea
                className="form-input w-full mt-1 rounded-xl border border-cyan-200 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder="Describe the task"
                value={taskData.description}
                onChange={e => handleValueChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-4">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-semibold text-blue-600">
                  Priority
                </label>
                <SelectDropDown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-semibold text-blue-600">
                  Due Date
                </label>
                <input
                  className="form-input w-full mt-1 rounded-xl border border-cyan-200 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                  type="date"
                />
              </div>

              <div className="col-span-12 md:col-span-4">
                <label className="text-xs font-semibold text-blue-600">
                  Assign To
                </label>
                <SelectUsers 
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold text-blue-600">
                Todo Checklist
              </label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) => handleValueChange("todoChecklist", value)}
              />
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold text-blue-600">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) => handleValueChange("attachments", value)}
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-4">
                {error}
              </p>
            )}

            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask


