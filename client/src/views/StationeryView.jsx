import React from 'react';

const StationeryView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stationery Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quality stationery items for all your writing and office needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Pens & Pencils</h3>
            <p className="text-gray-600">Writing instruments</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Notebooks</h3>
            <p className="text-gray-600">Various notebook styles</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Art Supplies</h3>
            <p className="text-gray-600">Creative materials</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Office Supplies</h3>
            <p className="text-gray-600">Professional needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationeryView;
