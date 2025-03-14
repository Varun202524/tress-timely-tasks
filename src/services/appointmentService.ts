
import { supabase } from '@/integrations/supabase/client';
import { AppointmentData } from '@/types/appointment';

export async function submitAppointment(appointment: AppointmentData, userId: string): Promise<void> {
  if (!appointment.service || !appointment.stylist || !appointment.date || !appointment.time) {
    throw new Error('Missing required appointment information');
  }

  // Format the time to a proper PostgreSQL time format (HH:MM:SS)
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
  console.log('Service ID type:', typeof appointment.service.id, 'Value:', appointment.service.id);
  console.log('Stylist ID type:', typeof appointment.stylist.id, 'Value:', appointment.stylist.id);
  
  // Create the appointment
  const { error: appointmentError } = await supabase
    .from('appointments')
    .insert({
      client_id: userId,
      stylist_id: appointment.stylist.id,
      service_id: appointment.service.id,
      date: appointment.date.toISOString().split('T')[0],
      time: formattedTime,
      notes: appointment.client.notes,
      status: 'pending'
    });
  
  if (appointmentError) {
    console.error('Error creating appointment:', appointmentError);
    throw appointmentError;
  }
}

export async function fetchServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*');
    
    if (error) {
      console.error('Error fetching services:', error);
      return null;
    }
    
    if (data && data.length > 0) {
      const formattedServices = data.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: Number(service.price),
        duration: service.duration,
      }));
      
      console.log('Fetched services from database:', formattedServices);
      return formattedServices;
    } else {
      console.log('No services found in the database, using defaults');
      return null;
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
}
