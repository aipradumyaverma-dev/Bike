import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, LogOut, Settings, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-display text-5xl text-foreground mb-4">MY PROFILE</h1>
              <p className="text-muted-foreground">Manage your NextGear Bikes account</p>
            </div>

            {/* Profile Card */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Profile'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-primary-foreground" />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display text-3xl text-foreground mb-2">
                    {user.displayName || 'Rider'}
                  </h2>
                  <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail size={18} className="text-primary" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Calendar size={18} className="text-primary" />
                      <span>Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Wishlist</h3>
                <p className="text-muted-foreground text-sm">View your saved bikes</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <Settings className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Settings</h3>
                <p className="text-muted-foreground text-sm">Manage preferences</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={handleLogout}
                className="bg-card border border-border rounded-xl p-6 text-center cursor-pointer hover:border-destructive transition-colors"
              >
                <LogOut className="w-10 h-10 text-destructive mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Logout</h3>
                <p className="text-muted-foreground text-sm">Sign out of account</p>
              </motion.div>
            </div>

            {/* Account Details */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-display text-2xl text-foreground mb-6">Account Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-muted-foreground text-sm">Name</label>
                  <p className="text-foreground font-medium">{user.displayName || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm">Email Address</label>
                  <p className="text-foreground font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm">Email Verified</label>
                  <p className="text-foreground font-medium">
                    {user.emailVerified ? (
                      <span className="text-green-500">Verified</span>
                    ) : (
                      <span className="text-yellow-500">Not verified</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm">Account ID</label>
                  <p className="text-foreground font-medium text-sm font-mono">{user.uid}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
