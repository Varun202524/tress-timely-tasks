
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { appointmentsRouter } from './routes/appointments';
import { servicesRouter } from './routes/services';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/appointments', appointmentsRouter);
app.use('/api/services', servicesRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
