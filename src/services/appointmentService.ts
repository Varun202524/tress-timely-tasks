
import { AppointmentData } from '@/types/appointment';

// Temporary mock data for services
const mockServices = [
  {
    id: '1',
    name: 'Haircut',
    description: 'A professional haircut service',
    price: 50,
    duration: 30,
  },
  {
    id: '2',
    name: 'Hair Coloring',
    description: 'Full hair coloring service',
    price: 120,
    duration: 90,
  },
  {
    id: '3',
    name: 'Styling',
    description: 'Hair styling for special occasions',
    price: 70,
    duration: 45,
  }
];

// API base URL - would be set to your Express backend URL
const API_URL = 'http://localhost:3000/api';

// This will need to be replaced with actual calls to your Express backend
export async function submitAppointment(appointment: AppointmentData, userId: string): Promise<void> {
  if (!appointment.service || !appointment.stylist || !appointment.date || !appointment.time) {
    throw new Error('Missing required appointment information');
  }

  // Format the time for consistency
  const timeMatch = appointment.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hours = 0;
  let minutes = 0;
  
  if (timeMatch) {
    hours = parseInt(timeMatch[1]);
    minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3].toUpperCase();
    
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
  }
  
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  
  // Prepare the appointment data to send to the backend
  const appointmentData = {
    client_id: userId,
    stylist_id: appointment.stylist.id,
    service_id: appointment.service.id,
    date: appointment.date.toISOString().split('T')[0],
    time: formattedTime,
    notes: appointment.client.notes,
    status: 'pending'
  };
  
  console.log('Submitting appointment data:', appointmentData);

  try {
    // This is where we would make the API call to the Express backend
    // For now, we'll just simulate a successful API call
    
    // When your Express backend is ready, uncomment this code:
    /*
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to book appointment');
    }
    */
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Appointment successfully submitted');
  } catch (error) {
    console.error('Error submitting appointment:', error);
    throw error;
  }
}

export async function fetchServices() {
  try {
    // This is where we would make the API call to the Express backend
    // For now, we'll just return mock data
    
    // When your Express backend is ready, uncomment this code:
    /*
    const response = await fetch(`${API_URL}/services`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch services');
    }
    
    const services = await response.json();
    return services;
    */
    
    console.log('Fetched services from mock data');
    
    // Return mock data for now
    return mockServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
}
