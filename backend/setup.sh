#!/bin/bash

# TaskBoard Backend Setup Script
# This script sets up the backend, runs migrations, and starts the server

set -e  # Exit on error

echo "🚀 TaskBoard Backend Setup"
echo "=========================="

# Check if we're in the backend directory
if [ ! -f "requirements.txt" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    exit 1
fi

# Check Python version
echo ""
echo "📋 Checking Python version..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "✅ Found Python $python_version"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo ""
    echo "🔨 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created"
fi

# Activate virtual environment
echo ""
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pip install -r requirements.txt
echo "✅ Dependencies installed"

# Run migrations
echo ""
echo "🗄️  Running database migrations..."
python migrate.py upgrade
echo "✅ Migrations completed"

# Check if database was created
if [ -f "app.db" ]; then
    echo ""
    echo "✅ Database created successfully at app.db"
    
    # Show sample data count
    echo ""
    echo "📊 Seeded data:"
    python3 << EOF
import sqlite3
conn = sqlite3.connect('app.db')
cursor = conn.cursor()

cursor.execute("SELECT COUNT(*) FROM users")
user_count = cursor.fetchone()[0]
print(f"   - {user_count} users")

cursor.execute("SELECT COUNT(*) FROM tasks")
task_count = cursor.fetchone()[0]
print(f"   - {task_count} tasks")

cursor.execute("SELECT status, COUNT(*) as count FROM tasks GROUP BY status")
for row in cursor.fetchall():
    print(f"      • {row[0]}: {row[1]}")

conn.close()
EOF
fi

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  ✅ Backend setup complete!                            ║"
echo "║                                                        ║"
echo "║  To start the server:                                 ║"
echo "║  1. source venv/bin/activate                          ║"
echo "║  2. uvicorn app.main:app --reload                     ║"
echo "║                                                        ║"
echo "║  Server will run at: http://localhost:8000            ║"
echo "║  API docs: http://localhost:8000/docs                 ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
