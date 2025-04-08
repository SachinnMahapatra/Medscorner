import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import { Search, ChevronLeft, Filter, SortAsc, SortDesc, Tag, DollarSign } from "lucide-react";

const Productlist = () => {
  const id = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (search.trim() === '') {
      setSearchResult(null);
      return;
    }
    const arr = products.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) || 
      product.uses.toLowerCase().includes(search.toLowerCase()) || 
      product.compositions.toLowerCase().includes(search.toLowerCase()) || 
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(arr);
  }, [search, products]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
    setActiveCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  useEffect(() => {
    filterByCategory(id.id);
    if (id.id) {
      setActiveCategory(id.id);
    }
  }, [products, id.id]);

  // Filter products by price range
  const filterByPriceRange = (range) => {
    setPriceRange(range);
    const [min, max] = range.split("-").map(Number);
    setFilteredProducts(products.filter((product) => 
      product.price >= min && 
      product.price <= max && 
      (activeCategory === "all" || product.category === activeCategory)
    ));
  };

  // Sort products by price
  const sortProducts = (order) => {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <NavBar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-white hover:text-blue-200 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              <span>Back</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold">{id.id === "all" ? "All Products" : id.id}</h1>
          <p className="mt-2 text-blue-100">Find the best healthcare products for your needs</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Search for products..." 
                value={search} 
                onChange={handleSearch} 
              />
            </div>
            
            {searchResult && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="search border border-gray-200 mt-2 rounded-xl p-2 overflow-y-auto bg-white shadow-lg max-h-[250px] z-10 relative"
              >
                {searchResult.map((product) => (
                  <Link 
                    to={`/ProductDetails/${product.id}`} 
                    key={product.id} 
                    className="flex justify-between items-center p-3 hover:bg-blue-50 transition-colors border-b border-gray-100 rounded-lg"
                  >
                    <p className="text-gray-800 font-medium">{product.name}</p>
                    <ChevronLeft className="transform rotate-180 text-blue-600" size={18} />
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center justify-center w-full py-2 bg-gray-100 rounded-lg border border-gray-300"
          >
            <Filter size={16} className="mr-2" />
            <span>{mobileFiltersOpen ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside 
            className={`md:w-1/4 ${mobileFiltersOpen ? 'block' : 'hidden'} md:block bg-white rounded-xl shadow-md p-6 h-fit`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="font-bold text-lg mb-4 flex items-center">
                <Tag size={18} className="mr-2 text-blue-600" />
                Categories
              </h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => filterByCategory("all")}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                      activeCategory === "all" 
                        ? "bg-blue-100 text-blue-800 font-medium" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => filterByCategory(category)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                        activeCategory === category 
                          ? "bg-blue-100 text-blue-800 font-medium" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-4 flex items-center">
                <DollarSign size={18} className="mr-2 text-blue-600" />
                Price Range
              </h2>
              <ul className="space-y-2">
                {["0-20", "20-50", "50-100", "100-200", "200-500"].map((range) => (
                  <li key={range}>
                    <button
                      onClick={() => filterByPriceRange(range)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                        priceRange === range 
                          ? "bg-blue-100 text-blue-800 font-medium" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      ${range.split("-")[0]} - ${range.split("-")[1]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="md:w-3/4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </h2>
              <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                <span className="text-gray-600 text-sm mr-2 pl-2">Sort by:</span>
                <button
                  onClick={() => sortProducts("asc")}
                  className={`flex items-center px-3 py-1 rounded ${
                    sortOrder === "asc" ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <SortAsc size={16} className="mr-1" />
                  Price: Low to High
                </button>
                <button
                  onClick={() => sortProducts("desc")}
                  className={`flex items-center px-3 py-1 rounded ml-1 ${
                    sortOrder === "desc" ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <SortDesc size={16} className="mr-1" />
                  Price: High to Low
                </button>
              </div>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeIn}>
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xl mb-2">No products found</p>
                    <p>Try adjusting your filters or search terms</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Productlist;
