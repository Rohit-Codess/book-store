import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      id: 1,
      title: "Discover Amazing Books",
      subtitle: "Up to 50% off on bestsellers",
      cta: "Shop Now",
      image: "/images/section/homeSection/BannerCarousel/1.jpeg",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "New Arrivals This Week",
      subtitle: "Fresh collection of fiction and non-fiction",
      cta: "Explore Now",
      image: "/images/section/homeSection/BannerCarousel/2.jpeg",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Children's Special",
      subtitle: "Educational and entertaining books for kids",
      cta: "Buy Now",
      image: "/images/section/homeSection/BannerCarousel/3.jpeg",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "Academic Excellence",
      subtitle: "Complete range of textbooks and study materials",
      cta: "Learn More",
      image: "/images/section/homeSection/BannerCarousel/4.jpg",
      textColor: "text-white"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [banners.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  return (
    <section className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
      {/* Banner Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full h-full relative flex items-center justify-center"
          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover"
              
            />
            
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-bold ${banner.textColor} mb-4 drop-shadow-lg`}>
                {banner.title}
              </h2>
              <p className={`text-lg sm:text-xl lg:text-2xl ${banner.textColor} mb-8 drop-shadow-md`}>
                {banner.subtitle}
              </p>
              <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg shadow-lg">
                {banner.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white bg-opacity-50 hover:bg-opacity-80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default BannerCarousel
