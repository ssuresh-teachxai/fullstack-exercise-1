"""
Migration: Create tasks table
Version: 002
Description: Creates the tasks table for Kanban board
"""

import sqlite3
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import DATABASE_PATH


def upgrade():
    """Apply the migration."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Check if this migration has already been applied
    cursor.execute("SELECT 1 FROM _migrations WHERE name = ?", ("002_create_tasks_table",))
    if cursor.fetchone():
        print("Migration 002_create_tasks_table already applied. Skipping.")
        conn.close()
        return
    
    # Create tasks table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL,
            priority TEXT DEFAULT 'Normal',
            assignee_name TEXT,
            assignee_avatar TEXT
        )
    """)
    
    # Insert some sample data
    sample_tasks = [
        ("Design Database Schema", "Create the initial schema for the Kanban board", "done", "Alice", "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"),
        ("Implement API Endpoints", "Build GET, POST, PUT, DELETE for tasks", "in-progress", "Bob", "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"),
        ("Frontend Integration", "Connect React frontend to the backend APIs", "todo", "Charlie", "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie"),
    ]
    cursor.executemany("""
        INSERT INTO tasks (title, description, status, assignee_name, assignee_avatar) 
        VALUES (?, ?, ?, ?, ?)
    """, sample_tasks)
    
    # Record this migration
    cursor.execute("INSERT INTO _migrations (name) VALUES (?)", ("002_create_tasks_table",))
    
    conn.commit()
    conn.close()
    print("Migration 002_create_tasks_table applied successfully.")


def downgrade():
    """Revert the migration."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Drop tasks table
    cursor.execute("DROP TABLE IF EXISTS tasks")
    
    # Remove migration record
    cursor.execute("DELETE FROM _migrations WHERE name = ?", ("002_create_tasks_table",))
    
    conn.commit()
    conn.close()
    print("Migration 002_create_tasks_table reverted successfully.")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Run database migration")
    parser.add_argument(
        "action",
        choices=["upgrade", "downgrade"],
        help="Migration action to perform"
    )
    
    args = parser.parse_args()
    
    if args.action == "upgrade":
        upgrade()
    elif args.action == "downgrade":
        downgrade()
