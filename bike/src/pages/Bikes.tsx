import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import BikeCard from '@/components/BikeCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import sellBikeApi from '@/api/sellBike';

const Bikes = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('name');

  // API data state
  const [bikes, setBikes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getBikeListings } = sellBikeApi();

  // Fetch bikes from API on mount
  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getBikeListings();
      if (response.error) {
        setError(response.errorMessage);
      } else {
        setBikes(response.data || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bike listings');
    } finally {
      setIsLoading(false);
    }
  };

  // Extract unique brands for category filter
  const categories = ['all', ...new Set(bikes.map((bike: any) => bike.brand))];

  const filteredBikes = bikes
    .filter((bike: any) => {
      const matchesSearch =
        bike.bikeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.model?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || bike.brand === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
        default:
          return (a.bikeName || '').localeCompare(b.bikeName || '');
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">
              OUR MOTORCYCLES
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our complete range of motorcycles. From classic cruisers to modern adventures,
              find the perfect ride for your journey.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 mb-10"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search motorcycles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-secondary border-border">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Brands' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 bg-secondary border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Loading motorcycles...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-6 mb-8">
              <p className="text-destructive font-semibold mb-2">Failed to load motorcycles</p>
              <p className="text-destructive/80">{error}</p>
              <Button onClick={fetchBikes} variant="outline" className="mt-4">
                Try Again
              </Button>
            </div>
          )}

          {/* Results Count */}
          {!isLoading && !error && (
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredBikes.length} of {bikes.length} motorcycles
              </p>
            </div>
          )}

          {/* Bikes Grid */}
          {!isLoading && !error && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBikes.map((bike: any, index: number) => (
                  <BikeCard
                    key={bike._id}
                    bike={{
                      id: bike._id,
                      name: bike.bikeName,
                      model: bike.model,
                      price: bike.price,
                      image: bike.images?.[0] ? `http://localhost:5000${bike.images[0]}` : '/placeholder-bike.jpg',
                      category: bike.brand,
                      description: bike.description,
                      engine: `${bike.engineCC}cc`,
                      power: '-',
                      torque: '-',
                      weight: '-',
                      fuelCapacity: '-',
                      topSpeed: '-',
                      features: [],
                      colors: [bike.color]
                    } as any}
                    index={index}
                  />
                ))}
              </div>

              {filteredBikes.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No motorcycles found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bikes;

