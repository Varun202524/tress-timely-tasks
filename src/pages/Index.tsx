
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/PageTransition';
import { motion } from 'framer-motion';
import { Scissors, Check, Star, Clock } from 'lucide-react';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-salon-50 via-white to-salon-50 opacity-50 -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-16 text-center lg:text-left mb-10 lg:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
                    PREMIUM HAIR SALON
                  </span>
                  <h1 className="heading-xl mb-4">Experience the Art of Beautiful Hair</h1>
                  <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                    Elevate your style with our expert stylists and premium services in a serene, luxurious environment.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/appointments">
                      <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                        Book Appointment
                      </Button>
                    </Link>
                    <Link to="/services">
                      <Button size="lg" variant="outline" className="rounded-full px-8">
                        Explore Services
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
              <div className="lg:w-1/2 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden shadow-soft"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                    alt="Elegant hair salon" 
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: '600px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-soft"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">500+ 5-star reviews</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Preview */}
        <section className="py-20 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Our Premium Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From precision cuts to transformative color treatments, we offer a complete range of premium hair services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Haircuts",
                  description: "Expert cuts tailored to your face shape and personal style.",
                  image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Color & Highlights",
                  description: "Vibrant, long-lasting color with premium products for healthy hair.",
                  image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Styling & Treatments",
                  description: "Special occasion styling and rejuvenating treatments for all hair types.",
                  image: "https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-glass transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Link to="/services" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                      Learn more
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/services">
                <Button variant="outline" className="rounded-full px-6">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Why Choose Elegance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine artistry with expertise to create a premium salon experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Scissors className="h-6 w-6 text-primary" />,
                  title: "Expert Stylists",
                  description: "Our team of skilled professionals stays at the forefront of hair trends and techniques."
                },
                {
                  icon: <Check className="h-6 w-6 text-primary" />,
                  title: "Premium Products",
                  description: "We use only the highest quality products that nourish and protect your hair."
                },
                {
                  icon: <Clock className="h-6 w-6 text-primary" />,
                  title: "Efficient Service",
                  description: "We value your time and ensure punctual, efficient service without rushing quality."
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-salon-100/50 hover:shadow-soft transition-all"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-salon-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">What Our Clients Say</h2>
              <p className="text-salon-300 max-w-2xl mx-auto">
                Don't just take our word for it — hear what our clients have to say about their experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Emily Thompson",
                  quote: "The attention to detail is amazing! My stylist really listened to what I wanted and delivered beyond my expectations.",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                },
                {
                  name: "Michael Chen",
                  quote: "I've never felt more confident with my hair. The team here truly understands how to work with different hair types and styles.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                },
                {
                  name: "Sophia Rodriguez",
                  quote: "From the moment you walk in, you feel pampered. The atmosphere is relaxing and the results are consistently excellent.",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-salon-800/50 backdrop-blur-sm p-8 rounded-xl overflow-hidden"
                >
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-salon-200 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-salon-400 text-sm">Satisfied Client</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-salon-50 via-white to-salon-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">Ready for a Fresh New Look?</h2>
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

export default Index;
