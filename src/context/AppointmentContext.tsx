
import { createContext, useContext, ReactNode } from 'react';
import { AppointmentContextType, AppointmentData, Service, Stylist } from '@/types/appointment';
import { useAppointmentState } from '@/hooks/useAppointmentState';
import { submitAppointment } from '@/services/appointmentService';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

// Create context
const AppointmentContext = createContext<AppointmentContextType | null>(null);

// Provider component
export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const {
    appointment,
    services,
    stylists,
    currentStep,
    isSubmitting,
    setIsSubmitting,
    setService,
    setStylist,
    setDate,
    setTime,
    setClientInfo,
    resetAppointment,
    nextStep,
    prevStep,
    goToStep
  } = useAppointmentState();
  
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleSubmitAppointment = async (): Promise<boolean> => {
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
    
    console.log('Submitting appointment with service:', appointment.service);
    setIsSubmitting(true);
    
    try {
      await submitAppointment(appointment, user.id);
      
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
        submitAppointment: handleSubmitAppointment,
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

// Re-export types
export type { Service, Stylist, AppointmentData };
