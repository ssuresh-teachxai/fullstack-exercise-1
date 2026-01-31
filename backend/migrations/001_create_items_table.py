"""
Migration: Create items table
Version: 001
Description: Creates the initial items table with id and name columns
"""


def upgrade(conn):
    """Apply the migration."""
    cursor = conn.cursor()
    
    # Create items table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    """)
    
    # Insert sample data
    sample_items = [
        ("Apple",),
        ("Banana",),
        ("Cherry",),
    ]
    cursor.executemany("INSERT INTO items (name) VALUES (?)", sample_items)


def downgrade(conn):
    """Revert the migration."""
    cursor = conn.cursor()
    
    # Drop items table
    cursor.execute("DROP TABLE IF EXISTS items")
    
    # Remove migration record
    cursor.execute("DELETE FROM _migrations WHERE name = ?", ("001_create_items_table",))
    
    conn.commit()
    print("Migration 001_create_items_table reverted successfully.")
