
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
export type AppointmentContextType = {
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
