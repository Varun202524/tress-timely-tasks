
import { useState } from 'react';
import { useAppointment } from '@/context/AppointmentContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, User, Scissors, MessageSquare, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const AppointmentConfirmation = () => {
  const { appointment, resetAppointment, prevStep } = useAppointment();
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleConfirm = () => {
    setIsConfirming(true);
    
    // Simulate sending appointment to backend
    setTimeout(() => {
      toast({
        title: "Appointment Confirmed!",
        description: "Your appointment has been successfully booked.",
        variant: "default",
      });
      
      setIsConfirming(false);
      resetAppointment();
      navigate('/');
    }, 1500);
  };
  
  if (!appointment.service || !appointment.stylist || !appointment.date || !appointment.time) {
    return (
      <div className="text-center py-12">
        <p>Missing appointment information. Please go back and complete all steps.</p>
        <Button onClick={prevStep} className="mt-4">
          Back to Previous Step
        </Button>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="heading-lg text-foreground mb-2">Confirm Your Appointment</h2>
        <p className="text-muted-foreground">Please review your appointment details</p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/80 backdrop-blur-sm border rounded-xl p-6 shadow-soft"
      >
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-2">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Appointment Summary</h3>
        </div>
        
        <div className="space-y-4 divide-y">
          <div className="flex items-start py-3">
            <Scissors className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium">{appointment.service.name}</p>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span>${appointment.service.price}</span>
                <span className="mx-2">•</span>
                <span>{appointment.service.duration} min</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start py-3">
            <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Stylist</p>
              <p className="font-medium">{appointment.stylist.name}</p>
              <p className="text-sm text-muted-foreground">{appointment.stylist.role}</p>
            </div>
          </div>
          
          <div className="flex items-start py-3">
            <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {format(appointment.date, 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-sm text-muted-foreground">{appointment.time}</p>
            </div>
          </div>
          
          <div className="flex items-start py-3">
            <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="font-medium">{appointment.client.name}</p>
              <p className="text-sm text-muted-foreground">{appointment.client.email}</p>
              <p className="text-sm text-muted-foreground">{appointment.client.phone}</p>
            </div>
          </div>
          
          {appointment.client.notes && (
            <div className="flex items-start py-3">
              <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm">{appointment.client.notes}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Button
            type="button"
            onClick={prevStep}
            variant="outline"
            className="rounded-full px-6"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="rounded-full px-8 sm:px-10 py-6 bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isConfirming ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Confirm Appointment
              </>
            )}
          </Button>
        </div>
      </motion.div>
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>
          By confirming, you agree to our{" "}
          <a href="#" className="underline hover:text-primary">
            cancellation policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
