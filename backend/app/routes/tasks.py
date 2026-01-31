from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime

from app.database import get_db
from app.models import Task, TaskCreate, TaskUpdate, User

router = APIRouter(prefix="/tasks", tags=["tasks"])


def get_task_assignees(conn, task_id: int) -> List[User]:
    """Get all assignees for a task."""
    cursor = conn.cursor()
    cursor.execute("""
        SELECT u.id, u.name, u.avatar
        FROM users u
        JOIN task_assignees ta ON u.id = ta.user_id
        WHERE ta.task_id = ?
    """, (task_id,))
    
    assignees = []
    for row in cursor.fetchall():
        assignees.append(User(
            id=row["id"],
            name=row["name"],
            avatar=row["avatar"]
        ))
    return assignees


def task_from_row(conn, row) -> Task:
    """Convert a database row to a Task model."""
    task = Task(
        id=row["id"],
        title=row["title"],
        description=row["description"],
        status=row["status"],
        priority=row["priority"],
        due_date=row["due_date"],
        assignees=get_task_assignees(conn, row["id"]),
        created_at=row["created_at"],
        updated_at=row["updated_at"]
    )
    return task


@router.get("", response_model=List[Task])
def get_tasks():
    """Get all tasks."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, description, status, priority, due_date, 
                   created_at, updated_at
            FROM tasks
            ORDER BY created_at DESC
        """)
        
        tasks = []
        for row in cursor.fetchall():
            tasks.append(task_from_row(conn, row))
        
        return tasks


@router.get("/{task_id}", response_model=Task)
def get_task(task_id: int):
    """Get a specific task by ID."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, description, status, priority, due_date,
                   created_at, updated_at
            FROM tasks
            WHERE id = ?
        """, (task_id,))
        
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Task not found")
        
        return task_from_row(conn, row)


@router.post("", response_model=Task, status_code=201)
def create_task(task: TaskCreate):
    """Create a new task."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Insert task
        cursor.execute("""
            INSERT INTO tasks (title, description, status, priority, due_date)
            VALUES (?, ?, ?, ?, ?)
        """, (
            task.title,
            task.description,
            task.status,
            task.priority,
            task.due_date.isoformat()
        ))
        
        task_id = cursor.lastrowid
        
        # Assign users to task
        if task.assignee_ids:
            for user_id in task.assignee_ids:
                cursor.execute("""
                    INSERT INTO task_assignees (task_id, user_id)
                    VALUES (?, ?)
                """, (task_id, user_id))
        
        conn.commit()
        
        # Fetch and return the created task
        cursor.execute("""
            SELECT id, title, description, status, priority, due_date,
                   created_at, updated_at
            FROM tasks
            WHERE id = ?
        """, (task_id,))
        
        row = cursor.fetchone()
        return task_from_row(conn, row)


@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate):
    """Update a task."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Check if task exists
        cursor.execute("SELECT id FROM tasks WHERE id = ?", (task_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Task not found")
        
        # Build update query dynamically
        update_fields = []
        values = []
        
        if task_update.title is not None:
            update_fields.append("title = ?")
            values.append(task_update.title)
        
        if task_update.description is not None:
            update_fields.append("description = ?")
            values.append(task_update.description)
        
        if task_update.status is not None:
            update_fields.append("status = ?")
            values.append(task_update.status)
        
        if task_update.priority is not None:
            update_fields.append("priority = ?")
            values.append(task_update.priority)
        
        if task_update.due_date is not None:
            update_fields.append("due_date = ?")
            values.append(task_update.due_date.isoformat())
        
        if update_fields:
            update_fields.append("updated_at = CURRENT_TIMESTAMP")
            values.append(task_id)
            
            query = f"UPDATE tasks SET {', '.join(update_fields)} WHERE id = ?"
            cursor.execute(query, values)
        
        # Update assignees if provided
        if task_update.assignee_ids is not None:
            # Remove existing assignees
            cursor.execute("DELETE FROM task_assignees WHERE task_id = ?", (task_id,))
            
            # Add new assignees
            for user_id in task_update.assignee_ids:
                cursor.execute("""
                    INSERT INTO task_assignees (task_id, user_id)
                    VALUES (?, ?)
                """, (task_id, user_id))
        
        conn.commit()
        
        # Fetch and return the updated task
        cursor.execute("""
            SELECT id, title, description, status, priority, due_date,
                   created_at, updated_at
            FROM tasks
            WHERE id = ?
        """, (task_id,))
        
        row = cursor.fetchone()
        return task_from_row(conn, row)


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int):
    """Delete a task."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Check if task exists
        cursor.execute("SELECT id FROM tasks WHERE id = ?", (task_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Task not found")
        
        # Delete task (assignees will be deleted automatically due to CASCADE)
        cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
        conn.commit()
        
        return None


@router.get("/users/all", response_model=List[User])
def get_all_users():
    """Get all users for assignee selection."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, avatar FROM users ORDER BY name")
        
        users = []
        for row in cursor.fetchall():
            users.append(User(
                id=row["id"],
                name=row["name"],
                avatar=row["avatar"]
            ))
        
        return users
