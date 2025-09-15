## Database Configuration

By default, the application uses in-memory database with sample data (resets on restart).

To use PostgreSQL:
1. Start PostgreSQL with Docker: `docker-compose up -d`
2. Edit `backend/.env` file and change `DB_TYPE=postgres`

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Setup Instructions

### Step 1: Install Backend Dependencies

- `cd backend`
- `npm install`

### Step 2: Install Frontend Dependencies

- `cd frontend`
- `npm install`

### Step 4: Start the backend server

- `cd backend`
- `npm run start:dev`

### Step 5: Start the frontend server

- `cd frontend`
- `npm start`