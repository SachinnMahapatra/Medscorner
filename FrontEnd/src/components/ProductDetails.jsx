import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from './NavBar';

function ProductDetails() {
  const { id } = useParams(); // Extract ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulate fetching product data by ID
    const fetchProductById = async (id) => {
      // Mock API call or replace with actual API call
      const productList = [
        {
            _id: "66af920396f3e335bcf27d5a",
            name: "Initial Pendant",
            price: 100,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/JfOPe1722762785.jpg",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af921b96f3e335bcf27d5c",
            name: "Heart Drop",
            price: 200,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/AQ9iF1722763463.jpg",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af924496f3e335bcf27d5e",
            name: "Diamond Choker",
            price: 300,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/eSgnC1722763579.jpg",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af927296f3e335bcf27d61",
            name: "Opal Heart",
            price: 250,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/ivEG51722765100.jpg",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af927296f3e335bcf27d60",
            name: "Leaf Pendant",
            price: 330,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/WHYYZ1722764559.jpg",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af92a296f3e335bcf27d65",
            name: "Lariat",
            price: 300,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/M6T021722776532.png",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af92a296f3e335bcf27d64",
            name: "Interlocking Gold",
            price: 250,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/t7Lmr1722776402.png",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af931c96f3e335bcf27d68",
            name: "Tag Pendant",
            price: 350,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/avrTu1722776727.png",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af937696f3e335bcf27d6a",
            name: "Flora Pendant",
            price: 350,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/Way0q1722776828.png",
            category: "Necklace",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af949896f3e335bcf27d6d",
            name: "Mini Hoops",
            price: 200,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/jc9va1722777303.png",
            category: "Earings",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af949896f3e335bcf27d6c",
            name: "Diamond Studs",
            price: 150,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/snaZ51722777177.png",
            category: "Earings",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af949896f3e335bcf27d70",
            name: "Chain Drops",
            price: 200,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/tnLjY1722777777.png",
            category: "Earings",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af949896f3e335bcf27d72",
            name: "Spherical Drops",
            price: 300,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/AWghE1722777992.png",
            category: "Earings",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af949896f3e335bcf27d71",
            name: "Star Bundle Studs",
            price: 300,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/NpJzX1722777896.png",
            category: "Earings",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af949896f3e335bcf27d73",
            name: "Chained Studs",
            price: 100,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/u1rFR1722778099.png",
            category: "Earings",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af949896f3e335bcf27d6f",
            name: "Leaf Studs",
            price: 230,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/R5ERQ1722777649.png",
            category: "Earings",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af949896f3e335bcf27d6e",
            name: "Dangling Leaves",
            price: 250,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/RyxQu1722777533.png",
            category: "Earings",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af952d96f3e335bcf27d7d",
            name: "Thin Chain",
            price: 100,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/b7gOj1722779042.png",
            category: "Bracelets",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af952d96f3e335bcf27d7f",
            name: "Flora Chain",
            price: 250,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/1cr4K1722779202.png",
            category: "Bracelets",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af952d96f3e335bcf27d7c",
            name: "Chained Cuff",
            price: 250,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/3r7dr1722778962.png",
            category: "Bracelets",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af952d96f3e335bcf27d7e",
            name: "Leafy Chain",
            price: 200,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/N05tJ1722779116.png",
            category: "Bracelets",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
          {
            _id: "66af952d96f3e335bcf27d80",
            name: "Arrow Cuff",
            price: 260,
            description: "Gold Plated",
            imageUrl: "https://i.imghippo.com/files/BUI4E1722779279.png",
            category: "Bracelets",
            quantity: 19,
            rating: 4,
            __v: 0,
          },
        // Add more products as needed
      ];
      return productList.find(product => product._id === id);
    };

    if (id) {
      fetchProductById(id).then(product => {
        console.log(`Fetched product with ID: ${id}`);
        setProduct(product);
      });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

    return (
        <>
            <NavBar />

            <div className='flex md:flex-row flex-col mt-[100px] w-full md:w-[80vw] mx-auto'>
                <img src={product.imageUrl} alt={product.name} className='w-[90vw] md:w-[40%] mx-auto' />

                <div className='w-full md:w-[60%] px-9'>
                    <p>Back To Selection</p>

                    <div className='flex justify-between w-full mt-5'>
                        <p className='text-xl'>{product.name}</p>
                        <svg width="35" height="37" viewBox="0 0 35 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_389_1046)">
                                <path d="M31.3506 10.2473C30.8663 9.12586 30.1679 8.10963 29.2946 7.25549C28.4207 6.39881 27.3903 5.71801 26.2595 5.25012C25.0869 4.76303 23.8292 4.5137 22.5595 4.51663C20.7781 4.51663 19.0401 5.00442 17.5298 5.92581C17.1685 6.14622 16.8252 6.38831 16.5 6.65208C16.1748 6.38831 15.8315 6.14622 15.4702 5.92581C13.9599 5.00442 12.2219 4.51663 10.4405 4.51663C9.15781 4.51663 7.91484 4.76233 6.74053 5.25012C5.60596 5.71985 4.5834 6.39553 3.70537 7.25549C2.83095 8.10867 2.13243 9.12514 1.64941 10.2473C1.14717 11.4144 0.890625 12.6537 0.890625 13.9292C0.890625 15.1324 1.13633 16.3863 1.62412 17.6617C2.03242 18.7277 2.61777 19.8333 3.36572 20.9498C4.55088 22.7167 6.18047 24.5595 8.20391 26.4276C11.557 29.5241 14.8776 31.6632 15.0186 31.7499L15.8749 32.2991C16.2543 32.5412 16.7421 32.5412 17.1215 32.2991L17.9778 31.7499C18.1188 31.6596 21.4357 29.5241 24.7925 26.4276C26.8159 24.5595 28.4455 22.7167 29.6307 20.9498C30.3786 19.8333 30.9676 18.7277 31.3723 17.6617C31.8601 16.3863 32.1058 15.1324 32.1058 13.9292C32.1094 12.6537 31.8528 11.4144 31.3506 10.2473ZM16.5 29.441C16.5 29.441 3.63672 21.1991 3.63672 13.9292C3.63672 10.2473 6.68271 7.26272 10.4405 7.26272C13.0818 7.26272 15.3727 8.73694 16.5 10.8905C17.6273 8.73694 19.9182 7.26272 22.5595 7.26272C26.3173 7.26272 29.3633 10.2473 29.3633 13.9292C29.3633 21.1991 16.5 29.441 16.5 29.441Z" fill="#656565" fillOpacity="0.84" />
                            </g>
                            <defs>
                                <clipPath id="clip0_389_1046">
                                    <rect width="35" height="37" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <p>₹{product.price}</p>
                    <p>{product.desc}</p>
                    <p className='border-black btn text-sm my-5 rounded-xl w-fit'>ADD TO BAG</p>

                    <p className='border-black btn text-sm my-5 rounded-xl w-fit ml-2 '>
                        <Link to={`/checkout/${id}`}>
                        BUY NOW
                        </Link>
                        </p>

                    <div className='flex justify-between mt-3'>
                        <p>Details</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.29 5.71022C17.1975 5.61752 17.0876 5.54397 16.9666 5.49379C16.8456 5.44361 16.7159 5.41778 16.585 5.41778C16.454 5.41778 16.3243 5.44361 16.2034 5.49379C16.0824 5.54397 15.9725 5.61752 15.88 5.71022L12 9.58022L8.10998 5.70022C8.0174 5.60764 7.90749 5.5342 7.78652 5.4841C7.66556 5.43399 7.53591 5.4082 7.40498 5.4082C7.27405 5.4082 7.1444 5.43399 7.02344 5.4841C6.90247 5.5342 6.79256 5.60764 6.69998 5.70022C6.6074 5.79281 6.53396 5.90272 6.48385 6.02368C6.43375 6.14464 6.40796 6.27429 6.40796 6.40522C6.40796 6.53615 6.43375 6.6658 6.48385 6.78677C6.53396 6.90773 6.6074 7.01764 6.69998 7.11022L11.29 11.7002C11.68 12.0902 12.31 12.0902 12.7 11.7002L17.29 7.11022C17.3826 7.0187 17.4562 6.9097 17.5064 6.78954C17.5566 6.66938 17.5824 6.54045 17.5824 6.41022C17.5824 6.28 17.5566 6.15107 17.5064 6.03091C17.4562 5.91075 17.3826 5.80175 17.29 5.71022Z" fill="#191919" />
                        </svg>
                    </div>

                    <div className='flex justify-between'>
                        <p>Shipping & Returns</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.29 5.71022C17.1975 5.61752 17.0876 5.54397 16.9666 5.49379C16.8456 5.44361 16.7159 5.41778 16.585 5.41778C16.454 5.41778 16.3243 5.44361 16.2034 5.49379C16.0824 5.54397 15.9725 5.61752 15.88 5.71022L12 9.58022L8.10998 5.70022C8.0174 5.60764 7.90749 5.5342 7.78652 5.4841C7.66556 5.43399 7.53591 5.4082 7.40498 5.4082C7.27405 5.4082 7.1444 5.43399 7.02344 5.4841C6.90247 5.5342 6.79256 5.60764 6.69998 5.70022C6.6074 5.79281 6.53396 5.90272 6.48385 6.02368C6.43375 6.14464 6.40796 6.27429 6.40796 6.40522C6.40796 6.53615 6.43375 6.6658 6.48385 6.78677C6.53396 6.90773 6.6074 7.01764 6.69998 7.11022L11.29 11.7002C11.68 12.0902 12.31 12.0902 12.7 11.7002L17.29 7.11022C17.3826 7.0187 17.4562 6.9097 17.5064 6.78954C17.5566 6.66938 17.5824 6.54045 17.5824 6.41022C17.5824 6.28 17.5566 6.15107 17.5064 6.03091C17.4562 5.91075 17.3826 5.80175 17.29 5.71022Z" fill="#191919" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                {/* <Recommendation /> */}
            </div>
        </>
    );
}

export default ProductDetails;