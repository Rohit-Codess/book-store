import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BestSellers = () => {
  const navigate = useNavigate()
  const bestSellers = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 299,
      originalPrice: 399,
      discount: 25,
      rating: 4.8,
      cover: "/images/section/homeSection/BookSections/1.jpg",
      badge: "#1 Bestseller"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 449,
      originalPrice: 599,
      discount: 25,
      rating: 4.9,
      cover: "/images/section/homeSection/BookSections/2.jpg",
      badge: "Top Rated"
    },
    {
      id: 3,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      price: 249,
      originalPrice: 349,
      discount: 29,
      rating: 4.7,
      cover: "/images/section/homeSection/BookSections/3.jpg",
      badge: "Trending"
    },
    {
      id: 4,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/4.jpg",
      badge: "Award Winner"
    },
    {
      id: 5,
      title: "The 7 Habits",
      author: "Stephen Covey",
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.5,
      cover: "/images/section/homeSection/BookSections/5.jpg",
      badge: "Classic"
    },
    {
      id: 6,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 199,
      originalPrice: 299,
      discount: 33,
      rating: 4.4,
      cover: "/images/section/homeSection/BookSections/6.jpg",
      badge: "Bestseller"
    },
    {
      id: 7,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      price: 149,
      originalPrice: 199,
      discount: 25,
      rating: 4.3,
      cover: "/images/section/homeSection/BookSections/7.jpg",
      badge: "Popular"
    },
    {
      id: 8,
      title: "The Monk Who Sold His Ferrari",
      author: "Robin Sharma",
      price: 199,
      originalPrice: 249,
      discount: 20,
      rating: 4.2,
      cover: "/images/section/homeSection/BookSections/8.jpg",
      badge: "Inspiring"
    }
  ]

  const scrollLeft = () => {
    const container = document.getElementById('bestsellers-container')
    if (container) {
      // On mobile, scroll by 2 card widths, on desktop by 3
      const isMobile = window.innerWidth < 768
      const scrollDistance = isMobile ? 200 : 300
      container.scrollBy({ left: -scrollDistance, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('bestsellers-container')
    if (container) {
      // On mobile, scroll by 2 card widths, on desktop by 3
      const isMobile = window.innerWidth < 768
      const scrollDistance = isMobile ? 200 : 300
      container.scrollBy({ left: scrollDistance, behavior: 'smooth' })
    }
  }

  const BookCard = ({ book }) => (
    <div className="flex-none w-32 sm:w-40 md:w-48 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-t-lg"
        />
        
        {/* Badge */}
        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-500 text-white px-1 sm:px-2 py-1 rounded text-xs font-semibold">
          {book.badge}
        </div>
        
        {/* Discount */}
        {book.discount > 0 && (
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-500 text-white px-1 sm:px-2 py-1 rounded text-xs font-semibold">
            {book.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-xs sm:text-sm">
          {book.title}
        </h3>
        <p className="text-gray-600 text-xs mb-1 sm:mb-2">{book.author}</p>
        
        <div className="flex items-center mb-1 sm:mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(book.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div>
            <span className="text-sm sm:text-lg font-bold text-gray-900">₹{book.price}</span>
            {book.originalPrice > book.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through ml-1">
                ₹{book.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/books')}
          className="w-full bg-blue-600 text-white py-1 sm:py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Bestsellers</h2>
            <p className="text-gray-600">
              Most popular books loved by readers worldwide
            </p>
          </div>
          <button 
            onClick={() => navigate('/books')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </button>
        </div>

        {/* Books Carousel */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Books Container */}
          <div
            id="bestsellers-container"
            className="flex space-x-2 sm:space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bestSellers.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Books Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25K+</div>
              <div className="text-blue-100">Happy Readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Authors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BestSellers
