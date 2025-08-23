import React from 'react'
import { AppProvider } from './context/AppContext.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import HomeSection from './views/HomeSection.jsx'
import './App.css'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HomeSection />
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
