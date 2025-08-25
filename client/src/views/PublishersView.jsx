import React, { useState } from 'react';
import { Search, Building2, BookOpen, Star, Globe } from 'lucide-react';

const PublishersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const publishers = [
    {
      id: 1,
      name: "Penguin Random House",
      category: "General",
      logo: "/images/section/homeSection/FeaturedAuthorsPublishers/publishers/1.jpg",
      books: 500,
      rating: 4.7,
      description: "World's largest English-language general trade book publisher.",
      established: 1927,
      featured: true,
      international: true
    },
    {
      id: 2,
      name: "HarperCollins",
      category: "General",
      logo: "/images/section/homeSection/FeaturedAuthorsPublishers/publishers/2.jpg",
      books: 350,
      rating: 4.6,
      description: "One of the 'Big Five' English-language publishers.",
      established: 1989,
      featured: true,
      international: true
    },
    {
      id: 3,
      name: "Oxford University Press",
      category: "Academic",
      logo: "/images/section/homeSection/FeaturedAuthorsPublishers/publishers/3.jpg",
      books: 200,
      rating: 4.8,
      description: "Leading academic and educational publisher worldwide.",
      established: 1586,
      featured: true,
      international: true
    },
    {
      id: 4,
      name: "Scholastic",
      category: "Children",
      logo: "/images/section/homeSection/FeaturedAuthorsPublishers/publishers/4.jpg",
      books: 180,
      rating: 4.5,
      description: "World's largest publisher and distributor of children's books.",
      established: 1920,
      featured: false,
      international: true
    },
    {
      id: 5,
      name: "Macmillan",
      category: "Academic",
      logo: "/images/section/homeSection/FeaturedAuthorsPublishers/publishers/5.jpg",
      books: 150,
      rating: 4.4,
      description: "International publishing company with strong academic focus.",
      established: 1843,
      featured: true,
      international: true
    },
    {
      id: 6,
      name: "Rupa Publications",
      category: "Regional",
      logo: "/images/section/homeSection/FeaturedAuthorsPublishers/publishers/6.jpg",
      books: 120,
      rating: 4.3,
      description: "Leading Indian publisher of fiction and non-fiction books.",
      established: 1936,
      featured: false,
      international: false
    }
  ];

  const categories = ['All', 'General', 'Academic', 'Children', 'Regional'];

  const filteredPublishers = publishers.filter(publisher => {
    const matchesSearch = publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publisher.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || publisher.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const PublisherCard = ({ publisher }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={publisher.logo}
          alt={publisher.name}
          className="w-full h-24 sm:h-32 object-contain p-2 sm:p-4 bg-gray-50 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/200x100/4F46E5/white?text=${encodeURIComponent(publisher.name.slice(0, 10))}`;
          }}
        />
        {publisher.featured && (
          <span className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-indigo-500 text-white px-1 sm:px-2 py-1 text-xs font-semibold rounded">
            Featured
          </span>
        )}
        {publisher.international && (
          <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-500 text-white px-1 sm:px-2 py-1 text-xs font-semibold rounded flex items-center">
            <Globe className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Global</span>
          </span>
        )}
      </div>
      
      <div className="p-3 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div>
            <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 line-clamp-2">{publisher.name}</h3>
            <p className="text-indigo-600 font-medium text-xs sm:text-sm">{publisher.category}</p>
          </div>
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
        </div>
        
        <div className="flex items-center mb-2 sm:mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.floor(typeof publisher.rating === 'object' ? publisher.rating?.average || 0 : publisher.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600 ml-2">
            {typeof publisher.rating === 'object' ? publisher.rating?.average || 0 : publisher.rating || 0}/5
          </span>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{publisher.description}</p>
        
        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-500">Established:</span>
            <span className="font-medium">{publisher.established}</span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-500 flex items-center">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Books:
            </span>
            <span className="font-medium">{publisher.books}+</span>
          </div>
        </div>
        
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-xs sm:text-sm">
          View Catalog
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Publishers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse books from leading publishers around the world. From international giants to specialized regional publishers.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search publishers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPublishers.length} of {publishers.length} publishers
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Publishers Grid */}
        {filteredPublishers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredPublishers.map((publisher) => (
              <PublisherCard key={publisher.id} publisher={publisher} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No publishers found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Publishers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishers.filter(publisher => publisher.featured).slice(0, 4).map((publisher) => (
              <div key={publisher.id} className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Building2 className="w-8 h-8 mr-3" />
                  <div>
                    <h3 className="font-bold text-lg">{publisher.name}</h3>
                    <p className="text-indigo-100">{publisher.category} Publisher</p>
                  </div>
                </div>
                <p className="text-indigo-100 text-sm mb-4">{publisher.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Est. {publisher.established}</span>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{publisher.books}+ books</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Category */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(category => category !== 'All').map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-3 sm:p-6 rounded-lg text-center transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2">{category}</div>
                <div className="text-xs sm:text-sm opacity-75">
                  {publishers.filter(publisher => publisher.category === category).length} publishers
                </div>
                <div className="text-xs mt-1 opacity-60">
                  {publishers.filter(publisher => publisher.category === category)
                    .reduce((total, pub) => total + pub.books, 0)}+ books
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Publisher Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">
                {publishers.length}
              </div>
              <div className="text-gray-600 text-xs sm:text-base">Total Publishers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">
                {publishers.reduce((total, pub) => total + pub.books, 0)}+
              </div>
              <div className="text-gray-600 text-xs sm:text-base">Books Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">
                {publishers.filter(pub => pub.international).length}
              </div>
              <div className="text-gray-600 text-xs sm:text-base">International Publishers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">
                {(publishers.reduce((total, pub) => total + pub.rating, 0) / publishers.length).toFixed(1)}
              </div>
              <div className="text-gray-600 text-xs sm:text-base">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishersView;
