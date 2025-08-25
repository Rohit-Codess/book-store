import ApiService from './ApiService.js';

// Minimal Book class for mock data
class Book {
  constructor({
    id,
    title,
    author,
    price,
    originalPrice,
    image,
    category,
    rating,
    reviews,
    isBestseller,
    isNewArrival,
    description,
    onSale,
    discount
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.originalPrice = originalPrice;
    this.image = image;
    this.category = category;
    this.rating = rating;
    this.reviews = reviews;
    this.isBestseller = isBestseller;
    this.isNewArrival = isNewArrival;
    this.description = description;
    this.onSale = onSale;
    this.discount = discount;
  }
}

/**
 * BookService - Handles all book-related API calls and business logic
 * Updated to work with real backend API
 */
class BookService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }

  // Get all books with filtering and pagination
  async getBooks(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const queryString = queryParams.toString();
      const endpoint = queryString ? `/books?${queryString}` : '/books';
      
      const response = await ApiService.get(endpoint);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching books:', error);
      // Fallback to mock data if API fails
      return this.getMockBooks();
    }
  }

  // Get single book by ID
  async getBook(id) {
    try {
      const response = await ApiService.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      // Fallback to mock data
      return this.getMockBooks().find(book => book.id === parseInt(id));
    }
  }

  // Get featured books
  async getFeaturedBooks() {
    try {
      const response = await ApiService.get('/books/featured');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching featured books:', error);
      return this.getMockBooks().slice(0, 8);
    }
  }

  // Get bestseller books
  async getBestsellers() {
    try {
      const response = await ApiService.get('/books/bestsellers');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching bestsellers:', error);
      return this.getMockBooks().filter(book => book.isBestseller);
    }
  }

  // Get books by category
  async getBooksByCategory(category, page = 1, limit = 20) {
    try {
      const response = await ApiService.get(`/books/category/${category}?page=${page}&limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching books by category:', error);
      return this.getMockBooks().filter(book => book.category.toLowerCase() === category.toLowerCase());
    }
  }

  // Get all categories
  async getCategories() {
    try {
      const response = await ApiService.get('/books/categories');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [
        { _id: 'Fiction', count: 25 },
        { _id: 'Young Adult', count: 18 },
        { _id: 'Children', count: 12 },
        { _id: 'Non-Fiction', count: 15 },
        { _id: 'Academic', count: 8 }
      ];
    }
  }

  // Search books
  async searchBooks(query, page = 1, limit = 20) {
    try {
      const response = await ApiService.get(`/books/search/${encodeURIComponent(query)}?page=${page}&limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Error searching books:', error);
      const books = this.getMockBooks();
      return books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  // Get related books
  async getRelatedBooks(bookId) {
    try {
      const response = await ApiService.get(`/books/${bookId}/related`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching related books:', error);
      return this.getMockBooks().slice(0, 4);
    }
  }

  // Add book review
  async addBookReview(bookId, reviewData) {
    try {
      const response = await ApiService.post(`/books/${bookId}/reviews`, reviewData);
      return response;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }

  // Mock data for fallback (keeping existing mock data structure)
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

  // Legacy methods for backward compatibility
  async getAllBooks() {
    return this.getBooks();
  }

  async getNewArrivals() {
    try {
      const books = await this.getBooks();
      return books.filter(book => book.isNewArrival);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      return this.getMockBooks().filter(book => book.isNewArrival);
    }
  }

  async getBookById(id) {
    return this.getBook(id);
  }
}

export default new BookService();
