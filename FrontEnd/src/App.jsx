import { useState } from 'react'
import './App.css'
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  ScrollRestoration,
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
import About from './components/About';
import Faq from './components/Faq';
import Appointment from './components/appointment';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route 
        path="/" 
        element={
          <>
            <ScrollRestoration />
            <Homepage />
          </>
        } 
        errorElement={<ErrorBoundary />}
      />
      <Route 
        path="/About" 
        element={
          <>
            <ScrollRestoration />
            <About />
          </>
        }
      />
      <Route 
        path="/Cart" 
        element={
          <>
            <ScrollRestoration />
            <Cart />
          </>
        }
      />
      <Route 
        path="/Checkout/:id" 
        element={
          <>
            <ScrollRestoration />
            <Checkout />
          </>
        }
      />
      <Route 
        path="/Contact" 
        element={
          <>
            <ScrollRestoration />
            <Contact />
          </>
        }
      />
      <Route 
        path="/Faq" 
        element={
          <>
            <ScrollRestoration />
            <Faq />
          </>
        }
      />
      <Route 
        path="/Login" 
        element={
          <>
            <ScrollRestoration />
            <Login />
          </>
        }
      />
      <Route 
        path="/OrderHistory" 
        element={
          <>
            <ScrollRestoration />
            <OrderHistory />
          </>
        }
      />
      <Route 
        path="/ProductDetails/:id" 
        element={
          <>
            <ScrollRestoration />
            <ProductDetails />
          </>
        }
      />
      <Route 
        path="/Productlist/:id" 
        element={
          <>
            <ScrollRestoration />
            <Productlist />
          </>
        }
      />
      <Route 
        path="/Profile" 
        element={
          <>
            <ScrollRestoration />
            <Profile />
          </>
        }
      />
      <Route 
        path="/Register" 
        element={
          <>
            <ScrollRestoration />
            <Register />
          </>
        }
      />
      <Route 
        path="/Thankyou" 
        element={
          <>
            <ScrollRestoration />
            <Thankyou />
          </>
        }
      />
      <Route 
        path="/appointment" 
        element={
          <>
            <ScrollRestoration />
            <Appointment/>
          </>
        }
      />
      </>
    )
  );

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
