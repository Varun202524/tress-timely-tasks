
import { useAppointment } from '@/context/AppointmentContext';
import { ServiceSelection } from './ServiceSelection';
import { StylistSelection } from './StylistSelection';
import { DateTimeSelection } from './DateTimeSelection';
import { ClientForm } from './ClientForm';
import { AppointmentConfirmation } from './AppointmentConfirmation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Stepper component for appointment process
const BookingStepper = () => {
  const { currentStep, goToStep } = useAppointment();
  
  const steps = [
    { id: 1, name: 'Service' },
    { id: 2, name: 'Stylist' },
    { id: 3, name: 'Date & Time' },
    { id: 4, name: 'Your Info' },
    { id: 5, name: 'Confirmation' },
  ];
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <button
              onClick={() => currentStep > step.id && goToStep(step.id)}
              disabled={currentStep < step.id}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full transition-all",
                currentStep === step.id
                  ? "bg-primary text-white"
                  : currentStep > step.id
                  ? "bg-primary/20 text-primary border border-primary/30 cursor-pointer"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step.id}
            </button>
            
            {/* Step Label */}
            <span 
              className={cn(
                "ml-2 text-sm hidden md:block",
                currentStep === step.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.name}
            </span>
            
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "h-[2px] flex-1 mx-2 md:mx-4",
                  currentStep > index + 1
                    ? "bg-primary/50"
                    : "bg-muted"
                )}
                style={{ width: '40px' }}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Stepper */}
      <div className="sm:hidden text-center mb-6">
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </p>
        <p className="text-foreground font-medium">
          {steps.find(step => step.id === currentStep)?.name}
        </p>
        <div className="w-full bg-muted h-1.5 rounded-full mt-3">
          <div 
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const AppointmentForm = () => {
  const { currentStep } = useAppointment();
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelection />;
      case 2:
        return <StylistSelection />;
      case 3:
        return <DateTimeSelection />;
      case 4:
        return <ClientForm />;
      case 5:
        return <AppointmentConfirmation />;
      default:
        return <ServiceSelection />;
    }
  };
  
  return (
    <div className="py-6">
      <BookingStepper />
      
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStepContent()}
      </motion.div>
    </div>
  );
};
