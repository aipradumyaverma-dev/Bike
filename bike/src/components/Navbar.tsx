 import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ShoppingCart, Tag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import SellBikeForm from './SellBikeForm';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sellFormOpen, setSellFormOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleBuyClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/bikes');
  };

  const handleSellClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setSellFormOpen(true);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bikes', path: '/bikes' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help & Support', path: '/help' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-3xl text-primary">NEXTGEAR BIKES</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Buy & Sell Buttons */}
              <button
                onClick={handleBuyClick}
                className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                <ShoppingCart size={18} />
                Buy
              </button>
              <button
                onClick={handleSellClick}
                className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                <Tag size={18} />
                Sell
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <User size={18} />
                      {user.displayName || 'Profile'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" className="text-foreground hover:text-primary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-t border-border"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-foreground/80 hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Buy & Sell Buttons */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleBuyClick();
                  }}
                  className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  <ShoppingCart size={18} />
                  Buy
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSellClick();
                  }}
                  className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  <Tag size={18} />
                  Sell
                </button>

                <div className="border-t border-border pt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="text-foreground/80 hover:text-primary py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="text-destructive py-2 text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth"
                        className="text-foreground/80 hover:text-primary py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/auth?mode=signup"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button className="w-full bg-primary text-primary-foreground">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sell Bike Form Dialog */}
      <SellBikeForm open={sellFormOpen} onOpenChange={setSellFormOpen} />
    </>
  );
};

export default Navbar;
