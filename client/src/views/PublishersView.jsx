import React from 'react';

const PublishersView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Publishers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse books from leading publishers around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sample publishers */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((publisher) => (
            <div key={publisher} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Publisher {publisher}</h3>
              <p className="text-gray-600 text-sm mb-3">Quality Publications</p>
              <button className="bg-indigo-600 text-white px-3 py-1 text-sm rounded-md hover:bg-indigo-700 transition-colors">
                View Catalog
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublishersView;
