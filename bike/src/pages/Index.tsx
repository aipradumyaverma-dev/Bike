import Hero from '@/components/Hero';
import BikeSlider from '@/components/BikeSlider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getNewBikes, getDiscountedBikes } from '@/data/bikes';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench, Shield, Trophy } from 'lucide-react';

const Index = () => {
  const newBikes = getNewBikes();
  const discountedBikes = getDiscountedBikes();

  const features = [
    {
      icon: Trophy,
      title: '120+ Years Legacy',
      description: 'The oldest motorcycle brand in continuous production since 1901.',
    },
    {
      icon: Wrench,
      title: 'Expert Service',
      description: 'Authorized service centers with trained technicians across the country.',
    },
    {
      icon: Shield,
      title: '3 Year Warranty',
      description: 'Comprehensive warranty coverage for complete peace of mind.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* New Launches Slider */}
      <BikeSlider
        title="NEW ARRIVALS"
        subtitle="Discover our latest motorcycles"
        bikes={newBikes}
      />

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              WHY CHOOSE
              <span className="text-gradient"> NEXTGEAR BIKES</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              More than just motorcycles, we craft experiences that last a lifetime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background border border-border rounded-xl p-8 text-center hover:border-primary transition-colors"
              >
                <feature.icon className="w-14 h-14 text-primary mx-auto mb-6" />
                <h3 className="font-display text-2xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Bikes Slider */}
      <BikeSlider
        title="SPECIAL OFFERS"
        subtitle="Limited time deals on select models"
        bikes={discountedBikes}
      />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              READY TO RIDE?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Explore our complete collection of motorcycles and find your perfect ride.
              Book a test ride today and experience the NextGear Bikes difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bikes">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group text-lg px-8">
                  View All Bikes
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
