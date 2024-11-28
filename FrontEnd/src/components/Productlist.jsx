import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Link, useParams } from "react-router-dom";
import NavBar from "./NavBar";

const Productlist = () => {
  const id = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);



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

  useEffect(() => {
    // Fetch products and categories from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);

        // Assuming categories come from the API or extract them dynamically
        const categoryList = [...new Set(response.data.map((product) => product.category))];
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filterByCategory = (category) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  useEffect(()=>{
    filterByCategory(id.id);
  },[products])

  // Filter products by price range
  const filterByPriceRange = (range) => {
    setPriceRange(range);
    const [min, max] = range.split("-").map(Number);
    setFilteredProducts(products.filter((product) => product.price >= min && product.price <= max));
  };

  // Sort products by price
  const sortProducts = (order) => {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  return ( 
  <>
  <NavBar/>
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 p-4 border-b lg:border-b-0 lg:border-r">
        <div className="mb-6">
          <h2 className="font-bold mb-2">Categories</h2>
          <ul>
            <li>
              <button
                onClick={() => filterByCategory("all")}
                className="text-gray-700 hover:text-black"
                >
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => filterByCategory(category)}
                  className="text-gray-700 hover:text-black"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-bold mb-2">Price Range</h2>
          <ul>
            <li>
              <button
                onClick={() => filterByPriceRange("20-50")}
                className={`text-gray-700 hover:text-black ${
                  priceRange === "20-50" ? "font-bold" : ""
                }`}
              >
                $20.00 - $50.00
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4 p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Our Collection Of Products</h1>
          <div className="mt-4 sm:mt-0">
            <select
              value={sortOrder}
              onChange={(e) => sortProducts(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Sort By</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
         {/* -------------Search------------ */}
        <label className="flex justify-between items-center w-[90%] m-auto input input-bordered rounded-full border-gray-400 border-2 px-2 py-1 mt-7 bg-white mb-2">
        <input type="text" className="inline max-w-60 h-max outline-none" placeholder="Search" value={search} onChange={handleSearch} />
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="#282828"/>
<path d="M27.25 27.25L23.8855 23.8795M25.75 19.375C25.75 21.0658 25.0784 22.6873 23.8828 23.8828C22.6873 25.0784 21.0658 25.75 19.375 25.75C17.6842 25.75 16.0627 25.0784 14.8672 23.8828C13.6716 22.6873 13 21.0658 13 19.375C13 17.6842 13.6716 16.0627 14.8672 14.8672C16.0627 13.6716 17.6842 13 19.375 13C21.0658 13 22.6873 13.6716 23.8828 14.8672C25.0784 16.0627 25.75 17.6842 25.75 19.375Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
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
                  <path d="M16.5 7.5L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M8 6.18791C8 6.18791 16.0479 5.50949 17.2692 6.73079C18.4906 7.95209 17.812 16 17.812 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </Link>

))
}
          


        </div>
      }

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      </main>
    </div>
      </>
      );
};

export default Productlist;
