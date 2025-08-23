/**
 * SchoolService - Handles all school supplies related data and business logic
 */
class SchoolService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  // Mock school supplies data
  getMockSchoolSupplies() {
    return [
      {
        id: 1,
        name: "School Backpack - Large",
        brand: "American Tourister",
        price: 1299,
        originalPrice: 1599,
        image: "/images/section/homeSection/BookSections/25.jpg",
        category: "Bags",
        rating: 4.5,
        reviews: 650,
        description: "Durable and spacious backpack perfect for school use.",
        inStock: true,
        featured: true,
        ageGroup: "Teen"
      },
      {
        id: 2,
        name: "Geometry Box Set",
        brand: "Faber-Castell",
        price: 199,
        originalPrice: 249,
        image: "/images/section/homeSection/BookSections/26.jpg",
        category: "Mathematical Instruments",
        rating: 4.3,
        reviews: 890,
        description: "Complete geometry set with compass, protractor, and rulers.",
        inStock: true,
        featured: false,
        ageGroup: "All"
      },
      {
        id: 3,
        name: "School Uniform Shirt",
        brand: "Monte Carlo",
        price: 399,
        originalPrice: 499,
        image: "/images/section/homeSection/BookSections/27.jpg",
        category: "Uniforms",
        rating: 4.2,
        reviews: 520,
        description: "High-quality cotton school uniform shirt.",
        inStock: true,
        featured: true,
        ageGroup: "Teen"
      },
      {
        id: 4,
        name: "Lunch Box with Water Bottle",
        brand: "Milton",
        price: 299,
        originalPrice: 399,
        image: "/images/section/homeSection/BookSections/28.jpg",
        category: "Lunch Boxes",
        rating: 4.4,
        reviews: 750,
        description: "Insulated lunch box with matching water bottle.",
        inStock: true,
        featured: true,
        ageGroup: "Kids"
      },
      {
        id: 5,
        name: "School Shoes - Black",
        brand: "Bata",
        price: 899,
        originalPrice: 1199,
        image: "/images/section/homeSection/BookSections/29.jpg",
        category: "Footwear",
        rating: 4.1,
        reviews: 430,
        description: "Comfortable black school shoes for daily wear.",
        inStock: false,
        featured: false,
        ageGroup: "Kids"
      },
      {
        id: 6,
        name: "Science Lab Coat",
        brand: "Apron House",
        price: 449,
        originalPrice: 599,
        image: "/images/section/homeSection/BookSections/30.jpg",
        category: "Lab Equipment",
        rating: 4.0,
        reviews: 280,
        description: "White lab coat for science experiments and practicals.",
        inStock: true,
        featured: false,
        ageGroup: "Teen"
      },
      {
        id: 7,
        name: "School ID Card Holder",
        brand: "Generic",
        price: 49,
        originalPrice: 79,
        image: "/images/section/homeSection/BookSections/31.jpg",
        category: "Accessories",
        rating: 3.9,
        reviews: 340,
        description: "Durable ID card holder with lanyard.",
        inStock: true,
        featured: false,
        ageGroup: "All"
      },
      {
        id: 8,
        name: "Art Smock for Kids",
        brand: "Crayola",
        price: 199,
        originalPrice: 249,
        image: "/images/section/homeSection/BookSections/32.jpg",
        category: "Art Supplies",
        rating: 4.6,
        reviews: 620,
        description: "Waterproof art smock to keep clothes clean during art activities.",
        inStock: true,
        featured: true,
        ageGroup: "Kids"
      }
    ];
  }

  // Get all school supplies
  async getAllSchoolSupplies() {
    try {
      return this.getMockSchoolSupplies();
    } catch (error) {
      console.error('Error fetching school supplies:', error);
      return [];
    }
  }

  // Get supplies by category
  async getSuppliesByCategory(category) {
    try {
      const supplies = await this.getAllSchoolSupplies();
      return supplies.filter(supply => supply.category.toLowerCase() === category.toLowerCase());
    } catch (error) {
      console.error('Error fetching supplies by category:', error);
      return [];
    }
  }

  // Get supplies by age group
  async getSuppliesByAgeGroup(ageGroup) {
    try {
      const supplies = await this.getAllSchoolSupplies();
      return supplies.filter(supply => supply.ageGroup === ageGroup || supply.ageGroup === 'All');
    } catch (error) {
      console.error('Error fetching supplies by age group:', error);
      return [];
    }
  }

  // Get featured supplies
  async getFeaturedSupplies() {
    try {
      const supplies = await this.getAllSchoolSupplies();
      return supplies.filter(supply => supply.featured);
    } catch (error) {
      console.error('Error fetching featured supplies:', error);
      return [];
    }
  }

  // Search supplies
  async searchSupplies(query) {
    try {
      const supplies = await this.getAllSchoolSupplies();
      return supplies.filter(supply => 
        supply.name.toLowerCase().includes(query.toLowerCase()) ||
        supply.brand.toLowerCase().includes(query.toLowerCase()) ||
        supply.category.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching supplies:', error);
      return [];
    }
  }
}

export default new SchoolService();
