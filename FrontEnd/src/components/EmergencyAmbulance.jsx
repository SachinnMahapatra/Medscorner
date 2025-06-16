import React from 'react';
import { Phone } from 'lucide-react';

const EmergencyAmbulance = () => {
  const ambulanceServices = [
    {
      id: 1,
      type: "Basic Life Support (BLS)",
      description: "Equipped with basic medical equipment and trained paramedics for non-critical patients",
      image: "https://images.pexels.com/photos/263339/pexels-photo-263339.jpeg",
      contact: "108",
      features: [
        "Basic medical equipment",
        "Trained paramedics",
        "24/7 service",
        "GPS tracking"
      ]
    },
    {
      id: 2,
      type: "Advanced Life Support (ALS)",
      description: "Fully equipped with advanced medical equipment and trained medical staff for critical patients",
      image: "https://images.pexels.com/photos/263339/pexels-photo-263339.jpeg",
      contact: "102",
      features: [
        "Advanced medical equipment",
        "Medical staff on board",
        "Ventilator support",
        "Cardiac monitoring"
      ]
    },
    {
      id: 3,
      type: "Neonatal Ambulance",
      description: "Specially designed for newborn babies and infants with specialized equipment",
      image: "https://images.pexels.com/photos/263339/pexels-photo-263339.jpeg",
      contact: "104",
      features: [
        "Neonatal incubator",
        "Specialized medical staff",
        "Temperature control",
        "Vital signs monitoring"
      ]
    },
    {
      id: 4,
      type: "Air Ambulance",
      description: "Helicopter-based emergency medical service for critical and remote area cases",
      image: "https://images.pexels.com/photos/263339/pexels-photo-263339.jpeg",
      contact: "1800-XXX-XXXX",
      features: [
        "Rapid response",
        "Remote area access",
        "Critical care equipment",
        "Specialized medical team"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Emergency Ambulance Services</h1>
          <p className="text-xl text-gray-600">24/7 Emergency Medical Services Available</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ambulanceServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src={service.image}
                  alt={service.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h2 className="text-2xl font-bold text-white p-6">{service.type}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Features:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <a
                    href={`tel:${service.contact}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: {service.contact}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-red-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Emergency Hotline</h2>
          <p className="text-gray-600 mb-4">For immediate medical assistance, call our 24/7 emergency hotline</p>
          <a
            href="tel:108"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Phone className="w-5 h-5 mr-2" />
            Emergency: 108
          </a>
        </div>
      </div>
    </div>
  );
};


export default EmergencyAmbulance; 