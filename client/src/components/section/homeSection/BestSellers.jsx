import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../../hooks/useApp.js'

const BestSellers = () => {
  const navigate = useNavigate()
  const { bestsellers, booksLoading, addToCart, isAuthenticated, showLoginModal } = useApp()

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

  const handleAddToCart = async (e, book) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      showLoginModal({ type: 'addToCart', payload: { book, quantity: 1 } })
      return
    }

    try {
      await addToCart(book, 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const BookCard = ({ book }) => (
    <div 
      onClick={() => navigate(`/books/${book._id || book.id}`)}
      className="flex-none w-32 sm:w-40 md:w-48 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
    >
      <div className="relative">
        <img
          src={book.images?.[0]?.url || book.images?.[0] || book.cover || '/images/books/placeholder.jpg'}
          alt={book.title}
          className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src = '/images/books/placeholder.jpg'
          }}
        />
        
        {/* Badge */}
        {book.badge && (
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-500 text-white px-1 sm:px-2 py-1 rounded text-xs font-semibold">
            {book.badge}
          </div>
        )}
        
        {/* Discount */}
        {(book.discount > 0 || (book.price?.mrp && book.price?.selling && book.price.mrp > book.price.selling)) && (
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-500 text-white px-1 sm:px-2 py-1 rounded text-xs font-semibold">
            {book.discount || Math.round(((book.price.mrp - book.price.selling) / book.price.mrp) * 100)}% OFF
          </div>
        )}

        {/* Stock status */}
        {(book.stock?.quantity || book.stock) <= 5 && (book.stock?.quantity || book.stock) > 0 && (
          <div className="absolute bottom-1 left-1 bg-orange-500 text-white px-1 sm:px-2 py-1 rounded text-xs font-semibold">
            Only {book.stock?.quantity || book.stock} left
          </div>
        )}
        
        {(book.stock?.quantity || book.stock) === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
            <span className="text-white font-semibold">Out of Stock</span>
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
                  i < Math.floor(
                    typeof book.rating === 'object' 
                      ? book.rating?.average || book.averageRating || 4
                      : book.rating || book.averageRating || 4
                  )
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">
              {typeof book.rating === 'object' 
                ? (book.rating?.average || book.averageRating || 4.0).toFixed(1)
                : (book.rating || book.averageRating || 4.0).toFixed(1)
              }
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div>
            <span className="text-sm sm:text-lg font-bold text-gray-900">
              ₹{book.price?.selling || book.sellingPrice || book.price}
            </span>
            {(book.price?.mrp || book.originalPrice) && (book.price?.mrp || book.originalPrice) > (book.price?.selling || book.sellingPrice || book.price) && (
              <span className="text-xs sm:text-sm text-gray-500 line-through ml-1">
                ₹{book.price?.mrp || book.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={(e) => handleAddToCart(e, book)}
          disabled={(book.stock?.quantity || book.stock) === 0}
          className={`w-full py-1 sm:py-2 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm flex items-center justify-center ${
            (book.stock?.quantity || book.stock) === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          {(book.stock?.quantity || book.stock) === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )

  // Loading state
  if (booksLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Bestsellers</h2>
              <p className="text-gray-600">
                Most popular books loved by readers worldwide
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex-none w-48 bg-gray-200 rounded-lg animate-pulse">
                <div className="w-full h-64 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const displayBooks = bestsellers && bestsellers.length > 0 ? bestsellers : []

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

        {displayBooks.length > 0 ? (
          <>
            {/* Books Carousel */}
            <div className="relative">
              {/* Scroll Buttons */}
              {displayBooks.length > 4 && (
                <>
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
                </>
              )}

              {/* Books Container */}
              <div
                id="bestsellers-container"
                className="flex space-x-2 sm:space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {displayBooks.map((book) => (
                  <BookCard key={book._id || book.id} book={book} />
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
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bestsellers available at the moment.</p>
            <button 
              onClick={() => navigate('/books')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Books
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default BestSellers
