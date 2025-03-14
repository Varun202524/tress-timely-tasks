
import { Service, Stylist, AppointmentData } from '@/types/appointment';

// Default data for when services are loading from the database
export const defaultServices: Service[] = [
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

export const defaultStylists: Stylist[] = [
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

export const defaultAppointment: AppointmentData = {
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
