import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { icon: Award, value: '120+', label: 'Years of Legacy' },
    { icon: Users, value: '10M+', label: 'Riders Worldwide' },
    { icon: Globe, value: '60+', label: 'Countries' },
    { icon: Heart, value: '1', label: 'Passion' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="text-primary font-medium tracking-widest text-sm">OUR STORY</span>
              <h1 className="font-display text-5xl md:text-7xl text-foreground mt-4 mb-6">
                BUILT LIKE A GUN,
                <br />
                <span className="text-gradient">GOES LIKE A BULLET</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                NextGear Bikes is at the forefront of motorcycle culture. 
                From city streets to winding mountain roads, 
                our motorcycles have carried riders on countless adventures across the globe.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <p className="font-display text-4xl text-foreground mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                  A LEGACY OF
                  <br />
                  <span className="text-primary">PURE MOTORCYCLING</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    NextGear Bikes is a leading motorcycle brand committed to quality and craftsmanship.
                    We craft motorcycles with an unwavering dedication to performance and style.
                  </p>
                  <p>
                    Today, we continue that commitment, producing motorcycles 
                    that blend timeless design with modern technology. Every NextGear bike is built to 
                    inspire adventure and create memories that last a lifetime.
                  </p>
                  <p>
                    Our philosophy is simple: we create motorcycles that are evocative, engaging, 
                    and accessible. Motorcycles that encourage exploration and self-expression.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800"
                    alt="NextGear Bikes Heritage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                  <p className="font-display text-2xl">NEXTGEAR</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl text-foreground">OUR VALUES</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Heritage',
                  description: 'We honor our rich history while embracing innovation. Every motorcycle carries forward over a century of craftsmanship.',
                },
                {
                  title: 'Adventure',
                  description: 'We believe in the transformative power of riding. Our motorcycles are designed to take you on journeys of discovery.',
                },
                {
                  title: 'Community',
                  description: 'NextGear Bikes riders form a global family united by their love of pure motorcycling and the open road.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background border border-border rounded-xl p-8 text-center"
                >
                  <h3 className="font-display text-2xl text-primary mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
