import React from 'react';
import { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer'

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to server
    console.log('Form submitted:', { name, email, phone, subject, message });
  };

  return <>
  <NavBar/>
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch With Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input important
              type="text"
              id="name"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your E-mail
            </label>
            
            <input important
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input important
              type="tel"
              id="phone"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input important
              type="text"
              id="subject"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea important
            id="message"
            rows="4"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Send Message
        </button>
      </form>
    </div>
    <Footer/>
  </>
}

export default Contact