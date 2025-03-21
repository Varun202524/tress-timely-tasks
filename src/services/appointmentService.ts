
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

// This is a temporary implementation that doesn't use Supabase
// In a real implementation, this would connect to your Django backend
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
  
  console.log('Submitting appointment with service:', appointment.service);
  console.log('Service ID:', appointment.service.id);
  console.log('Stylist ID:', appointment.stylist.id);

  try {
    // This would be replaced with an API call to your Django backend
    console.log('Appointment data that would be sent to backend:', {
      client_id: userId,
      stylist_id: appointment.stylist.id,
      service_id: appointment.service.id,
      date: appointment.date.toISOString().split('T')[0],
      time: formattedTime,
      notes: appointment.client.notes,
      status: 'pending'
    });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, we would handle the response from the backend
    console.log('Appointment successfully submitted');
  } catch (error) {
    console.error('Error submitting appointment:', error);
    throw error;
  }
}

export async function fetchServices() {
  try {
    // This would be replaced with an API call to your Django backend
    console.log('Fetched services from mock data');
    
    // Return mock data for now
    return mockServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
}
