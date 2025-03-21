
import { AppointmentData } from '@/types/appointment';

// API base URL - would be set to your Express backend URL
const API_URL = 'http://localhost:3000/api';

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
    // Make the API call to the Express backend
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
    
    console.log('Appointment successfully submitted');
  } catch (error) {
    console.error('Error submitting appointment:', error);
    throw error;
  }
}

export async function fetchServices() {
  try {
    console.log('Fetching services from API');
    const response = await fetch(`${API_URL}/services`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch services');
    }
    
    const services = await response.json();
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Fall back to mock data if the API call fails
    console.log('Fetched services from mock data');
    return [
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
  }
}
