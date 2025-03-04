import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Thankyou =  () => {
  // const handleFile = async (e)=>{
  //   const image = e.target.files[0]
  //   const formData = new FormData();
  //   formData.append('image', image);
  //   try{
  //     await axios.put("http://127.0.0.1:8000/api/products/edit/11",formData)
  //   }catch(error){
  //     console.error(error)
  //   }
  //   console.log(image)
// }  

return <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md text-center">
        {/* Title */}
        <h2 className="md:text-3xl text-2xl font-semibold text-gray-800 ">
          Order Placed
        </h2>
        
        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base my-8 mb-10">
          
          Your order has been confirmed & it is on the way. To see detailed
          status, track your order from the profile.
        </p>
        
        {/* Button */}
        <Link to="/" className="bg-black text-white py-3 px-5 rounded-full hover:bg-gray-800 ">
          Go To Homepage
        </Link>
      </div>
    </div>
  </>
}

export default Thankyou