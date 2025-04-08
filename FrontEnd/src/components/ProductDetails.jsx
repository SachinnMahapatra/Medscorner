import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios'
import Footer from './Footer';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingCart, ShoppingBag, Star, Truck, Shield, Clock, AlertCircle, Calendar, Pill, List, User, ChevronRight, Package, Check, X } from 'lucide-react';
import { showSuccess, showError, showLoginRequired } from '../utils/notification.jsx';
// import { useHistory } from "react-router-dom";


const ProductDetails = () => {
  // let history = useHistory();
  const navigate = useNavigate()
  const { id } = useParams(); // Extract ID from the URL
  const [product, setProduct] = useState({
    "id": 11,
    "category": "General medicine",
    "name": "Paracetamol 500 mg ",
    "price": 20,
    "manufacturer": "GlaxoSmithKline",
    "description": "Pain reliever and fever reducer.",
    "stock": 50,
    "compositions": "Paracetamol 500 mg",
    "expiry_date": "2026-10-11",
    "uses": "Fever, mild to moderate pain",
    "side_effects": "Nausea, rash, liver damage (overdose)",
    "prescription_required": false,
    "dosage": "1 tablet every 4-6 h",
    "image": "/uploads/uploads/products/Paracetamol_500_mg_new.webp",
    "image2": "/uploads/uploads/products/Paracetamol_500_mg_new_2.webp",
    "image3": "/uploads/uploads/products/Paracetamol_500_mg_new_3.webp",
    "rating": 2,
    "total_rating": 10,
    "total_reviews": 0
  });

  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState();
  const [editQuantity, setEditQuantity] = useState(1);
  const [reviews, setReviews] = useState(null);
  const [active, setActive] = useState(1)
  const [username, setUsername] = useState(null)
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('description');

  const checkLoggedInUser = async () => {
    // const navigate = useNavigate()
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        // console.log("logged in")
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
      // setTimeout(() => {
      //   navigate("/Profile", { replace: true })
      // }, 2000);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await axios.get("http://127.0.0.1:8000/api/cart/", config)
        setCart(response.data)
        // console.log(response.data)
      }
    } catch (error) {
      console.log(error.message)
      showError("Failed to fetch cart data");
    }
  }



  useEffect(() => {
    const fetchProductCartReview = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/details/${id}`);
        // console.log(response)
        if (!response.status == 200) {
          throw new Error('Failed to fetch products');
        }

        setProduct(response.data);
      } catch (error) {
        console.log(error.message)
        showError("Failed to load product details");
      }

      fetchCart();
      checkLoggedInUser();
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/reviews/${id}`);
        // console.log(response)
        if (!response.status == 200) {
          throw new Error('Failed to fetch reviews');
        }

        if(response.data.length){
          setReviews(response.data);
        }
        
      } catch (error) {
        console.log(error.message)
        showError("Failed to load reviews");
      }

    };

    fetchProductCartReview();
  }, []);

  useEffect(() => {
    const product = cart.find((product) => product.item == id); // Find the matching product
    // console.log(cart,id)
    if (product) {
      // console.log(product.quantity)
      setQuantity(product.quantity); // Set quantity if product is found
      setEditQuantity(product.quantity)
    } else {
      setQuantity(0); // Optional: Set to 0 if product is not found
    }
  }, [cart]);


  const ratingCount = () => {
    const rating = product.rating
    const totalStars = [1, 2, 3, 4, 5];

    const Star = ({ filled }) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? "gold" : "lightgray"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );
    return (
      <div className='flex gap-[1px] items-center'>
        {totalStars.map((_, index) => (
          <Star key={index} filled={index < rating} />
        ))}
      </div>
    );
  }
  const reviewRating = (index) => {
    const rating = reviews[index].rating
    const totalStars = [1, 2, 3, 4, 5];

    const Star = ({ filled }) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? "gold" : "lightgray"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );
    return (
      <div className='flex gap-[1px] items-center'>
        {totalStars.map((_, index) => (
          <Star key={index} filled={index < rating} />
        ))}
      </div>
    );
  }

  // cart
  const handleCart = async () => {
    if (!isLoggedIn) {
      showLoginRequired();
      return
    }
    try {
      const token = localStorage.getItem("accessToken");
      // console.log(token,id,editQuantity)
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await axios.put("http://127.0.0.1:8000/api/cart/", { "item": id, "quantity": editQuantity }, config)
        fetchCart();
        
        // Show appropriate success message
        const message = quantity ? 
          (quantity === editQuantity ? "Item already in cart" : "Cart updated successfully") 
          : "Item added to cart";
        
        showSuccess(message);
      }
    } catch (error) {
      console.log(error.message)
      console.log("error")
    }
  };


  const handleIncrease = () => {
    setEditQuantity(editQuantity + 1);
  };

  const handleDecrease = () => {
    if (editQuantity > 1) setEditQuantity(editQuantity - 1);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
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

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return <>

    <NavBar />
      <button className="lg:px-20 p-2" onClick={() => navigate(-1)}>
        <svg className='inline' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
          <path d="M3.99982 11.9998L19.9998 11.9998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className='inline'> Go Back </p>
      </button>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span>Go Back</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {/* Left column - Product images */}
          <div className="col-span-1">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-4"
            >
              <div className="border rounded-lg overflow-hidden bg-white flex items-center justify-center h-80">
                <img 
                  src={`http://127.0.0.1:8000/${active === 1 ? product.image : active === 2 ? product.image2 : product.image3}`}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </motion.div>
            
            <div className="flex justify-center space-x-2">
              {product.image && (
                <button 
                  onClick={() => setActive(1)}
                  className={`p-1 rounded-md border ${active === 1 ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img 
                    src={`http://127.0.0.1:8000/${product.image}`}
                    alt={`${product.name} thumbnail 1`}
                    className="h-16 w-16 object-contain"
                  />
                </button>
              )}
              {product.image2 && (
                <button 
                  onClick={() => setActive(2)}
                  className={`p-1 rounded-md border ${active === 2 ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img 
                    src={`http://127.0.0.1:8000/${product.image2}`}
                    alt={`${product.name} thumbnail 2`}
                    className="h-16 w-16 object-contain"
                  />
                </button>
              )}
              {product.image3 && (
                <button 
                  onClick={() => setActive(3)}
                  className={`p-1 rounded-md border ${active === 3 ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img 
                    src={`http://127.0.0.1:8000/${product.image3}`}
                    alt={`${product.name} thumbnail 3`}
                    className="h-16 w-16 object-contain"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Middle column - Product info */}
          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <RatingStars rating={product.rating} />
              <span className="ml-2 text-sm text-gray-500">
                ({product.total_rating || 0} Rating{product.total_rating !== 1 ? 's' : ''})
              </span>
            </div>
            
            <p className="text-2xl font-medium text-gray-900 mb-4">₹ {product.price}</p>
            
            {product.description && (
              <p className="text-gray-600 mb-6">{product.description}</p>
            )}
            
            <div className="space-y-3 mb-6">
              {product.manufacturer && (
                <div className="flex">
                  <span className="text-gray-600 w-32">Manufacturer:</span>
                  <span className="text-gray-900">{product.manufacturer}</span>
                </div>
              )}
              
              {product.compositions && (
                <div className="flex">
                  <span className="text-gray-600 w-32">Compositions:</span>
                  <span className="text-gray-900">{product.compositions}</span>
                </div>
              )}
              
              {product.expiry_date && (
                <div className="flex">
                  <span className="text-gray-600 w-32">Expiry Date:</span>
                  <span className="text-gray-900">{product.expiry_date}</span>
                </div>
              )}
              
              {product.dosage && (
                <div className="flex">
                  <span className="text-gray-600 w-32">Dosage:</span>
                  <span className="text-gray-900">{product.dosage}</span>
                </div>
              )}
              
              {product.uses && (
                <div className="flex">
                  <span className="text-gray-600 w-32">Uses:</span>
                  <span className="text-gray-900">{product.uses}</span>
                </div>
              )}
              
              {product.side_effects && (
                <div className="flex">
                  <span className="text-gray-600 w-32">Side Effects:</span>
                  <span className="text-gray-900">{product.side_effects}</span>
                </div>
              )}
              
              {product.prescription_required !== undefined && (
                <div className="flex">
                  <span className="text-gray-600 w-32">Prescription:</span>
                  <span className={product.prescription_required ? "text-red-600" : "text-green-600"}>
                    {product.prescription_required ? "Required" : "Not Required"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Purchase options */}
          <div className="col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Package size={18} className="text-green-600" />
                <span className="text-green-600 font-medium">In Stock</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center mb-4">
                  <button
                    onClick={handleDecrease}
                    className="h-8 w-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="mx-4 w-8 text-center">{editQuantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="h-8 w-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleCart}
                  className={`w-full py-3 px-4 rounded-md font-medium text-white mb-3 flex items-center justify-center ${
                    quantity ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {quantity ? 
                    quantity === editQuantity ? "In Your Cart" : "Update Cart" 
                    : "Add To Cart"
                  }
                </button>
                
                <Link 
                  to={isLoggedIn ? `/Checkout/${id}` : "#"}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      showLoginRequired();
                    }
                  }}
                  className="block w-full py-3 px-4 rounded-md bg-gray-800 hover:bg-gray-900 text-white font-medium text-center"
                >
                  Buy Now
                </Link>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Truck size={16} className="text-gray-500 mr-2" />
                  <span>Free worldwide shipping on all orders over $100</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-500 mr-2" />
                  <span>Delivers in: 3-7 Working Days</span>
                </div>
                <div className="flex items-center">
                  <Check size={16} className="text-gray-500 mr-2" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {!reviews ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No Reviews Yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{review.username}</h3>
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="text-gray-600">{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    <Footer />

  </>

}

export default ProductDetails