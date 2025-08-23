import { useState, useEffect } from 'react';

/**
 * useCarousel - Custom hook for carousel functionality
 */
export const useCarousel = (items = [], options = {}) => {
  const {
    autoSlide = true,
    interval = 5000,
    itemsPerView = 1,
    loop = true
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(autoSlide);

  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Go to next slide
  const nextSlide = () => {
    if (loop && currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Go to previous slide
  const prevSlide = () => {
    if (loop && currentIndex <= 0) {
      setCurrentIndex(maxIndex);
    } else if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Go to specific slide
  const goToSlide = (index) => {
    if (index >= 0 && index <= maxIndex) {
      setCurrentIndex(index);
    }
  };

  // Auto slide effect
  useEffect(() => {
    if (!isAutoSliding || totalItems <= itemsPerView) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex(prev => {
        if (loop && prev >= maxIndex) {
          return 0;
        } else if (prev < maxIndex) {
          return prev + 1;
        }
        return prev;
      });
    }, interval);
    return () => clearInterval(slideInterval);
  }, [isAutoSliding, interval, totalItems, itemsPerView, maxIndex, loop]);

  // Pause auto sliding
  const pauseAutoSlide = () => setIsAutoSliding(false);

  // Resume auto sliding
  const resumeAutoSlide = () => setIsAutoSliding(autoSlide);

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoSlide,
    resumeAutoSlide,
    canGoNext: currentIndex < maxIndex || loop,
    canGoPrev: currentIndex > 0 || loop,
    totalSlides: Math.ceil(totalItems / itemsPerView)
  };
};
