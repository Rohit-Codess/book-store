import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Filter, Search, ShoppingCart, Heart } from 'lucide-react';
import BookService from '../services/BookService';
import { useApp } from '../hooks/useApp.js';

const BooksView = () => {
  const navigate = useNavigate();
  const { addToCart, isAuthenticated, showLoginModal } = useApp();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = ['All', 'Fiction', 'Young Adult', 'Children', 'Self Help', 'Non-Fiction', 'Academic'];

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const booksData = await BookService.getAllBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    const filterBooks = () => {
      let filtered = [...books];

      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(book => book.category === selectedCategory);
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort books
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
        case 'newest':
          filtered.sort((a, b) => b.isNewArrival - a.isNewArrival);
          break;
        default: // popularity
          filtered.sort((a, b) => b.reviews - a.reviews);
      }

      setFilteredBooks(filtered);
    };

    filterBooks();
  }, [books, selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = async (e, book) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      showLoginModal({ type: 'addToCart', payload: { book, quantity: 1 } });
      return;
    }

    try {
      await addToCart(book, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const BookCard = ({ book }) => (
    <div 
      onClick={() => navigate(`/book/${book.id}`, { state: { product: book } })}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
    >
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/200x300/4F46E5/white?text=${encodeURIComponent(book.title.slice(0, 10))}`;
          }}
        />
        {book.isBestseller && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            Bestseller
          </span>
        )}
        {book.isNewArrival && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
            New
          </span>
        )}
        {book.onSale && (
          <span className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded">
            {book.discount}% OFF
          </span>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-lg mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-2">by {book.author}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(
                    typeof book.rating === 'object' 
                      ? book.rating?.average || book.averageRating || 4
                      : book.rating || book.averageRating || 4
                  ) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({typeof book.rating === 'object' ? book.rating?.count || book.reviews || 0 : book.reviews || 0})
          </span>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{book.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-sm sm:text-lg font-bold text-green-600">
              ₹{book.price?.selling || book.sellingPrice || book.price}
            </span>
            {(book.price?.mrp || book.originalPrice) && (book.price?.mrp || book.originalPrice) > (book.price?.selling || book.sellingPrice || book.price) && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ₹{book.price?.mrp || book.originalPrice}
              </span>
            )}
          </div>
          
          <button 
            onClick={(e) => handleAddToCart(e, book)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors duration-300 text-xs sm:text-sm"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Books Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our extensive collection of books across all genres and categories. From bestsellers to hidden gems, find your next great read.
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
                placeholder="Search books or authors..."
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
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.filter(cat => cat !== 'All').map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-lg text-center transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">{category}</div>
                <div className="text-sm mt-1 opacity-75">
                  {books.filter(book => book.category === category).length} books
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksView;
