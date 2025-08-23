import {
    LuLayoutDashboard, LuUsers, LuClipboardCheck, LuSquarePlus, LuLogOut
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard"
    }, 
    {
        id: "02",
        label: "Users",
        icon: LuUsers,
        path: "/admin/users"
    },
    {
        id: "03",
        label: "Tasks",
        icon: LuClipboardCheck,
        path: "/admin/tasks"
    },
    {
        id: "04",
        label: "Create Task",
        icon: LuSquarePlus,
        path: "/admin/create-task"
    },
    {
        id: "05",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout"
    }
]
export const SIDE_MENU_USER_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/user/dashboard"
    },
    {
        id: "02",
        label: "Tasks",
        icon: LuClipboardCheck,
        path: "/user/tasks"
    },
    {
        id: "03",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout"
    }
]
export const PRIORITY_DATA = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" }
];

export const STATUS_DATA = [
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" }
];