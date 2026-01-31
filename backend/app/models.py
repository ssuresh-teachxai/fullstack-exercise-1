from datetime import date
from typing import List, Optional
from pydantic import BaseModel


# User Models
class UserBase(BaseModel):
    name: str
    avatar: Optional[str] = None


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


# Task Models
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str  # pending, in_progress, completed, launched
    priority: str  # normal, high
    due_date: date


class TaskCreate(TaskBase):
    assignee_ids: List[int] = []


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[date] = None
    assignee_ids: Optional[List[int]] = None


class Task(TaskBase):
    id: int
    assignees: List[User] = []
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
