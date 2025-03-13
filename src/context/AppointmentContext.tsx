
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
};

export type Stylist = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
};

export type AppointmentData = {
  service: Service | null;
  stylist: Stylist | null;
  date: Date | null;
  time: string | null;
  client: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
};

// Context type
type AppointmentContextType = {
  appointment: AppointmentData;
  services: Service[];
  stylists: Stylist[];
  currentStep: number;
  setService: (service: Service) => void;
  setStylist: (stylist: Stylist) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setClientInfo: (info: Partial<AppointmentData['client']>) => void;
  resetAppointment: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  submitAppointment: () => Promise<boolean>;
  isSubmitting: boolean;
};

// Default data
const defaultServices: Service[] = [
  {
    id: '1',
    name: 'Haircut & Style',
    description: 'Precision cut and professional styling to suit your face shape and preferences.',
    price: 85,
    duration: 60,
  },
  {
    id: '2',
    name: 'Color & Highlights',
    description: 'Full color or dimensional highlights with expert application techniques.',
    price: 120,
    duration: 120,
  },
  {
    id: '3',
    name: 'Blowout & Styling',
    description: 'Professional blowdry and styling to achieve your desired look.',
    price: 65,
    duration: 45,
  },
  {
    id: '4',
    name: 'Hair Treatment',
    description: 'Deep conditioning and specialized treatments to repair and revitalize your hair.',
    price: 95,
    duration: 75,
  },
  {
    id: '5',
    name: 'Bridal Hair',
    description: 'Complete bridal styling with trial session to perfect your wedding day look.',
    price: 150,
    duration: 90,
  },
];

const defaultStylists: Stylist[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    role: 'Master Stylist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'With over 10 years of experience, Alex specializes in precision cuts and color techniques.',
  },
  {
    id: '2',
    name: 'Jamie Rodriguez',
    role: 'Color Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Jamie is our go-to expert for complex color transformations and balayage techniques.',
  },
  {
    id: '3',
    name: 'Taylor Kim',
    role: 'Stylist & Texture Expert',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Taylor specializes in curly hair and creating stunning texture-focused styles.',
  },
  {
    id: '4',
    name: 'Jordan Smith',
    role: 'Senior Stylist',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Jordan brings innovative techniques and a contemporary approach to classic styling.',
  },
];

const defaultAppointment: AppointmentData = {
  service: null,
  stylist: null,
  date: null,
  time: null,
  client: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
};

// Create context
const AppointmentContext = createContext<AppointmentContextType | null>(null);

// Provider component
export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointment, setAppointment] = useState<AppointmentData>(defaultAppointment);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [stylists, setStylists] = useState<Stylist[]>(defaultStylists);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Fetch services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*');
        
        if (error) {
          console.error('Error fetching services:', error);
          return;
        }
        
        if (data && data.length > 0) {
          const formattedServices = data.map(service => ({
            id: service.id,
            name: service.name,
            description: service.description,
            price: Number(service.price),
            duration: service.duration,
          }));
          
          setServices(formattedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    
    fetchServices();
  }, []);
  
  // Fetch stylists (in a real app, this would come from the database)
  // For now, we'll use the default stylists
  
  const setService = (service: Service) => {
    setAppointment(prev => ({ ...prev, service }));
  };
  
  const setStylist = (stylist: Stylist) => {
    setAppointment(prev => ({ ...prev, stylist }));
  };
  
  const setDate = (date: Date) => {
    setAppointment(prev => ({ ...prev, date }));
  };
  
  const setTime = (time: string) => {
    setAppointment(prev => ({ ...prev, time }));
  };
  
  const setClientInfo = (info: Partial<AppointmentData['client']>) => {
    setAppointment(prev => ({
      ...prev,
      client: { ...prev.client, ...info },
    }));
  };
  
  const resetAppointment = () => {
    setAppointment(defaultAppointment);
    setCurrentStep(1);
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const goToStep = (step: number) => {
    setCurrentStep(Math.min(Math.max(step, 1), 5));
  };
  
  const submitAppointment = async (): Promise<boolean> => {
    if (!appointment.service || !appointment.stylist || !appointment.date || !appointment.time) {
      toast({
        title: "Missing information",
        description: "Please complete all appointment details before confirming.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book an appointment.",
        variant: "destructive",
      });
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
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
      
      // Create the appointment
      const { error } = await supabase
        .from('appointments')
        .insert({
          client_id: user.id,
          stylist_id: appointment.stylist.id,
          service_id: appointment.service.id,
          date: appointment.date.toISOString().split('T')[0],
          time: formattedTime,
          notes: appointment.client.notes,
          status: 'pending'
        });
      
      if (error) throw error;
      
      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been successfully scheduled.",
      });
      
      resetAppointment();
      return true;
    } catch (error: any) {
      console.error('Error submitting appointment:', error);
      toast({
        title: "Booking failed",
        description: error.message || "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        services,
        stylists,
        currentStep,
        setService,
        setStylist,
        setDate,
        setTime,
        setClientInfo,
        resetAppointment,
        nextStep,
        prevStep,
        goToStep,
        submitAppointment,
        isSubmitting,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

// Custom hook to use the appointment context
export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  
  return context;
};
