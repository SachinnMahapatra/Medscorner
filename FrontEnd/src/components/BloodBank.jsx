import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import Footer from './Footer';
import { Search, Phone, MapPin, Clock, Users, Heart, AlertCircle, CheckCircle, Filter } from 'lucide-react';

function BloodBank() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [bloodBanks, setBloodBanks] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch and parse the CSV data
    fetch('/src/assets/blood-banks.csv')
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').slice(1); // Skip header row
        const parsedData = rows.map(row => {
          const columns = row.split(',');
          return {
            id: columns[0],
            name: columns[1],
            state: columns[2],
            district: columns[3],
            city: columns[4],
            address: columns[5],
            pincode: columns[6],
            phone: columns[7],
            mobile: columns[8],
            helpline: columns[9],
            email: columns[11],
            website: columns[12],
            category: columns[17],
            bloodComponentAvailable: columns[18] === 'YES',
            apheresis: columns[19] === 'YES',
            serviceTime: columns[20],
            license: columns[21],
            latitude: columns[24],
            longitude: columns[25]
          };
        }).filter(bank => bank.name && bank.city); // Filter out invalid entries

        setBloodBanks(parsedData);
        
        // Extract unique cities
        const uniqueCities = [...new Set(parsedData.map(bank => bank.city))].sort();
        setCities(uniqueCities);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading blood bank data:', error);
        setLoading(false);
      });
  }, []);

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bank.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bank.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || bank.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <>
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blood Bank Services</h1>
            <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
              Find the nearest blood bank and check blood type availability. Your contribution can save lives.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search blood banks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            {/* Blood Type Filter */}
            <select
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
            >
              <option value="all">All Blood Types</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* City Filter */}
            <select
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blood bank data...</p>
          </div>
        ) : (
          <>
            {/* Blood Banks List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBloodBanks.map((bank) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{bank.name}</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-2 text-red-500" />
                        <span>{bank.address}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Phone size={18} className="mr-2 text-red-500" />
                        <span>{bank.phone || bank.mobile}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock size={18} className="mr-2 text-red-500" />
                        <span>{bank.serviceTime || '24x7'}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Users size={18} className="mr-2 text-red-500" />
                        <span>{bank.category}</span>
                      </div>
                    </div>

                    {/* Blood Component Availability */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Services Available:</h4>
                      <div className="flex flex-wrap gap-2">
                        {bank.bloodComponentAvailable && (
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                            Blood Components
                          </span>
                        )}
                        {bank.apheresis && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                            Apheresis
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      <a
                        href={`tel:${bank.phone || bank.mobile}`}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center"
                      >
                        Call Now
                      </a>
                      {bank.latitude && bank.longitude && (
                        <a
                          href={`https://www.google.com/maps?q=${bank.latitude},${bank.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-center"
                        >
                          Get Directions
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Emergency Section */}
            <div className="mt-12 bg-red-50 rounded-xl p-6">
              <div className="flex items-start">
                <AlertCircle size={24} className="text-red-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Blood Need?</h3>
                  <p className="text-gray-600 mb-4">
                    If you need blood urgently, please call our emergency helpline. Our team will assist you in finding the nearest available blood bank.
                  </p>
                  <a
                    href="tel:102"
                    className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Phone size={20} className="mr-2" />
                    Call Emergency Helpline (102)
                  </a>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Heart size={24} className="text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why Donate Blood?</h3>
                <p className="text-gray-600">
                  Blood donation is a simple, safe process that can save up to three lives. Regular donations help maintain a stable blood supply.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <CheckCircle size={24} className="text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Eligibility</h3>
                <p className="text-gray-600">
                  Most healthy adults can donate blood. You must be at least 18 years old, weigh at least 50 kg, and be in good health.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Clock size={24} className="text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Donation Process</h3>
                <p className="text-gray-600">
                  The entire process takes about an hour. After donation, you can resume normal activities after a short rest.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default BloodBank; 