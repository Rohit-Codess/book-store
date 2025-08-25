import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp.js';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const CartView = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartLoading, 
    updateCartQuantity, 
    removeFromCart, 
    isAuthenticated 
  } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please login to view your cart and continue shopping.
          </p>
          <button
            onClick={() => navigate('/login', { state: { from: '/cart' } })}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const totalAmount = cart?.totalAmount || 0;
  const finalAmount = cart?.finalAmount || totalAmount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any books to your cart yet.
            </p>
            <button
              onClick={() => navigate('/books')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartQuantity(bookId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (bookId) => {
    try {
      await removeFromCart(bookId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item) => {
                const book = item.book;
                return (
                  <div key={book._id || book.id} className="p-6 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      {/* Book Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={book.images?.[0] || '/images/books/placeholder.jpg'}
                          alt={book.title}
                          className="w-20 h-28 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/images/books/placeholder.jpg';
                          }}
                        />
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{book.author}</p>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-xl font-bold text-gray-900">
                            ₹{book.price?.selling || book.sellingPrice || book.price}
                          </span>
                          {(book.price?.mrp || book.mrp) && (book.price?.mrp || book.mrp) > (book.price?.selling || book.sellingPrice || book.price) && (
                            <span className="text-gray-500 line-through">
                              ₹{book.price?.mrp || book.mrp}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityChange(book._id || book.id, item.quantity - 1)}
                              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(book._id || book.id, item.quantity + 1)}
                              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(book._id || book.id)}
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                {finalAmount < totalAmount && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{totalAmount - finalAmount}</span>
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{finalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/books')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
