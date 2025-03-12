
import { useAppointment, Stylist } from '@/context/AppointmentContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StylistSelection = () => {
  const { stylists, appointment, setStylist, nextStep, prevStep } = useAppointment();
  
  const handleContinue = () => {
    if (appointment.stylist) {
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
        <h2 className="heading-lg text-foreground mb-2">Choose Your Stylist</h2>
        <p className="text-muted-foreground">Select a stylist for your appointment</p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {stylists.map((stylist) => (
          <StylistCard
            key={stylist.id}
            stylist={stylist}
            isSelected={appointment.stylist?.id === stylist.id}
            onSelect={() => setStylist(stylist)}
            variants={item}
          />
        ))}
      </motion.div>
      
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
          disabled={!appointment.stylist}
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

interface StylistCardProps {
  stylist: Stylist;
  isSelected: boolean;
  onSelect: () => void;
  variants: any;
}

const StylistCard = ({ stylist, isSelected, onSelect, variants }: StylistCardProps) => {
  return (
    <motion.div 
      variants={variants}
      className={cn(
        "relative p-6 rounded-xl border transition-all cursor-pointer overflow-hidden",
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50 hover:shadow-sm"
      )}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1 z-10">
          <Check className="h-4 w-4" />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <div className="relative w-20 h-20 flex-shrink-0">
          <img 
            src={stylist.image} 
            alt={stylist.name}
            className="rounded-full object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-medium">{stylist.name}</h3>
          <p className="text-sm text-primary mb-2">{stylist.role}</p>
          <p className="text-sm text-muted-foreground">{stylist.bio}</p>
          
          <div className="mt-4">
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
        </div>
      </div>
    </motion.div>
  );
};
