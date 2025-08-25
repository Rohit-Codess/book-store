import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Filter, Search, ShoppingCart, Heart, Package } from 'lucide-react';
import { useApp } from '../hooks/useApp.js';

const StationeryView = () => {
  const navigate = useNavigate();
  const { addToCart, isAuthenticated, showLoginModal } = useApp();
  const [stationery, setStationery] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = ['All', 'Pens', 'Pencils', 'Notebooks', 'Art Supplies', 'Office Supplies'];

  // Mock data for stationery
  const mockStationery = useMemo(() => [
    {
      id: 'stat_1',
      name: 'Premium Ball Pen Set',
      brand: 'Parker',
      category: 'Pens',
      price: 599,
      originalPrice: 799,
      rating: 4.7,
      reviews: 234,
      description: 'Smooth writing experience with premium ink',
      image: '/images/section/homeSection/BookSections/7.jpg',
      featured: true,
      inStock: true
    },
    {
      id: 'stat_2',
      name: 'Mechanical Pencil',
      brand: 'Pilot',
      category: 'Pencils',
      price: 199,
      originalPrice: 299,
      rating: 4.5,
      reviews: 156,
      description: 'Precision writing for technical drawings',
      image: '/images/section/homeSection/BookSections/8.jpg',
      featured: false,
      inStock: true
    },
    {
      id: 'stat_3',
      name: 'Spiral Notebook A4',
      brand: 'Oxford',
      category: 'Notebooks',
      price: 149,
      originalPrice: 199,
      rating: 4.3,
      reviews: 89,
      description: 'High-quality paper for smooth writing',
      image: '/images/section/homeSection/BookSections/9.jpg',
      featured: false,
      inStock: true
    },
    {
      id: 'stat_4',
      name: 'Watercolor Set',
      brand: 'Winsor & Newton',
      category: 'Art Supplies',
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviews: 67,
      description: 'Professional grade watercolors for artists',
      image: '/images/section/homeSection/BookSections/10.jpg',
      featured: true,
      inStock: true
    },
    {
      id: 'stat_5',
      name: 'Sticky Notes Pack',
      brand: 'Post-it',
      category: 'Office Supplies',
      price: 299,
      originalPrice: 399,
      rating: 4.4,
      reviews: 145,
      description: 'Colorful sticky notes for organization',
      image: '/images/section/homeSection/BookSections/11.jpg',
      featured: false,
      inStock: true
    },
    {
      id: 'stat_6',
      name: 'Highlighter Set',
      brand: 'Stabilo',
      category: 'Pens',
      price: 399,
      originalPrice: 499,
      rating: 4.6,
      reviews: 198,
      description: 'Vibrant colors for highlighting text',
      image: '/images/section/homeSection/BookSections/12.jpg',
      featured: true,
      inStock: true
    }
  ], []);

  useEffect(() => {
    const loadStationery = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStationery(mockStationery);
      } catch (error) {
        console.error('Error loading stationery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStationery();
  }, [mockStationery]);

  useEffect(() => {
    const filterItems = () => {
      let filtered = [...stationery];

      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(item => item.category === selectedCategory);
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort items
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'featured':
          filtered.sort((a, b) => b.featured - a.featured);
          break;
        default: // popularity
          filtered.sort((a, b) => b.reviews - a.reviews);
      }

      setFilteredItems(filtered);
    };

    filterItems();
  }, [stationery, selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = async (e, item) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    try {
      await addToCart(item, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const StationeryCard = ({ item }) => (
    <div 
      onClick={() => navigate(`/books/${item.id}`, { state: { product: item } })}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/200x200/059669/white?text=${encodeURIComponent(item.name.slice(0, 8))}`;
          }}
        />
        {item.featured && (
          <span className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 text-xs font-semibold rounded">
            Featured
          </span>
        )}
        {!item.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded">
              Out of Stock
            </span>
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-lg mb-1 line-clamp-2">{item.name}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-2">by {item.brand}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({item.reviews})</span>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-sm sm:text-lg font-bold text-green-600">₹{item.price}</span>
            {item.originalPrice > item.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
            )}
          </div>
          
          <button 
            onClick={(e) => handleAddToCart(e, item)}
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors duration-300 text-xs sm:text-sm ${
              item.inStock 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!item.inStock}
          >
            {item.inStock ? <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" /> : <Package className="w-3 h-3 sm:w-4 sm:h-4" />}
            <span className="hidden sm:inline">{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            <span className="sm:hidden">{item.inStock ? 'Add' : 'N/A'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stationery Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quality stationery items for all your writing, creative, and office needs. From premium pens to professional supplies.
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
                placeholder="Search stationery or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {stationery.length} items
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Stationery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <StationeryCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.filter(cat => cat !== 'All').map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-lg text-center transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="font-semibold">{category}</div>
                <div className="text-sm mt-1 opacity-75">
                  {stationery.filter(item => item.category === category).length} items
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Brands Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Parker', 'Pilot', 'Oxford', 'Winsor & Newton', 'Post-it', 'Stabilo', 'Canson', 'Casio'].map((brand) => (
              <div key={brand} className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold text-gray-900">{brand}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {stationery.filter(item => item.brand === brand).length} products
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationeryView;
