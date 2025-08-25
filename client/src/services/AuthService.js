import ApiService from './ApiService.js';

class AuthService {
  // Register user
  async register(userData) {
    try {
      const response = await ApiService.post('/auth/register', userData);
      if (response.success && response.token) {
        this.setAuthToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await ApiService.post('/auth/login', credentials);
      if (response.success && response.token) {
        this.setAuthToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await ApiService.get('/auth/me');
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        this.logout();
      }
      throw error;
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await ApiService.put('/auth/me', userData);
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Add address
  async addAddress(addressData) {
    try {
      const response = await ApiService.post('/auth/address', addressData);
      return response;
    } catch (error) {
      console.error('Add address error:', error);
      throw error;
    }
  }

  // Update address
  async updateAddress(addressId, addressData) {
    try {
      const response = await ApiService.put(`/auth/address/${addressId}`, addressData);
      return response;
    } catch (error) {
      console.error('Update address error:', error);
      throw error;
    }
  }

  // Delete address
  async deleteAddress(addressId) {
    try {
      const response = await ApiService.delete(`/auth/address/${addressId}`);
      return response;
    } catch (error) {
      console.error('Delete address error:', error);
      throw error;
    }
  }

  // Add to wishlist
  async addToWishlist(bookId) {
    try {
      const response = await ApiService.post(`/auth/wishlist/${bookId}`);
      return response;
    } catch (error) {
      console.error('Add to wishlist error:', error);
      throw error;
    }
  }

  // Remove from wishlist
  async removeFromWishlist(bookId) {
    try {
      const response = await ApiService.delete(`/auth/wishlist/${bookId}`);
      return response;
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      throw error;
    }
  }

  // Get wishlist
  async getWishlist() {
    try {
      const response = await ApiService.get('/auth/wishlist');
      return response;
    } catch (error) {
      console.error('Get wishlist error:', error);
      throw error;
    }
  }

  // Set auth token
  setAuthToken(token) {
    if (token) {
      ApiService.setAuthToken(token);
      localStorage.setItem('authToken', token);
    }
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('authToken') || ApiService.getAuthToken();
  }

  // Logout
  logout() {
    ApiService.removeAuthToken();
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('cart');
  }

  // Check if user is logged in
  isLoggedIn() {
    const token = this.getToken();
    const user = localStorage.getItem('user');
    return !!token && !!user;
  }

  // Get current user from localStorage
  getCurrentUserFromStorage() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Initialize auth token from localStorage
  initializeAuth() {
    const token = localStorage.getItem('authToken');
    if (token) {
      ApiService.setAuthToken(token);
    }
  }
}

export default new AuthService();
