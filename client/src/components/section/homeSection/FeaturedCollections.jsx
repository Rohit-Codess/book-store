import { useNavigate } from 'react-router-dom'

const FeaturedCollections = () => {
  const navigate = useNavigate()
  const collections = [
    {
      id: 1,
      title: 'School Textbooks',
      subtitle: 'Complete curriculum for all grades',
      description: 'From kindergarten to high school, find all the textbooks your child needs for academic success.',
      cta: 'Shop Textbooks',
      image: '/images/section/homeSection/FeaturedCollections/1.jpg',
      bgColor: 'bg-blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 2,
      title: 'Premium Stationery',
      subtitle: 'Quality supplies for students and professionals',
      description: 'Notebooks, pens, art supplies, and more from trusted brands to enhance your productivity.',
      cta: 'Browse Stationery',
      image: '/images/section/homeSection/FeaturedCollections/2.jpg',
      bgColor: 'bg-amber-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 3,
      title: "Children's Books",
      subtitle: 'Magical stories for young minds',
      description: 'Picture books, fairy tales, and educational stories that inspire creativity and learning.',
      cta: 'Discover Stories',
      image: '/images/section/homeSection/FeaturedCollections/3.jpg',
      bgColor: 'bg-red-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Collections</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Specially curated collections for every reader and learner
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`${collection.bgColor} rounded-2xl overflow-hidden shadow-lg`}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
                {/* Content Side */}
                <div className="flex-1 p-8 lg:p-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {collection.title}
                  </h3>
                  <h4 className="text-xl text-gray-700 mb-4">
                    {collection.subtitle}
                  </h4>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {collection.description}
                  </p>
                  <button 
                    onClick={() => {
                      if (collection.cta.includes('Textbooks')) navigate('/school');
                      else if (collection.cta.includes('Stationery')) navigate('/stationery');
                      else navigate('/books');
                    }}
                    className={`${collection.buttonColor} text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-lg`}
                  >
                    {collection.cta}
                  </button>
                </div>

                {/* Image Side */}
                <div className="flex-1">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our team and we'll help you find the perfect book or educational material
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Contact Support
              </button>
              <button 
                onClick={() => navigate('/books')}
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Request a Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollections
