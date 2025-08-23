import React from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const DealsSection = () => {
  // Books data for Deals section - Easy to add new books here
  const dealsBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 299,
      originalPrice: 399,
      discount: 25,
      rating: 4.5,
      cover: "/images/books/deals/book1.jpg" // Add your book images here
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.8,
      cover: "/images/books/deals/book2.jpg"
    },
    {
      id: 3,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.6,
      cover: "/images/books/deals/book3.jpg"
    },
    {
      id: 4,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      price: 199,
      originalPrice: 299,
      discount: 33,
      rating: 4.4,
      cover: "/images/books/deals/book4.jpg"
    },
    {
      id: 5,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 249,
      originalPrice: 349,
      discount: 29,
      rating: 4.3,
      cover: "/images/books/deals/book5.jpg"
    },
    {
      id: 6,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 199,
      originalPrice: 249,
      discount: 20,
      rating: 4.7,
      cover: "/images/books/deals/book6.jpg"
    }
    // Add more books here by copying the structure above
  ];

  const scrollLeft = () => {
    const container = document.getElementById('deals-books');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('deals-books');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const BookCard = ({ book }) => (
    <div className="flex-none w-48 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x300/4F46E5/white?text=Book+Cover";
          }}
        />
        {book.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {book.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
          {book.title}
        </h3>
        <p className="text-gray-600 text-xs mb-2">{book.author}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">₹{book.price}</span>
            {book.originalPrice > book.price && (
              <span className="text-sm text-gray-500 line-through ml-1">
                ₹{book.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">🔥 Deals</h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          View All →
        </button>
      </div>

      {/* Books Carousel */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>

        {/* Books Container */}
        <div
          id="deals-books"
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dealsBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsSection;
