import React from 'react';

const SchoolView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">School Supplies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything students need for a successful academic year.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Textbooks</h3>
            <p className="text-gray-600">Curriculum-based textbooks for all grades</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">School Bags</h3>
            <p className="text-gray-600">Durable and stylish backpacks</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Uniforms</h3>
            <p className="text-gray-600">School uniforms and accessories</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolView;
