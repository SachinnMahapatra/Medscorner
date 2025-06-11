import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import Footer from './Footer';
import { Search, Phone, MapPin, Clock, Users, Heart, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import bloodBankData from '../assets/blood-bank-json.json';

const BloodBankList = lazy(() => Promise.resolve({
  default: ({ banks, selectedBloodType }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {banks.map(bank => (
        <motion.div
          key={bank.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between border border-gray-100 hover:shadow-2xl transition-shadow min-h-[340px]"
        >
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-1 flex items-center gap-2">
              <span>{bank.name}</span>
              {bank.bloodComponentAvailable && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">Components</span>}
              {bank.apheresis && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">Apheresis</span>}
            </h3>
            <div className="text-gray-600 text-sm mb-2 flex items-center gap-2">
              <MapPin className="inline mr-1 text-red-400" size={16} />
              <span>{bank.address}, {bank.city}, {bank.state} {bank.pincode && `- ${bank.pincode}`}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {bank.availableBloodGroups.map(group => (
                <span
                  key={group}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${group === selectedBloodType ? 'bg-red-600 text-white border-red-600' : 'bg-red-50 text-red-700 border-red-200'}`}
                >
                  {group}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-1 text-gray-700 text-sm mb-2">
              {bank.phone && <span><Phone className="inline mr-1 text-blue-400" size={15} /> {bank.phone}</span>}
              {bank.mobile && <span><Phone className="inline mr-1 text-blue-400" size={15} /> {bank.mobile}</span>}
              {bank.helpline && <span><Phone className="inline mr-1 text-blue-400" size={15} /> Helpline: {bank.helpline}</span>}
              {bank.serviceTime && <span><Clock className="inline mr-1 text-green-400" size={15} /> {bank.serviceTime}</span>}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <a
              href={`tel:${bank.phone || bank.mobile}`}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center font-semibold shadow"
            >
              Call Now
            </a>
            {bank.latitude && bank.longitude && (
              <a
                href={`https://www.google.com/maps?q=${bank.latitude},${bank.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-center font-semibold shadow"
              >
                Directions
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}));

function BloodBank() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [bloodBanks, setBloodBanks] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!bloodBankData || !Array.isArray(bloodBankData)) {
          throw new Error('Invalid blood bank data format');
        }
        const parsedData = bloodBankData.map(bank => {
          if (!bank) return null;
          return {
            id: bank["Sr No"] || Math.random().toString(36).substr(2, 9),
            name: bank["Blood Bank Name"] || 'Unknown Blood Bank',
            state: bank["State"] || '',
            district: bank["District"] || '',
            city: bank["City"] || bank["District"] || '',
            address: bank["Address"] || '',
            pincode: bank["Pincode"] || '',
            phone: bank["Contact No"] || '',
            mobile: bank["Mobile"] || '',
            helpline: bank["Helpline"] || '',
            email: bank["Email"] || '',
            website: bank["Website"] || '',
            category: bank["Category"] || '',
            bloodComponentAvailable: (bank["Blood Component Available"] || '').toUpperCase() === 'YES',
            apheresis: (bank["Apheresis"] || '').toUpperCase() === 'YES',
            serviceTime: bank["Service Time"] || '',
            license: bank["License #"] || '',
            latitude: bank["Latitude"] || '',
            longitude: bank["Longitude"] || '',
            availableBloodGroups: typeof bank["Available Blood Groups"] === 'string'
              ? bank["Available Blood Groups"].split(',').map(g => g.trim()).filter(Boolean)
              : []
          };
        }).filter(bank => bank && bank.name && (bank.city || bank.district));
        setBloodBanks(parsedData);
        const uniqueCities = [...new Set(parsedData.map(bank => bank.city))].filter(Boolean).sort();
        setCities(uniqueCities);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // Show all banks by default (no filter applied)
  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = !searchQuery ||
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || bank.city === selectedCity;
    const matchesBloodType = selectedBloodType === 'all' ||
      (bank.availableBloodGroups && bank.availableBloodGroups.includes(selectedBloodType));
    return matchesSearch && matchesCity && matchesBloodType;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Error Loading Data</h2>
            <p className="mt-2 text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <NavBar />
      <div className="container mx-auto px-2 md:px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-2">Find Blood Banks</h1>
              <p className="text-gray-600 text-base md:text-lg">Locate blood banks and check blood availability in your area</p>
            </div>
            <a
              href="#donate"
              className="inline-block bg-gradient-to-r from-red-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg font-bold text-lg hover:scale-105 transition-transform"
            >
              Donate Blood
            </a>
          </div>
          {/* Sticky Filter Bar */}
          <div className="sticky top-2 z-10 bg-white/90 backdrop-blur rounded-xl shadow-md p-6 mb-10 flex flex-col md:flex-row md:items-center gap-4 border border-gray-100">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, address, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 text-base"
                />
              </div>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
              <select
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 text-base"
              >
                <option value="all">All Blood Types</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 text-base"
              >
                <option value="all">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-700 text-lg font-medium">
              Found {filteredBloodBanks.length} blood bank{filteredBloodBanks.length !== 1 ? 's' : ''}
            </p>
          </div>
          {/* Blood Bank List (Lazy Loaded) */}
          <Suspense fallback={<div className="text-center py-8">Loading blood banks...</div>}>
            {filteredBloodBanks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No blood banks found matching your criteria</p>
              </div>
            ) : (
              <BloodBankList banks={filteredBloodBanks} selectedBloodType={selectedBloodType} />
            )}
          </Suspense>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default BloodBank; 