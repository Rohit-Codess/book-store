import ApiService from './ApiService.js';

class CartService {
  // Get cart
  async getCart() {
    try {
      const response = await ApiService.get('/cart');
      return response;
    } catch (error) {
      console.error('Error getting cart:', error);
      // Fallback to local storage for non-authenticated users
      return this.getLocalCart();
    }
  }

  // Add item to cart
  async addToCart(bookId, quantity = 1) {
    try {
      const response = await ApiService.post('/cart/add', { bookId, quantity });
      return response;
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Fallback to local storage for non-authenticated users
      return this.addToLocalCart(bookId, quantity);
    }
  }

  // Update cart item quantity
  async updateCartItem(bookId, quantity) {
    try {
      const response = await ApiService.put('/cart/update', { bookId, quantity });
      return response;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return this.updateLocalCartItem(bookId, quantity);
    }
  }

  // Remove item from cart
  async removeFromCart(bookId) {
    try {
      const response = await ApiService.delete(`/cart/remove/${bookId}`);
      return response;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return this.removeFromLocalCart(bookId);
    }
  }

  // Clear cart
  async clearCart() {
    try {
      const response = await ApiService.delete('/cart/clear');
      return response;
    } catch (error) {
      console.error('Error clearing cart:', error);
      localStorage.removeItem('cart');
      return { success: true, data: { items: [], totalItems: 0, totalAmount: 0, finalAmount: 0 } };
    }
  }

  // Get cart summary
  async getCartSummary() {
    try {
      const response = await ApiService.get('/cart/summary');
      return response;
    } catch (error) {
      console.error('Error getting cart summary:', error);
      const localCart = this.getLocalCart();
      return localCart;
    }
  }

  // Get cart item count
  async getCartItemCount() {
    try {
      const response = await ApiService.get('/cart/count');
      return response;
    } catch (error) {
      console.error('Error getting cart count:', error);
      const localCart = this.getLocalCart();
      return { success: true, data: { count: localCart.data?.totalItems || 0 } };
    }
  }

  // Apply coupon
  async applyCoupon(couponCode) {
    try {
      const response = await ApiService.post('/cart/coupon', { couponCode });
      return response;
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw error;
    }
  }

  // Local storage fallback methods
  getLocalCart() {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.length;
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      
      return {
        success: true,
        data: {
          items: cart.map(item => ({
            book: item,
            quantity: item.quantity || 1
          })),
          totalItems,
          totalAmount,
          finalAmount: totalAmount
        }
      };
    } catch (error) {
      console.error('Error getting local cart:', error);
      return {
        success: true,
        data: { items: [], totalItems: 0, totalAmount: 0, finalAmount: 0 }
      };
    }
  }

  addToLocalCart(bookId, quantity) {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = cart.findIndex(item => item.id === bookId || item._id === bookId);
      
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + quantity;
      } else {
        // Note: This would need the full book object, which should be passed from the calling component
        cart.push({ id: bookId, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return this.getLocalCart();
    } catch (error) {
      console.error('Error adding to local cart:', error);
      return { success: false, message: 'Failed to add to cart' };
    }
  }

  updateLocalCartItem(bookId, quantity) {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const itemIndex = cart.findIndex(item => item.id === bookId || item._id === bookId);
      
      if (itemIndex > -1) {
        if (quantity <= 0) {
          cart.splice(itemIndex, 1);
        } else {
          cart[itemIndex].quantity = quantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      
      return this.getLocalCart();
    } catch (error) {
      console.error('Error updating local cart item:', error);
      return { success: false, message: 'Failed to update cart item' };
    }
  }

  removeFromLocalCart(bookId) {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const filteredCart = cart.filter(item => item.id !== bookId && item._id !== bookId);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
      return this.getLocalCart();
    } catch (error) {
      console.error('Error removing from local cart:', error);
      return { success: false, message: 'Failed to remove from cart' };
    }
  }

  // Sync local cart with server after login
  async syncLocalCartWithServer() {
    try {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (localCart.length > 0) {
        for (const item of localCart) {
          await this.addToCart(item.id || item._id, item.quantity || 1);
        }
        localStorage.removeItem('cart'); // Clear local cart after sync
      }
      return { success: true };
    } catch (error) {
      console.error('Error syncing cart:', error);
      return { success: false, message: 'Failed to sync cart' };
    }
  }
}

export default new CartService();
