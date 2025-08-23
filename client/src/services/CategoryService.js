import Category from '../models/Category.js';

/**
 * CategoryService - Handles all category-related API calls and business logic
 */
class CategoryService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  // Mock data for development
  getMockCategories() {
    return [
      new Category({
        id: 1,
        name: "Fiction",
        slug: "fiction",
        image: "https://via.placeholder.com/150x150/4F46E5/white?text=Fiction",
        icon: "📚",
        description: "Fictional stories and novels"
      }),
      new Category({
        id: 2,
        name: "Kannada",
        slug: "kannada",
        image: "https://via.placeholder.com/150x150/059669/white?text=Kannada",
        icon: "🔤",
        description: "Books in Kannada language"
      }),
      new Category({
        id: 3,
        name: "Young Adult",
        slug: "young-adult",
        image: "https://via.placeholder.com/150x150/EC4899/white?text=YA",
        icon: "👨‍🎓",
        description: "Books for young adults"
      }),
      new Category({
        id: 4,
        name: "Academic",
        slug: "academic",
        image: "https://via.placeholder.com/150x150/F59E0B/white?text=Academic",
        icon: "🎓",
        description: "Academic and educational books"
      }),
      new Category({
        id: 5,
        name: "Children",
        slug: "children",
        image: "https://via.placeholder.com/150x150/DC2626/white?text=Children",
        icon: "🧸",
        description: "Books for children"
      }),
      new Category({
        id: 6,
        name: "Self Help",
        slug: "self-help",
        image: "https://via.placeholder.com/150x150/7C3AED/white?text=Self+Help",
        icon: "💡",
        description: "Self improvement books"
      }),
      new Category({
        id: 7,
        name: "Biography",
        slug: "biography",
        image: "https://via.placeholder.com/150x150/0891B2/white?text=Biography",
        icon: "👤",
        description: "Life stories and biographies"
      }),
      new Category({
        id: 8,
        name: "Science",
        slug: "science",
        image: "https://via.placeholder.com/150x150/065F46/white?text=Science",
        icon: "🔬",
        description: "Science and technology books"
      })
    ];
  }

  // Get all categories
  async getAllCategories() {
    try {
      return this.getMockCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Get top categories (first 4)
  async getTopCategories() {
    try {
      const categories = await this.getAllCategories();
      return categories.slice(0, 4);
    } catch (error) {
      console.error('Error fetching top categories:', error);
      return [];
    }
  }

  // Get category by slug
  async getCategoryBySlug(slug) {
    try {
      const categories = await this.getAllCategories();
      return categories.find(category => category.slug === slug);
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      return null;
    }
  }
}

export default new CategoryService();
