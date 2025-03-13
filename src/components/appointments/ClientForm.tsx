
import { useState, useEffect } from 'react';
import { useAppointment } from '@/context/AppointmentContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const clientSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  notes: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

export const ClientForm = () => {
  const { appointment, setClientInfo, nextStep, prevStep } = useAppointment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useAuth();
  
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: appointment.client.name,
      email: appointment.client.email,
      phone: appointment.client.phone,
      notes: appointment.client.notes,
    },
  });
  
  // Pre-fill form with user data if available
  useEffect(() => {
    if (profile && user) {
      const fullName = `${profile.first_name} ${profile.last_name}`.trim();
      
      if (fullName && !appointment.client.name) {
        form.setValue('name', fullName);
      }
      
      if (user.email && !appointment.client.email) {
        form.setValue('email', user.email);
      }
    }
  }, [profile, user, form, appointment.client]);
  
  const onSubmit = (data: ClientFormValues) => {
    setIsSubmitting(true);
    
    // Update client info in context
    setClientInfo(data);
    
    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      nextStep();
    }, 800);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="heading-lg text-foreground mb-2">Your Information</h2>
        <p className="text-muted-foreground">Please provide your contact details</p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      className="rounded-lg h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your@email.com" 
                        {...field} 
                        className="rounded-lg h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="(123) 456-7890" 
                        {...field} 
                        className="rounded-lg h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests or Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional information for your stylist" 
                      {...field} 
                      className="rounded-lg min-h-[120px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
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
                type="submit"
                disabled={isSubmitting}
                className="rounded-full px-6"
                size="lg"
              >
                {isSubmitting ? "Processing..." : "Continue"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};
