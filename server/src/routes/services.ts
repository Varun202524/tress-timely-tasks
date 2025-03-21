
import express from 'express';
import { Service } from '../models/Service';

export const servicesRouter = express.Router();

// GET - Get all services
servicesRouter.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.status(200).json(services);
  } catch (error: any) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch services' });
  }
});

// GET - Get service by ID
servicesRouter.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json(service);
  } catch (error: any) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch service' });
  }
});

// POST - Create a new service (for admin use)
servicesRouter.post('/', async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error: any) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: error.message || 'Failed to create service' });
  }
});

// PUT - Update a service
servicesRouter.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json(updatedService);
  } catch (error: any) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: error.message || 'Failed to update service' });
  }
});

// DELETE - Delete a service
servicesRouter.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: error.message || 'Failed to delete service' });
  }
});
