import { useState } from 'react'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
    alert('Thank you for subscribing to our newsletter!')
  }

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    help: [
      { name: 'Customer Support', href: '#' },
      { name: 'Track Your Order', href: '#' },
      { name: 'Return Policy', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'FAQs', href: '#' }
    ],
    legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Sitemap', href: '#' },
      { name: 'Accessibility', href: '#' }
    ],
    categories: [
      { name: 'Fiction Books', href: '#' },
      { name: 'Academic Books', href: '#' },
      { name: 'Children Books', href: '#' },
      { name: 'Stationery', href: '#' },
      { name: 'Textbooks', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ]

  const features = [
    { icon: Truck, text: 'Free Shipping', desc: 'On orders above ₹499' },
    { icon: RotateCcw, text: 'Easy Returns', desc: '30-day return policy' },
    { icon: Shield, text: 'Secure Payment', desc: '100% secure checkout' },
    { icon: Phone, text: '24/7 Support', desc: 'Dedicated customer care' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Bar */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <div key={feature.text} className="flex items-center space-x-3">
                  <IconComponent className="h-8 w-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">{feature.text}</div>
                    <div className="text-gray-400 text-xs">{feature.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Book World</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for books, educational materials, and stationery. 
                Serving readers and learners across India with quality products and exceptional service.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">+91 1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">support@bookworld.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">Bangalore, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Subscribe to get updates on new arrivals and special offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center lg:text-left">
              © 2025 Book World. All rights reserved. Made with ❤️ in India.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            {/* Payment & Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400 text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-gray-400 text-sm">SSL Secured</span>
              </div>
            </div>
          </div>

          {/* Legal Links - Mobile */}
          <div className="mt-4 pt-4 border-t border-gray-800 lg:hidden">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              {footerLinks.legal.map((link, index) => (
                <span key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                  {index < footerLinks.legal.length - 1 && <span className="ml-4">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
