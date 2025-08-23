import Book from '../models/Book.js';

/**
 * BookService - Handles all book-related API calls and business logic
 */
class BookService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  // Mock data for development
  getMockBooks() {
    return [
      new Book({
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 299,
        originalPrice: 399,
        image: "https://via.placeholder.com/200x300/4F46E5/white?text=Book+1",
        category: "Fiction",
        rating: 4.5,
        reviews: 1250,
        isBestseller: true,
        isNewArrival: false
      }),
      new Book({
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 399,
        originalPrice: 499,
        image: "https://via.placeholder.com/200x300/7C3AED/white?text=Book+2",
        category: "Self Help",
        rating: 4.8,
        reviews: 2100,
        isBestseller: true,
        isNewArrival: true
      }),
      new Book({
        id: 3,
        title: "Kannada Sahitya",
        author: "Kuvempu",
        price: 250,
        originalPrice: 300,
        image: "https://via.placeholder.com/200x300/059669/white?text=Book+3",
        category: "Kannada",
        rating: 4.3,
        reviews: 856
      }),
      new Book({
        id: 4,
        title: "Harry Potter Series",
        author: "J.K. Rowling",
        price: 1299,
        originalPrice: 1599,
        image: "https://via.placeholder.com/200x300/DC2626/white?text=Book+4",
        category: "Fantasy",
        rating: 4.9,
        reviews: 5200,
        isBestseller: true
      }),
      new Book({
        id: 5,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 199,
        originalPrice: 249,
        image: "https://via.placeholder.com/200x300/F59E0B/white?text=Book+5",
        category: "Fiction",
        rating: 4.4,
        reviews: 3800,
        isNewArrival: true
      }),
      new Book({
        id: 6,
        title: "Young Adult Romance",
        author: "Rainbow Rowell",
        price: 349,
        originalPrice: 449,
        image: "https://via.placeholder.com/200x300/EC4899/white?text=Book+6",
        category: "Young Adult",
        rating: 4.2,
        reviews: 1650
      })
    ];
  }

  // Get all books
  async getAllBooks() {
    try {
      // For now, return mock data
      return this.getMockBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  }

  // Get books by category
  async getBooksByCategory(category) {
    try {
      const books = await this.getAllBooks();
      return books.filter(book => book.category.toLowerCase() === category.toLowerCase());
    } catch (error) {
      console.error('Error fetching books by category:', error);
      return [];
    }
  }

  // Get bestsellers
  async getBestsellers() {
    try {
      const books = await this.getAllBooks();
      return books.filter(book => book.isBestseller);
    } catch (error) {
      console.error('Error fetching bestsellers:', error);
      return [];
    }
  }

  // Get new arrivals
  async getNewArrivals() {
    try {
      const books = await this.getAllBooks();
      return books.filter(book => book.isNewArrival);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      return [];
    }
  }

  // Search books
  async searchBooks(query) {
    try {
      const books = await this.getAllBooks();
      return books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    }
  }

  // Get book by ID
  async getBookById(id) {
    try {
      const books = await this.getAllBooks();
      return books.find(book => book.id === parseInt(id));
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      return null;
    }
  }
}

export default new BookService();
