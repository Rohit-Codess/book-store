import React, { useState, useEffect } from 'react';
import { Star, Filter, Search, ShoppingCart, Heart, Package, GraduationCap } from 'lucide-react';
import SchoolService from '../services/SchoolService';

const SchoolView = () => {
  const [supplies, setSupplies] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = ['All', 'Bags', 'Mathematical Instruments', 'Uniforms', 'Lunch Boxes', 'Footwear', 'Lab Equipment', 'Accessories', 'Art Supplies'];
  const ageGroups = ['All', 'Kids', 'Teen'];

  useEffect(() => {
    const loadSupplies = async () => {
      try {
        setLoading(true);
        const suppliesData = await SchoolService.getAllSchoolSupplies();
        setSupplies(suppliesData);
      } catch (error) {
        console.error('Error loading school supplies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSupplies();
  }, []);

  useEffect(() => {
    const filterItems = () => {
      let filtered = [...supplies];

      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(item => item.category === selectedCategory);
      }

      // Filter by age group
      if (selectedAgeGroup !== 'All') {
        filtered = filtered.filter(item => item.ageGroup === selectedAgeGroup || item.ageGroup === 'All');
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
  }, [supplies, selectedCategory, selectedAgeGroup, searchTerm, sortBy]);

  const SupplyCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/200x100/4F46E5/white?text=${encodeURIComponent(item.name.slice(0, 10))}`;
          }}
        />
        {item.featured && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
            Featured
          </span>
        )}
        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded">
          {item.ageGroup}
        </span>
        {!item.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded">
              Out of Stock
            </span>
          </div>
        )}
        <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{item.category}</span>
          <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
        </div>
        
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
            <span className="text-sm sm:text-lg font-bold text-orange-600">₹{item.price}</span>
            {item.originalPrice > item.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
            )}
          </div>
          
          <button 
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors duration-300 text-xs sm:text-sm ${
              item.inStock 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">School Supplies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything students need for a successful academic year. From backpacks to uniforms, find quality school supplies for all ages.
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
                placeholder="Search school supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Age Group Filter */}
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-gray-400" />
              <select
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {ageGroups.map(group => (
                  <option key={group} value={group}>{group === 'All' ? 'All Ages' : group}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            Showing {filteredItems.length} of {supplies.length} items
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedAgeGroup !== 'All' && ` for ${selectedAgeGroup}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Supplies Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <SupplyCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No supplies found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== 'All').slice(0, 8).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-lg text-center transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="font-semibold">{category}</div>
                <div className="text-sm mt-1 opacity-75">
                  {supplies.filter(item => item.category === category).length} items
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Age Groups Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Age Group</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ageGroups.filter(group => group !== 'All').map((group) => (
              <div key={group} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{group}</h3>
                  <GraduationCap className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-gray-600 mb-4">
                  {group === 'Kids' ? 'Perfect supplies for elementary school students' : 'Essential items for high school students'}
                </p>
                <button
                  onClick={() => setSelectedAgeGroup(group)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Shop {group} Supplies ({supplies.filter(item => item.ageGroup === group || item.ageGroup === 'All').length} items)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolView;
