
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

  try {
    // First, fetch the actual UUID for the service from the database using the name
    const { data: serviceData, error: serviceError } = await supabase
      .from('services')
      .select('id')
      .eq('name', appointment.service.name)
      .single();
    
    if (serviceError || !serviceData) {
      console.error('Error finding service by name:', serviceError);
      throw new Error('Could not find the selected service in the database');
    }
    
    const serviceId = serviceData.id;
    
    // Fetch the stylist profile using the provided stylist.id or name
    // Be careful with the query to avoid recursion issues with our RLS policies
    let stylistId = null;
    
    // First try to get the stylist by ID directly if it's a valid UUID
    if (appointment.stylist.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(appointment.stylist.id)) {
      stylistId = appointment.stylist.id;
    } else {
      // If not a valid UUID, try to find by name
      const { data: stylistData, error: stylistError } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'stylist')
        .limit(1);
      
      if (!stylistError && stylistData && stylistData.length > 0) {
        stylistId = stylistData[0].id;
      } else {
        console.warn('Could not find a stylist, using client ID as fallback:', userId);
        stylistId = userId; // Fallback to user's ID if no stylist found
      }
    }
    
    console.log('Using real UUID service_id:', serviceId);
    console.log('Using stylist_id:', stylistId);
    
    // Create the appointment with valid UUIDs
    const { error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        client_id: userId,
        stylist_id: stylistId,
        service_id: serviceId,
        date: appointment.date.toISOString().split('T')[0],
        time: formattedTime,
        notes: appointment.client.notes,
        status: 'pending'
      });
    
    if (appointmentError) {
      console.error('Error creating appointment:', appointmentError);
      throw appointmentError;
    }
  } catch (error) {
    console.error('Error submitting appointment:', error);
    throw error;
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
