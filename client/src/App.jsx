import React from 'react'
import { AppProvider } from './context/AppContext.jsx'
import Header from './views/Header.jsx'
import BannerCarousel from './components/section/homeSection/BannerCarousel.jsx'
import TopCategories from './components/section/homeSection/TopCategories.jsx'
import BookSections from './components/section/homeSection/BookSections.jsx'
import CategoriesGrid from './components/section/homeSection/CategoriesGrid.jsx'
import FeaturedCollections from './components/section/homeSection/FeaturedCollections.jsx'
import PromotionalBanners from './components/section/homeSection/PromotionalBanners.jsx'
import FeaturedAuthorsPublishers from './components/section/homeSection/FeaturedAuthorsPublishers.jsx'
import BestSellers from './components/section/homeSection/BestSellers.jsx'
import Footer from './components/layout/Footer.jsx'
import './App.css'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <BannerCarousel />
          <TopCategories />
          <BookSections />
          <CategoriesGrid />
          <FeaturedCollections />
          <PromotionalBanners />
          <FeaturedAuthorsPublishers />
          <BestSellers />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
