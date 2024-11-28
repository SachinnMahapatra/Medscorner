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

  // useEffect(() => {
  //   console.log(searchResult)
  // }, [searchResult])

  const handleSearch = (e) => {
    setSearch(e.target.value)

  }
  const submitSearch = () => {
    console.log("search")
  }
  // bg-slate-400
  return <>
    <NavBar />
    <div className="hero p-2 md:h-[100dvh] h-fit ">
      <img src="../src/assets/slider-bg.jpg" alt="" className='absolute top-0 z-[-1] h-[450px] md:h-[100dvh] w-[100dvw] object-cover left-0' />
      <h2 className="text-5xl font-extrabold text-center mt-28">MedsCorner</h2>
      <p className='text-center max-w-[750px] m-auto mt-7'>Welcome to "MedsCorner" - Your Trusted Online Medical Store
        <br />
        <span className='text-2xl font-bold'>
          "Buy with confidence, care delivered to your door"
        </span>

      </p>



      <label className="flex items-center w-fit m-auto input input-bordered rounded-full border-red-700 border-2 px-2 py-1 mt-7 bg-white mb-2">
        <input type="text" className="inline max-w-60 h-max " placeholder="Search" value={search} onChange={handleSearch} />
        <img src="./src/assets/search.svg" alt="oo" className='inline' onClick={submitSearch} />
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
                  <path d="M16.5 7.5L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M8 6.18791C8 6.18791 16.0479 5.50949 17.2692 6.73079C18.4906 7.95209 17.812 16 17.812 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </Link>

            ))
          }
          


        </div>
      }
      </div>

      <div className="featured lg:p-20 mt-11 p-2">
        <div className="flex justify-between items-center">
          <span><p className='text-3xl font-bold py-2'>Featured Products</p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde repudiandae facilis laudantium!</span>
          <NavLink to="/productlist" className='rounded-full inline-block text-center content-center bg-black text-white text-lg w-60 h-14'>View All <img src="./src/assets/right.svg" alt=">" className='inline' /></NavLink>
        </div>
        <div className='flex gap-3 mt-9 overflow-scroll scroll-smooth no-scrollbar md:scroll-auto md:flex-wrap md:justify-center  md:max-h-[800px] md:overflow-hidden'>

          {/* {

          products && products.map((p) => (
            <div className="card shrink-0">
              <img src={`http://127.0.0.1:8000/${p.image}`} alt="" className='h-[20vh]  w-[25vw] md:h-[320px] md:w-[260px] object-cover rounded-lg' />
              <p className="title pl-2">{p.name}</p>
              <p className="price pl-2">₹{p.price}</p>
            </div>
          ))

        } */}
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

          <div className="card shrink-0 relative rounded-lg cursor-pointer">
            <img src='./src/assets/generalMedical.jpg' alt="" className='h-[30vh]  w-[30vw] md:h-[513px] md:w-[390px] object-cover rounded-xl' />
            <p className="title absolute bottom-1 left-1 text-xl font-bold">GENERAL MEDICINES</p>
          </div>


          <div className="mid">
            <div className="card shrink-0 relative rounded-lg cursor-pointer">
              <img src='./src/assets/baby.jpg' alt="" className='h-[14vh]  w-[30vw] md:h-[250px] md:w-[390px] object-cover rounded-xl' />
              <p className="title absolute top-1 left-1 text-xl font-bold">BABY CARE</p>
            </div>

            <div className="card shrink-0 relative rounded-lg cursor-pointer">
              <img src='./src/assets/hairCare.jpeg' alt="" className='h-[14vh]  w-[30vw] md:h-[250px] md:w-[390px] object-cover rounded-xl mt-[2vh]' />
              <p className="title absolute top-1 left-1 text-xl font-bold">Hair Care</p>
            </div>
          </div>

          <div className="card shrink-0 relative rounded-lg cursor-pointer">
            <img src='./src/assets/body.jpg' alt="" className='h-[30vh]  w-[30vw] md:h-[513px] md:w-[390px] object-cover rounded-xl' />
            <p className="title absolute bottom-1 left-1 text-xl font-bold">SKIN CARE</p>
          </div>
        </div>

      </div>

      <div className="popular_products p-2 lg:p-20">

        <div className="flex justify-between items-center">
          <span><p className='text-3xl font-bold py-2'>Most Popular Products</p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde repudiandae facilis laudantium!</span>
          <NavLink to="/productlist" className='rounded-full inline-block text-center content-center bg-black text-white text-lg w-60 h-14'>View All <img src="./src/assets/right.svg" alt=">" className='inline' /></NavLink>
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

      <div className="promo">

        promo coming soon
      </div>


      <Faq />




      <Footer />
    </>

}

    export default Homepage;
