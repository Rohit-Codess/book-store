import React, { useReducer, useEffect } from 'react';
import { storage } from '../utils/index.js';
import { ACTIONS } from '../utils/actions.js';
import { AppContext } from '../hooks/useApp.js';
import AuthService from '../services/AuthService.js';
import CartService from '../services/CartService.js';
import BookService from '../services/BookService.js';

// Initial state
const initialState = {
  // User state
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Cart state
  cart: { items: [], totalItems: 0, totalAmount: 0, finalAmount: 0 },
  cartLoading: false,

  // Books state
  books: [],
  featuredBooks: [],
  bestsellers: [],
  categories: [],
  booksLoading: false,

  // Wishlist state
  wishlist: [],

  // UI state
  showLoginModal: false, // Keep for backward compatibility, but not used
  showCartModal: false,
  notifications: [],

  // Search state
  searchQuery: '',
  searchResults: [],
  isSearching: false
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case ACTIONS.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };

    case ACTIONS.SET_CART:
      return {
        ...state,
        cart: action.payload
      };

    case ACTIONS.SET_CART_LOADING:
      return {
        ...state,
        cartLoading: action.payload
      };

    case ACTIONS.ADD_TO_CART: {
      const existingCartItem = state.cart.items?.find(item => item.book?._id === action.payload.id || item.book?.id === action.payload.id);
      if (existingCartItem) {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.map(item =>
              (item.book?._id === action.payload.id || item.book?.id === action.payload.id)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        };
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...(state.cart.items || []), { book: action.payload, quantity: 1 }]
        }
      };
    }

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: (state.cart.items || []).filter(item => 
            item.book?._id !== action.payload && item.book?.id !== action.payload
          )
        }
      };

    case ACTIONS.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: (state.cart.items || []).map(item =>
            (item.book?._id === action.payload.id || item.book?.id === action.payload.id)
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
        }
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: { items: [], totalItems: 0, totalAmount: 0, finalAmount: 0 }
      };

    case ACTIONS.UPDATE_CART_COUNT:
      return {
        ...state,
        cart: {
          ...state.cart,
          totalItems: action.payload
        }
      };

    case ACTIONS.SET_BOOKS:
      return {
        ...state,
        books: action.payload
      };

    case ACTIONS.SET_FEATURED_BOOKS:
      return {
        ...state,
        featuredBooks: action.payload
      };

    case ACTIONS.SET_BESTSELLERS:
      return {
        ...state,
        bestsellers: action.payload
      };

    case ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };

    case ACTIONS.SET_BOOKS_LOADING:
      return {
        ...state,
        booksLoading: action.payload
      };

    case ACTIONS.SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload
      };

    case ACTIONS.ADD_TO_WISHLIST: {
      const existingWishlistItem = state.wishlist.find(item => item.id === action.payload.id || item._id === action.payload._id);
      if (existingWishlistItem) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    }

    case ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload && item._id !== action.payload)
      };

    case ACTIONS.SHOW_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: true
      };

    case ACTIONS.HIDE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: false
      };

    case ACTIONS.SHOW_CART_MODAL:
      return {
        ...state,
        showCartModal: true
      };

    case ACTIONS.HIDE_CART_MODAL:
      return {
        ...state,
        showCartModal: false
      };

    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };

    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };

    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };

    case ACTIONS.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };

    case ACTIONS.SET_SEARCHING:
      return {
        ...state,
        isSearching: action.payload
      };

    case ACTIONS.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};


// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize app
  useEffect(() => {
    initializeApp();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize app data
  const initializeApp = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      // Initialize auth token from localStorage
      AuthService.initializeAuth();

      // Check if user is authenticated
      const token = AuthService.getToken();
      if (token) {
        try {
          const userResponse = await AuthService.getCurrentUser();
          if (userResponse.success) {
            dispatch({ type: ACTIONS.SET_USER, payload: userResponse.data });
            
            // Load user's cart
            await loadCart();
          }
        } catch (error) {
          console.error('Error loading user:', error);
          // Clear invalid token
          AuthService.logout();
        }
      } else {
        // Load persisted state for non-authenticated users
        const persistedCart = storage.get('cart', []);
        if (persistedCart.length > 0) {
          dispatch({ type: ACTIONS.SET_CART, payload: { items: persistedCart.map(item => ({ book: item, quantity: item.quantity || 1 })), totalItems: persistedCart.length, totalAmount: 0, finalAmount: 0 } });
        }
      }

      // Load initial book data
      await loadInitialBooks();

    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Load initial books data
  const loadInitialBooks = async () => {
    try {
      dispatch({ type: ACTIONS.SET_BOOKS_LOADING, payload: true });

      // Load featured books and bestsellers in parallel
      const [featuredResponse, bestsellersResponse, categoriesResponse] = await Promise.all([
        BookService.getFeaturedBooks().catch(() => []),
        BookService.getBestsellers().catch(() => []),
        BookService.getCategories().catch(() => [])
      ]);

      dispatch({ type: ACTIONS.SET_FEATURED_BOOKS, payload: featuredResponse });
      dispatch({ type: ACTIONS.SET_BESTSELLERS, payload: bestsellersResponse });
      dispatch({ type: ACTIONS.SET_CATEGORIES, payload: categoriesResponse });

    } catch (error) {
      console.error('Error loading initial books:', error);
    } finally {
      dispatch({ type: ACTIONS.SET_BOOKS_LOADING, payload: false });
    }
  };

  // Load cart
  const loadCart = async () => {
    try {
      dispatch({ type: ACTIONS.SET_CART_LOADING, payload: true });
      const response = await CartService.getCart();
      
      if (response.success) {
        dispatch({ type: ACTIONS.SET_CART, payload: response.data });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      dispatch({ type: ACTIONS.SET_CART_LOADING, payload: false });
    }
  };

  // Persist cart changes for non-authenticated users
  useEffect(() => {
    if (!state.isAuthenticated && state.cart.items) {
      const cartItems = state.cart.items.map(item => ({ ...item.book, quantity: item.quantity }));
      storage.set('cart', cartItems);
    }
  }, [state.cart, state.isAuthenticated]);

  // Action creators with backend integration
  // Handle post-login action

  const actions = {
    // User actions
  login: async (credentials) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const response = await AuthService.login(credentials);
        
        if (response.success) {
          dispatch({ type: ACTIONS.SET_USER, payload: response.user });
          
          // Sync local cart with server if exists
          try {
            if (state.cart.items && state.cart.items.length > 0) {
              for (const item of state.cart.items) {
                await CartService.addToCart(item.book.id || item.book._id, item.quantity);
              }
            }
            // Clear local cart and load server cart
            await loadCart();
          } catch (error) {
            console.error('Error syncing cart:', error);
          }
          
          showNotification('Login successful!', 'success');
          return { success: true, user: response.user };
        }
        
        return response;
      } catch (error) {
        console.error('Login error:', error);
        showNotification(error.message || 'Login failed', 'error');
        throw error;
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },

  register: async (userData) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const response = await AuthService.register(userData);
        
        if (response.success) {
          dispatch({ type: ACTIONS.SET_USER, payload: response.user });
          
          showNotification('Registration successful!', 'success');
          return { success: true, user: response.user };
        }
        
        return response;
      } catch (error) {
        console.error('Registration error:', error);
        showNotification(error.message || 'Registration failed', 'error');
        throw error;
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },

    logout: async () => {
      try {
        await AuthService.logout();
        dispatch({ type: ACTIONS.LOGOUT });
        showNotification('Logged out successfully', 'info');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },

    // Cart actions
    addToCart: async (book, quantity = 1) => {
      try {
        if (!state.isAuthenticated) {
          // No longer show modal, user will be redirected by ProtectedRoute
          showNotification('Please login to add items to cart', 'warning');
          return { success: false, requiresLogin: true };
        }

        const response = await CartService.addToCart(book.id || book._id, quantity);
        
        if (response.success) {
          dispatch({ type: ACTIONS.SET_CART, payload: response.data });
          showNotification('Item added to cart!', 'success');
          return { success: true };
        }
        
        return response;
      } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification(error.message || 'Failed to add item to cart', 'error');
        throw error;
      }
    },

    updateCartQuantity: async (bookId, quantity) => {
      try {
        if (state.isAuthenticated) {
          const response = await CartService.updateCartItem(bookId, quantity);
          
          if (response.success) {
            dispatch({ type: ACTIONS.SET_CART, payload: response.data });
            return { success: true };
          }
          
          return response;
        } else {
          // For non-authenticated users, update local cart
          dispatch({ type: ACTIONS.UPDATE_CART_QUANTITY, payload: { id: bookId, quantity } });
          return { success: true };
        }
      } catch (error) {
        console.error('Error updating cart item:', error);
        showNotification('Failed to update cart item', 'error');
        throw error;
      }
    },

    removeFromCart: async (bookId) => {
      try {
        if (state.isAuthenticated) {
          const response = await CartService.removeFromCart(bookId);
          
          if (response.success) {
            dispatch({ type: ACTIONS.SET_CART, payload: response.data });
            showNotification('Item removed from cart', 'info');
            return { success: true };
          }
          
          return response;
        } else {
          // For non-authenticated users, update local cart
          dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: bookId });
          showNotification('Item removed from cart', 'info');
          return { success: true };
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        showNotification('Failed to remove item from cart', 'error');
        throw error;
      }
    },

    clearCart: () => dispatch({ type: ACTIONS.CLEAR_CART }),

    // Search actions
    searchBooks: async (query) => {
      try {
        dispatch({ type: ACTIONS.SET_SEARCHING, payload: true });
        dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
        
        if (query.trim()) {
          const results = await BookService.searchBooks(query);
          dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: results });
        } else {
          dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: [] });
        }
      } catch (error) {
        console.error('Error searching books:', error);
        dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: [] });
      } finally {
        dispatch({ type: ACTIONS.SET_SEARCHING, payload: false });
      }
    },

    // UI actions
    showLoginModal: (payload) => dispatch({ type: ACTIONS.SHOW_LOGIN_MODAL, payload }),
    hideLoginModal: () => dispatch({ type: ACTIONS.HIDE_LOGIN_MODAL }),
    showCartModal: () => dispatch({ type: ACTIONS.SHOW_CART_MODAL }),
    hideCartModal: () => dispatch({ type: ACTIONS.HIDE_CART_MODAL }),

    // Generic actions
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
    addToWishlist: (item) => dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: item }),
    removeFromWishlist: (id) => dispatch({ type: ACTIONS.REMOVE_FROM_WISHLIST, payload: id })
  };

  // Notification system
  const showNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const notification = { id, message, type };
    
    dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: notification });
    
    // Auto remove notification
    setTimeout(() => {
      dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id });
    }, duration);
  };

  const value = {
    ...state,
    ...actions,
    showNotification,
    loadCart,
    loadInitialBooks
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
