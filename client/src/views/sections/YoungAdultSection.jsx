import React from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const YoungAdultSection = () => {
  // Books data for Young Adult section - Easy to add new books here
  const youngAdultBooks = [
    {
      id: 1,
      title: "They Both Die at the End",
      author: "Adam Silvera",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.6,
      cover: "/images/books/young-adult/book1.jpg", // Add your book images here
      ageGroup: "14-18 Years"
    },
    {
      id: 2,
      title: "The Hate U Give",
      author: "Angie Thomas",
      price: 449,
      originalPrice: 549,
      discount: 18,
      rating: 4.8,
      cover: "/images/books/young-adult/book2.jpg",
      ageGroup: "15-19 Years"
    },
    {
      id: 3,
      title: "Six of Crows",
      author: "Leigh Bardugo",
      price: 549,
      originalPrice: 649,
      discount: 15,
      rating: 4.9,
      cover: "/images/books/young-adult/book3.jpg",
      ageGroup: "16-20 Years"
    },
    {
      id: 4,
      title: "The Cruel Prince",
      author: "Holly Black",
      price: 499,
      originalPrice: 599,
      discount: 17,
      rating: 4.7,
      cover: "/images/books/young-adult/book4.jpg",
      ageGroup: "15-19 Years"
    },
    {
      id: 5,
      title: "Eleanor Oliphant Is Completely Fine",
      author: "Gail Honeyman",
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.5,
      cover: "/images/books/young-adult/book5.jpg",
      ageGroup: "16-21 Years"
    },
    {
      id: 6,
      title: "Red Queen",
      author: "Victoria Aveyard",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.4,
      cover: "/images/books/young-adult/book6.jpg",
      ageGroup: "14-18 Years"
    }
    // Add more books here by copying the structure above
  ];

  const scrollLeft = () => {
    const container = document.getElementById('young-adult-books');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('young-adult-books');
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
            e.target.src = "https://via.placeholder.com/200x300/EC4899/white?text=YA+Book";
          }}
        />
        {book.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {book.discount}% OFF
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-pink-500 text-white px-2 py-1 rounded text-xs font-semibold">
          YA
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
          {book.title}
        </h3>
        <p className="text-gray-600 text-xs mb-1">{book.author}</p>
        <p className="text-pink-600 text-xs mb-2 font-medium">{book.ageGroup}</p>
        
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
        <h2 className="text-2xl font-bold text-gray-900">🎯 Young Adult</h2>
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
          id="young-adult-books"
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {youngAdultBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YoungAdultSection;
