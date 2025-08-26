import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu, X, ChevronDown, MapPin } from 'lucide-react'
import { useApp } from '../../hooks/useApp.js'

const FlipkartHeader = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { 
    cart, 
    wishlist, 
    user, 
    isAuthenticated, 
    logout, 
    searchBooks,
    searchResults,
    isSearching 
  } = useApp()

  const categories = [
    // { 
    //   name: 'Electronics', 
    //   path: '/electronics',
    //   items: ['Mobiles', 'Laptops', 'Cameras', 'Gaming', 'Audio']
    // },
    // { 
    //   name: 'Fashion', 
    //   path: '/fashion',
    //   items: ['Men', 'Women', 'Kids', 'Footwear', 'Bags']
    // },
    // { 
    //   name: 'Home & Furniture', 
    //   path: '/home',
    //   items: ['Kitchen', 'Furniture', 'Home Decor', 'Tools', 'Pet Supplies']
    // },
    { 
      name: 'Books', 
      path: '/books',
      items: ['Fiction', 'Non-Fiction', 'Academic', 'Children', 'E-books']
    },
    // { 
    //   name: 'Beauty', 
    //   path: '/beauty',
    //   items: ['Makeup', 'Skincare', 'Hair Care', 'Fragrances', 'Men\'s Grooming']
    // },
    // { 
    //   name: 'Sports', 
    //   path: '/sports',
    //   items: ['Cricket', 'Football', 'Fitness', 'Cycling', 'Swimming']
    // },
    // { 
    //   name: 'Grocery', 
    //   path: '/grocery',
    //   items: ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Beverages']
    // }
  ]

  const cartItemCount = cart?.totalItems || 0
  const wishlistItemCount = wishlist?.length || 0

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchBooks(searchQuery)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSearchInputChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim()) {
      searchBooks(query)
    }
  }

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  return (
    <header className="bg-[#f34545] text-white sticky top-0 z-50 shadow-md">
      {/* Main Header */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex flex-col">
              <span className="text- font-bold italic text-white">Book World</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs sm:text-sm text-yellow-300 font-medium">Explore</span>
                <svg width="10" height="10" viewBox="0 0 15 15" fill="none" className="text-yellow-400">
                  <path d="M7.5 0L9.67 5.33H15L10.82 8.67L12.99 14L7.5 10.67L2.01 14L4.18 8.67L0 5.33H5.33L7.5 0Z" fill="currentColor"/>
                </svg>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full px-4 py-2.5 text-gray-800 bg-white rounded-sm focus:outline-none text-sm shadow-sm"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-white hover:bg-gray-50 rounded-r-sm border-l border-gray-200"
              >
                <Search className="h-5 w-5 text-[#2874f0]" />
              </button>
              
              {/* Search Results Dropdown */}
              {searchQuery && searchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border shadow-lg mt-1 z-10 max-h-60 overflow-y-auto text-gray-800 rounded-sm">
                  {searchResults.slice(0, 5).map((book) => (
                    <Link
                      key={book._id || book.id}
                      to={`/books/${book._id || book.id}`}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                      onClick={() => setSearchQuery('')}
                    >
                      <img
                        src={book.images?.[0] || '/images/books/placeholder.jpg'}
                        alt={book.title}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                    </Link>
                  ))}
                  {searchResults.length > 5 && (
                    <div className="px-4 py-3 text-center border-t border-gray-100">
                      <button
                        onClick={() => {
                          navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
                          setSearchQuery('')
                        }}
                        className="text-sm text-[#2874f0] font-medium hover:underline"
                      >
                        View all {searchResults.length} results
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Loading indicator */}
              {isSearching && (
                <div className="absolute top-full left-0 right-0 bg-white border shadow-lg mt-1 z-10 rounded-sm">
                  <div className="px-4 py-3 text-center text-gray-500 text-sm">
                    Searching...
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Location */}
            <div className="hidden lg:flex items-center space-x-1 text-sm">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
              <ChevronDown className="h-4 w-4" />
            </div>

            {/* Login Button */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-1 px-8 py-1.5 bg-white text-[#2874f0] rounded-sm text-sm font-medium hover:bg-gray-50 border"
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.name || 'Account'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-sm shadow-lg py-2 z-10 text-gray-800 border">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium">Hello {user?.name || 'User'}</div>
                      </div>
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Wishlist
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-8 py-1.5 bg-white text-[#2874f0] rounded-sm text-sm font-medium hover:bg-gray-50 border"
                >
                  Login
                </Link>
              )}
            </div>

            {/* More Dropdown */}
            <div className="hidden lg:flex items-center space-x-1 text-sm cursor-pointer hover:bg-[#1c5bb8] px-2 py-1 rounded">
              <span>More</span>
              <ChevronDown className="h-4 w-4" />
            </div>

            {/* Cart */}
            <Link 
              to={isAuthenticated ? "/cart" : "/login"}
              className="flex items-center space-x-2 text-sm hover:bg-[#1c5bb8] px-3 py-2 rounded relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:block">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-[#1c5bb8] rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-t shadow-sm hidden md:block">
        <div className="max-w-screen-xl mx-auto px-4">
          <nav className="flex items-center space-x-8 py-0 overflow-x-auto">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <Link
                  to={category.path}
                  className="text-gray-700 hover:text-[#2874f0] text-sm font-medium whitespace-nowrap py-3 flex items-center space-x-1 group-hover:text-[#2874f0]"
                >
                  <span>{category.name}</span>
                  <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-[#2874f0]" />
                </Link>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 bg-white border shadow-lg mt-0 z-10 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {category.items.map((item) => (
                      <Link
                        key={item}
                        to={`${category.path}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2874f0]"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-gray-800 border-t">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b border-gray-200">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-sm text-gray-800 focus:outline-none focus:border-[#2874f0]"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>

          {/* Mobile Categories */}
          <nav className="py-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Mobile User Section */}
          {!isAuthenticated && (
            <div className="px-4 py-3 border-t border-gray-200">
              <Link
                to="/login"
                className="block w-full text-center py-2 bg-[#2874f0] text-white rounded-sm text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login & Signup
              </Link>
            </div>
          )}

          {/* Mobile Bottom Icons */}
          <div className="px-4 py-3 border-t border-gray-200 flex justify-around bg-gray-50">
            <Link 
              to="/wishlist"
              className="flex flex-col items-center space-y-1 text-gray-600 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs">Wishlist</span>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            <Link 
              to={isAuthenticated ? "/account" : "/login"}
              className="flex flex-col items-center space-y-1 text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-6 w-6" />
              <span className="text-xs">{isAuthenticated ? 'Account' : 'Login'}</span>
            </Link>
            <Link 
              to={isAuthenticated ? "/cart" : "/login"}
              className="flex flex-col items-center space-y-1 text-gray-600 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xs">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default FlipkartHeader
