import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import HomeView from './views/HomeView'
import BooksView from './views/BooksView'
import StationeryView from './views/StationeryView'
import SchoolView from './views/SchoolView'
import AuthorsView from './views/AuthorsView'
import PublishersView from './views/PublishersView'
import CatalogView from './views/CatalogView'
import Login from './views/Login'
import Signup from './views/Signup'
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
    <AppProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Main layout routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomeView />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/books" element={<BooksView />} />
            <Route path="/stationery" element={<StationeryView />} />
            <Route path="/school" element={<SchoolView />} />
            <Route path="/authors" element={<AuthorsView />} />
            <Route path="/publishers" element={<PublishersView />} />
            <Route path="/catalog" element={<CatalogView />} />
          </Route>
          
          {/* Auth routes - without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppProvider>
  )
}

export default App
