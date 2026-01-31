"""
Migration: Add priority column to tasks table
Version: 003
Description: Adds priority column to existing tasks table
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
    cursor.execute("SELECT 1 FROM _migrations WHERE name = ?", ("003_add_priority_column",))
    if cursor.fetchone():
        print("Migration 003_add_priority_column already applied. Skipping.")
        conn.close()
        return

    # Check if priority column already exists
    cursor.execute("PRAGMA table_info(tasks)")
    columns = [column[1] for column in cursor.fetchall()]

    if "priority" not in columns:
        # Add priority column with default value
        cursor.execute("""
            ALTER TABLE tasks
            ADD COLUMN priority TEXT DEFAULT 'Normal'
        """)
        print("Added priority column to tasks table.")
    else:
        print("Priority column already exists. Skipping column addition.")

    # Record this migration
    cursor.execute("INSERT INTO _migrations (name) VALUES (?)", ("003_add_priority_column",))

    conn.commit()
    conn.close()
    print("Migration 003_add_priority_column applied successfully.")


def downgrade():
    """Revert the migration."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # SQLite doesn't support DROP COLUMN directly in older versions
    # We would need to recreate the table without the priority column
    # For now, we'll just remove the migration record
    print("WARNING: SQLite doesn't support DROP COLUMN easily.")
    print("To fully revert, you would need to recreate the table without the priority column.")

    # Remove migration record
    cursor.execute("DELETE FROM _migrations WHERE name = ?", ("003_add_priority_column",))

    conn.commit()
    conn.close()
    print("Migration 003_add_priority_column record removed.")


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
