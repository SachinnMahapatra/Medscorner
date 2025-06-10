import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Faq from './Faq';
import axios from 'axios';
import ProductCard from './ProductCard';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Shield, Truck, Clock, Heart, Star, Package, PlusCircle, Pill, Stethoscope, Ambulance, Phone, Check, Baby, User, X, Activity } from 'lucide-react';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        if (response.status !== 200) {
          throw new Error('Failed to fetch products');
        }
        setProducts(response.data);
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();

    // Close emergency dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (isEmergencyOpen && !event.target.closest('.emergency-container')) {
        setIsEmergencyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEmergencyOpen]);

  useEffect(() => {
    if (search.trim() === '') {
      setSearchResult(null);
      return;
    }
    const arr = products.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.uses?.toLowerCase().includes(search.toLowerCase()) ||
      product.compositions?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(arr);
  }, [search, products]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
    <NavBar />
      
      {/* Emergency Call Button with Dropdown - Fixed Position */}
      <div className="emergency-container fixed right-5 bottom-5 z-50">
        <button 
          onClick={() => setIsEmergencyOpen(!isEmergencyOpen)}
          onMouseEnter={() => setIsEmergencyOpen(true)}
          className="flex items-center space-x-2 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
          title="Emergency Ambulance"
        >
          {isEmergencyOpen ? (
            <X size={24} />
          ) : (
            <>
              <Ambulance size={24} />
              <span className="hidden md:inline font-semibold">Emergency</span>
            </>
          )}
        </button>

        {/* Emergency Options Dropdown */}
        {isEmergencyOpen && (
          <div 
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl overflow-hidden w-64 border border-red-100 animate-fade-in-up"
            style={{animation: 'fadeIn 0.3s ease-out'}}
          >
            <div className="bg-red-600 text-white p-3">
              <h3 className="font-bold">Emergency Services</h3>
              <p className="text-sm text-red-100">Select service type</p>
            </div>
            
            <div className="divide-y divide-gray-100">
              <a 
                href="tel:102" 
                className="flex items-center p-3 hover:bg-red-50 transition-colors"
              >
                <Ambulance size={20} className="text-red-600 mr-3" />
                <div>
                  <p className="font-medium">General Ambulance</p>
                  <p className="text-xs text-gray-500">For regular emergencies</p>
                </div>
              </a>
              
              <a 
                href="tel:108" 
                className="flex items-center p-3 hover:bg-red-50 transition-colors"
              >
                <Baby size={20} className="text-red-600 mr-3" />
                <div>
                  <p className="font-medium">Pediatric Ambulance</p>
                  <p className="text-xs text-gray-500">For children emergencies</p>
                </div>
              </a>
              
              <a 
                href="tel:108" 
                className="flex items-center p-3 hover:bg-red-50 transition-colors"
              >
                <User size={20} className="text-red-600 mr-3" />
                <div>
                  <p className="font-medium">Maternity Ambulance</p>
                  <p className="text-xs text-gray-500">For pregnancy emergencies</p>
                </div>
              </a>
              
              <a 
                href="tel:108" 
                className="flex items-center p-3 hover:bg-red-50 transition-colors"
              >
                <Activity size={20} className="text-red-600 mr-3" />
                <div>
                  <p className="font-medium">Critical Care Unit</p>
                  <p className="text-xs text-gray-500">For critical emergencies</p>
                </div>
              </a>
            </div>
            
            <div className="bg-red-50 p-2 text-center text-xs text-red-800">
              All emergency calls are directed to medical services
            </div>
          </div>
        )}
      </div>
      
      {/* Hero Section - Medical Shop Theme */}
      <div 
        className="relative overflow-hidden min-h-[90vh]"
        style={{
          backgroundImage: 'url("/bg-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay with medical items */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/90 z-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-500/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Main hero content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            {/* Left column - text content */}
            <motion.div 
              initial={{opacity: 0, x: -20}} 
              animate={{opacity: 1, x: 0}} 
              transition={{duration: 0.8}}
              className="flex flex-col justify-center"
            >
              <motion.h1 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="text-4xl md:text-6xl font-bold text-white leading-tight"
              >
                Your Health Is Our <span className="text-blue-100">Top Priority</span>
              </motion.h1>
              <motion.p 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.4}}
                className="mt-6 text-white text-lg md:text-xl font-medium max-w-lg"
              >
                India's trusted online medical store with quality healthcare products delivered right to your doorstep
              </motion.p>
              <motion.p 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.6}}
                className="mt-4 text-blue-100 max-w-lg"
              >
                From essential medications to healthcare supplies, we offer genuine products with expert guidance and reliable service.
              </motion.p>
              
              {/* Search Box */}
              <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.8}}
                className="mt-10 bg-white/95 p-2 rounded-2xl shadow-xl flex items-center backdrop-blur-sm border border-blue-100"
              >
                <input
                  type="text"
                  placeholder="Search for medicines, healthcare products..."
                  className="flex-grow px-6 py-4 outline-none bg-transparent text-gray-800 placeholder-gray-500"
                  value={search}
                  onChange={handleSearch}
                />
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg">
                  <Search size={20} />
                </button>
              </motion.div>
              
              {/* Search Results */}
              {searchResult && searchResult.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg max-h-60 overflow-y-auto"
                >
                  {searchResult.map((product) => (
                    <Link 
                      to={`/ProductDetails/${product.id}`} 
                      key={product.id} 
                      className="flex items-center justify-between p-4 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <Pill size={16} className="text-blue-600 mr-3" />
                        <p className="text-gray-800">{product.name}</p>
                      </div>
                      <ArrowRight className="text-blue-600" size={16} />
                    </Link>
                  ))}
                </motion.div>
              )}
              {searchResult && searchResult.length === 0 && (
                <div className="mt-2 p-4 text-center text-gray-700 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  No products found for "{search}"
                </div>
              )}
              
              <div className="mt-10 flex flex-wrap gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Link to="/productlist/all" className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 inline-flex items-center shadow-lg">
                    <span className="mr-2">Shop Now</span>
                    <ArrowRight className="transform group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <a href="tel:+911234567890" className="group bg-white/90 backdrop-blur-sm border border-blue-200 text-blue-800 px-8 py-4 rounded-xl font-medium hover:bg-white transition-all duration-300 inline-flex items-center shadow-lg">
                    <Phone size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                    Contact Us
                  </a>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right column - Blood Drop Icon and Medical Elements */}
            <motion.div 
              initial={{opacity: 0, y: 30}} 
              animate={{opacity: 1, y: 0}} 
              transition={{duration: 0.8, delay: 0.2}}
              className="relative hidden lg:block"
            >
              {/* Realistic Blood Drop Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.02, 1],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 w-40 h-40 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                  
                  {/* Main Blood Drop */}
                  <div className="relative w-32 h-32">
                    {/* Drop Shape */}
                    <div className="absolute inset-0 bg-gradient-to-b from-red-600/90 to-red-700/90 rounded-full transform rotate-45">
                      {/* Inner Glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-red-400/30 to-transparent rounded-full"></div>
                      
                      {/* Highlight */}
                      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
                      
                      {/* Core */}
                      <div className="absolute inset-4 bg-gradient-to-b from-red-500/80 to-red-600/80 rounded-full">
                        {/* Inner Core Glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-red-400/40 to-transparent rounded-full"></div>
                        
                        {/* Blood Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="text-4xl"
                          >
                            🩸
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-red-400/40 rounded-full"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 0.5, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Medical Elements */}
              <motion.div 
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.4}}
                className="absolute top-10 right-10 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
              >
                <Stethoscope size={40} className="text-blue-600" />
              </motion.div>

              <motion.div 
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.6}}
                className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
              >
                <Pill size={40} className="text-blue-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Blood Bank CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed top-6 right-6 md:top-12 md:right-16 lg:top-16 lg:right-20 z-50"
      >
        <Link 
          to="/blood-bank"
          className="group relative block"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
          
          {/* Main Button Container */}
          <div className="relative">
            {/* Teardrop Shape */}
            <div className="w-14 h-18 md:w-16 md:h-20 lg:w-20 lg:h-24 bg-gradient-to-b from-red-600 to-red-700 rounded-full transform rotate-45 relative overflow-hidden shadow-2xl">
              {/* 3D Effect Layers */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-red-800/30 to-transparent"></div>
              
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-400/40 to-transparent"></div>
              
              {/* Highlight */}
              <div className="absolute top-1/4 left-1/4 w-6 h-6 md:w-8 md:h-8 bg-white/30 rounded-full blur-sm"></div>
              
              {/* White Stroke */}
              <div className="absolute inset-0 border-2 border-white/40 rounded-full"></div>
              
              {/* Blood Drop Icon */}
              <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-2xl md:text-3xl lg:text-4xl drop-shadow-lg"
                >
                  🩸
                </motion.div>
              </div>
            </div>
            
            {/* Floating Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-5 md:-bottom-6 lg:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            >
              <div className="bg-white/95 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded-full shadow-lg text-xs md:text-sm lg:text-base font-medium text-red-600">
                Blood Bank
              </div>
            </motion.div>
          </div>
          
          {/* Hover Effect */}
          <motion.div
            className="absolute inset-0 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* 3D Shadow Effect */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-3 md:w-16 md:h-4 lg:w-20 lg:h-5 bg-red-900/20 blur-md rounded-full"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-400/40 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </Link>
      </motion.div>

      {/* Trusted Features Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{opacity: 0, y: 20}} 
              whileInView={{opacity: 1, y: 0}} 
              transition={{duration: 0.5}}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800">100% Genuine</h3>
              <p className="text-sm text-gray-600 mt-1">All products are authentic</p>
            </motion.div>
            
            <motion.div 
              initial={{opacity: 0, y: 20}} 
              whileInView={{opacity: 1, y: 0}} 
              transition={{duration: 0.5, delay: 0.1}}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Truck className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
              <p className="text-sm text-gray-600 mt-1">Right to your doorstep</p>
            </motion.div>
            
            <motion.div 
              initial={{opacity: 0, y: 20}} 
              whileInView={{opacity: 1, y: 0}} 
              transition={{duration: 0.5, delay: 0.2}}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <PlusCircle className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800">Expert Support</h3>
              <p className="text-sm text-gray-600 mt-1">Healthcare advice available</p>
            </motion.div>
            
            <motion.div 
              initial={{opacity: 0, y: 20}} 
              whileInView={{opacity: 1, y: 0}} 
              transition={{duration: 0.5, delay: 0.3}}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Package className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800">Safe Packaging</h3>
              <p className="text-sm text-gray-600 mt-1">Sealed and secure delivery</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{opacity: 0, y: 20}} 
            animate={{opacity: 1, y: 0}} 
            transition={{duration: 0.5}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
            <p className="text-blue-600">Quality healthcare solutions for you</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeIn} className="group">
                <div className="bg-white p-4 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md border border-gray-100">
                  <div className="h-48 flex items-center justify-center mb-4 bg-blue-50 rounded-lg p-4">
                    <img 
                      src={`http://127.0.0.1:8000/${product.image}`}
                      alt={product.name}
                      className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800 text-lg truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-blue-600">₹{product.price}</p>
                    <Link to={`/ProductDetails/${product.id}`} className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded-full">
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link to="/productlist/all" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300">
              View All Products
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Healthcare Categories Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{opacity: 0, y: 20}} 
            animate={{opacity: 1, y: 0}} 
            transition={{duration: 0.5}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h2>
            <p className="text-blue-600">Browse our wide range of healthcare products</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{opacity: 0, y: 20}} 
              whileInView={{opacity: 1, y: 0}} 
              transition={{duration: 0.5}}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer"
            >
              <Link to="/productlist/General medicine" className="block">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://img.freepik.com/free-photo/medicine-capsules-global-health-with-geometric-pattern-marketing-advertising_53876-128566.jpg" 
                    alt="General Medicine" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold">General Medicines</h3>
                    <p className="mt-2 text-blue-100">Essential medications for everyday healthcare needs</p>
                    <div className="mt-4 inline-flex items-center text-white/90 hover:text-white">
                      Shop Now <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{opacity: 0, y: 20}} 
              whileInView={{opacity: 1, y: 0}} 
              transition={{duration: 0.5, delay: 0.2}}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer"
            >
              <Link to="/productlist/Healthcare devices" className="block">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://img.freepik.com/free-photo/healthcare-devices-composition_23-2149317330.jpg" 
                    alt="Healthcare Devices" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold">Healthcare Devices</h3>
                    <p className="mt-2 text-blue-100">Monitoring devices for better health management</p>
                    <div className="mt-4 inline-flex items-center text-white/90 hover:text-white">
                      Shop Now <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{opacity: 0, y: 20}} 
              whileInView={{opacity: 1, y: 0}} 
              transition={{duration: 0.5, delay: 0.4}}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer"
            >
              <Link to="/productlist/Personal care" className="block">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg" 
                    alt="Personal Care" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold">Personal Care</h3>
                    <p className="mt-2 text-blue-100">Quality products for your daily wellness routine</p>
                    <div className="mt-4 inline-flex items-center text-white/90 hover:text-white">
                      Shop Now <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Consultation Section */}
      <div className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Healthcare Advice?</h2>
                <p className="text-gray-600 mb-6">
                  Our healthcare professionals are available to help you with personalized medicine recommendations, health advice, and product selection.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <Check size={14} />
                    </div>
                    <span>Expert medical guidance</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <Check size={14} />
                    </div>
                    <span>Private and confidential</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <Check size={14} />
                    </div>
                    <span>Available 24/7 for emergencies</span>
                  </li>
                </ul>
                <a 
                  href="tel:+911234567890" 
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 self-start"
                >
                  <Phone size={18} className="mr-2" />
                  Call For Consultation
                </a>
              </div>
              <div className="bg-blue-600 p-8 lg:p-0 flex items-center justify-center">
                <img 
                  src="https://img.freepik.com/free-photo/medium-shot-doctor-with-clipboard_23-2148868176.jpg" 
                  alt="Healthcare Professional" 
                  className="max-w-full h-auto lg:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    <Footer />
  </>
  );
}

export default Homepage;
