
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Star } from 'lucide-react';

interface StylistProps {
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  rating: number;
  experience: string;
}

const stylists: StylistProps[] = [
  {
    name: 'Emma Wilson',
    title: 'Master Stylist',
    bio: 'Emma brings over a decade of experience in cutting-edge hair design. Her precision cutting techniques and color expertise have earned her a devoted clientele.',
    specialties: ['Precision Cuts', 'Balayage', 'Color Correction'],
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    experience: '12 years'
  },
  {
    name: 'Daniel Chen',
    title: 'Color Specialist',
    bio: 'Daniel is renowned for his innovative color techniques and ability to create personalized looks that enhance each client\'s unique features.',
    specialties: ['Custom Color', 'Highlights', 'Fashion Colors'],
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    experience: '8 years'
  },
  {
    name: 'Sophia Rodriguez',
    title: 'Style Director',
    bio: 'With an eye for detail and a passion for creating transformative styles, Sophia specializes in helping clients achieve their perfect look.',
    specialties: ['Bridal Styling', 'Extensions', 'Textured Hair'],
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    experience: '10 years'
  },
  {
    name: 'James Taylor',
    title: 'Senior Stylist',
    bio: 'James combines technical expertise with artistic vision to create modern, wearable styles tailored to each client\'s lifestyle and preferences.',
    specialties: ['Men\'s Cuts', 'Fades', 'Styling'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    experience: '7 years'
  },
  {
    name: 'Olivia Kim',
    title: 'Texture Specialist',
    bio: 'Olivia has dedicated her career to understanding and enhancing all hair textures, with particular expertise in curly and coily hair types.',
    specialties: ['Curl Enhancement', 'Natural Hair', 'Hair Treatments'],
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    experience: '9 years'
  },
  {
    name: 'Michael Brooks',
    title: 'Creative Director',
    bio: 'As our Creative Director, Michael leads our team with innovative vision and stays at the cutting edge of international hair trends.',
    specialties: ['Avant-Garde', 'Editorial Styling', 'Hair Shows'],
    image: 'https://images.unsplash.com/photo-1531727991582-cfd25ce79613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    experience: '15 years'
  }
];

const StylistCard = ({ stylist }: { stylist: StylistProps }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-md transition-all"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={stylist.image} 
          alt={stylist.name} 
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-1">{stylist.name}</h3>
        <p className="text-primary text-sm mb-3">{stylist.title}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(stylist.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">{stylist.rating}</span>
          <span className="text-sm text-muted-foreground ml-4">{stylist.experience} experience</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">{stylist.bio}</p>
        
        <div className="mb-5">
          <p className="text-xs text-foreground font-medium mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {stylist.specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="text-xs bg-secondary px-2 py-1 rounded-full text-secondary-foreground"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <Link to="/appointments" className="block w-full">
          <Button variant="outline" className="w-full rounded-full">Book Appointment</Button>
        </Link>
      </div>
    </motion.div>
  );
};

const Stylists = () => {
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
                OUR EXPERT TEAM
              </span>
              <h1 className="heading-xl mb-4">Meet Our Talented Stylists</h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our team of skilled professionals combines artistic vision with technical expertise to help you look and feel your best.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Stylists Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stylists.map((stylist, index) => (
                <StylistCard key={index} stylist={stylist} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Scissors className="h-8 w-8 text-primary" />
              </div>
              <h2 className="heading-lg mb-6">Ready to Book Your Appointment?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Choose your preferred stylist and schedule your visit online in just a few clicks.
              </p>
              <Link to="/appointments">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                  Book Now
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

export default Stylists;
