
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Clock, DollarSign } from 'lucide-react';

interface ServiceCategoryProps {
  title: string;
  description: string;
  services: ServiceProps[];
}

interface ServiceProps {
  name: string;
  description: string;
  price: string;
  duration: string;
  popular?: boolean;
}

const serviceCategories: ServiceCategoryProps[] = [
  {
    title: "Haircuts & Styling",
    description: "Precision cuts and expert styling tailored to your face shape and personal style.",
    services: [
      {
        name: "Women's Haircut",
        description: "Includes consultation, shampoo, conditioning, precision cut, and style.",
        price: "$65+",
        duration: "60 min",
        popular: true
      },
      {
        name: "Men's Haircut",
        description: "Includes consultation, shampoo, precision cut, and style.",
        price: "$45+",
        duration: "45 min"
      },
      {
        name: "Children's Haircut (12 and under)",
        description: "Gentle approach for our younger clients.",
        price: "$35+",
        duration: "30 min"
      },
      {
        name: "Blowout & Style",
        description: "Professional blowdry and styling to achieve your desired look.",
        price: "$50+",
        duration: "45 min"
      },
      {
        name: "Special Occasion Styling",
        description: "Elegant styling for weddings, proms, and special events.",
        price: "$85+",
        duration: "60 min",
        popular: true
      }
    ]
  },
  {
    title: "Color Services",
    description: "Vibrant, long-lasting color with premium products for healthy, beautiful hair.",
    services: [
      {
        name: "Single Process Color",
        description: "Full head color application for gray coverage or color change.",
        price: "$75+",
        duration: "90 min"
      },
      {
        name: "Partial Highlights",
        description: "Dimension and depth focused around the face and crown.",
        price: "$95+",
        duration: "2 hours"
      },
      {
        name: "Full Highlights",
        description: "Comprehensive highlights throughout the entire head.",
        price: "$130+",
        duration: "2.5 hours",
        popular: true
      },
      {
        name: "Balayage/Ombré",
        description: "Hand-painted highlights for a natural, sun-kissed look.",
        price: "$150+",
        duration: "3 hours",
        popular: true
      },
      {
        name: "Color Correction",
        description: "Specialized service to fix previous color issues (consultation required).",
        price: "$200+",
        duration: "3+ hours"
      }
    ]
  },
  {
    title: "Treatments & Extensions",
    description: "Rejuvenating treatments and length-enhancing services for all hair types.",
    services: [
      {
        name: "Deep Conditioning Treatment",
        description: "Intense moisture and repair for damaged or dry hair.",
        price: "$35+",
        duration: "30 min"
      },
      {
        name: "Keratin Smoothing Treatment",
        description: "Reduces frizz and adds shine for smoother, more manageable hair.",
        price: "$250+",
        duration: "3 hours",
        popular: true
      },
      {
        name: "Hair Extensions (Consultation)",
        description: "Initial consultation to determine extension type and needs.",
        price: "Free",
        duration: "30 min"
      },
      {
        name: "Extension Application",
        description: "Professional application of premium quality extensions.",
        price: "$500+",
        duration: "3+ hours"
      },
      {
        name: "Scalp Treatment",
        description: "Therapeutic treatment for scalp health and hair growth.",
        price: "$45+",
        duration: "45 min"
      }
    ]
  }
];

const ServiceCategory = ({ category, index }: { category: ServiceCategoryProps, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-16"
    >
      <h2 className="heading-md mb-3">{category.title}</h2>
      <p className="text-muted-foreground mb-8 max-w-3xl">{category.description}</p>
      
      <div className="space-y-4">
        {category.services.map((service, i) => (
          <div 
            key={i} 
            className={`p-6 rounded-xl border transition-all ${
              service.popular 
                ? 'border-primary/50 bg-primary/5 hover:shadow-md' 
                : 'border-border bg-white hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">{service.name}</h3>
                  {service.popular && (
                    <span className="ml-3 px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{service.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2 sm:mt-0">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <DollarSign className="h-4 w-4 mr-1 text-primary" />
                  <span>{service.price}</span>
                </div>
                <Link to="/appointments">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-secondary/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
                OUR SPECIALTIES
              </span>
              <h1 className="heading-xl mb-4">Premium Hair Services</h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                From precision cuts to transformative color treatments, we offer a complete range of services to enhance your natural beauty.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Services List */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {serviceCategories.map((category, index) => (
              <ServiceCategory key={index} category={category} index={index} />
            ))}
          </div>
        </section>
        
        {/* Additional Services */}
        <section className="py-20 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Additional Information</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know to prepare for your salon visit.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Cancellation Policy",
                  description: "We kindly request 24-hour notice for cancellations. Late cancellations may be subject to a fee.",
                  icon: <Clock className="h-6 w-6 text-primary" />
                },
                {
                  title: "First-Time Clients",
                  description: "New clients should arrive 15 minutes early to complete consultation forms for the best experience.",
                  icon: <Scissors className="h-6 w-6 text-primary" />
                },
                {
                  title: "Gift Cards",
                  description: "The perfect gift for any occasion. Purchase in-salon or online for any service or amount.",
                  icon: <DollarSign className="h-6 w-6 text-primary" />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl border border-border hover:shadow-soft transition-all"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">Ready to Transform Your Look?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Book your appointment today and experience the Elegance difference.
              </p>
              <Link to="/appointments">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                  Book Your Appointment
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;
