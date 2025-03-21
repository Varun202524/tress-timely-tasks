
import express from 'express';
import { Appointment } from '../models/Appointment';

export const appointmentsRouter = express.Router();

// POST - Create a new appointment
appointmentsRouter.post('/', async (req, res) => {
  try {
    const appointmentData = req.body;
    
    // Validate required fields
    if (!appointmentData.client_id || !appointmentData.stylist_id || 
        !appointmentData.service_id || !appointmentData.date || !appointmentData.time) {
      return res.status(400).json({ message: 'Missing required appointment information' });
    }
    
    const newAppointment = new Appointment(appointmentData);
    const savedAppointment = await newAppointment.save();
    
    res.status(201).json(savedAppointment);
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: error.message || 'Failed to create appointment' });
  }
});

// GET - Get all appointments
appointmentsRouter.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch appointments' });
  }
});

// GET - Get appointment by ID
appointmentsRouter.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json(appointment);
  } catch (error: any) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch appointment' });
  }
});
