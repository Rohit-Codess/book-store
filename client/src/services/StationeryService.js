/**
 * StationeryService - Handles all stationery-related data and business logic
 */
class StationeryService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  // Mock stationery data
  getMockStationery() {
    return [
      {
        id: 1,
        name: "Premium Ballpoint Pen Set",
        brand: "Parker",
        price: 299,
        originalPrice: 399,
        image: "/images/section/homeSection/BookSections/17.jpg",
        category: "Pens",
        rating: 4.5,
        reviews: 850,
        description: "Professional quality ballpoint pens for everyday writing.",
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: "Mechanical Pencil Set",
        brand: "Pilot",
        price: 199,
        originalPrice: 249,
        image: "/images/section/homeSection/BookSections/18.jpg",
        category: "Pencils",
        rating: 4.3,
        reviews: 650,
        description: "Precision mechanical pencils for technical drawing.",
        inStock: true,
        featured: false
      },
      {
        id: 3,
        name: "A4 Spiral Notebook Pack",
        brand: "Oxford",
        price: 149,
        originalPrice: 199,
        image: "/images/section/homeSection/BookSections/19.jpg",
        category: "Notebooks",
        rating: 4.4,
        reviews: 1200,
        description: "High-quality spiral notebooks for students and professionals.",
        inStock: true,
        featured: true
      },
      {
        id: 4,
        name: "Watercolor Paint Set",
        brand: "Winsor & Newton",
        price: 599,
        originalPrice: 799,
        image: "/images/section/homeSection/BookSections/20.jpg",
        category: "Art Supplies",
        rating: 4.7,
        reviews: 420,
        description: "Professional watercolor paints for artists.",
        inStock: true,
        featured: true
      },
      {
        id: 5,
        name: "Sticky Notes Multipack",
        brand: "Post-it",
        price: 99,
        originalPrice: 129,
        image: "/images/section/homeSection/BookSections/21.jpg",
        category: "Office Supplies",
        rating: 4.2,
        reviews: 980,
        description: "Colorful sticky notes for organization and reminders.",
        inStock: true,
        featured: false
      },
      {
        id: 6,
        name: "Highlighter Set",
        brand: "Stabilo",
        price: 179,
        originalPrice: 229,
        image: "/images/section/homeSection/BookSections/22.jpg",
        category: "Pens",
        rating: 4.6,
        reviews: 750,
        description: "Bright highlighters for studying and note-taking.",
        inStock: true,
        featured: true
      },
      {
        id: 7,
        name: "Sketch Pad A3",
        brand: "Canson",
        price: 249,
        originalPrice: 299,
        image: "/images/section/homeSection/BookSections/23.jpg",
        category: "Art Supplies",
        rating: 4.5,
        reviews: 380,
        description: "Premium sketch pad for artists and designers.",
        inStock: false,
        featured: false
      },
      {
        id: 8,
        name: "Calculator Scientific",
        brand: "Casio",
        price: 899,
        originalPrice: 1199,
        image: "/images/section/homeSection/BookSections/24.jpg",
        category: "Office Supplies",
        rating: 4.8,
        reviews: 1500,
        description: "Advanced scientific calculator for students and professionals.",
        inStock: true,
        featured: true
      }
    ];
  }

  // Get all stationery items
  async getAllStationery() {
    try {
      return this.getMockStationery();
    } catch (error) {
      console.error('Error fetching stationery:', error);
      return [];
    }
  }

  // Get stationery by category
  async getStationeryByCategory(category) {
    try {
      const items = await this.getAllStationery();
      return items.filter(item => item.category.toLowerCase() === category.toLowerCase());
    } catch (error) {
      console.error('Error fetching stationery by category:', error);
      return [];
    }
  }

  // Get featured stationery
  async getFeaturedStationery() {
    try {
      const items = await this.getAllStationery();
      return items.filter(item => item.featured);
    } catch (error) {
      console.error('Error fetching featured stationery:', error);
      return [];
    }
  }

  // Search stationery
  async searchStationery(query) {
    try {
      const items = await this.getAllStationery();
      return items.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching stationery:', error);
      return [];
    }
  }
}

export default new StationeryService();
