# fullstack-exercise-1

A fullstack application with a Python/FastAPI backend and Next.js frontend.

## Prerequisites

- Python 3.11+
- Node.js 20+
- Docker & Docker Compose (for containerized setup)

## Quick Start with Docker Compose

The easiest way to run the entire application:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop all services
docker-compose down
```

This will start:
- **Backend API** at http://localhost:8000
- **Frontend** at http://localhost:3000

## Running Backend Manually

### Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Database Migrations

```bash
# Apply all migrations
python migrate.py upgrade

# Revert all migrations
python migrate.py downgrade

# List migration status
python migrate.py list
```

### Start the Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000

## Running Frontend Manually

### Setup

```bash
cd frontend

# Install dependencies
npm install
```

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

The frontend will be available at http://localhost:3000
