import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Filter, Search, ShoppingCart, Heart, BookOpen, Package, GraduationCap } from 'lucide-react';
import { useApp } from '../hooks/useApp.js';
import BookService from '../services/BookService';

const CatalogView = () => {
  const navigate = useNavigate();
  const { addToCart, isAuthenticated } = useApp();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState('All');

  const categories = ['All', 'Books', 'Stationery', 'School Supplies'];
  const priceRanges = ['All', 'Under ₹200', '₹200-₹500', '₹500-₹1000', 'Above ₹1000'];

  // Mock data for non-book products
  const mockStationery = useMemo(() => [
    {
      id: 'stat_1',
      name: 'Premium Ball Pen Set',
      brand: 'Parker',
      category: 'Stationery',
      subcategory: 'Pens',
      price: 599,
      originalPrice: 799,
      rating: 4.7,
      reviews: 234,
      description: 'Smooth writing experience with premium ink',
      image: '/images/section/homeSection/BookSections/7.jpg',
      featured: true,
      inStock: true,
      productType: 'Stationery'
    },
    {
      id: 'stat_2',
      name: 'Spiral Notebook A4',
      brand: 'Oxford',
      category: 'Stationery',
      subcategory: 'Notebooks',
      price: 149,
      originalPrice: 199,
      rating: 4.3,
      reviews: 89,
      description: 'High-quality paper for smooth writing',
      image: '/images/section/homeSection/BookSections/8.jpg',
      featured: false,
      inStock: true,
      productType: 'Stationery'
    }
  ], []);

  const mockSchoolSupplies = useMemo(() => [
    {
      id: 'school_1',
      name: 'School Backpack Premium',
      brand: 'Nike',
      category: 'School Supplies',
      subcategory: 'Bags',
      price: 1299,
      originalPrice: 1599,
      rating: 4.5,
      reviews: 128,
      description: 'Comfortable and durable backpack perfect for school',
      image: '/images/section/homeSection/BookSections/9.jpg',
      featured: true,
      inStock: true,
      productType: 'School Supply'
    },
    {
      id: 'school_2',
      name: 'Geometry Box Set',
      brand: 'Camlin',
      category: 'School Supplies',
      subcategory: 'Mathematical Instruments',
      price: 299,
      originalPrice: 399,
      rating: 4.2,
      reviews: 85,
      description: 'Complete geometry set with compass, protractor, and ruler',
      image: '/images/section/homeSection/BookSections/10.jpg',
      featured: false,
      inStock: true,
      productType: 'School Supply'
    }
  ], []);

  const loadAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Load books from backend
      const books = await BookService.getAllBooks();
      
      // Normalize products to have consistent structure
      const normalizedBooks = books.map(book => ({
        ...book,
        productType: 'Book',
        name: book.title,
        brand: book.author,
        category: 'Books',
        subcategory: book.category,
        inStock: true
      }));

      const normalizedStationery = mockStationery.map(item => ({
        ...item,
        title: item.name,
        author: item.brand,
      }));

      const normalizedSchoolSupplies = mockSchoolSupplies.map(item => ({
        ...item,
        title: item.name,
        author: item.brand,
      }));

      const allProductsData = [
        ...normalizedBooks,
        ...normalizedStationery,
        ...normalizedSchoolSupplies
      ];

      setAllProducts(allProductsData);
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to mock data only
      const allProductsData = [
        ...mockStationery,
        ...mockSchoolSupplies
      ];
      setAllProducts(allProductsData);
    } finally {
      setLoading(false);
    }
  }, [mockStationery, mockSchoolSupplies]);

  const filterProducts = useCallback(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.title || product.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.author || product.brand).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.subcategory || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== 'All') {
      switch (priceRange) {
        case 'Under ₹200':
          filtered = filtered.filter(product => product.price < 200);
          break;
        case '₹200-₹500':
          filtered = filtered.filter(product => product.price >= 200 && product.price <= 500);
          break;
        case '₹500-₹1000':
          filtered = filtered.filter(product => product.price > 500 && product.price <= 1000);
          break;
        case 'Above ₹1000':
          filtered = filtered.filter(product => product.price > 1000);
          break;
        default:
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
        break;
      default: // popularity
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    setFilteredProducts(filtered);
  }, [allProducts, selectedCategory, searchTerm, sortBy, priceRange]);

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const getProductIcon = (productType) => {
    switch (productType) {
      case 'Book':
        return <BookOpen className="w-4 h-4" />;
      case 'Stationery':
        return <Package className="w-4 h-4" />;
      case 'School Supply':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const ProductCard = ({ product }) => (
    <div 
      onClick={() => navigate(`/books/${product.id}`, { state: { product } })}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title || product.name}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/200x200/6B7280/white?text=${encodeURIComponent((product.title || product.name).slice(0, 8))}`;
          }}
        />
        
        {/* Product Type Badge */}
        <span className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-xs font-semibold rounded flex items-center">
          {getProductIcon(product.productType)}
          <span className="ml-1">{product.productType}</span>
        </span>
        
        {/* Special Badges */}
        {product.isBestseller && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            Bestseller
          </span>
        )}
        {product.isNewArrival && (
          <span className="absolute top-8 right-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
            New
          </span>
        )}
        {product.featured && (
          <span className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 text-xs font-semibold rounded">
            Featured
          </span>
        )}
        {product.onSale && (
          <span className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded">
            Sale
          </span>
        )}
        
        <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{product.subcategory}</span>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
        
        <h3 className="font-semibold text-sm sm:text-lg mb-1 line-clamp-2">{product.title || product.name}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-2">by {product.author || product.brand}</p>
        
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviews || 0})</span>
          </div>
        )}

        {product.description && (
          <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{product.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-sm sm:text-lg font-bold text-blue-600">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          <button 
            onClick={(e) => handleAddToCart(e, product)}
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors duration-300 text-xs sm:text-sm ${
              product.inStock !== false
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={product.inStock === false}
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{product.inStock !== false ? 'Add to Cart' : 'Out of Stock'}</span>
            <span className="sm:hidden">{product.inStock !== false ? 'Add' : 'N/A'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Catalog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of books, stationery, and school supplies. Find everything you need in one place.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search all products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Price:</span>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {allProducts.length} products
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {priceRange !== 'All' && ` in ${priceRange}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={`${product.id}-${product.productType}-${index}`} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Catalog Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {allProducts.filter(p => p.productType === 'Book').length}
              </div>
              <div className="text-gray-600">Books</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {allProducts.filter(p => p.productType === 'Stationery').length}
              </div>
              <div className="text-gray-600">Stationery Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {allProducts.filter(p => p.productType === 'School Supply').length}
              </div>
              <div className="text-gray-600">School Supplies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {allProducts.length}
              </div>
              <div className="text-gray-600">Total Products</div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {categories.filter(cat => cat !== 'All').map((category) => {
              const categoryProducts = allProducts.filter(p => p.category === category);
              const categoryIcon = category === 'Books' ? BookOpen : category === 'Stationery' ? Package : GraduationCap;
              const IconComponent = categoryIcon;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-6 rounded-lg text-left transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 mr-3" />
                    <div className="font-semibold text-xl">{category}</div>
                  </div>
                  <div className="text-sm opacity-75">
                    {categoryProducts.length} items available
                  </div>
                  <div className="text-xs mt-1 opacity-60">
                    Starting from ₹{Math.min(...categoryProducts.map(p => p.price))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogView;
