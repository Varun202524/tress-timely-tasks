
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/PageTransition';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Scissors } from 'lucide-react';

const Services = () => {
  const services = [
    {
      category: "Hair Cutting & Styling",
      items: [
        {
          name: "Women's Haircut & Style",
          description: "Precision cut and professional styling customized to your face shape and preferences.",
          price: 85,
          duration: 60,
        },
        {
          name: "Men's Haircut & Style",
          description: "Tailored cut and styling designed to enhance your look and suit your lifestyle.",
          price: 65,
          duration: 45,
        },
        {
          name: "Children's Haircut",
          description: "Gentle and patient approach to cutting and styling for our younger clients.",
          price: 45,
          duration: 30,
        },
        {
          name: "Blow Dry & Styling",
          description: "Professional blowout and styling to achieve your desired look for any occasion.",
          price: 65,
          duration: 45,
        },
        {
          name: "Special Occasion Styling",
          description: "Elaborate styling for weddings, galas, or any special event requiring a sophisticated look.",
          price: 95,
          duration: 60,
        },
      ]
    },
    {
      category: "Color Services",
      items: [
        {
          name: "Single Process Color",
          description: "Full head application of a single hair color for complete coverage or subtle change.",
          price: 85,
          duration: 90,
        },
        {
          name: "Highlights/Lowlights",
          description: "Dimensional color technique that adds depth and contrast to your hair.",
          price: 120,
          duration: 120,
        },
        {
          name: "Balayage/Ombré",
          description: "Hand-painted highlighting technique creating a graduated, natural-looking effect.",
          price: 150,
          duration: 150,
        },
        {
          name: "Color Correction",
          description: "Specialized service to fix or adjust previous color treatments.",
          price: "Consultation required",
          duration: "Varies",
        },
        {
          name: "Gloss/Toner",
          description: "Adds shine and refines color for a polished, vibrant finish.",
          price: 55,
          duration: 45,
        },
      ]
    },
    {
      category: "Treatments & Textures",
      items: [
        {
          name: "Deep Conditioning Treatment",
          description: "Intensive hair mask that nourishes and repairs damaged or dry hair.",
          price: 45,
          duration: 30,
        },
        {
          name: "Keratin Smoothing Treatment",
          description: "Reduces frizz and adds shine while making hair more manageable.",
          price: 250,
          duration: 150,
        },
        {
          name: "Permanent Wave",
          description: "Creates lasting curl or wave patterns in your hair.",
          price: 110,
          duration: 120,
        },
        {
          name: "Scalp Treatment",
          description: "Therapeutic treatment addressing specific scalp concerns and promoting hair health.",
          price: 65,
          duration: 45,
        },
      ]
    },
  ];

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
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24">
          {/* Hero */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-salon-50 via-white to-salon-50 -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
                  OUR SERVICES
                </span>
                <h1 className="heading-xl mb-6">Premium Hair Services</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Discover our comprehensive range of hair services designed to transform, enhance, and maintain your unique style.
                </p>
                <Link to="/appointments">
                  <Button size="lg" className="rounded-full px-8">
                    Book an Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          {/* Services List */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {services.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-20">
                  <div className="flex items-center mb-8">
                    <div className="mr-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Scissors className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="heading-md">{category.category}</h2>
                  </div>
                  
                  <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    {category.items.map((service, serviceIndex) => (
                      <motion.div 
                        key={serviceIndex}
                        variants={item}
                        className="bg-white/80 backdrop-blur-sm border border-salon-100/50 rounded-xl p-6 hover:shadow-soft transition-all"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="text-lg font-medium">{service.name}</h3>
                          <span className="text-primary font-medium">
                            {typeof service.price === 'number' ? `$${service.price}` : service.price}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{typeof service.duration === 'number' ? `${service.duration} min` : service.duration}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                        <Link to="/appointments">
                          <Button variant="outline" size="sm" className="rounded-full text-sm">
                            Book Now
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </section>
          
          {/* CTA */}
          <section className="py-16 bg-salon-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="heading-lg mb-6">Ready to Experience Our Services?</h2>
              <p className="text-salon-300 max-w-2xl mx-auto mb-8">
                Book your appointment today and let our expert stylists help you look and feel your best.
              </p>
              <Link to="/appointments">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                  Schedule Now
                </Button>
              </Link>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;
