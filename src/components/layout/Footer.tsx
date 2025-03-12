
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Scissors, 
  Phone, 
  MapPin, 
  Clock 
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-foreground">
              <Scissors className="h-5 w-5" />
              <span className="text-xl font-light tracking-tight">elegance</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Transforming hair and elevating beauty with precision cuts, custom colors, and rejuvenating treatments.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-foreground font-light mb-4 text-lg">Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex">
                <Clock size={16} className="mr-2 opacity-70" />
                <div>
                  <p>Monday - Friday</p>
                  <p>9:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex">
                <Clock size={16} className="mr-2 opacity-70" />
                <div>
                  <p>Saturday</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex">
                <Clock size={16} className="mr-2 opacity-70" />
                <div>
                  <p>Sunday</p>
                  <p>10:00 AM - 4:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-foreground font-light mb-4 text-lg">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex">
                <Phone size={16} className="mr-2 opacity-70" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex">
                <MapPin size={16} className="mr-2 opacity-70" />
                <span>123 Styling Street<br />Beauty City, BC 12345</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-light mb-4 text-lg">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/appointments" className="text-muted-foreground hover:text-primary">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/stylists" className="text-muted-foreground hover:text-primary">
                  Our Stylists
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {currentYear} Elegance Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
