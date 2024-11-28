import React from 'react';
import NavBar from './NavBar';
import { useState } from 'react';
import { NavLink,Navigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null)
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // return <Navigate replace to={"/"}/>
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return
    }
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true);
    if(formData.password1!==formData.password2){
      setError("Passwords do not match!")
      setIsLoading(false)
      return
    }
    if(formData.password1.length<7){
      setError("Password Must be atleast 8 characters!")
      setIsLoading(false)
      return
    }
    if(!formData.password1.includes('1','2','3','4','5','6','7','8','9','0')){
      setError("Password Must Include Atleast one digits!")
      setIsLoading(false)
      return
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/create", formData)
      console.log("Success!", response.data)
      setSuccessMessage("Registration Successful!")
      setTimeout(() => {
        
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

  return (
    <>
      <NavBar />
      {successMessage?<Navigate replace to={"/"}/>:<pre/>}
      
      
      <img src="./src/assets/slider-bg.jpg" alt="" className='absolute top-0 z-[-1] lg:h-[100dvh] w-[100dvw] object-cover left-0' />

      <div className="flex items-center justify-start min-h-screen p-2 lg:p-20">
        <div className="px-8 py-6 mx-4 mt-4 text-left  shadow-lg rounded-lg lg:w-1/3">
          <div className="font-bold text-2xl mb-2">Hey, Welcome to MedsCorner</div>
          <p className="text-gray-600 text-sm mb-4 inline-block" >
            Already have an account ?
          </p>
          <p className="underline text-blue-500 inline-block">
            <NavLink to="/Login" activeClassName="active"> Log in</NavLink>
          </p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
                type="text"
                name='username'
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter a unique username"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
                type="email"
                name='email'
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
                type="password"
                name='password1'
                required
                value={formData.password1}
                onChange={handleChange}
                placeholder="Enter 8 character or more"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
                type="password"
                name='password2'
                required
                value={formData.password2}
                onChange={handleChange}
                placeholder="Enter 8 character or more"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  
                  type="checkbox"
                  className="mr-2 leading-tight"
                />
                <label className="text-sm text-gray-600" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <a className="text-sm text-blue-500 hover:underline" href="#" >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-center mt-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                REGISTER
              </button>
            </div>
            {/* <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              or login with
            </p>
            <div className="flex justify-center mt-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <i className="fab fa-google mr-2"></i>Google
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
              >
                <i className="fab fa-facebook-f mr-2"></i>Facebook
              </button>
            </div>
          </div> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register