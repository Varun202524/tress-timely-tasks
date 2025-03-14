
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
  
  // First, ensure we have a valid service ID from the database
  const { data: serviceData, error: serviceError } = await supabase
    .from('services')
    .select('id')
    .eq('name', appointment.service.name)
    .single();
  
  if (serviceError) {
    console.error('Error finding service by name:', serviceError);
    throw new Error('Could not find the selected service in the database');
  }
  
  if (!serviceData) {
    console.error('No service found with name:', appointment.service.name);
    throw new Error('Could not find the selected service in the database');
  }
  
  console.log('Found service in database:', serviceData);
  
  // Create the appointment using the valid service ID from the database
  const { error: appointmentError } = await supabase
    .from('appointments')
    .insert({
      client_id: userId,
      stylist_id: userId, // Using user ID for testing since we don't have real stylist IDs yet
      service_id: serviceData.id,
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
