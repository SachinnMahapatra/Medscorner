import React from 'react'
import NavBar from './NavBar'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from './Footer'

const Checkout = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const [config, setConfig] = useState(null)
  const [prescription_required, setPrescription_required] = useState(false)
  const [prescription, setPrescription] = useState()



  const checkLoggedInUser = async () => {
    try {

      if (config) {
        console.log("logged in")
        const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)
        setCompleteAddress(response.data.address)
        setLoggedIn(true)

      }
      else {
        setLoggedIn(false);

        setTimeout(() => {
          // navigate("/Profile", { replace: true })
        }, 2000);
      }
    }
    catch (error) {
      setLoggedIn(false);
      setTimeout(() => {
        navigate("/Profile", { replace: true })
      }, 2000);
    }
  };

  const fetchCart = async () => {
    try {

      if (config) {
        if (id == -1) {
          const response = await axios.get("http://127.0.0.1:8000/api/cart", config)
          console.log(response.data)
          setCartItems(response.data)
        } else {
          const response = await axios.get(`http://127.0.0.1:8000/api/products/details/${id}`)
          setCartItems(Array({ ...response.data, "item": response.data.id, "quantity": "1" },))
          // console.log(response.data)
          // console.log(Array({...response.data,"item":response.data.id,"quantity":"1"}))
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          // console.log(config)
          setConfig(config)
        }
      } catch (error) {
        console.error(error)
        setConfig(null)
      }
    }

    checkConfig()
  }, [])

  useEffect(() => {
    checkLoggedInUser();
    fetchCart();

  }, [config])






  useEffect(() => {
    // ---------finding total-------
    if (cartItems) {
      let total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      setTotal(total.toFixed(2))
    }

    // --------------finding if any product needs prescription ----------
    if (cartItems) {
      cartItems.map((item) => {
        if(item.prescription_required){
          setPrescription_required(true)
        }
      })
    }

  }, [cartItems])


  const [total, setTotal] = useState()

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    postcode: "",
  });

  const [completeAddress, setCompleteAddress] = useState(null)

  useEffect(() => {
    if (completeAddress) {
      let add = {
        name: completeAddress.slice(completeAddress.indexOf("NAME: ") + 6, completeAddress.indexOf(" PHONE: ")),
        phone: completeAddress.slice(completeAddress.indexOf(" PHONE: ") + 8, completeAddress.indexOf(" STREET: ")),
        street: completeAddress.slice(completeAddress.indexOf(" STREET: ") + 9, completeAddress.indexOf(" CITY: ")),
        city: completeAddress.slice(completeAddress.indexOf(" CITY: ") + 7, completeAddress.indexOf(" POSTCODE: ")),
        postcode: completeAddress.slice(completeAddress.indexOf(" POSTCODE: ") + 11)
      }
      // console.log(add)
      setAddress(add)
    }
  }, [isLoggedIn])





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

  };

  const handleAddress = async (e) => {
    if (address.city && address.name && address.phone && address.postcode && address.street) {
      let add = "NAME: " + address.name + " PHONE: " + address.phone + " STREET: " + address.street + " CITY: " + address.city + " POSTCODE: " + address.postcode
      setCompleteAddress(add)
      // console.log(add)

      try {
        if (config) {
          const response = await axios.put("http://127.0.0.1:8000/api/users/details/", { "address": add }, config)
          e.target.innerHTML = "Address Saved"
          e.target.className += (" bg-slate-500")
        }

      } catch (error) {
        console.error(error)
      }

    }

  }

  const handleCart = async (_id, operation) => {
    const a = cartItems.find((item) => (
      item.id == _id
    ))
    // console.log(a)

    if (a.quantity <= 1 && operation == 1) {
      return
    }
    // -----check if order is from cart or direct order----
    if (id == -1) {
      try {
        if (config) {
          if (operation == 1) {
            const response = await axios.put("http://127.0.0.1:8000/api/cart/", { "item": a.item, "quantity": a.quantity - 1 }, config)
          }
          else if (operation == 2) {
            const response = await axios.put("http://127.0.0.1:8000/api/cart/", { "item": a.item, "quantity": a.quantity + 1 }, config)
          }
          else if (operation == 3) {
            const response = await axios.delete(
              "http://127.0.0.1:8000/api/cart/",
              {
                data: { "item": a.item, "quantity": a.quantity }, // Payload for DELETE request
                ...config // Any additional headers or configuration
              }
            );
          }
          else {
            console.log("Gorbor Hai re Deba")
          }
          // setCartItems(response.data)
          fetchCart();

        }
      } catch (error) {
        console.log(error.message)
        console.log("error")
      }
    }
    else {
      if (operation == 1) {
        const obj = { ...cartItems[0], "quantity": Number(cartItems[0]["quantity"]) - 1 }
        setCartItems(Array(obj))
      }
      else if (operation == 2) {
        const obj = { ...cartItems[0], "quantity": Number(cartItems[0]["quantity"]) + 1 }
        setCartItems(Array(obj))
      }

      else {
        console.log("Gorbor Hai re Deba")
      }
    }

  };


  const handleOrder = async (e) => {
    e.preventDefault;
    if (!isLoggedIn) {
      alert("Please Login To Place Order !!!")
      return
    }
    if (prescription_required && !prescription) {
      alert("Please upload prescription")
      return
    }


    try {
      e.target.disabled = true
      if (config) {
        if (completeAddress && total && cartItems.length != 0) {
          if (prescription_required) {
            if (!prescription) {
              alert("Please upload prescription before placing rder")
              e.target.disabled = false
            }

          }
          cartItems.map(async (item) => {

            const formData = new FormData();
            formData.append("prescription", prescription ? prescription : ''); // Append the prescription file
            formData.append("product", Number(item.item));
            formData.append("quantity", Number(item.quantity));
            formData.append("address", completeAddress);
            formData.append(
              "price",
              Number(Number(total) < 200 ? Number(total) + 50 : total)
            );
            formData.append(
              "name",
              completeAddress.slice(
                completeAddress.indexOf("NAME: ") + 6,
                completeAddress.indexOf(" PHONE: ")
              )
            );
            formData.append(
              "phone",
              completeAddress.slice(
                completeAddress.indexOf(" PHONE: ") + 8,
                completeAddress.indexOf(" STREET: ")
              )
            );

            try {
              const response = await axios.post(
                "http://127.0.0.1:8000/api/order/add",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    ...config.headers, // Include other headers like Authorization if needed
                  },
                }
              );
              if(id==-1){
                const response2 = await axios.delete(
                  "http://127.0.0.1:8000/api/cart/",
                  {
                    data: { "item": item.item, }, // Payload for DELETE request
                    ...config // Any additional headers or configuration
                  }
                );
              }
              e.target.innerHTML = "Order Placed"
              e.target.className += (" bg-slate-500")

              

            } catch (error) {
              console.error(error)
              e.target.disabled = false
            }

          })
          
          setTimeout(() => {
            navigate("/Thankyou")
          }, 1000);
        }
      }

    } catch (error) {
      e.target.disabled = false
      console.error(error)
    }
  }
  const handlePrescription = (e) => {
    if (!e.target.files[0].name.match(/\.(jpg|jpeg|gif|png)$/i)) {
      alert('not an image')
      e.target.value = null
      return
    }
    setPrescription(e.target.files[0]);
  }





  // -----------------------------TEMPLETE-------------------------------
  return <>
    <NavBar />

    <button className="lg:px-20 p-2" onClick={() => navigate(-1)}>
      <svg className='inline' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
        <path d="M3.99982 11.9998L19.9998 11.9998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className='inline'> Go Back </p>
    </button>
    <div className="container lg:p-20 p-2 m-auto">
      {
        !isLoggedIn &&
        <Link to="/Profile" className="text-center font-bold text-3xl text-blue-500 block">Please Log In First</Link>
      }

      <div className="address">

      </div>

      {id == -1 ? "In Your Cart" : "In Your Order"}
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
            <div className={`flex items-center ${id == -1 ? "justify-between" : "justify-end"} w-full lg:w-1/4 mt-4 lg:mt-0`}>
              <div className="flex items-center">
                <button
                  onClick={() => handleCart(item.id, 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                >
                  -
                </button>
                <span className="mx-4 text-gray-700">{item.quantity}</span>
                <button
                  onClick={() => handleCart(item.id, 2)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                >
                  +
                </button>

              </div>
              {
                id == -1 &&
                <button
                  onClick={() => handleCart(item.id, 3)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              }
            </div>

          </div>
        ))}
      {
        prescription_required && <p>Prescription required</p>
      }



    </div>


    {/* -----------------------Addressss--------------------------- */}
    <form className="flex flex-col md:flex-row gap-4 p-6 ">
      {/* Left Section */}
      <div className="flex-1 w-full md:w-2/3 bg-gray-50 rounded-lg shadow p-6  ">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Shipping Address</h2>

        </div>

        {/* Address Form */}
        <div className="space-y-4 relative min-h-[280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <input
              type="text"
              required
              name="name"
              value={address.name}
              onChange={handleInputChange}
              placeholder="Name*"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <input
              required
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleInputChange}
              placeholder="Phone Number*"
              className="p-2 border border-gray-300 rounded w-full"
            />

          </div>

          <input
            required
            type="text"
            name="street"
            value={address.street}
            onChange={handleInputChange}
            placeholder="Street Address*"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              name="city"
              value={address.city}
              onChange={handleInputChange}
              placeholder="Town / City*"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              required
              name="postcode"
              value={address.postcode}
              onChange={handleInputChange}
              placeholder="Postcode / Zip*"
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <button type='button' onClick={handleAddress} className=" bg-black text-white p-3 rounded w-full absolute bottom-0 left-0">Save Address</button>
        </div>
      </div>


      {/* Right Section */}

      <div className='w-full md:w-1/3 bg-gray-50 rounded-lg shadow p-6 relative h-[380px]'>

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-700">SUBTOTAL  </h3>
          <span>₹{total}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-700">SHIPPING  </h3>
          <span>₹{(total) >= 200 ? "00" : "50"}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-700">TOTAL  </h3>
          <span>₹{total >= 200 ? (total) : (Number(total) + 50)}</span>
        </div>
        <hr />
        {
          (total) < 200 &&
          <p className='text-center text-sm text-gray-500'>Add items worth 200 or more to avail free Delivery</p>
        }

        <div className="absolute  bottom-0 left-0 w-full p-6">

          <h2 className="text-lg font-semibold">Select Payment Method</h2>
          <input type="radio" required defaultChecked /> Cash on Delivery
          {
            prescription_required && <>
              <br />
              <label htmlFor="image">Upload prescription in jpg , jpeg , png format </label>
              <br />
              <input type="file" name="image" required className='mt-2' onChange={handlePrescription} />
            </>
          }
          <button type='submit' onClick={handleOrder} className="bg-black text-white p-3 rounded mt-4 w-full ">Place Order</button>
        </div>
      </div>
    </form>
    <Footer />
  </>
}

export default Checkout