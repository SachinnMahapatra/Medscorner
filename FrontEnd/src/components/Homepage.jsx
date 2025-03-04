import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Faq from './Faq';
import axios from 'axios';
import ProductCard from './ProductCard';
import { NavLink, Link } from 'react-router-dom';



function Homepage() {

  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        // console.log(response)
        if (!response.status == 200) {
          throw new Error('Failed to fetch products');
        }

        setProducts(response.data);
        setFeaturedProducts(response.data.slice(0, 12));
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() == '') {
      setSearchResult()
      return
    }
    let arr = []
    products.forEach((product) => {
      let sr = search.trim().toLowerCase()
      if (product.name.toLowerCase().includes(sr) || product.uses.toLowerCase().includes(sr) || product.compositions.toLowerCase().includes(sr) || product.description.toLowerCase().includes(sr)) {
        // console.log(product)
        arr.push(product)
      }
    })
    setSearchResult(arr)
    // console.log(arr)
  }, [search])


  const handleSearch = (e) => {
    setSearch(e.target.value)

  }
  const submitSearch = () => {
    console.log("search")
  }
  
  return <>
    <NavBar />
    <div className="hero p-2 md:h-[100dvh] h-fit ">
      <img src="../src/assets/header.jpg" alt="" className='absolute top-0 z-[-1] h-[450px] md:h-[100dvh] w-[100dvw] object-cover left-0' />
      <h2 className="text-5xl font-extrabold text-center mt-28">MedsCorner</h2>
      <p className='text-center max-w-[750px] m-auto mt-7'>Welcome to "MedsCorner" - Your Trusted Online Medical Store
        <br />
        <span className='text-2xl font-bold'>
          "Buy with confidence, care delivered to your door"
        </span>

      </p>



      <label className="flex items-center w-fit m-auto input input-bordered rounded-full border-gray-400 border-2 px-2 py-1 mt-7 bg-white mb-2">
        <input type="text" className="inline max-w-60 h-max outline-none" placeholder="Search" value={search} onChange={handleSearch} />
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="#282828" />
          <path d="M27.25 27.25L23.8855 23.8795M25.75 19.375C25.75 21.0658 25.0784 22.6873 23.8828 23.8828C22.6873 25.0784 21.0658 25.75 19.375 25.75C17.6842 25.75 16.0627 25.0784 14.8672 23.8828C13.6716 22.6873 13 21.0658 13 19.375C13 17.6842 13.6716 16.0627 14.8672 14.8672C16.0627 13.6716 17.6842 13 19.375 13C21.0658 13 22.6873 13.6716 23.8828 14.8672C25.0784 16.0627 25.75 17.6842 25.75 19.375Z" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </label>
      {
        searchResult &&
        <div className='search border border-neutral-500 md:h-[250px] md:w-[550px] m-auto rounded-xl p-2 overflow-y-auto'>
          {
            searchResult &&
            searchResult.map((product) => (

              <Link to={`/ProductDetails/${product.id}`} key={product.id} className="flex justify-between border lg:h-fit max-h-[26px] overflow-hidden ">

                <p>{product.name}
                </p>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="26" color="#000000" fill="none">
                  <path d="M16.5 7.5L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 6.18791C8 6.18791 16.0479 5.50949 17.2692 6.73079C18.4906 7.95209 17.812 16 17.812 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              </Link>

            ))
          }



        </div>
      }
    </div>

    <div className="featured lg:p-20 mt-11 p-2">
      <div className="flex justify-between items-center">
        <span><p className='text-3xl font-bold py-2'>Featured Products</p>View our range of featured products!</span>
        <NavLink to="/productlist/all" className='rounded-full inline-block text-center content-center bg-black text-white text-lg w-60 h-14'>View All <img src="./src/assets/right.svg" alt=">" className='inline' /></NavLink>
      </div>
      <div className='flex gap-3 mt-9 overflow-scroll scroll-smooth no-scrollbar md:scroll-auto md:flex-wrap md:justify-center  md:max-h-[800px] md:overflow-hidden'>

        
        {
          featuredProducts && featuredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        }
      </div>

    </div>

    <div className="category p-2 my-11 ">
      <h3 className='text-3xl font-bold text-center'>View our Range of Categories</h3>
      <p className='max-w-[750px] m-auto mt-7 text-center'> </p>

      <div className="cards flex gap-3 md:gap-11 justify-center mt-9">

        <Link to="/productlist/General medicine" className="card shrink-0 relative rounded-lg cursor-pointer">
          <img src='./src/assets/generalMedical.jpg' alt="" className='h-[30vh]  w-[30vw] md:h-[513px] md:w-[390px] object-cover rounded-xl' />
          <p className="title absolute bottom-1 left-1 text-xl font-bold">GENERAL MEDICINES</p>
        </Link>


        <div  className="mid">
          <Link to="/productlist/Baby care products" className="card shrink-0 relative rounded-lg cursor-pointer">
            <img src='./src/assets/baby.jpg' alt="" className='h-[14vh]  w-[30vw] md:h-[250px] md:w-[390px] object-cover rounded-xl' />
            <p className="title absolute top-1 left-1 text-xl font-bold">BABY CARE</p>
          </Link>

          <Link to="/productlist/Hair Care Products" className="card shrink-0 relative rounded-lg cursor-pointer">
            <img src='./src/assets/hairCare.jpeg' alt="" className='h-[14vh]  w-[30vw] md:h-[250px] md:w-[390px] object-cover rounded-xl mt-[2vh]' />
            <p className="title absolute top-3 left-1 text-xl font-bold">Hair Care</p>
          </Link>
        </div>

        <Link to="/productlist/Skin Care Products" className="card shrink-0 relative rounded-lg cursor-pointer">
          <img src='./src/assets/body.jpg' alt="" className='h-[30vh]  w-[30vw] md:h-[513px] md:w-[390px] object-cover rounded-xl' />
          <p className="title absolute bottom-1 left-1 text-xl font-bold">SKIN CARE</p>
        </Link>
      </div>

    </div>

    <div className="popular_products p-2 lg:p-20">

      <div className="flex justify-between items-center">
        <span><p className='text-3xl font-bold py-2'>Most Popular Products</p>View our range of most popular products!</span>
        <NavLink to="/productlist/all" className='rounded-full inline-block text-center content-center bg-black text-white text-lg w-60 h-14'>View All <img src="./src/assets/right.svg" alt=">" className='inline' /></NavLink>
      </div>

      <div className='flex gap-3 mt-9 overflow-auto scroll-smooth no-scrollbar md:scroll-auto md:flex-wrap md:justify-center md:max-h-[800px] md:overflow-hidden'>

        {
          products && products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        }

        {/* <ProductCard products={products} /> */}
      </div>

    </div>

    {/* <div className="promo">

      promo coming soon
    </div> */}

    <Faq />
    <Footer />
  </>

}

export default Homepage;
