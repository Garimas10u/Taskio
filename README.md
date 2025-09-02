# Taskio - Task Management System

Taskio is a full-stack task management application designed for teams and organizations. It provides features for task assignment, progress tracking, user management, and reporting.
During signup, select Admin role and enter the Admin Secret Key (ADMIN_INVITE_TOKEN)
Features

User Authentication (Sign Up, Login, JWT-based sessions)
Role Management
Member: Default role for normal users

Admin: Requires secret key or admin promotion
Task Management: Create, assign, and update tasks
Track status (pending, in-progress, completed)
Dashboard with Charts (with shimmer UI loader)
Profile Image Upload during signup
Modern UI using React + Tailwind CSS

## Features

- User authentication (login, signup)
- Role-based access (admin, member)
- Task creation, assignment, and status tracking
- Todo checklists for tasks
- File/image attachments for tasks
- Dashboard with charts and statistics
- Export reports for tasks and users.
- Responsive UI built with React and Tailwind CSS.


## Getting Started
Backend
MONGO_URI=your_mongodb_connection_string
PORT=port
JWT_SECRET=your_jwt_secret
ADMIN_INVITE_TOKEN=your_admin_invite_token

VITE_BASE_URL=base_url Frontend


