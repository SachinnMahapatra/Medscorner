import React, { useState } from "react";
import NavBar from "./NavBar"
const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 5,
      quantity: 2,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Vitamin C Tablets",
      price: 10,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
  ]);

  const handleIncreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (<>
    <NavBar/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Shopping Cart
      </h1>

      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col lg:flex-row items-center justify-between border-b border-gray-200 py-4"
              >
                {/* Product Image and Name */}
                <div className="flex items-center w-full lg:w-1/2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between w-full lg:w-1/4 mt-4 lg:mt-0">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                    >
                      -
                    </button>
                    <span className="mx-4 text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                    >
                      +
                    </button>

                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
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
                Total: ${calculateTotal().toFixed(2)}
              </h3>
              <button className="mt-4 sm:mt-0 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Cart;
