#!/bin/bash

# TaskBoard Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting TaskBoard Application..."

# Run database migrations
echo ""
echo "📦 Running database migrations..."
cd backend
python3 migrate.py upgrade
if [ $? -ne 0 ]; then
    echo "❌ Migration failed!"
    exit 1
fi
echo "✅ Migrations completed successfully"

# Start backend server in background
echo ""
echo "🔧 Starting backend server on http://localhost:8000..."
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
echo "✅ Backend server started (PID: $BACKEND_PID)"

# Wait a bit for backend to start
sleep 3

# Start frontend server
echo ""
echo "🎨 Starting frontend server on http://localhost:3000..."
cd /Users/elpocho/Z-MONSTER-CODE/freelance/xai-tutor-feb-georges-fouejio/frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend server started (PID: $FRONTEND_PID)"

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  🎉 TaskBoard is running!                              ║"
echo "║                                                        ║"
echo "║  Frontend: http://localhost:3000                      ║"
echo "║  Backend:  http://localhost:8000                      ║"
echo "║  API Docs: http://localhost:8000/docs                 ║"
echo "║                                                        ║"
echo "║  Press Ctrl+C to stop all servers                     ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Handle Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit 0" INT

# Wait for both processes
wait
