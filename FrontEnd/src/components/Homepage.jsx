import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Faq from './Faq';

const products = [
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
  {
    name: "product name",
    price: "$100",
    image: "./src/assets/hero.jpg"
  },
]


function Homepage() {
  // bg-slate-400
  return <>
    <div className="hero  p-2 lg:h-[100dvh]">
      <NavBar />
    <img src="./src/assets/slider-bg.jpg" alt="" className='absolute top-0 z-[-1] lg:h-[100dvh] w-[100dvw] object-cover left-0'/>
      <h2 className="text-5xl font-extrabold text-center mt-28">MedsCorner</h2>
      <p className='text-center max-w-[750px] m-auto mt-7'>Welcome to "MedsCorner" - Your Trusted Online Medical Store
<br/>
<p className='text-2xl font-bold'>
"Buy with confidence, care delivered to your door"
</p>

</p>

      <label className="flex items-center w-fit m-auto input input-bordered rounded-full border-red-700 border-2 px-2 py-1 mt-7 bg-white mb-28">
        <input type="text" className="inline max-w-60 h-max " placeholder="Search" />
        <img src="./src/assets/search.svg" alt="oo" className='inline' />
      </label>
    </div>

    <div className="featured lg:p-20 mt-11 p-2">
      <h3 className='text-3xl font-bold'>Featured Products</h3>

      <div className='flex gap-3 mt-9 overflow-auto scroll-smooth no-scrollbar md:scroll-auto md:flex-wrap justify-center'>

        {
          products.map((p) => (
            <div className="card shrink-0">
              <img src={p.image} alt="" className='h-[20vh]  w-[25vw] md:h-[320px] md:w-[260px] object-cover rounded-lg' />
              <p className="title pl-2">{p.name}</p>
              <p className="price pl-2">{p.price}</p>
            </div>
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
        <p><h3 className='text-3xl font-bold py-2'>Most Popular Products</h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde repudiandae facilis laudantium!</p>
        <button className='rounded-full bg-black text-white text-lg w-60 h-14'>View All <img src="./src/assets/right.svg" alt=">" className='inline' /></button>
      </div>
      <div className='flex gap-3 mt-9 overflow-auto scroll-smooth no-scrollbar md:scroll-auto md:flex-wrap justify-center'>

        {
          products.map((p) => (
            <div className="card shrink-0">
              <img src={p.image} alt="" className='h-[20vh]  w-[25vw] md:h-[320px] md:w-[260px] object-cover rounded-lg' />
              <p className="title pl-2">{p.name}</p>
              <p className="price pl-2">{p.price}</p>
            </div>
          ))
        }

      </div>

    </div>

<div className="promo">

  promo coming soon
</div>


<Faq/>




<Footer/>
  </>

}

export default Homepage;
