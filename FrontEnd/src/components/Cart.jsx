import React, { useState, useEffect } from "react";
import NavBar from "./NavBar"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState([]);




  const checkLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      // console.log(token)
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        console.log("logged in")
        const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)
       
        setLoggedIn(true)
        setUsername(response.data.username)

      }
      else {
        setLoggedIn(false);
        setUsername("");
        setTimeout(() => {
          navigate("/Profile", { replace: true })
        }, 2000);

      }
    }
    catch (error) {
      setLoggedIn(false);
      setUsername("");
      setTimeout(() => {
        navigate("/Profile", { replace: true })
      }, 2000);
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

        const response = await axios.get("http://127.0.0.1:8000/api/cart", config)
        setCartItems(response.data)
        // console.log(response.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    checkLoggedInUser()
    fetchCart();

  }, [])



  // const handleIncreaseQuantity = (id) => {
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  const handleCart = async (id,operation) => {
    const a = cartItems.find((item) => (
      item.id == id
    ))
    // console.log(a)

    if (a.quantity <= 1 && operation==1) {
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
        if(operation==1){
          const response = await axios.put("http://127.0.0.1:8000/api/cart/", { "item": a.item, "quantity": a.quantity - 1 }, config)
        }
        else if(operation==2){
          const response = await axios.put("http://127.0.0.1:8000/api/cart/", { "item": a.item, "quantity": a.quantity + 1 }, config)
        }
        else if(operation==3){
          const response = await axios.delete(
            "http://127.0.0.1:8000/api/cart/",
            {
                data: { item: a.item, quantity: a.quantity }, // Payload for DELETE request
                ...config // Any additional headers or configuration
            }
        );
                }
        else{
          console.log("Gorbor Hai re Deba")
        }
        // setCartItems(response.data)
        fetchCart();
        
      }
    } catch (error) {
      console.log(error.message)
      console.log("error")
    }

    // await axios.put(`http://127.0.0.1:8000/api/cart/`, { "item": a.item, "quantity": a.quantity-1 })

    // setCartItems((prevItems) =>(
    //   prevItems.map((item) =>
    //     item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    // )
    // )

    // );
  };

  // const handleRemoveItem = (id) => {
  //   setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  // };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>


      <NavBar />
      {
        !isLoggedIn &&
        <h2 className="text-center font-bold text-3xl">Please Log In First</h2>
      }
      <button className="lg:px-20 p-2" onClick={() => navigate(-1)}>
        <svg className='inline' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
          <path d="M3.99982 11.9998L19.9998 11.9998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className='inline'> Go Back </p>
      </button>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Shopping Cart
        </h1>

        <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">


          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col space-y-4">


              {
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col lg:flex-row items-center justify-between border-b border-gray-200 py-4"
                  >
                    {/* Product Image and Name */}
                    <div className="flex items-center w-full lg:w-1/2">
                    <Link to={`/ProductDetails/${item.item}`}>
                      <img
                        src={`http://127.0.0.1:8000/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                        />
                        </Link>
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                          {item.name}
                        </h2>
                        <p className="text-gray-500">₹{item.price}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between w-full lg:w-1/4 mt-4 lg:mt-0">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleCart(item.id,1)}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                        >
                          -
                        </button>
                        <span className="mx-4 text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => handleCart(item.id,2)}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                        >
                          +
                        </button>

                      </div>
                      <button
                        onClick={() => handleCart(item.id,3)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>


                  </div>
                ))}

              {/* Total Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total: ₹{calculateTotal().toFixed(2)}
                </h3>
                <Link to="/Checkout/-1" className="mt-4 sm:mt-0 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
