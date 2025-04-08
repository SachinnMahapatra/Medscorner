import React from 'react';
import NavBar from './NavBar';
import { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, Mail, AlertCircle, Pill, HeartPulse, EyeOff, Eye, Key, Send, Loader } from 'lucide-react';
import Footer from './Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return
    }
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true);
    if(formData.password1 !== formData.password2){
      setError("Passwords do not match!")
      setIsLoading(false)
      return
    }
    if(formData.password1.length < 7){
      setError("Password must be at least 8 characters!")
      setIsLoading(false)
      return
    }
    if(!formData.password1.includes('1','2','3','4','5','6','7','8','9','0')){
      setError("Password must include at least one digit!")
      setIsLoading(false)
      return
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/create", formData)
      setSuccessMessage("Registration Successful!")
      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      setTimeout(() => {
        // Navigate happens automatically due to the redirect in the JSX
      }, 2000);
    }
    catch (error) {
      console.log("Error during registration!", error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach(field => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        })
      }
    }
    finally {
      setIsLoading(false)
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    
    if (otpCountdown > 0) return;
    
    setError(null)
    setSuccessMessage(null)
    
    if (formData.email === ''){
      setError("Please provide your email first!")
      return
    }
    
    try {
      await axios.post("http://127.0.0.1:8000/api/otp/", formData);
      setOtpCountdown(60);
      
      const timer = setInterval(() => {
        setOtpCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch(error) {
      console.log("Internal Server Error! Please retry");
      setError("Internal Server Error! Please retry");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <NavBar />
      {successMessage ? <Navigate replace to={"/"}/> : null}
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <div className="flex justify-center">
              <Pill size={40} className="text-blue-600" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join MedsCorner for fast and secure medical shopping
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
              <AlertCircle size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Choose a unique username"
                  />
                </div>
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative flex">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-l-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="you@example.com"
                  />
                  <button 
                    type="button" 
                    onClick={handleOtp} 
                    disabled={otpCountdown > 0}
                    className={`px-4 py-3 border border-l-0 rounded-r-lg flex items-center justify-center min-w-[80px] ${
                      otpCountdown > 0 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    {otpCountdown > 0 ? (
                      <span>{otpCountdown}s</span>
                    ) : (
                      <>
                        <Send size={16} className="mr-1" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* OTP Field */}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  OTP Verification
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={formData.otp}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter the OTP sent to your email"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  We've sent a verification code to your email
                </p>
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password1" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="password1"
                    name="password1"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password1}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter 8 characters or more with at least 1 digit"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={16} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={16} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="password2"
                    name="password2"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.password2}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={16} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white font-medium ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader size={18} className="animate-spin mr-2" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <NavLink to="/Login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-[-1] h-1/3 bg-gradient-to-t from-blue-100 to-transparent"></div>
      
      <div className="hidden lg:flex absolute bottom-0 right-0 z-[-1]">
        <HeartPulse className="text-blue-100" size={80} />
      </div>
      
      <div className="hidden lg:flex absolute top-20 left-0 z-[-1]">
        <Pill className="text-blue-100" size={120} />
      </div>
      
      <Footer />
    </div>
  );
}

export default Register;