import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl text-primary mb-4">NEXTGEAR BIKES</h3>
            <p className="text-muted-foreground mb-6">
              Premium motorcycles for every rider. Building legends, one ride at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/bikes" className="text-muted-foreground hover:text-primary transition-colors">
                  All Motorcycles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">CATEGORIES</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/bikes?category=Classic" className="text-muted-foreground hover:text-primary transition-colors">
                  Classic
                </Link>
              </li>
              <li>
                <Link to="/bikes?category=Cruiser" className="text-muted-foreground hover:text-primary transition-colors">
                  Cruiser
                </Link>
              </li>
              <li>
                <Link to="/bikes?category=Adventure" className="text-muted-foreground hover:text-primary transition-colors">
                  Adventure
                </Link>
              </li>
              <li>
                <Link to="/bikes?category=Cafe Racer" className="text-muted-foreground hover:text-primary transition-colors">
                  Cafe Racer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">CONTACT US</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary" />
                <span>Indore, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary" />
                <span>1800-210-0007</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <span>support@pradumyaverma.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NextGear Bikes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
