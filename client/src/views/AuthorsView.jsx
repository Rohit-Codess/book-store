import React, { useState } from 'react';
import { Search, BookOpen, Star, Award } from 'lucide-react';

const AuthorsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const authors = [
    {
      id: 1,
      name: "Matt Haig",
      genre: "Fiction",
      image: "/images/section/homeSection/FeaturedAuthorsPublishers/authors/1.jpg",
      books: 12,
      rating: 4.6,
      bio: "British author known for psychological and philosophical novels.",
      featured: true,
      bestseller: true
    },
    {
      id: 2,
      name: "James Clear",
      genre: "Self Help",
      image: "/images/section/homeSection/FeaturedAuthorsPublishers/authors/2.jpg",
      books: 3,
      rating: 4.8,
      bio: "Expert in habit formation and behavior change.",
      featured: true,
      bestseller: true
    },
    {
      id: 3,
      name: "J.K. Rowling",
      genre: "Fantasy",
      image: "/images/section/homeSection/FeaturedAuthorsPublishers/authors/3.jpg",
      books: 15,
      rating: 4.9,
      bio: "Creator of the Harry Potter series and acclaimed fantasy author.",
      featured: true,
      bestseller: true
    },
    {
      id: 4,
      name: "Paulo Coelho",
      genre: "Fiction",
      image: "/images/section/homeSection/FeaturedAuthorsPublishers/authors/4.jpg",
      books: 18,
      rating: 4.5,
      bio: "Brazilian lyricist and novelist, author of The Alchemist.",
      featured: true,
      bestseller: false
    },
    {
      id: 5,
      name: "Taylor Jenkins Reid",
      genre: "Fiction",
      image: "/images/section/homeSection/FeaturedAuthorsPublishers/authors/5.jpg",
      books: 8,
      rating: 4.4,
      bio: "Contemporary fiction author known for character-driven stories.",
      featured: false,
      bestseller: true
    },
    {
      id: 6,
      name: "Yuval Noah Harari",
      genre: "Non-Fiction",
      image: "/images/section/homeSection/FeaturedAuthorsPublishers/authors/6.jpg",
      books: 4,
      rating: 4.7,
      bio: "Historian and philosopher, author of Sapiens and Homo Deus.",
      featured: true,
      bestseller: true
    }
  ];

  const genres = ['All', 'Fiction', 'Fantasy', 'Self Help', 'Non-Fiction'];

  const filteredAuthors = authors.filter(author => {
    const matchesSearch = author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         author.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || author.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const AuthorCard = ({ author }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={author.image}
          alt={author.name}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/200x200/8B5CF6/white?text=${encodeURIComponent(author.name.split(' ').map(n => n[0]).join(''))}`;
          }}
        />
        {author.featured && (
          <span className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 text-xs font-semibold rounded">
            Featured
          </span>
        )}
        {author.bestseller && (
          <span className="absolute top-2 right-2 bg-gold-500 bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded flex items-center">
            <Award className="w-3 h-3 mr-1" />
            Bestseller
          </span>
        )}
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{author.name}</h3>
        <p className="text-purple-600 font-medium mb-2 text-sm sm:text-base">{author.genre}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(typeof author.rating === 'object' ? author.rating?.average || 0 : author.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {typeof author.rating === 'object' ? author.rating?.average || 0 : author.rating || 0}/5
          </span>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">{author.bio}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span>{author.books} books</span>
          </div>
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors duration-300 text-xs sm:text-sm">
            <span className="hidden sm:inline">View Books</span>
            <span className="sm:hidden">View</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Authors</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover books from renowned authors across various genres. From bestselling novelists to thought-provoking non-fiction writers.
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
                placeholder="Search authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Genre Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Genre:</span>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAuthors.length} of {authors.length} authors
            {selectedGenre !== 'All' && ` in ${selectedGenre}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Authors Grid */}
        {filteredAuthors.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredAuthors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No authors found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bestselling Authors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authors.filter(author => author.bestseller).slice(0, 3).map((author) => (
              <div key={author.id} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/64x64/8B5CF6/white?text=${encodeURIComponent(author.name.split(' ').map(n => n[0]).join(''))}`;
                    }}
                  />
                  <div>
                    <h3 className="font-bold text-lg">{author.name}</h3>
                    <p className="text-purple-100">{author.genre}</p>
                  </div>
                </div>
                <p className="text-purple-100 text-sm mb-4">{author.bio}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{author.books} books published</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-300 fill-current mr-1" />
                    <span>{typeof author.rating === 'object' ? author.rating?.average || 0 : author.rating || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Genre */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genres.filter(genre => genre !== 'All').map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`p-4 rounded-lg text-center transition-all duration-300 ${
                  selectedGenre === genre
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="font-semibold">{genre}</div>
                <div className="text-sm mt-1 opacity-75">
                  {authors.filter(author => author.genre === genre).length} authors
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorsView;
