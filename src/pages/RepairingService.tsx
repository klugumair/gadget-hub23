
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone, Battery, Shield, Wrench, Monitor, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const RepairingService = () => {
  const repairServices = [
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Battery Replacement",
      description: "Professional battery replacement for all smartphone models",
      features: [
        "iPhone battery replacement (all models)",
        "Samsung Galaxy battery service",
        "Original quality batteries available",
        "Quick 30-minute service",
        "Battery health diagnostics",
        "6-month warranty on batteries"
      ]
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Screen Repair & Replacement",
      description: "Expert screen repair and panel replacement services",
      features: [
        "OLED and LCD screen replacement",
        "Touch panel repair service",
        "Cracked screen restoration",
        "Display calibration service",
        "Original and aftermarket panels",
        "Same-day repair available"
      ]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Hardware Repairs",
      description: "Complete hardware diagnostic and repair solutions",
      features: [
        "Camera module replacement",
        "Speaker and microphone repair",
        "Charging port cleaning/replacement",
        "Water damage recovery",
        "Motherboard repair service",
        "Button replacement service"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Software Solutions",
      description: "Software troubleshooting and optimization services",
      features: [
        "iOS and Android software repair",
        "Factory reset and data recovery",
        "Virus removal and security setup",
        "Performance optimization",
        "Software update assistance",
        "Data backup and transfer"
      ]
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Audio Device Repair",
      description: "Specialized repair services for headphones and speakers",
      features: [
        "Headphone cable replacement",
        "Driver repair and replacement",
        "Bluetooth connectivity fixes",
        "Noise cancellation repair",
        "Cushion and padding replacement",
        "Audio quality restoration"
      ]
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "General Maintenance",
      description: "Preventive care and maintenance services",
      features: [
        "Deep cleaning service",
        "Thermal paste replacement",
        "Button and port cleaning",
        "Protective film application",
        "Device health checkup",
        "Performance diagnostics"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-shimmer">Expert Repair Services</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Professional device repair services with certified technicians and genuine parts. We fix what others can't!
            </p>
            
            <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto mb-16">
              <div className="text-6xl mb-6">🔧</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Coming Soon - Advanced Repair Center
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                We're setting up our state-of-the-art repair facility with the latest diagnostic equipment and genuine replacement parts.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="glass-morphism rounded-xl p-4">
                  <div className="text-2xl font-bold text-gold-400">500+</div>
                  <div className="text-gray-400">Devices Repaired</div>
                </div>
                <div className="glass-morphism rounded-xl p-4">
                  <div className="text-2xl font-bold text-gold-400">98%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
                <div className="glass-morphism rounded-xl p-4">
                  <div className="text-2xl font-bold text-gold-400">24/7</div>
                  <div className="text-gray-400">Support Available</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {repairServices.map((service, index) => (
              <div key={index} className="glass-morphism rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-gold-400">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="glass-morphism rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our Repair Services?</h3>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-white font-semibold mb-1">Fast Service</div>
                <div className="text-gray-400 text-sm">Most repairs completed within 24 hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <div className="text-white font-semibold mb-1">Warranty Protected</div>
                <div className="text-gray-400 text-sm">All repairs come with warranty coverage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔍</div>
                <div className="text-gray-400 text-sm">Free diagnostic for all devices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-white font-semibold mb-1">Certified Technicians</div>
                <div className="text-gray-400 text-sm">Trained professionals with years of experience</div>
              </div>
            </div>
            
            <Link to="/">
              <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RepairingService;
