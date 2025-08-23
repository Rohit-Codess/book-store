import { BookOpen, Palette, GraduationCap, Users } from 'lucide-react'

const TopCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Fiction',
      image: '/images/section/homeSection/TopCategories/1.jpeg',
      bgColor: 'bg-amber-100',
      hoverColor: 'hover:bg-amber-200'
    },
    {
      id: 2,
      name: 'Kannada',
      image: '/images/section/homeSection/TopCategories/2.jpeg',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:bg-orange-200'
    },
    {
      id: 3,
      name: 'Youth',
      image: '/images/section/homeSection/TopCategories/3.jpeg',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200'
    },
    {
      id: 4,
      name: 'Academic',
      image: '/images/section/homeSection/TopCategories/4.jpeg',
      bgColor: 'bg-cyan-100',
      hoverColor: 'hover:bg-cyan-200'
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Categories</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our most popular book categories and find your next great read
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-8">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="text-center transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                {/* Circular Image */}
                <div className="inline-block mb-2 sm:mb-3 md:mb-4">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/200x200/4F46E5/white?text=${encodeURIComponent(category.name)}`;
                      }}
                    />
                  </div>
                </div>
                
                {/* Category Name */}
                <h3 className="text-xs sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>
              </div>
            )
          })}
        </div>

        {/* Additional Categories CTA */}
        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  )
}

export default TopCategories
