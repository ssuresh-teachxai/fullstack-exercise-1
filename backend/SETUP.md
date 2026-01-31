# TaskBoard Backend - Setup & Run Guide

## Quick Setup (Recommended)

```bash
cd backend
chmod +x setup.sh
./setup.sh
```

This will:
- ✅ Create virtual environment
- ✅ Install all dependencies
- ✅ Run database migrations
- ✅ Seed sample data (10 tasks, 4 users)

## Manual Setup

### 1. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run Migrations (This seeds the database)

```bash
python migrate.py upgrade
```

**What gets seeded:**
- 4 users (John Doe, Jane Smith, Mike Johnson, Sarah Williams)
- 10 tasks matching the design:
  - 3 Pending tasks
  - 2 In Progress tasks (high priority)
  - 4 Completed tasks
  - 1 Launched task

### 4. Start the Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Migration Commands

```bash
# Apply all migrations (creates tables and seeds data)
python migrate.py upgrade

# Revert all migrations (drops all tables)
python migrate.py downgrade

# List migration status
python migrate.py list
```

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/{id}` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

### Users
- `GET /tasks/users/all` - Get all users (for assignee selection)

### Health Check
- `GET /health` - Server health check

## API Documentation

Once the server is running, visit:
- **Interactive docs:** http://localhost:8000/docs
- **Alternative docs:** http://localhost:8000/redoc

## Database

The application uses SQLite with the database file at:
```
backend/app.db
```
