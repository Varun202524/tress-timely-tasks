
import { useState, useEffect } from 'react';
import { AppointmentData, Service, Stylist } from '@/types/appointment';
import { defaultAppointment, defaultServices, defaultStylists } from '@/data/appointmentDefaults';
import { fetchServices } from '@/services/appointmentService';

export function useAppointmentState() {
  const [appointment, setAppointment] = useState<AppointmentData>(defaultAppointment);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [stylists, setStylists] = useState<Stylist[]>(defaultStylists);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch services from Supabase
  useEffect(() => {
    const loadServices = async () => {
      const fetchedServices = await fetchServices();
      if (fetchedServices) {
        setServices(fetchedServices);
      }
    };
    
    loadServices();
  }, []);
  
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

  return {
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
  };
}
