"""
Create tasks and users tables with relationships
"""

def upgrade(conn):
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            avatar TEXT
        )
    """)
    
    # Create tasks table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL,
            priority TEXT NOT NULL,
            due_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create task_assignees junction table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS task_assignees (
            task_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY (task_id, user_id),
            FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)
    
    # Insert sample users
    cursor.execute("""
        INSERT INTO users (name, avatar) VALUES 
        ('John Doe', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'),
        ('Jane Smith', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'),
        ('Mike Johnson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'),
        ('Sarah Williams', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah')
    """)
    
    # Insert sample tasks matching the design from README
    cursor.execute("""
        INSERT INTO tasks (title, description, status, priority, due_date) VALUES 
        ('Solutions Pages', 'Create solutions section pages', 'pending', 'normal', '2026-02-15'),
        ('Company Pages', 'Build company information pages', 'pending', 'normal', '2026-02-16'),
        ('Help Center Pages', 'Design and implement help center', 'pending', 'normal', '2026-02-17'),
        ('Order Flow', 'Implement new order processing flow', 'in_progress', 'high', '2026-02-10'),
        ('New Work Flow', 'Design new workflow system', 'in_progress', 'high', '2026-02-12'),
        ('About Us Illustration', 'Create about us page illustrations', 'completed', 'normal', '2026-01-28'),
        ('Hero Illustration', 'Design hero section illustration', 'completed', 'normal', '2026-01-29'),
        ('Moodboarding', 'Create mood boards for design direction', 'completed', 'high', '2026-01-25'),
        ('Research', 'Conduct user research and analysis', 'completed', 'high', '2026-01-24'),
        ('Features Pages', 'Build features showcase pages', 'launched', 'normal', '2026-01-20')
    """)
    
    # Assign users to tasks (distributed evenly)
    cursor.execute("""
        INSERT INTO task_assignees (task_id, user_id) VALUES 
        (1, 1), (1, 2),
        (2, 2), (2, 3),
        (3, 3), (3, 4),
        (4, 1), (4, 4),
        (5, 2), (5, 3),
        (6, 1),
        (7, 2),
        (8, 3), (8, 4),
        (9, 1), (9, 2),
        (10, 4)
    """)
    
    conn.commit()


def downgrade(conn):
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS task_assignees")
    cursor.execute("DROP TABLE IF EXISTS tasks")
    cursor.execute("DROP TABLE IF EXISTS users")
    conn.commit()
