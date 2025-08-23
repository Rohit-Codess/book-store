import { useState, useEffect } from 'react';
import BookService from '../services/BookService.js';

/**
 * BookController - Manages book-related state and operations
 */
export const useBookController = () => {
  const [books, setBooks] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all books
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to load books');
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load bestsellers
  const loadBestsellers = async () => {
    try {
      setLoading(true);
      const data = await BookService.getBestsellers();
      setBestsellers(data);
    } catch (err) {
      setError('Failed to load bestsellers');
      console.error('Error loading bestsellers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load new arrivals
  const loadNewArrivals = async () => {
    try {
      setLoading(true);
      const data = await BookService.getNewArrivals();
      setNewArrivals(data);
    } catch (err) {
      setError('Failed to load new arrivals');
      console.error('Error loading new arrivals:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search books
  const searchBooks = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await BookService.searchBooks(query);
      setBooks(data);
    } catch (err) {
      setError('Failed to search books');
      console.error('Error searching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get books by section
  const getBooksBySection = (section) => {
    switch (section) {
      case 'deals':
        return books.filter(book => book.isOnSale());
      case 'preorders':
        return books.filter(book => book.isPreOrder);
      case 'new-arrivals':
        return newArrivals;
      case 'fiction':
        return books.filter(book => book.category.toLowerCase() === 'fiction');
      case 'young-adult':
        return books.filter(book => book.category.toLowerCase() === 'young adult');
      case 'children':
        return books.filter(book => book.category.toLowerCase() === 'children');
      default:
        return books;
    }
  };

  // Initialize data on mount
  useEffect(() => {
    loadBooks();
    loadBestsellers();
    loadNewArrivals();
  }, []);

  return {
    books,
    bestsellers,
    newArrivals,
    loading,
    error,
    loadBooks,
    loadBestsellers,
    loadNewArrivals,
    searchBooks,
    getBooksBySection
  };
};
