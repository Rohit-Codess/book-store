import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../hooks/useApp.js';

const FlipkartLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, isAuthenticated } = useApp();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSignup] = useState(false);

  // Get the redirect path from location state or default to home
  const from = location.state?.from || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Please enter Email ID/Mobile number';
    }

    if (!isSignup && !formData.password) {
      newErrors.password = 'Please enter password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const result = await login({
        email: formData.email,
        password: formData.password || 'demo123'
      });

      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: error.message || 'Something went wrong! Please try again.' });
    }
  };

  const handleGetOTP = () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter Email ID/Mobile number' });
      return;
    }
    // Handle OTP logic here
    alert('OTP sent to your email/mobile!');
  };

  return (
    <div className="min-h-screen bg-[#2874f0] flex">
      {/* Left Section - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2874f0] text-white flex-col justify-center px-12">
        <div className="max-w-md">
          <h1 className="text-3xl font-medium mb-4">Login</h1>
          <p className="text-lg mb-8 text-gray-200">Get access to your Orders, Wishlist and Recommendations</p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-gray-200">Save your preferences</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-gray-200">Track your orders</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-gray-200">Get personalized recommendations</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Image */}
        <div className="mt-12">
          <img 
            src="/images/login-illustration.png" 
            alt="Shopping" 
            className="w-64 h-48 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="text-2xl font-bold text-[#2874f0] italic">
              Flipkart
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Email/Mobile Field */}
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-0 py-4 border-0 border-b-2 focus:outline-none focus:ring-0 ${
                  errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#2874f0]'
                } text-gray-900 placeholder-gray-500 bg-transparent`}
                placeholder="Enter Email ID/Mobile number"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 leading-relaxed">
              By continuing, you agree to Flipkart's{' '}
              <Link to="/terms" className="text-[#2874f0] hover:underline">Terms of Use</Link> and{' '}
              <Link to="/privacy" className="text-[#2874f0] hover:underline">Privacy Policy</Link>.
            </p>

            {/* Request OTP Button */}
            <button
              type="button"
              onClick={handleGetOTP}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-sm transition-colors"
            >
              Request OTP
            </button>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Password Field (if not signup) */}
            {!isSignup && (
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-0 py-4 border-0 border-b-2 focus:outline-none focus:ring-0 ${
                    errors.password ? 'border-red-500' : 'border-gray-200 focus:border-[#2874f0]'
                  } text-gray-900 placeholder-gray-500 bg-transparent`}
                  placeholder="Enter Password"
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2874f0] hover:bg-[#1c5bb8] disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-sm transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-[#2874f0] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* New to Flipkart */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                New to Flipkart?{' '}
                <Link
                  to="/signup"
                  state={{ from }}
                  className="text-[#2874f0] hover:underline font-medium"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</h4>
              <div className="text-xs text-gray-600 space-y-2">
                <div className="flex justify-between items-center">
                  <span><strong>Email:</strong> admin@flipkart.com</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ email: 'admin@flipkart.com', password: 'admin123' })}
                    className="text-[#2874f0] hover:underline"
                  >
                    Use
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span><strong>Mobile:</strong> 9876543210</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ email: '9876543210', password: 'user123' })}
                    className="text-[#2874f0] hover:underline"
                  >
                    Use
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipkartLoginPage;
