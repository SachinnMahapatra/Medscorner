import React from 'react'
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const ProductDetails = () => {
  const { id } = useParams(); // Extract ID from the URL
  return <>
  <NavBar/>
    <div>ProductDetails</div>
  </>
  
}

export default ProductDetails