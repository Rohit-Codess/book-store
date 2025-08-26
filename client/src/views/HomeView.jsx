import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Flipkart-style banners
  const banners = [
    {
      id: 1,
      image: '/images/section/homeSection/BannerCarousel/1.png',
      title: 'Best Books Collection',
      subtitle: 'Up to 70% OFF'
    },
    {
      id: 2,
      image: '/images/section/homeSection/BannerCarousel/2.png',
      title: 'New Arrivals',
      subtitle: 'Fresh Collection'
    },
    {
      id: 3,
      image: '/images/section/homeSection/BannerCarousel/3.png',
      title: 'Educational Books',
      subtitle: 'Special Offers'
    }
  ];

  // Flipkart-style categories
  const categories = [
    { name: 'Fiction', icon: '/images/section/homeSection/CategoriesGrid/1.jpg', color: 'bg-orange-100' },
    { name: 'Non-Fiction', icon: '/images/section/homeSection/CategoriesGrid/2.jpg', color: 'bg-blue-100' },
    { name: 'Children', icon: '/images/section/homeSection/CategoriesGrid/3.jpg', color: 'bg-green-100' },
    { name: 'Academic', icon: '/images/section/homeSection/CategoriesGrid/4.jpg', color: 'bg-purple-100' },
    { name: 'Comics', icon: '/images/section/homeSection/CategoriesGrid/5.jpg', color: 'bg-red-100' },
    { name: 'Biography', icon: '/images/section/homeSection/CategoriesGrid/6.jpg', color: 'bg-yellow-100' },
    { name: 'Science', icon: '/images/section/homeSection/CategoriesGrid/7.jpg', color: 'bg-pink-100' },
    { name: 'History', icon: '/images/section/homeSection/CategoriesGrid/8.jpg', color: 'bg-indigo-100' },
    { name: 'Romance', icon: '/images/section/homeSection/CategoriesGrid/9.jpg', color: 'bg-teal-100' },
    { name: 'Mystery', icon: '/images/section/homeSection/CategoriesGrid/10.jpg', color: 'bg-gray-100' }
  ];

  // Sample books data
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 299, originalPrice: 399, image: '/images/section/homeSection/BookSections/1.jpg', rating: 4.5, discount: 25 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 349, originalPrice: 449, image: '/images/section/homeSection/BookSections/2.jpg', rating: 4.7, discount: 22 },
    { id: 3, title: '1984', author: 'George Orwell', price: 279, originalPrice: 379, image: '/images/section/homeSection/BookSections/3.jpg', rating: 4.6, discount: 26 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 329, originalPrice: 429, image: '/images/section/homeSection/BookSections/4.jpg', rating: 4.4, discount: 23 },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 309, originalPrice: 409, image: '/images/section/homeSection/BookSections/5.jpg', rating: 4.3, discount: 24 },
    { id: 6, title: 'Lord of the Flies', author: 'William Golding', price: 289, originalPrice: 389, image: '/images/section/homeSection/BookSections/6.jpg', rating: 4.5, discount: 26 }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Banner Carousel - Flipkart Style */}
      <div className="relative bg-white">
        <div className="relative h-72 overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="w-full flex-shrink-0 relative">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                  <div className="text-white ml-8">
                    <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
                    <p className="text-xl">{banner.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid - Flipkart Style */}
      <div className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="text-center cursor-pointer group"
                onClick={() => navigate('/books')}
              >
                <div className={`${category.color} rounded-full p-4 mx-auto mb-2 group-hover:scale-105 transition-transform w-16 h-16 flex items-center justify-center`}>
                  <img 
                    src={category.icon} 
                    alt={category.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deals Section - Flipkart Style */}
      <div className="bg-white mt-3 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Deals of the Day</h2>
            <button className="text-blue-600 font-semibold hover:underline" onClick={() => navigate('/books')}>View All</button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {books.slice(0, 5).map((book) => (
              <div key={book.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white group cursor-pointer">
                <div className="relative mb-3">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {book.discount}% OFF
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white rounded-full p-1 shadow-md hover:bg-red-50">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 text-xs mb-2">{book.author}</p>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-bold text-lg">₹{book.price}</span>
                    <span className="text-gray-500 text-sm line-through ml-2">₹{book.originalPrice}</span>
                  </div>
                </div>
                
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="bg-white mt-3 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Selections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Best Sellers */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-center">Best Sellers</h3>
              <div className="space-y-3">
                {books.slice(0, 3).map((book, index) => (
                  <div key={book.id} className="flex items-center space-x-3">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{book.title}</p>
                      <p className="text-gray-600 text-xs">{book.author}</p>
                      <p className="font-bold text-sm">₹{book.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Arrivals */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-center">New Arrivals</h3>
              <div className="space-y-3">
                {books.slice(3, 6).map((book, index) => (
                  <div key={book.id} className="flex items-center space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{book.title}</p>
                      <p className="text-gray-600 text-xs">{book.author}</p>
                      <p className="font-bold text-sm">₹{book.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Offers */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-center">Special Offers</h3>
              <div className="space-y-3">
                {books.slice(0, 3).map((book) => (
                  <div key={book.id} className="flex items-center space-x-3">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {book.discount}%
                    </span>
                    <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{book.title}</p>
                      <p className="text-gray-600 text-xs">{book.author}</p>
                      <p className="font-bold text-sm">₹{book.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
