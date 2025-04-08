import React from 'react';
import { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Mail, Phone, User, MessageSquare, Send, MapPin, Clock, Stethoscope } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to server
    console.log('Form submitted:', { name, email, phone, subject, message });
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <NavBar />
      
      <div className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help. Fill out the form below or reach out to us directly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-blue-600 p-6 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <Stethoscope className="mr-2" size={20} />
                  Get In Touch
                </h2>
                <p className="mt-2 text-blue-100">
                  We'd love to hear from you! Our team is ready to answer your queries.
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <MapPin size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-gray-800 font-medium">Our Location</h3>
                      <p className="text-gray-600 mt-1">
                        123 Healthcare Avenue, Medical District, City, Country - 123456
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Phone size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-gray-800 font-medium">Phone Number</h3>
                      <p className="text-gray-600 mt-1">
                        +911234567890
                      </p>
                      <p className="text-gray-600">
                        +910987654321
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Mail size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-gray-800 font-medium">Email Address</h3>
                      <p className="text-gray-600 mt-1">
                        info@medscorner.com
                      </p>
                      <p className="text-gray-600">
                        support@medscorner.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Clock size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-gray-800 font-medium">Working Hours</h3>
                      <p className="text-gray-600 mt-1">
                        Monday - Saturday: 8AM - 10PM
                      </p>
                      <p className="text-gray-600">
                        Sunday: 9AM - 6PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-6">
                  <p className="text-green-700">Thank you for your message! We'll get back to you shortly.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={16} className="text-gray-400" />
                      </div>
                      <input
              type="text"
              id="name"
                        required
                        className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-3 shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
            />
          </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
            </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={16} className="text-gray-400" />
                      </div>
                      <input
              type="email"
              id="email"
                        required
                        className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-3 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
            />
          </div>
        </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={16} className="text-gray-400" />
                      </div>
                      <input
              type="tel"
              id="phone"
                        className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-3 shadow-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 1234567890"
            />
          </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MessageSquare size={16} className="text-gray-400" />
                      </div>
                      <input
              type="text"
              id="subject"
                        required
                        className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-3 shadow-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
                        placeholder="How can we help you?"
            />
          </div>
        </div>
                </div>
                
        <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
                  <textarea
            id="message"
                    rows="5"
                    required
                    className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe your query in detail..."
          ></textarea>
        </div>
                
                <div>
        <button
          type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
                    <Send size={16} className="mr-2" />
          Send Message
        </button>
                </div>
      </form>
            </div>
          </div>
        </div>
        
        {/* Google Maps or Location Map */}
        <div className="mt-12 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Our Location</h2>
          </div>
          <div className="h-[400px] bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Google Maps would be embedded here</p>
            {/* Normally you would embed Google Maps or another map service here */}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Contact;