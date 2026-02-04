import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Fuel, Gauge, Weight, Zap, Wind, Settings } from 'lucide-react';
import { getBikeById } from '@/data/bikes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bike = getBikeById(id || '');

  if (!bike) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Bike Not Found</h1>
          <Link to="/bikes">
            <Button>Back to Bikes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const specs = [
    { icon: Settings, label: 'Engine', value: bike.engine },
    { icon: Zap, label: 'Power', value: bike.power },
    { icon: Wind, label: 'Torque', value: bike.torque },
    { icon: Weight, label: 'Weight', value: bike.weight },
    { icon: Fuel, label: 'Fuel Capacity', value: bike.fuelCapacity },
    { icon: Gauge, label: 'Top Speed', value: bike.topSpeed },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={20} />
              Back
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                {bike.isNew && (
                  <Badge className="bg-primary text-primary-foreground">NEW</Badge>
                )}
                {bike.isDiscounted && (
                  <Badge className="bg-red-enfield text-foreground">SALE</Badge>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-medium tracking-widest text-sm">
                {bike.category.toUpperCase()}
              </span>
              <h1 className="font-display text-5xl md:text-6xl text-foreground mt-2 mb-4">
                {bike.name}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">{bike.model}</p>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(bike.price)}
                </span>
                {bike.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(bike.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-foreground/80 text-lg mb-8 leading-relaxed">
                {bike.description}
              </p>

              {/* Colors */}
              <div className="mb-8">
                <h3 className="font-display text-xl text-foreground mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {bike.colors.map(color => (
                    <Badge key={color} variant="outline" className="border-border">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                  Book Test Ride
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1">
                  Find Dealer
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="font-display text-3xl text-foreground mb-8">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <spec.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm mb-1">{spec.label}</p>
                  <p className="text-foreground font-medium text-sm">{spec.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="font-display text-3xl text-foreground mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bike.features.map((feature, index) => (
                <div
                  key={feature}
                  className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BikeDetail;
