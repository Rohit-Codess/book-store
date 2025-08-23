const PromotionalBanners = () => {
  const promotions = [
    {
      id: 1,
      title: 'Learn in Leaps',
      subtitle: 'Educational Excellence Program',
      description: 'Accelerate your learning journey with our comprehensive educational resources and expert guidance.',
      cta: 'Start Learning',
      image: '/images/section/homeSection/PromotionalBanners/1.jpg',
      bgColor: 'bg-emerald-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 2,
      title: 'Teensome Classic',
      subtitle: 'Timeless Stories for Young Minds',
      description: 'Discover classic literature reimagined for teenagers with modern illustrations and interactive content.',
      cta: 'Explore Classics',
      image: '/images/section/homeSection/PromotionalBanners/2.jpg',
      bgColor: 'bg-pink-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 3,
      title: 'Academic Excellence',
      subtitle: 'Professional Study Materials',
      description: 'Comprehensive study guides, reference books, and academic resources for students and professionals.',
      cta: 'Browse Academic',
      image: '/images/section/homeSection/PromotionalBanners/3.jpg',
      bgColor: 'bg-indigo-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Promotions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't miss out on these limited-time offers and exclusive programs
          </p>
        </div>

        {/* Promotions */}
        <div className="space-y-8">
          {promotions.map((promotion, index) => (
            <div
              key={promotion.id}
              className={`${promotion.bgColor} rounded-2xl overflow-hidden shadow-lg`}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
                {/* Content Side */}
                <div className="flex-1 p-8 lg:p-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {promotion.title}
                  </h3>
                  <h4 className="text-xl text-gray-700 mb-4">
                    {promotion.subtitle}
                  </h4>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {promotion.description}
                  </p>
                  <button className={`${promotion.buttonColor} text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-lg`}>
                    {promotion.cta}
                  </button>
                </div>

                {/* Image Side */}
                <div className="flex-1">
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="w-full h-64 lg:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/600x400/4F46E5/white?text=${encodeURIComponent(promotion.title)}`;
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Promotional Content */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white p-8 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Mega Sale Event</h3>
            <p className="text-lg opacity-90 mb-6">
              Get up to 70% off on selected books and stationery items
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Shop Sale Items
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-200">
                View All Deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromotionalBanners
