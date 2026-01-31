# TaskBoard - Fullstack Kanban Application

Complete fullstack implementation with Next.js frontend and FastAPI backend.

## Quick Start

### Option 1: Run with Script (Recommended)
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Run Manually

**Terminal 1 - Backend:**
```bash
cd backend
python migrate.py upgrade
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

## Features Implemented

### Frontend ✅
- ✅ Header with logo, search, notifications
- ✅ Sidebar with navigation and projects
- ✅ Kanban board with 4 columns (Pending, In Progress, Completed, Launched)
- ✅ Interactive task cards with hover actions
- ✅ Task creation/edit dialog
- ✅ Delete confirmation dialog
- ✅ Real-time API integration
- ✅ Loading states and error handling
- ✅ Responsive design (desktop-first)

### Backend ✅
- ✅ `GET /tasks` - Fetch all tasks
- ✅ `POST /tasks` - Create new task
- ✅ `PUT /tasks/{id}` - Update task
- ✅ `DELETE /tasks/{id}` - Delete task
- ✅ `GET /tasks/users/all` - Get all users
- ✅ SQLite database with migrations
- ✅ CORS enabled for frontend
- ✅ Sample data pre-loaded

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/{id}` - Get task by ID
- `POST /tasks` - Create task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

### Users
- `GET /tasks/users/all` - Get all users for assignee selection

## Database Schema

**Users:**
- id (Primary Key)
- name
- avatar

**Tasks:**
- id (Primary Key)
- title
- description
- status (pending, in_progress, completed, launched)
- priority (normal, high)
- due_date
- created_at
- updated_at

**Task Assignees** (Junction Table):
- task_id (Foreign Key)
- user_id (Foreign Key)

## Tech Stack

**Frontend:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Lucide React icons

**Backend:**
- FastAPI
- Python 3.11+
- SQLite
- Pydantic

## Testing

1. Create a new task using "+ Add New" button
2. Edit task by hovering and clicking the pencil icon
3. Delete task with confirmation dialog
4. Drag tasks between columns (status updates via API)
5. Assign multiple users to tasks
6. Filter by status, priority, due date

## Sample Data

The database includes:
- 4 sample users (John, Jane, Mike, Sarah)
- 9 sample tasks across all statuses
- Pre-assigned task relationships

Enjoy building with TaskBoard! 🎉
