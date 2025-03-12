
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';
import { PageTransition } from '@/components/ui/PageTransition';

const Appointments = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center mb-8">
              <h1 className="heading-lg mb-3">Book Your Appointment</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Schedule your visit in a few simple steps and treat yourself to a premium salon experience.
              </p>
            </div>
            
            <AppointmentForm />
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Appointments;
