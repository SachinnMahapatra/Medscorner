import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { User, Heart, Stethoscope, Award, Star, HeartPulse, UserCircle, MapPin } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <NavBar/>
      
      <div className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="bg-blue-600 py-16 px-6 md:px-12 text-white text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute -right-10 top-10">
                <HeartPulse size={120} strokeWidth={1} />
              </div>
              <div className="absolute -left-10 bottom-10">
                <Stethoscope size={120} strokeWidth={1} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About MedsCorner</h1>
            <p className="max-w-2xl mx-auto text-blue-100">
              Your trusted partner for healthcare needs, dedicated to providing quality medications and exceptional service since 2005.
            </p>
          </div>
          
          <div className="p-6 md:p-12">
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 leading-relaxed mb-8">
                Welcome to MedsCorner! We are a team of passionate healthcare professionals and technology experts dedicated to creating an innovative online medical store that aims to enhance user experience and accessibility. Each member brings a unique set of skills and perspectives to the table, making our collaboration dynamic and effective.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <UserCircle size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Priya Panda</h3>
                  <p className="text-blue-600 text-sm mb-3">UI/UX Designer • 30101222046</p>
                  <p className="text-gray-600">
                    Our visionary leader and UI/UX designer, focused on crafting an intuitive interface that engages users. With a strong background in design principles, she ensures that our website is not only functional but also aesthetically pleasing.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <UserCircle size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Sourav Mondal</h3>
                  <p className="text-blue-600 text-sm mb-3">Backend Developer • 30101222045</p>
                  <p className="text-gray-600">
                    Serves as our backend developer, responsible for building a robust and secure framework. His expertise in coding and database management ensures that our website runs smoothly and efficiently, providing users with a seamless experience.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <UserCircle size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Sachin Mahapatra</h3>
                  <p className="text-blue-600 text-sm mb-3">Frontend Developer • 30101222050</p>
                  <p className="text-gray-600">
                    Our frontend developer, transforming our ideas into a responsive and visually appealing site. With a keen eye for detail and a passion for modern web technologies, he brings our designs to life, making sure our site is both user-friendly and engaging.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <UserCircle size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Sourav Mondal</h3>
                  <p className="text-blue-600 text-sm mb-3">Frontend Developer • 30101222017</p>
                  <p className="text-gray-600">
                    Our frontend developer, transforming our ideas into a responsive and visually appealing site. With a keen eye for detail and a passion for modern web technologies, he brings our designs to life, making sure our site is both user-friendly and engaging.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <UserCircle size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">SK Aman Hossain</h3>
                  <p className="text-blue-600 text-sm mb-3">Project Manager • 30101222047</p>
                  <p className="text-gray-600">
                    Takes on the role of project content strategist. With strong organizational skills, he keeps us on track and ensures that our content is informative and relevant. His focus on communication and collaboration helps us achieve our goals efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Patient Care</h3>
              <p className="text-gray-600">
                We prioritize your health and well-being above all else, ensuring you receive high-quality medications and personalized care.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We source only the highest quality medications and healthcare products from reputable manufacturers and distributors.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Excellence in Service</h3>
              <p className="text-gray-600">
                We strive to provide exceptional customer service, ensuring a seamless and satisfying shopping experience for all our customers.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -right-10 top-10">
              <HeartPulse size={120} strokeWidth={1} />
            </div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-6">
              At MedsCorner, we're on a mission to make healthcare accessible, affordable, and convenient for everyone. We believe in empowering our customers with quality products, expert advice, and exceptional service.
            </p>
            <p className="text-blue-200">
              Together, we are committed to delivering a high-quality service that meets the needs of our users. We believe in the power of teamwork and creativity, and we're excited to be your trusted healthcare partner!
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default About