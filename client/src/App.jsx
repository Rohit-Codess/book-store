import React from 'react'
import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/books" element={<BooksView />} />
        <Route path="/stationery" element={<StationeryView />} />
        <Route path="/school" element={<SchoolView />} />
        <Route path="/authors" element={<AuthorsView />} />
        <Route path="/publishers" element={<PublishersView />} />
        <Route path="/catalog" element={<CatalogView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      
      {/* Auth routes - without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
