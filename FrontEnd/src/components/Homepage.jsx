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
        {/* Background overlay for better text visibility */}
        <div className="absolute inset-0 bg-blue-900/40 z-0"></div>
        
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
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Your Health Is Our <span className="text-blue-100">Top Priority</span>
              </h1>
              <p className="mt-6 text-white text-lg md:text-xl font-medium max-w-lg">
                India's trusted online medical store with quality healthcare products delivered right to your doorstep
              </p>
              <p className="mt-4 text-blue-100 max-w-lg">
                From essential medications to healthcare supplies, we offer genuine products with expert guidance and reliable service.
              </p>
              
              {/* Search Box */}
              <div className="mt-10 bg-white/90 p-2 rounded-lg shadow-lg flex items-center backdrop-blur-sm">
                <input
                  type="text"
                  placeholder="Search for medicines, healthcare products..."
                  className="flex-grow px-4 py-3 outline-none bg-transparent"
                  value={search}
                  onChange={handleSearch}
                />
                <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all">
                  <Search size={20} />
                </button>
              </div>
              
              {/* Search Results */}
              {searchResult && searchResult.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 border border-gray-200 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg max-h-60 overflow-y-auto"
                >
                  {searchResult.map((product) => (
                    <Link 
                      to={`/ProductDetails/${product.id}`} 
                      key={product.id} 
                      className="flex items-center justify-between p-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <Pill size={16} className="text-blue-600 mr-2" />
                        <p className="text-gray-800">{product.name}</p>
                      </div>
                      <ArrowRight className="text-blue-600" size={16} />
                    </Link>
                  ))}
                </motion.div>
              )}
              {searchResult && searchResult.length === 0 && (
                <div className="mt-2 p-3 text-center text-gray-700 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg">
                  No products found for "{search}"
                </div>
              )}
              
              <div className="mt-10 flex flex-wrap gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link to="/productlist/all" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 inline-flex items-center shadow-lg">
                    Shop Now
                    <ArrowRight className="ml-2" size={16} />
              </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <a href="tel:+911234567890" className="bg-white/80 backdrop-blur-sm border border-blue-300 text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-white transition-all duration-300 inline-flex items-center shadow-lg">
                    <Phone size={16} className="mr-2" />
                    Contact Us
                  </a>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right column - image */}
            <motion.div 
              initial={{opacity: 0, y: 30}} 
              animate={{opacity: 1, y: 0}} 
              transition={{duration: 0.8, delay: 0.2}}
              className="relative hidden lg:block"
            >
              {/* <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl relative z-10 p-3">
                <img 
                  src="https://img.freepik.com/free-photo/medicine-capsules-global-health-with-geometric-pattern-marketing-advertising_53876-128566.jpg" 
                  alt="Medical products" 
                  className="w-full h-auto rounded-xl object-cover"
                />
                
                <div className="absolute top-5 right-5 bg-blue-600 text-white p-2 rounded-full">
                  <Heart size={24} />
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold text-blue-800">Quality Healthcare Products</h3>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">2,500+ Reviews</span>
                  </div>
                </div>
        </div>
               */}
              <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-xl">
                <Stethoscope size={60} className="text-blue-600" />
    </div>

              {/* <div className="absolute -bottom-6 left-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-xs">
                <div className="flex items-center text-green-600 font-medium mb-1">
                  <Clock size={16} className="mr-2" />
                  <span>Same-day delivery</span>
                </div>
                <p className="text-gray-700 text-sm">On orders placed before 4 PM</p>
              </div> */}
            </motion.div>
          </div>
      </div>
      </div>

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
