import Author from '../models/Author.js';
import Publisher from '../models/Publisher.js';

/**
 * AuthorPublisherService - Handles author and publisher related API calls
 */
class AuthorPublisherService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  // Mock authors data
  getMockAuthors() {
    return [
      new Author({
        id: 1,
        name: "J.K. Rowling",
        bio: "British author, best known for the Harry Potter series",
        image: "https://via.placeholder.com/150x150/4F46E5/white?text=JKR",
        nationality: "British",
        isFeatured: true
      }),
      new Author({
        id: 2,
        name: "Stephen King",
        bio: "American author of horror, supernatural fiction, suspense",
        image: "https://via.placeholder.com/150x150/DC2626/white?text=SK",
        nationality: "American",
        isFeatured: true
      }),
      new Author({
        id: 3,
        name: "Agatha Christie",
        bio: "English writer known for detective novels",
        image: "https://via.placeholder.com/150x150/059669/white?text=AC",
        nationality: "English",
        isFeatured: true
      }),
      new Author({
        id: 4,
        name: "Paulo Coelho",
        bio: "Brazilian lyricist and novelist",
        image: "https://via.placeholder.com/150x150/F59E0B/white?text=PC",
        nationality: "Brazilian",
        isFeatured: true
      })
    ];
  }

  // Mock publishers data
  getMockPublishers() {
    return [
      new Publisher({
        id: 1,
        name: "Penguin Random House",
        logo: "https://via.placeholder.com/120x60/000000/white?text=Penguin",
        website: "https://penguinrandomhouse.com",
        isFeatured: true
      }),
      new Publisher({
        id: 2,
        name: "HarperCollins",
        logo: "https://via.placeholder.com/120x60/4F46E5/white?text=Harper",
        website: "https://harpercollins.com",
        isFeatured: true
      }),
      new Publisher({
        id: 3,
        name: "Scholastic",
        logo: "https://via.placeholder.com/120x60/DC2626/white?text=Scholastic",
        website: "https://scholastic.com",
        isFeatured: true
      }),
      new Publisher({
        id: 4,
        name: "Macmillan",
        logo: "https://via.placeholder.com/120x60/059669/white?text=Macmillan",
        website: "https://macmillan.com",
        isFeatured: true
      }),
      new Publisher({
        id: 5,
        name: "Oxford University Press",
        logo: "https://via.placeholder.com/120x60/7C3AED/white?text=Oxford",
        website: "https://oup.com",
        isFeatured: true
      }),
      new Publisher({
        id: 6,
        name: "Cambridge University Press",
        logo: "https://via.placeholder.com/120x60/F59E0B/white?text=Cambridge",
        website: "https://cambridge.org",
        isFeatured: true
      })
    ];
  }

  // Get featured authors
  async getFeaturedAuthors() {
    try {
      const authors = this.getMockAuthors();
      return authors.filter(author => author.isFeatured);
    } catch (error) {
      console.error('Error fetching featured authors:', error);
      return [];
    }
  }

  // Get featured publishers
  async getFeaturedPublishers() {
    try {
      const publishers = this.getMockPublishers();
      return publishers.filter(publisher => publisher.isFeatured);
    } catch (error) {
      console.error('Error fetching featured publishers:', error);
      return [];
    }
  }

  // Get all authors
  async getAllAuthors() {
    try {
      return this.getMockAuthors();
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  }

  // Get all publishers
  async getAllPublishers() {
    try {
      return this.getMockPublishers();
    } catch (error) {
      console.error('Error fetching publishers:', error);
      return [];
    }
  }
}

export default new AuthorPublisherService();
