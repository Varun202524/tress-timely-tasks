
import express from 'express';

export const servicesRouter = express.Router();

// Temporary in-memory storage for services
const services = [
  {
    id: '1',
    name: 'Haircut',
    description: 'A professional haircut service',
    price: 50,
    duration: 30,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Hair Coloring',
    description: 'Full hair coloring service',
    price: 120,
    duration: 90,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Styling',
    description: 'Hair styling for special occasions',
    price: 70,
    duration: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// GET - Get all services
servicesRouter.get('/', (req, res) => {
  try {
    res.status(200).json(services);
  } catch (error: any) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch services' });
  }
});

// GET - Get service by ID
servicesRouter.get('/:id', (req, res) => {
  try {
    const service = services.find(s => s.id === req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json(service);
  } catch (error: any) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch service' });
  }
});
