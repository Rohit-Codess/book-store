import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';

const FlipkartHome = () => {
  const topCategories = [
    {
      name: 'Mobiles',
      image: '/images/section/homeSection/TopCategories/mobile.jpg',
      offer: 'Up to 40% Off',
      path: '/mobiles'
    },
    {
      name: 'Fashion',
      image: '/images/section/homeSection/TopCategories/fashion.jpg',
      offer: 'Min 50% Off',
      path: '/fashion'
    },
    {
      name: 'Electronics',
      image: '/images/section/homeSection/TopCategories/electronics.jpg',
      offer: 'Up to 80% Off',
      path: '/electronics'
    },
    {
      name: 'Home & Kitchen',
      image: '/images/section/homeSection/TopCategories/home.jpg',
      offer: 'Up to 70% Off',
      path: '/home'
    },
    {
      name: 'Books',
      image: '/images/section/homeSection/TopCategories/books.jpg',
      offer: 'Up to 60% Off',
      path: '/books'
    },
    {
      name: 'Beauty',
      image: '/images/section/homeSection/TopCategories/beauty.jpg',
      offer: 'Up to 50% Off',
      path: '/beauty'
    },
    {
      name: 'Sports',
      image: '/images/section/homeSection/TopCategories/sports.jpg',
      offer: 'Up to 40% Off',
      path: '/sports'
    },
    {
      name: 'Grocery',
      image: '/images/section/homeSection/TopCategories/grocery.jpg',
      offer: 'Up to 30% Off',
      path: '/grocery'
    }
  ];

  const deals = [
    {
      title: "Best of Electronics",
      products: [
        { name: "iPhone 15", price: "₹79,900", originalPrice: "₹84,900", discount: "6% off", rating: 4.5, image: "/images/books/1.jpg" },
        { name: "Samsung Galaxy S24", price: "₹69,999", originalPrice: "₹74,999", discount: "7% off", rating: 4.3, image: "/images/books/2.jpg" },
        { name: "MacBook Air M2", price: "₹1,14,900", originalPrice: "₹1,19,900", discount: "4% off", rating: 4.7, image: "/images/books/3.jpg" },
        { name: "iPad Pro 11", price: "₹71,900", originalPrice: "₹76,900", discount: "7% off", rating: 4.6, image: "/images/books/4.jpg" },
        { name: "Sony WH-1000XM5", price: "₹24,990", originalPrice: "₹29,990", discount: "17% off", rating: 4.4, image: "/images/books/5.jpg" },
        { name: "Dell XPS 13", price: "₹89,990", originalPrice: "₹99,990", discount: "10% off", rating: 4.5, image: "/images/books/6.jpg" }
      ]
    },
    {
      title: "Best Sellers in Books",
      products: [
        { name: "Atomic Habits", price: "₹399", originalPrice: "₹599", discount: "33% off", rating: 4.8, image: "/images/books/BookSections/1.jpg" },
        { name: "Rich Dad Poor Dad", price: "₹299", originalPrice: "₹399", discount: "25% off", rating: 4.6, image: "/images/books/BookSections/2.jpg" },
        { name: "The Psychology of Money", price: "₹349", originalPrice: "₹499", discount: "30% off", rating: 4.7, image: "/images/books/BookSections/3.jpg" },
        { name: "Think and Grow Rich", price: "₹249", originalPrice: "₹349", discount: "29% off", rating: 4.5, image: "/images/books/BookSections/4.jpg" },
        { name: "The Alchemist", price: "₹199", originalPrice: "₹299", discount: "33% off", rating: 4.9, image: "/images/books/BookSections/5.jpg" },
        { name: "Sapiens", price: "₹449", originalPrice: "₹599", discount: "25% off", rating: 4.4, image: "/images/books/BookSections/6.jpg" }
      ]
    }
  ];

  const banners = [
    {
      image: "/images/section/homeSection/BannerCarousel/1.jpeg",
      alt: "Monsoon Sale"
    },
    {
      image: "/images/section/homeSection/BannerCarousel/2.jpeg",
      alt: "Electronics Sale"
    },
    {
      image: "/images/section/homeSection/BannerCarousel/3.jpeg",
      alt: "Fashion Sale"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Banner Carousel */}
      <div className="bg-white mb-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
            {/* Categories Sidebar */}
            <div className="hidden lg:block bg-white border-r">
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-4">Top Categories</h3>
                <div className="space-y-3">
                  {topCategories.slice(0, 6).map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Banner */}
            <div className="lg:col-span-3">
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={banners[0].image}
                  alt={banners[0].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-2">Mega Sale</h2>
                    <p className="text-lg lg:text-xl mb-4">Up to 80% Off on Electronics</p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-sm font-medium">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white mb-2">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
            {topCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-center group"
              >
                <div className="bg-gray-100 rounded-full w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-2 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/section/homeSection/CategoriesGrid/1.jpg';
                    }}
                  />
                </div>
                <h3 className="text-xs lg:text-sm font-medium text-gray-800 mb-1">{category.name}</h3>
                <p className="text-xs text-green-600 font-medium">{category.offer}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Deals Sections */}
      {deals.map((section, index) => (
        <div key={index} className="bg-white mb-2">
          <div className="max-w-screen-xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl lg:text-2xl font-medium text-gray-800">{section.title}</h2>
              <Link
                to="/deals"
                className="text-[#2874f0] hover:underline text-sm font-medium flex items-center"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {section.products.map((product, productIndex) => (
                <Link
                  key={productIndex}
                  to={`/product/${productIndex}`}
                  className="border border-gray-200 rounded-sm p-3 hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-square bg-gray-100 rounded mb-3 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.src = '/images/books/BookSections/1.jpg';
                      }}
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                      <span>{product.rating}</span>
                      <Star className="h-3 w-3 ml-1 fill-current" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-900">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">{product.discount}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Banner */}
      <div className="bg-white mb-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-4">
            {banners.slice(1).map((banner, index) => (
              <div key={index} className="relative h-48 lg:h-32 rounded overflow-hidden">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">ABOUT</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="hover:text-[#2874f0]">Contact Us</Link></li>
                <li><Link to="/about" className="hover:text-[#2874f0]">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-[#2874f0]">Careers</Link></li>
                <li><Link to="/stories" className="hover:text-[#2874f0]">Book World</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-3">HELP</h4>
              <ul className="space-y-2">
                <li><Link to="/payments" className="hover:text-[#2874f0]">Payments</Link></li>
                <li><Link to="/shipping" className="hover:text-[#2874f0]">Shipping</Link></li>
                <li><Link to="/cancellation" className="hover:text-[#2874f0]">Cancellation & Returns</Link></li>
                <li><Link to="/faq" className="hover:text-[#2874f0]">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-3">POLICY</h4>
              <ul className="space-y-2">
                <li><Link to="/return-policy" className="hover:text-[#2874f0]">Return Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#2874f0]">Terms of Use</Link></li>
                <li><Link to="/security" className="hover:text-[#2874f0]">Security</Link></li>
                <li><Link to="/privacy" className="hover:text-[#2874f0]">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-3">SOCIAL</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-[#2874f0]">Facebook</Link></li>
                <li><Link to="#" className="hover:text-[#2874f0]">Twitter</Link></li>
                <li><Link to="#" className="hover:text-[#2874f0]">YouTube</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipkartHome;
