import React, { useEffect, useState } from 'react'
import { NavLink, Link } from "react-router-dom"
import axios from 'axios'
import { User, ShoppingBag, Heart, Phone, Menu, X, Home, Info, Search, Pill } from 'lucide-react'

const NavBar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const checkLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)

        setLoggedIn(true)
        setUsername(response.data.username)
      }
      else {
        setLoggedIn(false);
        setUsername("");
      }
    }
    catch (error) {
      setLoggedIn(false);
      setUsername("");
    }
  };
  
  useEffect(() => {
  checkLoggedInUser()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with contact & login info */}
        <div className="py-2 border-b border-blue-100 flex justify-between text-sm">
          <div className="flex items-center">
            <Phone size={14} className="text-blue-600 mr-2" />
            <span className="text-gray-600">Call us: +911234567890</span>
          </div>
          <div className="text-gray-600">
            {isLoggedIn ? (
              <span>Welcome back, <span className="font-medium text-blue-600">{username}</span></span>
            ) : (
              <div className="space-x-3">
                <Link to="/Login" className="hover:text-blue-600 transition-colors">Sign In</Link>
                <span>|</span>
                <Link to="/Register" className="hover:text-blue-600 transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Main navbar */}
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Pill size={24} className="text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-800">MedsCorner</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => 
              isActive ? "text-blue-600 font-medium flex items-center" : "text-gray-600 hover:text-blue-600 transition-colors flex items-center"
            }>
              <Home size={18} className="mr-1" />
              <span>Home</span>
            </NavLink>
            
            <NavLink to="/productlist/all" className={({ isActive }) => 
              isActive ? "text-blue-600 font-medium flex items-center" : "text-gray-600 hover:text-blue-600 transition-colors flex items-center"
            }>
              <Pill size={18} className="mr-1" />
              <span>Products</span>
            </NavLink>
            
            <NavLink to="/Contact" className={({ isActive }) => 
              isActive ? "text-blue-600 font-medium flex items-center" : "text-gray-600 hover:text-blue-600 transition-colors flex items-center"
            }>
              <Phone size={18} className="mr-1" />
              <span>Contact</span>
            </NavLink>
            
            <NavLink to="/About" className={({ isActive }) => 
              isActive ? "text-blue-600 font-medium flex items-center" : "text-gray-600 hover:text-blue-600 transition-colors flex items-center"
            }>
              <Info size={18} className="mr-1" />
              <span>About</span>
            </NavLink>
      </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <NavLink to="/Profile" className="text-gray-700 hover:text-blue-600 transition-colors p-2">
              <User size={22} />
            </NavLink>
            
            <NavLink to="/Cart" className="text-gray-700 hover:text-blue-600 transition-colors p-2 relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </NavLink>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 bg-blue-50 text-blue-600 rounded-md font-medium"
                  : "block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/productlist/all" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 bg-blue-50 text-blue-600 rounded-md font-medium"
                  : "block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>
            
            <NavLink 
              to="/Contact" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 bg-blue-50 text-blue-600 rounded-md font-medium"
                  : "block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
        </NavLink>
            
            <NavLink 
              to="/About" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 bg-blue-50 text-blue-600 rounded-md font-medium"
                  : "block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
        </NavLink>
      </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar