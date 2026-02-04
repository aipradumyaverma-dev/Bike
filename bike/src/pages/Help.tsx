import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, FileText, Phone, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const Help = () => {
  const faqs = [
    {
      question: 'How do I book a test ride?',
      answer: 'You can book a test ride by visiting any authorized NextGear Bikes dealership near you, or by clicking the "Book Test Ride" button on any motorcycle page. Our team will contact you to schedule a convenient time.',
    },
    {
      question: 'What is the warranty period for NextGear Bikes motorcycles?',
      answer: 'All NextGear Bikes motorcycles come with a standard 3-year warranty or 40,000 km (whichever comes first). Extended warranty options are also available at our dealerships.',
    },
    {
      question: 'How can I find the nearest dealership?',
      answer: 'Visit our dealership locator on the website or use our mobile app to find authorized NextGear Bikes dealers near your location. You can also call our toll-free number for assistance.',
    },
    {
      question: 'What financing options are available?',
      answer: 'We offer flexible financing options through our partner banks with competitive interest rates. EMI options start from as low as ₹2,999 per month. Visit your nearest dealer for personalized financing solutions.',
    },
    {
      question: 'How do I register my motorcycle for service reminders?',
      answer: 'Download the NextGear Bikes app and register your motorcycle using the chassis number. You\'ll receive automatic service reminders and can also book service appointments through the app.',
    },
    {
      question: 'What should I do if I face any issues with my motorcycle?',
      answer: 'For any technical issues, visit your nearest authorized service center. For emergencies, contact our 24/7 roadside assistance at 1800-555-0007. Always carry your service book for quick reference.',
    },
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      action: 'Start Chat',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us at 1800-210-0007',
      action: 'Call Now',
    },
    {
      icon: FileText,
      title: "Owner's Manual",
      description: 'Download guides and manuals',
      action: 'Download',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium tracking-widest text-sm">WE'RE HERE FOR YOU</span>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mt-4 mb-6">
              HELP & SUPPORT
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team.
            </p>
          </motion.div>

          {/* Support Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary transition-colors"
              >
                <option.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl text-foreground mb-2">{option.title}</h3>
                <p className="text-muted-foreground mb-6">{option.description}</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {option.action}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-10">
              <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-3xl text-foreground">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Still Need Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12"
            >
              <h3 className="font-display text-3xl text-foreground mb-4">Still Need Help?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is always ready to assist you with any questions.
              </p>
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
