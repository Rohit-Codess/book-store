import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Shield,
  Truck,
  RotateCcw,
  Award,
  Minus,
  Plus
} from 'lucide-react';
import { useApp } from '../hooks/useApp.js';

const ProductDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, isAuthenticated, showLoginModal, showNotification } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      const clickedProduct = location.state.product;
      // Create enhanced product data using the actual clicked product
      const enhancedProduct = {
        ...clickedProduct,
        // Use the exact image from the clicked card as the main image
        images: [
          clickedProduct.image || clickedProduct.cover || `/images/section/homeSection/BookSections/${((parseInt(id) - 1) % 31) + 1}.jpg`, // Main image from clicked card
          `/images/section/homeSection/BookSections/${((parseInt(id) - 1) % 31) + 1}.jpg`,
          `/images/section/homeSection/BookSections/${((parseInt(id) - 1) % 31) + 2}.jpg`,
          `/images/section/homeSection/BookSections/${((parseInt(id) - 1) % 31) + 3}.jpg`
        ],
        // Enhanced details for Flipkart-like experience
        longDescription: clickedProduct.description || 
          `Discover the amazing world of ${clickedProduct.title || clickedProduct.name}. This product offers exceptional quality and value, making it a perfect choice for your needs. With careful attention to detail and superior craftsmanship, this item will exceed your expectations.`,
        features: [
          "Premium Quality",
          "Best Seller",
          "Customer Favorite",
          "Fast Delivery"
        ],
        specifications: {
          "Title": clickedProduct.title || clickedProduct.name,
          "Author/Brand": clickedProduct.author || clickedProduct.brand || "Premium Brand",
          "Category": clickedProduct.category || "Books",
          "Language": "English",
          "Pages": clickedProduct.pages || "300+",
          "ISBN/SKU": `${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          "Dimensions": "15 x 23 x 2 cm",
          "Weight": "500g"
        },
        inStock: true,
        seller: "Book World Official",
        warranty: "1 Year Warranty",
        returnPolicy: "7 Days Return Policy"
      };
      
      setProduct(enhancedProduct);
      setLoading(false);
    } else {
      // Fallback: create mock product data based on the ID
      const mockProduct = {
        id: id,
        title: `The Great Adventure`,
        author: "John Smith",
        price: 299,
        originalPrice: 399,
        discount: 25,
        rating: 4.5,
        reviews: 1234,
        description: "A captivating story that will keep you engaged from start to finish.",
        images: [
          `/images/section/homeSection/BookSections/${((parseInt(id) - 1) % 31) + 1}.jpg`,
          `/images/section/homeSection/BookSections/${((parseInt(id) - 1) % 31) + 2}.jpg`,
          `/images/section/homeSection/BookSections/${((parseInt(id) - 1) % 31) + 3}.jpg`,
          `/images/section/homeSection/BookSections/${((parseInt(id) - 1) % 31) + 4}.jpg`
        ],
        longDescription: "Discover the amazing world of The Great Adventure. This product offers exceptional quality and value, making it a perfect choice for your needs. With careful attention to detail and superior craftsmanship, this item will exceed your expectations.",
        features: [
          "Premium Quality",
          "Best Seller",
          "Customer Favorite",
          "Fast Delivery"
        ],
        specifications: {
          "Title": "The Great Adventure",
          "Author/Brand": "John Smith",
          "Category": "Books",
          "Language": "English",
          "Pages": "300+",
          "ISBN/SKU": `${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          "Dimensions": "15 x 23 x 2 cm",
          "Weight": "500g"
        },
        inStock: true,
        seller: "Book World Official",
        warranty: "1 Year Warranty",
        returnPolicy: "7 Days Return Policy"
      };
      
      setProduct(mockProduct);
      setLoading(false);
    }
  }, [location.state, id]);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showNotification(
      !isWishlisted ? "Added to Wishlist" : "Removed from Wishlist",
      !isWishlisted ? "success" : "info"
    );
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showLoginModal({ type: 'addToCart', payload: { book: product, quantity } });
      return;
    }

    try {
      await addToCart(product, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = () => {
    showNotification("Proceeding to Checkout", "success");
    setTimeout(() => {
      // In real app, navigate to checkout
      console.log("Navigate to checkout with:", product);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
                Home
              </button>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800">
                Products
              </button>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-700 truncate max-w-xs">
                {product.title || product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images Section */}
            <div className="space-y-4">
              {/* Main Image Display */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title || product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.log('Image failed to load:', e.target.src);
                    e.target.src = `https://placehold.co/500x500/4F46E5/white?text=${encodeURIComponent((product.title || product.name).slice(0, 15))}`;
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Thumbnail failed to load:', e.target.src);
                        e.target.src = `https://placehold.co/100x100/4F46E5/white?text=${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Action Buttons for Mobile */}
              <div className="lg:hidden flex space-x-3">
                <button 
                  onClick={handleWishlist}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="space-y-6">
              {/* Product Title & Seller */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                  {product.title || product.name}
                </h1>
                {product.author && (
                  <p className="text-lg text-gray-600 mb-2">by {product.author}</p>
                )}
                <p className="text-sm text-gray-500">
                  Sold by: <span className="text-blue-600">{product.seller}</span>
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(
                            typeof product.rating === 'object' 
                              ? product.rating?.average || 4.5 
                              : product.rating || 4.5
                          ) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {typeof product.rating === 'object' 
                      ? (product.rating?.average || 4.5).toFixed(1)
                      : (product.rating || 4.5).toFixed(1)
                    }
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({(product.reviews || 1234).toLocaleString()} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price?.selling || product.price}
                  </span>
                  {(product.price?.mrp || product.originalPrice) && (product.price?.mrp || product.originalPrice) > (product.price?.selling || product.price) && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.price?.mrp || product.originalPrice}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        {Math.round((((product.price?.mrp || product.originalPrice) - (product.price?.selling || product.price)) / (product.price?.mrp || product.originalPrice)) * 100)}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-green-600 font-medium">Free delivery available</p>
              </div>

              {/* Key Features */}
              {product.features && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Key Features:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-50 border-r border-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-50 border-l border-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center space-x-2 bg-yellow-500 text-gray-900 px-8 py-3 rounded font-semibold hover:bg-yellow-600 transition-colors flex-1"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>ADD TO CART</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex items-center justify-center space-x-2 bg-orange-500 text-white px-8 py-3 rounded font-semibold hover:bg-orange-600 transition-colors flex-1"
                  >
                    <span>BUY NOW</span>
                  </button>
                </div>

                {/* Wishlist & Share - Desktop */}
                <div className="hidden lg:flex items-center space-x-4 pt-4">
                  <button 
                    onClick={handleWishlist}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded transition-colors ${
                      isWishlisted 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Services */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                    <p className="text-xs text-gray-600">On orders above ₹499</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">7 Days Return</p>
                    <p className="text-xs text-gray-600">Easy returns</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Warranty</p>
                    <p className="text-xs text-gray-600">{product.warranty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <div className="prose prose-sm text-gray-700">
                    <p className="mb-4">{product.description}</p>
                    {product.longDescription && <p>{product.longDescription}</p>}
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
