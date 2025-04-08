import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Pill, AlertCircle, HeartPulse } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-blue-50 to-blue-100 text-gray-700'>
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <HeartPulse size={48} className="mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe To Our Newsletter</h2>
            <p className="text-gray-600 mb-8">Stay updated with the latest medical products, healthcare tips and exclusive discounts.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your email address" 
              />
              <button className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Pill size={24} className="text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-800">MedsCorner</span>
            </div>
            <p className="text-gray-600 mb-6">Your trusted partner for all healthcare needs, providing quality medications and expert advice since 2005.</p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-600">123 Healthcare Avenue, Medical District, City, Country - 123456</p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                <p className="text-gray-600">+911234567890</p>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                <p className="text-gray-600">contact@medscorner.com</p>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                <p className="text-gray-600">Mon-Sat: 8AM - 10PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productlist/all" className="text-gray-600 hover:text-blue-600 transition-colors">Prescription Medications</Link>
              </li>
              <li>
                <Link to="/productlist/all" className="text-gray-600 hover:text-blue-600 transition-colors">Over-the-Counter Drugs</Link>
              </li>
              <li>
                <Link to="/productlist/all" className="text-gray-600 hover:text-blue-600 transition-colors">Vitamins & Supplements</Link>
              </li>
              <li>
                <Link to="/productlist/all" className="text-gray-600 hover:text-blue-600 transition-colors">Healthcare Devices</Link>
              </li>
              <li>
                <Link to="/productlist/all" className="text-gray-600 hover:text-blue-600 transition-colors">Personal Care</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Online Consultations</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Medication Reminders</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Health Checkups</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Prescription Refills</Link>
              </li>
              <li>
                <Link to="/Contact" className="text-gray-600 hover:text-blue-600 transition-colors">Home Delivery</Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/About" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/Contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/Faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MedsCorner. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer