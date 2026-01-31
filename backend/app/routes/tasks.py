from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.database import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    priority: Optional[str] = "Normal"
    assignee_name: Optional[str] = None
    assignee_avatar: Optional[str] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    assignee_name: Optional[str] = None
    assignee_avatar: Optional[str] = None


class TaskResponse(TaskBase):
    id: int


@router.get("", response_model=dict)
def list_tasks():
    """
    Fetch all tasks.
    """
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, title, description, status, priority, assignee_name, assignee_avatar FROM tasks")
            rows = cursor.fetchall()
            tasks = [
                {
                    "id": row["id"],
                    "title": row["title"],
                    "description": row["description"],
                    "status": row["status"],
                    "priority": row["priority"],
                    "assignee_name": row["assignee_name"],
                    "assignee_avatar": row["assignee_avatar"],
                }
                for row in rows
            ]
            return {"tasks": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.post("", status_code=201)
def create_task(task: TaskCreate):
    """
    Create a new task.
    """
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO tasks (title, description, status, priority, assignee_name, assignee_avatar) VALUES (?, ?, ?, ?, ?, ?)",
                (task.title, task.description, task.status, task.priority, task.assignee_name, task.assignee_avatar),
            )
            task_id = cursor.lastrowid
            return {
                "id": task_id,
                **task.dict()
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.put("/{task_id}")
def update_task(task_id: int, task: TaskUpdate):
    """
    Update task (including status changes).
    """
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            # Check if task exists
            cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
            row = cursor.fetchone()
            if row is None:
                raise HTTPException(status_code=404, detail="Task not found")

            current_data = {
                "title": row["title"],
                "description": row["description"],
                "status": row["status"],
                "priority": row["priority"],
                "assignee_name": row["assignee_name"],
                "assignee_avatar": row["assignee_avatar"],
            }

            update_data = task.dict(exclude_unset=True)
            new_data = {**current_data, **update_data}

            cursor.execute(
                """
                UPDATE tasks
                SET title = ?, description = ?, status = ?, priority = ?, assignee_name = ?, assignee_avatar = ?
                WHERE id = ?
                """,
                (
                    new_data["title"],
                    new_data["description"],
                    new_data["status"],
                    new_data["priority"],
                    new_data["assignee_name"],
                    new_data["assignee_avatar"],
                    task_id
                ),
            )

            return {"id": task_id, **new_data}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int):
    """
    Delete a task.
    """
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            # Check if task exists
            cursor.execute("SELECT id FROM tasks WHERE id = ?", (task_id,))
            if cursor.fetchone() is None:
                raise HTTPException(status_code=404, detail="Task not found")

            # Delete the task
            cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
            return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
