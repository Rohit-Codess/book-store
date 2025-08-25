import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import NotificationContainer from '../common/NotificationContainer.jsx'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <NotificationContainer />
    </div>
  )
}

export default Layout
