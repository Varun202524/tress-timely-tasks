
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Stylists', path: '/stylists' },
  { name: 'Book', path: '/appointments' },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing pages
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-soft" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-foreground"
            aria-label="Salon Logo"
          >
            <Scissors className="h-6 w-6" />
            <span className="text-xl font-light tracking-tight">elegance</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Book Appointment Button (Desktop) */}
          <div className="hidden md:block">
            <Link to="/appointments">
              <Button 
                size="sm" 
                className="px-6 rounded-full bg-primary/90 hover:bg-primary text-white"
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 pt-20 px-6 transition-all duration-300 ease-in-out md:hidden",
          isMenuOpen 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-lg tracking-wide",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/appointments" className="w-full pt-4">
            <Button 
              className="w-full rounded-full bg-primary/90 hover:bg-primary text-white"
            >
              Book Now
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
