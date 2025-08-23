const CategoriesGrid = () => {
  const categories = [
    {
      id: 1,
      name: 'Fiction & Literature',
      image: '/images/section/homeSection/CategoriesGrid/1.jpg',
      count: '2,450 books'
    },
    {
      id: 2,
      name: 'Science & Technology',
      image: '/images/section/homeSection/CategoriesGrid/2.jpg',
      count: '1,890 books'
    },
    {
      id: 3,
      name: 'Children & Young Adult',
      image: '/images/section/homeSection/CategoriesGrid/3.jpg',
      count: '3,200 books'
    },
    {
      id: 4,
      name: 'Business & Economics',
      image: '/images/section/homeSection/CategoriesGrid/4.jpg',
      count: '1,567 books'
    },
    {
      id: 5,
      name: 'History & Biography',
      image: '/images/section/homeSection/CategoriesGrid/5.jpg',
      count: '980 books'
    },
    {
      id: 6,
      name: 'Health & Wellness',
      image: '/images/section/homeSection/CategoriesGrid/6.jpg',
      count: '750 books'
    },
    {
      id: 7,
      name: 'Art & Design',
      image: '/images/section/homeSection/CategoriesGrid/7.jpg',
      count: '890 books'
    },
    {
      id: 8,
      name: 'Religion & Spirituality',
      image: '/images/section/homeSection/CategoriesGrid/8.jpg',
      count: '1,234 books'
    },
    {
      id: 9,
      name: 'Travel & Adventure',
      image: '/images/section/homeSection/CategoriesGrid/9.jpg',
      count: '567 books'
    },
    {
      id: 10,
      name: 'Cooking & Food',
      image: '/images/section/homeSection/CategoriesGrid/10.jpg',
      count: '445 books'
    },
    {
      id: 11,
      name: 'Sports & Recreation',
      image: '/images/section/homeSection/CategoriesGrid/11.jpg',
      count: '678 books'
    },
    {
      id: 12,
      name: 'Academic Textbooks',
      image: '/images/section/homeSection/CategoriesGrid/12.jpg',
      count: '4,567 books'
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse All Categories</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover books across all genres and subjects
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-200"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                {/* Category Image */}
                <div className="relative h-32 overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x200/4F46E5/white?text=${encodeURIComponent(category.name)}`;
                    }}
                    onLoad={(e) => {
                      console.log(`Image loaded: ${category.name}`, e.target.src);
                    }}
                  />
                  {/* Remove the dark overlay that might be causing the black appearance */}
                </div>
                
                {/* Category Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm text-center line-clamp-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-xs text-center">
                    {category.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories CTA */}
        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Explore All Categories
          </button>
        </div>
      </div>
    </section>
  )
}

export default CategoriesGrid
