import React from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const PreOrdersSection = () => {
  // Books data for Pre-Orders section - Easy to add new books here
  const preOrderBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: 499,
      originalPrice: 599,
      discount: 17,
      rating: 4.9,
      cover: "/images/books/preorders/book1.jpg", // Add your book images here
      preOrderDate: "March 2025"
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      price: 599,
      originalPrice: 699,
      discount: 14,
      rating: 4.8,
      cover: "/images/books/preorders/book2.jpg",
      preOrderDate: "April 2025"
    },
    {
      id: 3,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      price: 449,
      originalPrice: 549,
      discount: 18,
      rating: 4.6,
      cover: "/images/books/preorders/book3.jpg",
      preOrderDate: "May 2025"
    },
    {
      id: 4,
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.7,
      cover: "/images/books/preorders/book4.jpg",
      preOrderDate: "June 2025"
    },
    {
      id: 5,
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      price: 549,
      originalPrice: 649,
      discount: 15,
      rating: 4.5,
      cover: "/images/books/preorders/book5.jpg",
      preOrderDate: "July 2025"
    },
    {
      id: 6,
      title: "The Sanatorium",
      author: "Sarah Pearse",
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.4,
      cover: "/images/books/preorders/book6.jpg",
      preOrderDate: "August 2025"
    }
    // Add more books here by copying the structure above
  ];

  const scrollLeft = () => {
    const container = document.getElementById('preorders-books');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('preorders-books');
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
            e.target.src = "https://via.placeholder.com/200x300/7C3AED/white?text=Pre+Order";
          }}
        />
        <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
          PRE-ORDER
        </div>
        {book.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {book.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
          {book.title}
        </h3>
        <p className="text-gray-600 text-xs mb-1">{book.author}</p>
        <p className="text-purple-600 text-xs mb-2 font-medium">Available: {book.preOrderDate}</p>
        
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
        <h2 className="text-2xl font-bold text-gray-900">📅 Pre-Orders</h2>
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
          id="preorders-books"
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {preOrderBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreOrdersSection;
