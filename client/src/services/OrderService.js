import ApiService from './ApiService.js';

class OrderService {
  // Create order
  async createOrder(orderData) {
    try {
      const response = await ApiService.post('/orders', orderData);
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Get user orders
  async getUserOrders(page = 1, limit = 10) {
    try {
      const response = await ApiService.get(`/orders?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error getting user orders:', error);
      // Return empty orders list as fallback
      return {
        success: false,
        data: {
          orders: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            pages: 0
          }
        },
        message: 'Failed to load orders'
      };
    }
  }

  // Get single order
  async getOrder(orderId) {
    try {
      const response = await ApiService.get(`/orders/${orderId}`);
      return response;
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  }

  // Cancel order
  async cancelOrder(orderId, reason) {
    try {
      const response = await ApiService.put(`/orders/${orderId}/cancel`, { reason });
      return response;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  }

  // Track order
  async trackOrder(orderId) {
    try {
      const response = await ApiService.get(`/orders/${orderId}/track`);
      return response;
    } catch (error) {
      console.error('Error tracking order:', error);
      // Return mock tracking data as fallback
      return {
        success: false,
        data: {
          orderId,
          status: 'Unknown',
          trackingSteps: [
            {
              status: 'Order Placed',
              date: new Date().toISOString(),
              description: 'Your order has been placed successfully'
            }
          ]
        },
        message: 'Unable to track order at the moment'
      };
    }
  }

  // Return order
  async returnOrder(orderId, reason) {
    try {
      const response = await ApiService.put(`/orders/${orderId}/return`, { reason });
      return response;
    } catch (error) {
      console.error('Error returning order:', error);
      throw error;
    }
  }

  // Rate order
  async rateOrder(orderId, ratings) {
    try {
      const response = await ApiService.post(`/orders/${orderId}/rate`, { ratings });
      return response;
    } catch (error) {
      console.error('Error rating order:', error);
      throw error;
    }
  }

  // Get order statistics
  async getOrderStats() {
    try {
      const response = await ApiService.get('/orders/stats');
      return response;
    } catch (error) {
      console.error('Error getting order stats:', error);
      return {
        success: false,
        data: {
          totalOrders: 0,
          pendingOrders: 0,
          completedOrders: 0,
          totalSpent: 0
        },
        message: 'Failed to load order statistics'
      };
    }
  }

  // Download invoice
  async downloadInvoice(orderId) {
    try {
      const response = await ApiService.get(`/orders/${orderId}/invoice`);
      return response;
    } catch (error) {
      console.error('Error downloading invoice:', error);
      throw error;
    }
  }

  // Update delivery address
  async updateDeliveryAddress(orderId, addressData) {
    try {
      const response = await ApiService.put(`/orders/${orderId}/address`, addressData);
      return response;
    } catch (error) {
      console.error('Error updating delivery address:', error);
      throw error;
    }
  }

  // Get order summary for checkout
  async getOrderSummary(cartData) {
    try {
      const response = await ApiService.post('/orders/summary', cartData);
      return response;
    } catch (error) {
      console.error('Error getting order summary:', error);
      // Calculate basic summary from cart data
      const items = cartData.items || [];
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
      const tax = Math.round(subtotal * 0.18); // 18% GST
      const total = subtotal + shipping + tax;

      return {
        success: false,
        data: {
          subtotal,
          shipping,
          tax,
          total,
          savings: 0
        },
        message: 'Using fallback calculation'
      };
    }
  }
}

export default new OrderService();
