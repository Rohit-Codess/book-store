import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'
import HomeView from './views/HomeView'
import BooksView from './views/BooksView'
import StationeryView from './views/StationeryView'
import SchoolView from './views/SchoolView'
import AuthorsView from './views/AuthorsView'
import PublishersView from './views/PublishersView'
import CatalogView from './views/CatalogView'
import ProductDetailView from './views/ProductDetailView'
import CartView from './views/CartView'
import LoginPage from './views/LoginPage'
import SignupPage from './views/SignupPage'
import NotFound from './views/NotFound'
import './App.css'

// Loading component for Suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Authentication routes (no layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Main layout routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/books" element={<BooksView />} />
          <Route path="/books/:id" element={<ProductDetailView />} />
          <Route path="/book/:id" element={<ProductDetailView />} />
          <Route path="/cart" element={<ProtectedRoute><CartView /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><div>Wishlist Page</div></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><div>Account Page</div></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><div>Orders Page</div></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><div>Checkout Page</div></ProtectedRoute>} />
          <Route path="/stationery" element={<StationeryView />} />
          <Route path="/school" element={<SchoolView />} />
          <Route path="/authors" element={<AuthorsView />} />
          <Route path="/publishers" element={<PublishersView />} />
          <Route path="/catalog" element={<CatalogView />} />
        </Route>
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
