import React, { useReducer, useEffect } from 'react';
import { storage } from '../utils/index.js';
import { ACTIONS } from '../utils/actions.js';
import { AppContext } from '../hooks/useApp.js';

// Initial state
const initialState = {
  user: null,
  cart: [],
  wishlist: [],
  isAuthenticated: false,
  loading: false,
  error: null
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

    case ACTIONS.ADD_TO_CART: {
      const existingCartItem = state.cart.find(item => item.id === action.payload.id);
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case ACTIONS.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ACTIONS.ADD_TO_WISHLIST: {
      const existingWishlistItem = state.wishlist.find(item => item.id === action.payload.id);
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
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
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

  // Load persisted state on mount
  useEffect(() => {
    const persistedCart = storage.get('cart', []);
    const persistedWishlist = storage.get('wishlist', []);
    const persistedUser = storage.get('user', null);

    if (persistedCart.length > 0) {
      persistedCart.forEach(item => {
        dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
      });
    }

    if (persistedWishlist.length > 0) {
      persistedWishlist.forEach(item => {
        dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: item });
      });
    }

    if (persistedUser) {
      dispatch({ type: ACTIONS.SET_USER, payload: persistedUser });
    }
  }, []);

  // Persist cart changes
  useEffect(() => {
    storage.set('cart', state.cart);
  }, [state.cart]);

  // Persist wishlist changes
  useEffect(() => {
    storage.set('wishlist', state.wishlist);
  }, [state.wishlist]);

  // Persist user changes
  useEffect(() => {
    if (state.user) {
      storage.set('user', state.user);
    } else {
      storage.remove('user');
    }
  }, [state.user]);

  // Action creators
  const actions = {
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
    addToCart: (item) => dispatch({ type: ACTIONS.ADD_TO_CART, payload: item }),
    removeFromCart: (id) => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id }),
    updateCartQuantity: (id, quantity) => dispatch({ 
      type: ACTIONS.UPDATE_CART_QUANTITY, 
      payload: { id, quantity } 
    }),
    clearCart: () => dispatch({ type: ACTIONS.CLEAR_CART }),
    addToWishlist: (item) => dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: item }),
    removeFromWishlist: (id) => dispatch({ type: ACTIONS.REMOVE_FROM_WISHLIST, payload: id }),
    logout: () => dispatch({ type: ACTIONS.LOGOUT })
  };

  const value = {
    ...state,
    ...actions
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
