import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppProvider } from '../../context/AppContext.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const Layout = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default Layout
