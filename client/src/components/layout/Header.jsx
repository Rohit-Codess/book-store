import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react'
import { useApp } from '../../hooks/useApp.js'

const Header = () => {
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
    showLoginModal, 
    searchBooks,
    searchResults,
    isSearching 
  } = useApp()

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Stationery', path: '/stationery' },
    { name: 'School', path: '/school' },
    { name: 'Authors', path: '/authors' },
    { name: 'Publishers', path: '/publishers' }
  ]

  // Calculate cart item count from the new cart structure
  const cartItemCount = cart?.totalItems || 0
  const wishlistItemCount = wishlist?.length || 0

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchBooks(searchQuery)
    }
  }

  const handleSearchInputChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Trigger search on input change for live search
    if (query.trim()) {
      searchBooks(query)
    }
  }

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Book World
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for books, authors, publishers..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
              
              {/* Search Results Dropdown */}
              {searchQuery && searchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
                  {searchResults.slice(0, 5).map((book) => (
                    <Link
                      key={book._id || book.id}
                      to={`/books/${book._id || book.id}`}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSearchQuery('')}
                    >
                      <img
                        src={book.images?.[0] || '/images/books/placeholder.jpg'}
                        alt={book.title}
                        className="w-8 h-8 object-cover rounded mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                    </Link>
                  ))}
                  {searchResults.length > 5 && (
                    <Link
                      to={`/books?search=${encodeURIComponent(searchQuery)}`}
                      className="block px-4 py-2 text-center text-blue-600 hover:bg-gray-100 text-sm font-medium"
                      onClick={() => setSearchQuery('')}
                    >
                      View all {searchResults.length} results
                    </Link>
                  )}
                </div>
              )}

              {/* Loading indicator */}
              {isSearching && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
                  <div className="px-4 py-2 text-center text-gray-500">
                    Searching...
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/wishlist"
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Heart className="h-6 w-6" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>
              
              <Link 
                to={isAuthenticated ? "/cart" : "#"}
                onClick={!isAuthenticated ? (e) => {
                  e.preventDefault();
                  showLoginModal({ type: 'goToCart', navigate });
                } : undefined}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              
              {/* User Menu */}
              <div className="relative">
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <User className="h-6 w-6" />
                      <span className="text-sm">
                        {user?.name || 'Account'}
                      </span>
                    </button>
                    
                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Wishlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="inline h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => showLoginModal({ type: 'goToAccount', navigate })}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <User className="h-6 w-6" />
                    <Link className="text-sm" to="/login">Login</Link>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <div className="hidden md:block bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Mobile Navigation */}
          <nav className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile User Section */}
          <div className="px-4 py-3 border-t">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900">
                  Welcome, {user?.name}
                </div>
                <Link
                  to="/account"
                  className="block py-2 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  to="/orders"
                  className="block py-2 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-2 text-gray-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  showLoginModal({ type: 'goToAccount', navigate })
                  setIsMenuOpen(false)
                }}
                className="w-full text-left py-2 text-gray-600"
              >
                Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="px-4 py-3 border-t flex justify-around">
            <Link 
              to="/wishlist"
              className="flex flex-col items-center space-y-1 text-gray-600 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-6 w-6" />
              <span className="text-xs">Wishlist</span>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            <Link 
              to={isAuthenticated ? "/cart" : "#"}
              onClick={!isAuthenticated ? (e) => {
                e.preventDefault();
                showLoginModal({ type: 'goToCart', navigate });
                setIsMenuOpen(false);
              } : () => setIsMenuOpen(false)}
              className="flex flex-col items-center space-y-1 text-gray-600 relative"
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

export default Header
