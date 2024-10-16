import React from 'react'
import { Link } from 'react-router-dom';
const ProductCard = ({products}) => {

  return <>
  <div className='gap-3 my-3 flex justify-center
   flex-wrap '>
                        {
                           products.map((product) => (
                                <Link to={`/ProductDetails/${product._id}`} className='card text-xs inline-block min-w-[100px] m-12' key={product._id}>
                                    <img src={product.imageUrl} className='lg:h-[130px] m-auto lg:w-[100px] h-[90px] w-[65px] ' alt={product.name} />
                                    <p className='text-black'>{product.name}</p>

                                    <div className='flex justify-between'>
                                        <p>
                                        ₹{product.price}
                                        </p>
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.5 0V13M0 6.5H13" stroke="#A58F83" />
                                        </svg>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
  
</>

}

export default ProductCard;