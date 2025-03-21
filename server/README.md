
# Salon Appointment Backend

This is the Express.js backend for the salon appointment application.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/salon-app
   ```

3. Make sure you have MongoDB installed and running locally, or update the MONGO_URI to point to your MongoDB instance.

4. Start the development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the development server with hot reloading
- `npm run build`: Build the TypeScript project
- `npm start`: Start the production server

## API Endpoints

### Appointments

- `GET /api/appointments`: Get all appointments
- `GET /api/appointments/:id`: Get appointment by ID
- `POST /api/appointments`: Create a new appointment

### Services

- `GET /api/services`: Get all services
- `GET /api/services/:id`: Get service by ID
- `POST /api/services`: Create a new service (admin use)

