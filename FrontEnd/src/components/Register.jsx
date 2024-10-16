import React from 'react';
import NavBar from './NavBar';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(password!=confirmPassword){
      alert("Password not matched")
    }
    else if(password.length<6){
      alert("The Password should be minimum 6 characters")
    }
    else{
      alert("Login Success")
    }
    // Here you would typically submit the form data to your backend
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
    <NavBar/>
    <img src="./src/assets/slider-bg.jpg" alt="" className='absolute top-0 z-[-1] lg:h-[100dvh] w-[100dvw] object-cover left-0'/>

    <div className="flex items-center justify-start min-h-screen p-2 lg:p-20">
      <div className="px-8 py-6 mx-4 mt-4 text-left  shadow-lg rounded-lg lg:w-1/3">
        <div className="font-bold text-2xl mb-2">Hey, Welcome to MedsCorner</div>
        <p className="text-gray-600 text-sm mb-4" >
          Already have an account ? 
          <p className="underline text-blue-500 inline">
          <NavLink to="/Login" activeClassName="active"> Log in</NavLink>
            
          </p>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
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
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter 6 character or more"
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
              id="password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Enter 6 character or more"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
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
              LOGIN
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