
import express from 'express';

export const appointmentsRouter = express.Router();

// Temporary in-memory storage for appointments
let appointments: any[] = [];

// POST - Create a new appointment
appointmentsRouter.post('/', (req, res) => {
  try {
    const appointmentData = req.body;
    
    // Validate required fields
    if (!appointmentData.client_id || !appointmentData.stylist_id || 
        !appointmentData.service_id || !appointmentData.date || !appointmentData.time) {
      return res.status(400).json({ message: 'Missing required appointment information' });
    }
    
    // Generate a unique ID (in a real app, this would be handled by the database)
    const id = Math.random().toString(36).substring(2, 15);
    
    const newAppointment = {
      id,
      ...appointmentData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Add to our in-memory storage
    appointments.push(newAppointment);
    
    res.status(201).json(newAppointment);
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: error.message || 'Failed to create appointment' });
  }
});

// GET - Get all appointments
appointmentsRouter.get('/', (req, res) => {
  try {
    res.status(200).json(appointments);
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch appointments' });
  }
});

// GET - Get appointment by ID
appointmentsRouter.get('/:id', (req, res) => {
  try {
    const appointment = appointments.find(a => a.id === req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json(appointment);
  } catch (error: any) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch appointment' });
  }
});
