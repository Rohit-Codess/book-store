import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  Award
} from 'lucide-react';

const ProductDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock product data - in real app, fetch from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProduct = {
        id: id,
        title: "The Great Adventure",
        author: "John Smith",
        price: 299,
        originalPrice: 399,
        discount: 25,
        rating: 4.5,
        reviews: 1234,
        description: "An epic tale of courage, friendship, and discovery that will take you on an unforgettable journey through mystical lands and ancient secrets.",
        longDescription: "This captivating novel weaves together elements of fantasy, adventure, and coming-of-age storytelling. Follow the protagonist as they embark on a quest that challenges everything they thought they knew about themselves and the world around them. With rich character development and a plot full of unexpected twists, this book has captured the hearts of readers worldwide.",
        images: [
          "/images/section/homeSection/BookSections/1.jpg",
          "/images/section/homeSection/BookSections/2.jpg",
          "/images/section/homeSection/BookSections/3.jpg",
          "/images/section/homeSection/BookSections/4.jpg"
        ],
        category: "Fiction",
        publisher: "Penguin Random House",
        language: "English",
        pages: 456,
        isbn: "978-0123456789",
        dimensions: "15.2 x 22.9 x 2.5 cm",
        weight: "600g",
        inStock: true,
        features: [
          "Bestselling Author",
          "Award Winning Novel",
          "High Quality Print",
          "Premium Paper Quality"
        ],
        specifications: {
          "Author": "John Smith",
          "Publisher": "Penguin Random House",
          "Language": "English",
          "Pages": "456",
          "ISBN": "978-0123456789",
          "Dimensions": "15.2 x 22.9 x 2.5 cm",
          "Weight": "600g"
        }
      };
      setProduct(mockProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleAddToCart = () => {
    // Add to cart logic
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    // Buy now logic
    alert('Redirecting to checkout...');
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
            onClick={() => navigate('/books')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <button onClick={() => navigate('/')} className="text-gray-500 hover:text-blue-600">
                Home
              </button>
            </li>
            <li>
              <span className="text-gray-500">/</span>
              <button onClick={() => navigate('/books')} className="ml-1 text-gray-500 hover:text-blue-600">
                Books
              </button>
            </li>
            <li>
              <span className="text-gray-500">/</span>
              <span className="ml-1 text-gray-700">{product.category}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/500x500/4F46E5/white?text=${encodeURIComponent(product.title.slice(0, 10))}`;
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/100x100/4F46E5/white?text=${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Action Buttons for Mobile */}
              <div className="lg:hidden flex space-x-3">
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-lg text-gray-600">by {product.author}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {product.discount}% off
                  </span>
                </div>
                <p className="text-sm text-green-600">Free delivery</p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex-1"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex items-center justify-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex-1"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

              {/* Services */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">7 Day Return</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Warranty</span>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className="text-gray-700">{product.longDescription}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={`/images/section/homeSection/BookSections/${item}.jpg`}
                  alt={`Related book ${item}`}
                  className="w-full h-32 object-cover rounded mb-2"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/200x200/4F46E5/white?text=Book`;
                  }}
                />
                <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">Related Book {item}</h4>
                <p className="text-xs text-gray-600 mb-2">Author Name</p>
                <p className="font-bold text-sm text-gray-900">₹{299 + item * 50}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
