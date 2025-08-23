import React from 'react';
import BannerCarousel from '../components/section/homeSection/BannerCarousel';
import TopCategories from '../components/section/homeSection/TopCategories';
import BookSections from '../components/section/homeSection/BookSections';
import CategoriesGrid from '../components/section/homeSection/CategoriesGrid';
import FeaturedCollections from '../components/section/homeSection/FeaturedCollections';
import PromotionalBanners from '../components/section/homeSection/PromotionalBanners';
import FeaturedAuthorsPublishers from '../components/section/homeSection/FeaturedAuthorsPublishers';
import BestSellers from '../components/section/homeSection/BestSellers';

const HomeView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Banner Carousel */}
      <BannerCarousel />
      
      {/* Top Categories */}
      <TopCategories />
      
      {/* Book Sections */}
      <BookSections />
      
      {/* Categories Grid */}
      <CategoriesGrid />
      
      {/* Featured Collections */}
      <FeaturedCollections />
      
      {/* Promotional Banners */}
      <PromotionalBanners />
      
      {/* Featured Authors & Publishers */}
      <FeaturedAuthorsPublishers />
      
      {/* Best Sellers */}
      <BestSellers />
    </div>
  );
};

export default HomeView;
