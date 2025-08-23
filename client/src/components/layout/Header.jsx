import { useState } from 'react'
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react'
import { useApp } from '../../hooks/useApp.js'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cart, wishlist, user, isAuthenticated } = useApp()

  const menuItems = ['Books', 'Stationery', 'School', 'Authors', 'Publishers']
  
  const searchSuggestions = [
    'Fiction Books',
    'Kannada Literature',
    'Children Stories',
    'Academic Books',
    'Textbooks'
  ]

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const wishlistItemCount = wishlist.length

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">Book World</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for books, authors, publishers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
              
              {/* Search Suggestions */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
                  {searchSuggestions
                    .filter(suggestion => 
                      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSearchQuery(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Heart className="h-6 w-6" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <User className="h-6 w-6" />
                <span className="text-sm">
                  {isAuthenticated ? user?.firstName || 'Account' : 'Login'}
                </span>
              </button>
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
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="py-2">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Icons */}
          <div className="px-4 py-3 border-t flex justify-around">
            <button className="flex flex-col items-center space-y-1 text-gray-600 relative">
              <Heart className="h-6 w-6" />
              <span className="text-xs">Wishlist</span>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </button>
            <button className="flex flex-col items-center space-y-1 text-gray-600 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xs">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="flex flex-col items-center space-y-1 text-gray-600">
              <User className="h-6 w-6" />
              <span className="text-xs">
                {isAuthenticated ? 'Account' : 'Login'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
