import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios'
import Footer from './Footer';
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
      alert("Please Log in to Use Cart")
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






  return <>

    <NavBar />
    <div className="lg:px-20 p-2  ">

      <button onClick={() => navigate(-1)}>
        <svg className='inline' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
          <path d="M3.99982 11.9998L19.9998 11.9998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className='inline'> Go Back </p>
      </button>

      <div className='mt-5 flex flex-col md:flex-row'>
        <div className="photo flex gap-5 w-[100vw] justify-center md:w-fit md:justify-start flex-col-reverse md:flex-row">
          <div className="select flex gap-2 md:flex-col justify-center md:justify-center">
            {product.image &&
              <img onClick={() => setActive(1)} onMouseOver={() => setActive(1)} src={`http://127.0.0.1:8000/${product.image}`} className='h-[100px]  w-[70px] md:h-[150px] md:w-[90px] object-cover rounded-md border' alt="nahi aaya" />
            }
            {product.image2 &&
              <img onClick={() => setActive(2)} onMouseOver={() => setActive(2)} src={`http://127.0.0.1:8000/${product.image2}`} className='h-[100px] w-[70px] md:h-[150px] md:w-[90px] object-cover rounded-md border' alt="nahi aaya" />
            }
            {product.image3 &&
              <img onClick={() => setActive(3)} onMouseOver={() => setActive(3)} src={`http://127.0.0.1:8000/${product.image3}`} className='h-[100px] w-[70px] md:h-[150px] md:w-[90px] object-cover rounded-md border' alt="nahi aaya" />
            }
          </div>

          {
            active &&
              active == 1 ?
              <img src={`http://127.0.0.1:8000/${product.image}`} className='self-center h-[400px] w-[90vw]   md:h-[467px] md:w-[300px] object-contain rounded-md border' alt="product image" />
              : active == 2 ?
                <img src={`http://127.0.0.1:8000/${product.image2}`} className='self-center h-[400px] w-[90vw]   md:h-[467px] md:w-[300px] object-contain rounded-md border' alt="product image" />
                :
                <img src={`http://127.0.0.1:8000/${product.image3}`} className='self-center h-[400px] w-[90vw]   md:h-[467px] md:w-[300px] object-contain rounded-md border' alt="product image" />
          }
        </div>


        <div className="details md:ml-10">
          <p className='text-3xl font-semibold break-words'>{product.name}</p>
          <div className='flex items-center gap-3'>
            <p className='text-3xl font-semibold inline'>₹ {product.price} </p>
            <svg width="2" height="27" viewBox="0 0 2 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.11719 0.75V26.25" stroke="black" />
            </svg>


            {ratingCount()}
            <p>({product.total_rating} Rating)</p>

          </div>
          <hr className='my-4' />
          <div className="flex flex-col-reverse md:flex-col">
            <div>

              {
                product.description &&
                <p>{product.description}</p>
              }
              {
                product.manufacturer &&
                <p><span className='text-lg md:text-2xl font-semibold'>Manufacturer : </span> {product.manufacturer}</p>
              }

              {
                product.compositions &&
                <p><span className='text-lg md:text-2xl font-semibold'>Compositions : </span>{product.compositions}</p>
              }
              {
                product.expiry_date &&
                <p><span className='text-lg md:text-2xl font-semibold'>Expiry Date : </span>{product.expiry_date}</p>
              }
              {
                product.dosage &&
                <p><span className='text-lg md:text-2xl font-semibold'>Dosage : </span>{product.dosage}</p>
              }
              {
                product.uses &&
                <p><span className='text-lg md:text-2xl font-semibold'>Uses : </span>{product.uses}</p>
              }
              {
                product.side_effects &&
                <p><span className='text-lg md:text-2xl font-semibold'>Side Effects : </span>{product.side_effects}</p>
              }
              {
                product.prescription_required &&
                <p><span className='text-lg md:text-2xl font-semibold'>Prescription Required: </span>{product.prescription_required ? "Yes!" : "No!"}</p>
              }
            </div>
            <div>
              <div className="max-w-sm p-4 ">
                {/* Quantity Selector */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <button
                    onClick={handleDecrease}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-xl"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{editQuantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-xl"
                  >
                    +
                  </button>
                  {
                    quantity ?
                      quantity == editQuantity ?
                        <button onClick={handleCart} className="w-full max-w-[231px]  bg-black text-white py-3 rounded-lg text-center font-medium">
                          In Your Cart
                        </button>
                        :
                        <button onClick={handleCart} className="w-full max-w-[231px]  bg-black text-white py-3 rounded-lg text-center font-medium">
                          Edit Cart
                        </button>
                      :
                      <button onClick={handleCart} className="w-full max-w-[231px]  bg-black text-white py-3 rounded-lg text-center font-medium">
                        Add To Cart
                      </button>

                  }
                  {/* <button className="w-full max-w-[231px]  bg-black text-white py-3 rounded-lg text-center font-medium">
                    Add to Cart
                  </button> */}
                </div>

                {/* Buttons */}
                <div className="flex flex-col space-y-4 mb-6">
                  <button className="w-full border border-black text-black py-3 rounded-lg text-center font-medium">
                    Buy Now
                  </button>
                </div>

                {/* Shipping Info */}
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.1168 14.5H14.2001C15.3918 14.5 16.3668 13.6 16.3668 12.5V2.5H6.61676C4.99176 2.5 3.5726 3.32999 2.83594 4.54999" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.2832 17.5C2.2832 19.16 3.73487 20.5 5.5332 20.5H6.61654C6.61654 19.4 7.59154 18.5 8.7832 18.5C9.97487 18.5 10.9499 19.4 10.9499 20.5H15.2832C15.2832 19.4 16.2582 18.5 17.4499 18.5C18.6415 18.5 19.6165 19.4 19.6165 20.5H20.6999C22.4982 20.5 23.9499 19.16 23.9499 17.5V14.5H20.6999C20.104 14.5 19.6165 14.05 19.6165 13.5V10.5C19.6165 9.95 20.104 9.5 20.6999 9.5H22.0973L20.2449 6.51001C19.8549 5.89001 19.1399 5.5 18.3599 5.5H16.3665V12.5C16.3665 13.6 15.3915 14.5 14.1999 14.5H13.1165" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.78385 22.5C9.98047 22.5 10.9505 21.6046 10.9505 20.5C10.9505 19.3954 9.98047 18.5 8.78385 18.5C7.58724 18.5 6.61719 19.3954 6.61719 20.5C6.61719 21.6046 7.58724 22.5 8.78385 22.5Z" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17.4499 22.5C18.6465 22.5 19.6165 21.6046 19.6165 20.5C19.6165 19.3954 18.6465 18.5 17.4499 18.5C16.2533 18.5 15.2832 19.3954 15.2832 20.5C15.2832 21.6046 16.2533 22.5 17.4499 22.5Z" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M23.9505 12.5V14.5H20.7005C20.1047 14.5 19.6172 14.05 19.6172 13.5V10.5C19.6172 9.95 20.1047 9.5 20.7005 9.5H22.098L23.9505 12.5Z" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.2832 8.5H8.7832" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.2832 11.5H6.61654" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.2832 14.5H4.44987" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span>Free worldwide shipping on all orders over $100</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.375 10.5315L13.1167 13.8573L18.815 10.5532" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.1172 19.7506V13.8464" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.7736 7.31409L8.30696 9.24242C7.52696 9.67576 6.87695 10.7699 6.87695 11.6691V15.3416C6.87695 16.2408 7.51613 17.3349 8.30696 17.7683L11.7736 19.6966C12.5103 20.1083 13.7236 20.1083 14.4711 19.6966L17.9378 17.7683C18.7178 17.3349 19.3678 16.2408 19.3678 15.3416V11.6583C19.3678 10.7591 18.7286 9.66492 17.9378 9.23159L14.4711 7.30326C13.7236 6.89159 12.5103 6.89159 11.7736 7.31409Z" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M23.9505 16.75C23.9505 20.9425 20.5597 24.3333 16.3672 24.3333L17.5047 22.4375" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.2832 10.2501C2.2832 6.05758 5.67404 2.66675 9.86654 2.66675L8.72905 4.56258" stroke="#B9B9B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span>
                      Delivers in: 3-7 Working Days{" "}
                      <a
                        href="#"
                        className="underline text-black hover:text-gray-800"
                      >
                        Shipping & Return
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    {/* reviews */}
    <div className="reviews py-14 bg-slate-200 lg:px-20 p-2 ">
      <p className='text-3xl font-semibold mb-9'>Reviews</p>
      {
      !reviews && 
      <p>No Reviws Yet</p>
      }
      {
        reviews &&
        reviews.map((review, index) => (
          <div key={index} className="card border border-slate-600 shadow-sm p-2 rounded-xl my-3">
            <div className='flex justify-between'>
              <p className='font-semibold mb-2 text-xl'>{review.username} </p>
              <div>{reviewRating(index)}</div>
            </div>
            <p>{review.review}</p>
          </div>
        ))
      }
    </div>


    {/* similar products */}


    <Footer />

  </>

}

export default ProductDetails