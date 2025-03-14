import { useState, useEffect } from 'react';
import { useAppointment } from '@/context/AppointmentContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

// Available time slots
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM'
];

// Simulate unavailable time slots based on the day
const getUnavailableSlots = (date: Date) => {
  const day = date.getDay();
  
  // Weekend has fewer available slots
  if (day === 0) { // Sunday
    return timeSlots.filter((_, index) => 
      index < 2 || index > 10 || index % 3 === 0
    );
  }
  
  if (day === 6) { // Saturday
    return timeSlots.filter((_, index) => 
      index % 4 === 0
    );
  }
  
  // Weekdays
  return timeSlots.filter((_, index) => 
    index % 5 === 0
  );
};

export const DateTimeSelection = () => {
  const { appointment, setDate, setTime, nextStep, prevStep } = useAppointment();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  
  const today = new Date();
  const twoMonthsFromNow = addDays(today, 60);
  
  useEffect(() => {
    if (appointment.date) {
      const unavailableSlots = getUnavailableSlots(appointment.date);
      const available = timeSlots.filter(slot => !unavailableSlots.includes(slot));
      setAvailableSlots(available);
    }
  }, [appointment.date]);
  
  const handleContinue = () => {
    if (appointment.date && appointment.time) {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="heading-lg text-foreground mb-2">Choose Date & Time</h2>
        <p className="text-muted-foreground">Select when you'd like to schedule your appointment</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center md:justify-start"
        >
          <Calendar
            mode="single"
            selected={appointment.date || undefined}
            onSelect={(date) => date && setDate(date)}
            disabled={(date) => isBefore(date, startOfDay(today))}
            fromDate={today}
            toDate={twoMonthsFromNow}
            className="bg-white/80 backdrop-blur-sm border rounded-xl shadow-sm p-3 pointer-events-auto"
          />
        </motion.div>
        
        {/* Time Slots */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-medium mb-4 flex items-center"
          >
            <Clock className="h-4 w-4 mr-2 text-primary" />
            Available Times
            {appointment.date && (
              <span className="ml-2 text-sm text-muted-foreground">
                {format(appointment.date, 'EEEE, MMMM d')}
              </span>
            )}
          </motion.h3>
          
          {!appointment.date ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-sm"
            >
              Please select a date to see available times
            </motion.p>
          ) : availableSlots.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-sm"
            >
              No available slots for this date
            </motion.p>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.03 }
                }
              }}
              className="grid grid-cols-3 gap-2"
            >
              {availableSlots.map((slot) => (
                <motion.div
                  key={slot}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setTime(slot)}
                    className={cn(
                      "w-full py-2 px-3 text-sm rounded-lg border transition-all",
                      appointment.time === slot
                        ? "bg-primary text-white border-primary"
                        : "border-border hover:border-primary/30 text-foreground"
                    )}
                  >
                    {slot}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          onClick={prevStep}
          variant="outline"
          className="rounded-full px-6"
          size="lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button
          onClick={handleContinue}
          disabled={!appointment.date || !appointment.time}
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
