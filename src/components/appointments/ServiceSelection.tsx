
import { useAppointment, Service } from '@/context/AppointmentContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ServiceSelection = () => {
  const { services, appointment, setService, nextStep } = useAppointment();
  
  const handleContinue = () => {
    if (appointment.service) {
      nextStep();
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="heading-lg text-foreground mb-2">Choose a Service</h2>
        <p className="text-muted-foreground">Select the service you'd like to book</p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={appointment.service?.id === service.id}
            onSelect={() => setService(service)}
            variants={item}
          />
        ))}
      </motion.div>
      
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleContinue}
          disabled={!appointment.service}
          className="rounded-full px-6"
          size="lg"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
  variants: any;
}

const ServiceCard = ({ service, isSelected, onSelect, variants }: ServiceCardProps) => {
  return (
    <motion.div 
      variants={variants}
      className={cn(
        "relative p-6 rounded-xl border transition-all cursor-pointer overflow-hidden group",
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50 hover:shadow-sm"
      )}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-lg font-medium">{service.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{service.duration} min</span>
          <span className="mx-2">•</span>
          <span>${service.price}</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
      
      <div className="mt-2">
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full transition-all",
            isSelected ? "bg-primary text-white" : "text-muted-foreground"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </div>
    </motion.div>
  );
};
