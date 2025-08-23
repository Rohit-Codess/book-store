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
      // Fiction Books
      new Book({
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 299,
        originalPrice: 399,
        image: "/images/section/homeSection/BookSections/1.jpg",
        category: "Fiction",
        rating: 4.5,
        reviews: 1250,
        isBestseller: true,
        isNewArrival: false,
        description: "A thought-provoking novel about life's infinite possibilities."
      }),
      new Book({
        id: 2,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        price: 349,
        originalPrice: 449,
        image: "/images/section/homeSection/BookSections/2.jpg",
        category: "Fiction",
        rating: 4.6,
        reviews: 2850,
        isBestseller: true,
        isNewArrival: false,
        description: "A captivating story of love, ambition, and secrets."
      }),
      new Book({
        id: 3,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        price: 299,
        originalPrice: 399,
        image: "/images/section/homeSection/BookSections/3.jpg",
        category: "Fiction",
        rating: 4.4,
        reviews: 3200,
        isBestseller: false,
        isNewArrival: true,
        description: "A mystery and coming-of-age story set in nature."
      }),
      new Book({
        id: 4,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 199,
        originalPrice: 249,
        image: "/images/section/homeSection/BookSections/4.jpg",
        category: "Fiction",
        rating: 4.4,
        reviews: 3800,
        isBestseller: true,
        isNewArrival: false,
        description: "A philosophical story about following your dreams."
      }),

      // Young Adult Books
      new Book({
        id: 5,
        title: "The Fault in Our Stars",
        author: "John Green",
        price: 249,
        originalPrice: 299,
        image: "/images/section/homeSection/BookSections/5.jpg",
        category: "Young Adult",
        rating: 4.3,
        reviews: 4500,
        isBestseller: true,
        isNewArrival: false,
        description: "A heartbreaking love story between two teenagers."
      }),
      new Book({
        id: 6,
        title: "Divergent",
        author: "Veronica Roth",
        price: 279,
        originalPrice: 349,
        image: "/images/section/homeSection/BookSections/6.jpg",
        category: "Young Adult",
        rating: 4.2,
        reviews: 2100,
        isBestseller: false,
        isNewArrival: true,
        description: "A dystopian adventure in a divided society."
      }),
      new Book({
        id: 7,
        title: "The Hunger Games",
        author: "Suzanne Collins",
        price: 299,
        originalPrice: 399,
        image: "/images/section/homeSection/BookSections/7.jpg",
        category: "Young Adult",
        rating: 4.5,
        reviews: 5200,
        isBestseller: true,
        isNewArrival: false,
        description: "A thrilling tale of survival and rebellion."
      }),

      // Children's Books
      new Book({
        id: 8,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        price: 399,
        originalPrice: 499,
        image: "/images/section/homeSection/BookSections/8.jpg",
        category: "Children",
        rating: 4.9,
        reviews: 8500,
        isBestseller: true,
        isNewArrival: false,
        description: "The magical beginning of Harry Potter's journey."
      }),
      new Book({
        id: 9,
        title: "Wonder",
        author: "R.J. Palacio",
        price: 249,
        originalPrice: 299,
        image: "/images/section/homeSection/BookSections/9.jpg",
        category: "Children",
        rating: 4.6,
        reviews: 3200,
        isBestseller: true,
        isNewArrival: false,
        description: "A powerful story about kindness and acceptance."
      }),
      new Book({
        id: 10,
        title: "Charlotte's Web",
        author: "E.B. White",
        price: 199,
        originalPrice: 249,
        image: "/images/section/homeSection/BookSections/10.jpg",
        category: "Children",
        rating: 4.7,
        reviews: 2800,
        isBestseller: false,
        isNewArrival: false,
        description: "A classic tale of friendship between a pig and spider."
      }),

      // Non-Fiction & Self-Help
      new Book({
        id: 11,
        title: "Atomic Habits",
        author: "James Clear",
        price: 399,
        originalPrice: 499,
        image: "/images/section/homeSection/BookSections/11.jpg",
        category: "Self Help",
        rating: 4.8,
        reviews: 2100,
        isBestseller: true,
        isNewArrival: true,
        description: "Transform your life with tiny changes in behavior."
      }),
      new Book({
        id: 12,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 449,
        originalPrice: 599,
        image: "/images/section/homeSection/BookSections/12.jpg",
        category: "Non-Fiction",
        rating: 4.6,
        reviews: 3400,
        isBestseller: true,
        isNewArrival: false,
        description: "A brief history of humankind and our future."
      }),

      // Academic Books
      new Book({
        id: 13,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        price: 899,
        originalPrice: 1199,
        image: "/images/section/homeSection/BookSections/13.jpg",
        category: "Academic",
        rating: 4.5,
        reviews: 1250,
        isBestseller: false,
        isNewArrival: false,
        description: "Comprehensive guide to computer algorithms."
      }),
      new Book({
        id: 14,
        title: "Principles of Economics",
        author: "N. Gregory Mankiw",
        price: 799,
        originalPrice: 999,
        image: "/images/section/homeSection/BookSections/14.jpg",
        category: "Academic",
        rating: 4.3,
        reviews: 890,
        isBestseller: false,
        isNewArrival: true,
        description: "Essential principles of economic theory and practice."
      }),

      // Deals & Offers
      new Book({
        id: 15,
        title: "1984",
        author: "George Orwell",
        price: 149,
        originalPrice: 299,
        image: "/images/section/homeSection/BookSections/15.jpg",
        category: "Fiction",
        rating: 4.7,
        reviews: 4200,
        isBestseller: true,
        isNewArrival: false,
        description: "A dystopian classic about surveillance and control.",
        onSale: true,
        discount: 50
      }),
      new Book({
        id: 16,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 179,
        originalPrice: 299,
        image: "/images/section/homeSection/BookSections/16.jpg",
        category: "Fiction",
        rating: 4.8,
        reviews: 3800,
        isBestseller: true,
        isNewArrival: false,
        description: "A timeless story of racial injustice and moral growth.",
        onSale: true,
        discount: 40
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
