import React, { useEffect, useState } from 'react';
import ProductCard from "./ProductCard";
import NavBar from "./NavBar";
import axios from 'axios';


function Productlist() {

  // const necklaces = products.filter((product) => product.category === "Necklace");

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        // console.log(response)
        if (!response.status == 200) {
          throw new Error('Failed to fetch products');
        }

        setProducts(response.data);
        setFeaturedProducts(response.data.slice(0,12));
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <NavBar />
      product list is to ready yet
      <div className='flex gap-3 mt-9 overflow-scroll scroll-smooth no-scrollbar md:scroll-auto md:flex-wrap md:justify-center  md:overflow-hidden'>

      {
          products && products.map((product)=>(
            <ProductCard product={product}/>
          ))
        }
        </div>
      
    </>
  );
}

export default Productlist;