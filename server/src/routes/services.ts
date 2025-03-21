
import express from 'express';
import { Service } from '../models/Service';

export const servicesRouter = express.Router();

// GET - Get all services
servicesRouter.get('/', async (req, res) => {
  try {
    const services = await Service.find();
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
