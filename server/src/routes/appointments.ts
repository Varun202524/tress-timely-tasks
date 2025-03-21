
import express from 'express';
import { Appointment } from '../models/Appointment';
import { Service } from '../models/Service';
import mongoose from 'mongoose';

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
    
    // Validate that service exists
    if (appointmentData.service_id) {
      // Convert string ID to ObjectId if needed
      let serviceId = appointmentData.service_id;
      if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return res.status(400).json({ message: 'Invalid service ID format' });
      }
      
      const serviceExists = await Service.findById(serviceId);
      if (!serviceExists) {
        return res.status(404).json({ message: 'Service not found' });
      }
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
    // Support filtering appointments by client_id
    const filter: any = {};
    if (req.query.client_id) {
      filter.client_id = req.query.client_id;
    }
    if (req.query.stylist_id) {
      filter.stylist_id = req.query.stylist_id;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 });
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

// PUT - Update appointment status
appointmentsRouter.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json(updatedAppointment);
  } catch (error: any) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: error.message || 'Failed to update appointment status' });
  }
});

// DELETE - Cancel an appointment
appointmentsRouter.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Instead of deleting, update status to cancelled
    appointment.status = 'cancelled';
    await appointment.save();
    
    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error: any) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: error.message || 'Failed to cancel appointment' });
  }
});
