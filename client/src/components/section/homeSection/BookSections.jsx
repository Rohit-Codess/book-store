import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const BookSections = () => {
  // Sample book data - 36 books
  const sampleBooks = [
    {
      id: 1,
      title: "The Great Adventure",
      author: "John Smith",
      price: 299,
      originalPrice: 399,
      discount: 25,
      rating: 4.5,
      cover: "/images/section/homeSection/BookSections/1.jpg"
    },
    {
      id: 2,
      title: "Mystery of the Old House",
      author: "Jane Doe",
      price: 199,
      originalPrice: 299,
      discount: 33,
      rating: 4.2,
      cover: "/images/section/homeSection/BookSections/2.jpg"
    },
    {
      id: 3,
      title: "Science for Everyone",
      author: "Dr. Wilson",
      price: 449,
      originalPrice: 549,
      discount: 18,
      rating: 4.8,
      cover: "/images/section/homeSection/BookSections/3.jpg"
    },
    {
      id: 4,
      title: "Children's Tales",
      author: "Mary Johnson",
      price: 149,
      originalPrice: 199,
      discount: 25,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/4.jpg"
    },
    {
      id: 5,
      title: "Young Adult Romance",
      author: "Sarah Lee",
      price: 249,
      originalPrice: 349,
      discount: 29,
      rating: 4.3,
      cover: "/images/section/homeSection/BookSections/5.jpg"
    },
    {
      id: 6,
      title: "Academic Excellence",
      author: "Prof. Brown",
      price: 699,
      originalPrice: 899,
      discount: 22,
      rating: 4.7,
      cover: "/images/section/homeSection/BookSections/6.jpg"
    },
    {
      id: 7,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/7.jpg"
    },
    {
      id: 8,
      title: "Atomic Habits",
      author: "James Clear",
      price: 299,
      originalPrice: 399,
      discount: 25,
      rating: 4.9,
      cover: "/images/section/homeSection/BookSections/8.jpg"
    },
    {
      id: 9,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.7,
      cover: "/images/section/homeSection/BookSections/9.jpg"
    },
    {
      id: 10,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      price: 499,
      originalPrice: 599,
      discount: 17,
      rating: 4.8,
      cover: "/images/section/homeSection/BookSections/10.jpg"
    },
    {
      id: 11,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 199,
      originalPrice: 249,
      discount: 20,
      rating: 4.5,
      cover: "/images/section/homeSection/BookSections/11.jpg"
    },
    {
      id: 12,
      title: "Educated",
      author: "Tara Westover",
      price: 449,
      originalPrice: 549,
      discount: 18,
      rating: 4.7,
      cover: "/images/section/homeSection/BookSections/12.jpg"
    },
    {
      id: 13,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 329,
      originalPrice: 429,
      discount: 23,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/13.jpg"
    },
    {
      id: 14,
      title: "Circe",
      author: "Madeline Miller",
      price: 549,
      originalPrice: 649,
      discount: 15,
      rating: 4.8,
      cover: "/images/section/homeSection/BookSections/14.jpg"
    },
    {
      id: 15,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.9,
      cover: "/images/section/homeSection/BookSections/15.jpg"
    },
    {
      id: 16,
      title: "Becoming",
      author: "Michelle Obama",
      price: 599,
      originalPrice: 799,
      discount: 25,
      rating: 4.8,
      cover: "/images/section/homeSection/BookSections/16.jpg"
    },
    {
      id: 17,
      title: "The Fault in Our Stars",
      author: "John Green",
      price: 249,
      originalPrice: 329,
      discount: 24,
      rating: 4.5,
      cover: "/images/section/homeSection/BookSections/17.jpg"
    },
    {
      id: 18,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      price: 449,
      originalPrice: 549,
      discount: 18,
      rating: 4.9,
      cover: "/images/section/homeSection/BookSections/18.jpg"
    },
    {
      id: 19,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/19.jpg"
    },
    {
      id: 20,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 299,
      originalPrice: 399,
      discount: 25,
      rating: 4.7,
      cover: "/images/section/homeSection/BookSections/20.jpg"
    },
    {
      id: 21,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 199,
      originalPrice: 259,
      discount: 23,
      rating: 4.4,
      cover: "/images/section/homeSection/BookSections/21.jpg"
    },
    {
      id: 22,
      title: "1984",
      author: "George Orwell",
      price: 229,
      originalPrice: 299,
      discount: 23,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/22.jpg"
    },
    {
      id: 23,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 179,
      originalPrice: 229,
      discount: 22,
      rating: 4.5,
      cover: "/images/section/homeSection/BookSections/23.jpg"
    },
    {
      id: 24,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: 269,
      originalPrice: 349,
      discount: 23,
      rating: 4.3,
      cover: "/images/section/homeSection/BookSections/24.jpg"
    },
    {
      id: 25,
      title: "Lord of the Flies",
      author: "William Golding",
      price: 199,
      originalPrice: 249,
      discount: 20,
      rating: 4.4,
      cover: "/images/section/homeSection/BookSections/25.jpg"
    },
    {
      id: 26,
      title: "The Handmaid's Tale",
      author: "Margaret Atwood",
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.7,
      cover: "/images/section/homeSection/BookSections/26.jpg"
    },
    {
      id: 27,
      title: "Brave New World",
      author: "Aldous Huxley",
      price: 229,
      originalPrice: 299,
      discount: 23,
      rating: 4.5,
      cover: "/images/section/homeSection/BookSections/27.jpg"
    },
    {
      id: 28,
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/28.jpg"
    },
    {
      id: 29,
      title: "Life of Pi",
      author: "Yann Martel",
      price: 299,
      originalPrice: 379,
      discount: 21,
      rating: 4.5,
      cover: "/images/section/homeSection/BookSections/29.jpg"
    },
    {
      id: 30,
      title: "The Book Thief",
      author: "Markus Zusak",
      price: 449,
      originalPrice: 549,
      discount: 18,
      rating: 4.8,
      cover: "/images/section/homeSection/BookSections/30.jpg"
    },
    {
      id: 31,
      title: "The Curious Incident of the Dog",
      author: "Mark Haddon",
      price: 329,
      originalPrice: 429,
      discount: 23,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/31.jpg"
    },
    {
      id: 32,
      title: "Gone Girl",
      author: "Gillian Flynn",
      price: 379,
      originalPrice: 479,
      discount: 21,
      rating: 4.4,
      cover: "/images/section/homeSection/BookSections/32.jpg"
    },
    {
      id: 33,
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      price: 449,
      originalPrice: 549,
      discount: 18,
      rating: 4.5,
      cover: "/images/section/homeSection/BookSections/33.jpg"
    },
    {
      id: 34,
      title: "Big Little Lies",
      author: "Liane Moriarty",
      price: 349,
      originalPrice: 449,
      discount: 22,
      rating: 4.6,
      cover: "/images/section/homeSection/BookSections/34.jpg"
    },
    {
      id: 35,
      title: "The Goldfinch",
      author: "Donna Tartt",
      price: 649,
      originalPrice: 799,
      discount: 19,
      rating: 4.7,
      cover: "/images/section/homeSection/BookSections/35.jpg"
    },
    {
      id: 36,
      title: "A Little Life",
      author: "Hanya Yanagihara",
      price: 599,
      originalPrice: 749,
      discount: 20,
      rating: 4.8,
      cover: "/images/section/homeSection/BookSections/36.jpg"
    }
  ]

  const sections = [
    { id: 'deals', name: 'Deals', books: sampleBooks.slice(0, 12) },
    { id: 'preorders', name: 'Pre-Orders', books: sampleBooks.slice(12, 18) },
    { id: 'arrivals', name: 'New Arrivals', books: sampleBooks.slice(18, 24) },
    { id: 'fiction', name: 'Top Fiction', books: sampleBooks.slice(24, 30) },
    { id: 'youngadult', name: 'Young Adult', books: sampleBooks.slice(6, 12) },
    { id: 'children', name: 'Children', books: sampleBooks.slice(20, 26) }
  ]

  const scrollLeft = (sectionId) => {
    const container = document.getElementById(`books-${sectionId}`)
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = (sectionId) => {
    const container = document.getElementById(`books-${sectionId}`)
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const BookCard = ({ book }) => (
    <div className="flex-none w-48 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        {book.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {book.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
          {book.title}
        </h3>
        <p className="text-gray-600 text-xs mb-2">{book.author}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">₹{book.price}</span>
            {book.originalPrice > book.price && (
              <span className="text-sm text-gray-500 line-through ml-1">
                ₹{book.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sections.map((section) => (
          <div key={section.id} className="mb-12">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{section.name}</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </button>
            </div>

            {/* Books Carousel */}
            <div className="relative">
              {/* Scroll Buttons */}
              <button
                onClick={() => scrollLeft(section.id)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => scrollRight(section.id)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>

              {/* Books Container */}
              <div
                id={`books-${section.id}`}
                className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {section.books.map((book) => (
                  <BookCard key={`${section.id}-${book.id}`} book={book} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BookSections
