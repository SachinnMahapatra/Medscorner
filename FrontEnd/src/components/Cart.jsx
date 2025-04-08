import React, { useState, useEffect } from "react";
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, AlertCircle, ShoppingBag, Package } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setTimeout(() => {
          navigate("/Login", { replace: true })
        }, 2000);
      }
    }
    catch (error) {
      setLoggedIn(false);
      setUsername("");
      setTimeout(() => {
        navigate("/Login", { replace: true })
      }, 2000);
    }
  };

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };

        const response = await axios.get("http://127.0.0.1:8000/api/cart", config)
        setCartItems(response.data)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkLoggedInUser()
    fetchCart();
  }, [])

  const handleCart = async (id, operation) => {
    const item = cartItems.find((item) => (
      item.id === id
    ));

    if (item.quantity <= 1 && operation === 1) {
      return
    }
    
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        
        if(operation === 1) {
          await axios.put("http://127.0.0.1:8000/api/cart/", { "item": item.item, "quantity": item.quantity - 1 }, config);
        }
        else if(operation === 2) {
          await axios.put("http://127.0.0.1:8000/api/cart/", { "item": item.item, "quantity": item.quantity + 1 }, config);
        }
        else if(operation === 3) {
          await axios.delete(
            "http://127.0.0.1:8000/api/cart/",
            {
                data: { item: item.item, quantity: item.quantity },
                ...config
            }
          );
        }
        
        fetchCart();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <NavBar />
      
      <div className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span className="font-medium">Back</span>
          </button>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <ShoppingCart size={28} className="text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        </div>

        {!isLoggedIn ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Sign In</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
            <Link 
              to="/Login" 
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        ) : isLoading ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <ShoppingBag size={48} className="mx-auto text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/productlist/all" 
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Cart Header */}
            <div className="bg-blue-50 p-4 border-b border-blue-100">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  {calculateTotalItems()} {calculateTotalItems() === 1 ? 'Item' : 'Items'}
                </span>
                <span className="text-blue-600 font-medium">
                  <Package size={16} className="inline-block mr-1" />
                  Free shipping on orders over ₹1,000
                </span>
              </div>
            </div>
            
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    {/* Product Image */}
                    <Link to={`/ProductDetails/${item.item}`} className="w-24 h-24 shrink-0">
                      <img
                        src={`http://127.0.0.1:8000/${item.image}`}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg shadow-sm"
                      />
                    </Link>
                    
                    {/* Product Info */}
                    <div className="flex-grow">
                      <Link to={`/ProductDetails/${item.item}`}>
                        <h2 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                          {item.name}
                        </h2>
                      </Link>
                      <p className="text-blue-600 font-medium text-sm">{item.category}</p>
                      <p className="text-gray-600 text-sm mt-1">Unit Price: ₹{item.price.toFixed(2)}</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleCart(item.id, 1)}
                        disabled={item.quantity <= 1}
                        className={`p-1 rounded-full ${
                          item.quantity <= 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleCart(item.id, 2)}
                        className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    {/* Item Total */}
                    <div className="min-w-[100px] text-right">
                      <div className="text-lg font-semibold text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => handleCart(item.id, 3)}
                        className="text-red-500 hover:text-red-700 flex items-center mt-2 ml-auto text-sm"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="max-w-lg ml-auto">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-blue-700">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  to="/Checkout/-1" 
                  className="block w-full bg-blue-600 text-white font-medium text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
