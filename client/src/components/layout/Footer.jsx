import React from 'react'
import { Link } from 'react-router-dom'

const FlipkartFooter = () => {
  return (
    <footer className="bg-[#172337] text-white mt-8">
      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-gray-300 font-medium mb-4 text-sm">ABOUT</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/stories" className="text-gray-400 hover:text-white">Book World Stories</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white">Press</Link></li>
              <li><Link to="/wholesale" className="text-gray-400 hover:text-white">Book World Wholesale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-gray-300 font-medium mb-4 text-sm">HELP</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/payments" className="text-gray-400 hover:text-white">Payments</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping</Link></li>
              <li><Link to="/cancellation" className="text-gray-400 hover:text-white">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/report" className="text-gray-400 hover:text-white">Report Infringement</Link></li>
            </ul>
          </div>

          {/* Consumer Policy */}
          <div>
            <h4 className="text-gray-300 font-medium mb-4 text-sm">CONSUMER POLICY</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/return-policy" className="text-gray-400 hover:text-white">Return Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Use</Link></li>
              <li><Link to="/security" className="text-gray-400 hover:text-white">Security</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
              <li><Link to="/sitemap" className="text-gray-400 hover:text-white">Sitemap</Link></li>
              <li><Link to="/grievance" className="text-gray-400 hover:text-white">Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gray-300 font-medium mb-4 text-sm">SOCIAL</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="text-gray-400 hover:text-white">Facebook</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Twitter</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">YouTube</Link></li>
            </ul>

            {/* Mail Us */}
            <div className="mt-6">
              <h4 className="text-gray-300 font-medium mb-2 text-sm">Mail Us:</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Book World Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            {/* Sell on Flipkart */}
            <div className="flex items-center space-x-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-yellow-400">
                <path d="M12 2L13.09 8.26L19 7L14.74 12.5L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 12.5L5 7L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span className="text-yellow-400 text-sm font-medium">Become a Seller</span>
            </div>

            {/* Advertise */}
            <div className="flex items-center space-x-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-yellow-400">
                <path d="M12 2L13.09 8.26L19 7L14.74 12.5L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 12.5L5 7L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span className="text-yellow-400 text-sm font-medium">Advertise</span>
            </div>

            {/* Gift Cards */}
            <div className="flex items-center space-x-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-yellow-400">
                <path d="M12 2L13.09 8.26L19 7L14.74 12.5L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 12.5L5 7L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span className="text-yellow-400 text-sm font-medium">Gift Cards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2007-2025 BookWorld.com</span>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Payment Methods */}
              <div className="flex items-center space-x-2">
                <img src="/images/payments/visa.png" alt="Visa" className="h-6" onError={(e) => e.target.style.display = 'none'} />
                <img src="/images/payments/mastercard.png" alt="Mastercard" className="h-6" onError={(e) => e.target.style.display = 'none'} />
                <img src="/images/payments/rupay.png" alt="RuPay" className="h-6" onError={(e) => e.target.style.display = 'none'} />
                <img src="/images/payments/upi.png" alt="UPI" className="h-6" onError={(e) => e.target.style.display = 'none'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FlipkartFooter
