import { useState } from 'react'
import './App.css'
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from './components/Homepage'
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import OrderHistory from './components/OrderHistory';
import ProductDetails from './components/ProductDetails';
import Productlist from './components/Productlist';
import Profile from './components/Profile';
import Register from './components/Register';
import Thankyou from './components/Thankyou';


function App() {
  


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Homepage />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/OrderHistory" element={<OrderHistory />} />
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      <Route path="/Productlist" element={<Productlist />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Thankyou" element={<Thankyou />} />
      

      
      {/* errorElement={<Errorpage errorCode={404} />} */}
        {/* <Route
          path="/"
          element={<MainContainer />}
          errorElement={<Errorpage errorCode={400} />}
          /> */}
        
        </>
      
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    
    </>
  )
}

export default App
