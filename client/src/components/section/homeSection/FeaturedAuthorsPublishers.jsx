import { useNavigate } from 'react-router-dom'

const FeaturedAuthorsPublishers = () => {
  const navigate = useNavigate()
  const authors = [
    {
      id: 1,
      name: 'Dr. APJ Abdul Kalam',
      image: '/images/section/homeSection/FeaturedAuthorsPublishers/authors/1.jpg',
      books: 12,
      specialty: 'Science & Inspiration'
    },
    {
      id: 2,
      name: 'Sudha Murthy',
      image: '/images/section/homeSection/FeaturedAuthorsPublishers/authors/2.jpg',
      books: 8,
      specialty: 'Fiction & Children'
    },
    {
      id: 3,
      name: 'Ruskin Bond',
      image: '/images/section/homeSection/FeaturedAuthorsPublishers/authors/3.jpg',
      books: 15,
      specialty: 'Nature & Adventure'
    },
    {
      id: 4,
      name: 'Chetan Bhagat',
      image: '/images/section/homeSection/FeaturedAuthorsPublishers/authors/4.jpg',
      books: 9,
      specialty: 'Contemporary Fiction'
    },
    {
      id: 5,
      name: 'Devdutt Pattanaik',
      image: '/images/section/homeSection/FeaturedAuthorsPublishers/authors/5.jpg',
      books: 11,
      specialty: 'Mythology'
    },
    {
      id: 6,
      name: 'Amish Tripathi',
      image: '/images/section/homeSection/FeaturedAuthorsPublishers/authors/6.jpg',
      books: 7,
      specialty: 'Historical Fiction'
    }
  ]

  const publishers = [
    {
      id: 1,
      name: 'Penguin Random House',
      logo: '/images/section/homeSection/FeaturedAuthorsPublishers/publishers/1.jpeg',
      established: 1935
    },
    {
      id: 2,
      name: 'HarperCollins',
      logo: '/images/section/homeSection/FeaturedAuthorsPublishers/publishers/2.jpeg',
      established: 1989
    },
    {
      id: 3,
      name: 'Rupa Publications',
      logo: '/images/section/homeSection/FeaturedAuthorsPublishers/publishers/3.jpeg',
      established: 1993
    },
    {
      id: 4,
      name: 'Macmillan India',
      logo: '/images/section/homeSection/FeaturedAuthorsPublishers/publishers/4.jpeg',
      established: 1936
    },
    {
      id: 5,
      name: 'Oxford University Press',
      logo: '/images/section/homeSection/FeaturedAuthorsPublishers/publishers/5.jpeg',
      established: 2010
    },
    {
      id: 6,
      name: 'Bloomsbury',
      logo: '/images/section/homeSection/FeaturedAuthorsPublishers/publishers/6.jpeg',
      established: 1948
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Authors Section */}
        <div className="mb-16">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Authors</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover books from India's most celebrated writers and thinkers
            </p>
          </div>

          {/* Authors Grid - Desktop */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-6">
            {authors.map((author) => (
              <div
                key={author.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer text-center p-6"
              >
                <div className="relative mb-4">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-gray-200"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  {author.name}
                </h3>
                <p className="text-gray-600 text-xs mb-1">
                  {author.books} books
                </p>
                <p className="text-gray-500 text-xs">
                  {author.specialty}
                </p>
              </div>
            ))}
          </div>

          {/* Authors Carousel - Mobile/Tablet */}
          <div className="lg:hidden">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
              {authors.map((author) => (
                <div
                  key={author.id}
                  className="flex-none w-32 bg-white rounded-lg shadow-md p-4 text-center"
                >
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-gray-200 mb-2"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1 text-xs">
                    {author.name}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {author.books} books
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* View All Authors CTA */}
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/authors')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Authors →
            </button>
          </div>
        </div>

        {/* Featured Publishers Section */}
        <div>
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Publishers</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Quality books from trusted publishing houses
            </p>
          </div>

          {/* Publishers Grid - Desktop */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-6">
            {publishers.map((publisher) => (
              <div
                key={publisher.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer p-6 flex flex-col items-center justify-center"
              >
                <img
                  src={publisher.logo}
                  alt={publisher.name}
                  className="h-12 object-contain mb-3"
                />
                <h3 className="font-semibold text-gray-900 text-center text-xs mb-1">
                  {publisher.name}
                </h3>
                <p className="text-gray-500 text-xs">
                  Est. {publisher.established}
                </p>
              </div>
            ))}
          </div>

          {/* Publishers Carousel - Mobile/Tablet */}
          <div className="lg:hidden">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
              {publishers.map((publisher) => (
                <div
                  key={publisher.id}
                  className="flex-none w-36 bg-white rounded-lg shadow-md p-4 text-center"
                >
                  <img
                    src={publisher.logo}
                    alt={publisher.name}
                    className="h-8 object-contain mx-auto mb-2"
                  />
                  <h3 className="font-semibold text-gray-900 text-xs mb-1">
                    {publisher.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Est. {publisher.established}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* View All Publishers CTA */}
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/publishers')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Publishers →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedAuthorsPublishers
