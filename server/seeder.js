import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';
import User from './models/User.js';

dotenv.config();

// Sample books data
const books = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A magical story about following your dreams and discovering your destiny. Santiago, a young shepherd boy, embarks on a journey to find treasure and discovers the real treasure lies within.",
    isbn: "9780062315007",
    publisher: "HarperCollins",
    publishedDate: new Date("1988-01-01"),
    category: "Fiction",
    language: "English",
    pages: 163,
    format: "Paperback",
    price: {
      mrp: 399,
      selling: 299
    },
    images: [{
      url: "/images/section/homeSection/BookSections/1.jpg",
      alt: "The Alchemist",
      isPrimary: true
    }],
    stock: {
      quantity: 50,
      threshold: 10
    },
    rating: {
      average: 4.5,
      count: 234
    },
    tags: ["bestseller", "inspiration", "spiritual"],
    features: ["International Bestseller", "Translated in 80+ languages", "Life-changing read"],
    specifications: new Map([
      ["Genre", "Fiction"],
      ["Language", "English"],
      ["Pages", "163"],
      ["Format", "Paperback"]
    ]),
    isActive: true,
    isFeatured: true,
    isBestseller: true,
    views: 1250,
    salesCount: 456
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
    isbn: "9780061120084",
    publisher: "Harper Perennial Modern Classics",
    publishedDate: new Date("1960-07-11"),
    category: "Fiction",
    language: "English",
    pages: 376,
    format: "Paperback",
    price: {
      mrp: 450,
      selling: 350
    },
    images: [{
      url: "/images/section/homeSection/BookSections/2.jpg",
      alt: "To Kill a Mockingbird",
      isPrimary: true
    }],
    stock: {
      quantity: 30,
      threshold: 5
    },
    rating: {
      average: 4.8,
      count: 567
    },
    tags: ["classic", "literature", "american"],
    features: ["Pulitzer Prize Winner", "American Classic", "Required Reading"],
    specifications: new Map([
      ["Genre", "Classic Literature"],
      ["Language", "English"],
      ["Pages", "376"],
      ["Awards", "Pulitzer Prize"]
    ]),
    isActive: true,
    isFeatured: true,
    isBestseller: true,
    views: 890,
    salesCount: 234
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. How we think about money and what we do with it affects every aspect of our lives.",
    isbn: "9780857197689",
    publisher: "Harriman House",
    publishedDate: new Date("2020-09-08"),
    category: "Business & Economics",
    language: "English",
    pages: 256,
    format: "Paperback",
    price: {
      mrp: 599,
      selling: 449
    },
    images: [{
      url: "/images/section/homeSection/BookSections/3.jpg",
      alt: "The Psychology of Money",
      isPrimary: true
    }],
    stock: {
      quantity: 45,
      threshold: 10
    },
    rating: {
      average: 4.6,
      count: 789
    },
    tags: ["finance", "psychology", "money"],
    features: ["Wall Street Journal Bestseller", "Personal Finance", "Behavioral Economics"],
    specifications: new Map([
      ["Genre", "Finance"],
      ["Language", "English"],
      ["Pages", "256"],
      ["Publisher", "Harriman House"]
    ]),
    isActive: true,
    isFeatured: true,
    isBestseller: true,
    views: 1100,
    salesCount: 678
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. Learn how tiny changes can make a big difference in your life.",
    isbn: "9780735211292",
    publisher: "Avery",
    publishedDate: new Date("2018-10-16"),
    category: "Self-Help",
    language: "English",
    pages: 320,
    format: "Paperback",
    price: {
      mrp: 699,
      selling: 525
    },
    images: [{
      url: "/images/section/homeSection/BookSections/4.jpg",
      alt: "Atomic Habits",
      isPrimary: true
    }],
    stock: {
      quantity: 60,
      threshold: 15
    },
    rating: {
      average: 4.7,
      count: 1234
    },
    tags: ["habits", "self-improvement", "productivity"],
    features: ["#1 New York Times Bestseller", "Life-changing habits", "Practical strategies"],
    specifications: new Map([
      ["Genre", "Self-Help"],
      ["Language", "English"],
      ["Pages", "320"],
      ["Publisher", "Avery"]
    ]),
    isActive: true,
    isFeatured: true,
    isBestseller: true,
    views: 1567,
    salesCount: 890
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "The first book in the Harry Potter series. Follow Harry's magical journey as he discovers his true identity and begins his education at Hogwarts.",
    isbn: "9780747532699",
    publisher: "Bloomsbury",
    publishedDate: new Date("1997-06-26"),
    category: "Children & Young Adult",
    language: "English",
    pages: 223,
    format: "Paperback",
    price: {
      mrp: 499,
      selling: 399
    },
    images: [{
      url: "/images/section/homeSection/BookSections/5.jpg",
      alt: "Harry Potter and the Philosopher's Stone",
      isPrimary: true
    }],
    stock: {
      quantity: 75,
      threshold: 20
    },
    rating: {
      average: 4.9,
      count: 2345
    },
    tags: ["fantasy", "magic", "children", "adventure"],
    features: ["Global Phenomenon", "Movie Adaptation", "Award Winning"],
    specifications: new Map([
      ["Genre", "Fantasy"],
      ["Language", "English"],
      ["Pages", "223"],
      ["Series", "Harry Potter #1"]
    ]),
    isActive: true,
    isFeatured: true,
    isBestseller: true,
    views: 2890,
    salesCount: 1456
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution.",
    isbn: "9780062316097",
    publisher: "Harper",
    publishedDate: new Date("2014-02-10"),
    category: "History & Biography",
    language: "English",
    pages: 443,
    format: "Paperback",
    price: {
      mrp: 799,
      selling: 599
    },
    images: [{
      url: "/images/section/homeSection/BookSections/6.jpg",
      alt: "Sapiens",
      isPrimary: true
    }],
    stock: {
      quantity: 40,
      threshold: 10
    },
    rating: {
      average: 4.4,
      count: 1567
    },
    tags: ["history", "anthropology", "evolution"],
    features: ["International Bestseller", "Thought-provoking", "Scientific"],
    specifications: new Map([
      ["Genre", "History"],
      ["Language", "English"],
      ["Pages", "443"],
      ["Publisher", "Harper"]
    ]),
    isActive: true,
    isFeatured: true,
    isBestseller: false,
    views: 987,
    salesCount: 345
  }
];

// Sample admin user
const adminUser = {
  name: "Admin User",
  email: "admin@bookworld.com",
  password: "admin123",
  role: "admin",
  phone: "9876543210",
  isActive: true
};

// Sample regular user
const regularUser = {
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  role: "user",
  phone: "8765432109",
  addresses: [{
    type: "home",
    name: "John Doe",
    phone: "8765432109",
    pincode: "560001",
    locality: "MG Road",
    address: "123 Main Street, Apartment 4B",
    city: "Bangalore",
    state: "Karnataka",
    landmark: "Near Metro Station",
    isDefault: true
  }],
  isActive: true
};

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookworld');
    console.log('📚 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Import data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Book.deleteMany();
    await User.deleteMany();
    console.log('🗑️  Data cleared');

    // Insert sample data
    await User.create([adminUser, regularUser]);
    await Book.create(books);

    console.log('✅ Sample data imported successfully');
    console.log(`📖 Created ${books.length} books`);
    console.log('👤 Created admin user: admin@bookworld.com / admin123');
    console.log('👤 Created regular user: john@example.com / password123');
    
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    await connectDB();

    await Book.deleteMany();
    await User.deleteMany();

    console.log('🗑️  Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error destroying data:', error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
