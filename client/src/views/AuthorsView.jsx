import React from 'react';

const AuthorsView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Authors</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover books from renowned authors across various genres.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample authors */}
          {[1, 2, 3, 4, 5, 6].map((author) => (
            <div key={author} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Author Name {author}</h3>
              <p className="text-gray-600 mb-3">Genre Specialist</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                View Books
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorsView;
