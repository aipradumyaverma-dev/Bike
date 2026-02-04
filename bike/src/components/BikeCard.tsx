import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Bike } from '@/data/bikes';
import { Badge } from '@/components/ui/badge';

interface BikeCardProps {
  bike: Bike;
  index?: number;
}

const BikeCard = ({ bike, index = 0 }: BikeCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/bikes/${bike.id}`}>
        <div className="group relative bg-card rounded-xl overflow-hidden card-hover">
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            {bike.isNew && (
              <Badge className="bg-primary text-primary-foreground">NEW</Badge>
            )}
            {bike.isDiscounted && (
              <Badge className="bg-red-enfield text-foreground">SALE</Badge>
            )}
          </div>

          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
            <img
              src={bike.image}
              alt={bike.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                {bike.category}
              </span>
              <span className="text-sm text-muted-foreground">{bike.model}</span>
            </div>

            <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
              {bike.name}
            </h3>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-xl font-bold text-primary">
                {formatPrice(bike.price)}
              </span>
              {bike.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(bike.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center text-muted-foreground group-hover:text-primary transition-colors">
              <span className="text-sm font-medium">View Details</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BikeCard;
