'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
      >
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back!
            </h1>
            <p className="text-gray-600 mb-8">
              Continue your literary journey and explore your favorite stories.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="janedoe@mail.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-sky-400 focus:ring-sky-400 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-sky-500 hover:text-sky-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-sky-400 text-white py-3 rounded-lg font-medium hover:bg-sky-500 transition-colors duration-200"
              >
                Sign in
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-sky-500 hover:text-sky-600 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="drop-shadow-lg"
          >
            {/* Book */}
            <rect x="120" y="250" width="160" height="120" rx="8" fill="#2D3748" />
            <rect x="130" y="260" width="140" height="100" rx="4" fill="#FFFFFF" />
            
            {/* Book pages/lines */}
            <line x1="140" y1="280" x2="260" y2="280" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="140" y1="295" x2="260" y2="295" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="140" y1="310" x2="240" y2="310" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="140" y1="325" x2="250" y2="325" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="140" y1="340" x2="220" y2="340" stroke="#E2E8F0" strokeWidth="2" />
            
            {/* Character - Reading person */}
            <circle cx="200" cy="180" r="25" fill="#F7FAFC" stroke="#38BDF8" strokeWidth="3" />
            
            {/* Hair */}
            <path d="M180 165 Q200 150 220 165 Q210 140 200 140 Q190 140 180 165 Z" fill="#F56565" />
            
            {/* Eyes */}
            <circle cx="193" cy="175" r="2" fill="#2D3748" />
            <circle cx="207" cy="175" r="2" fill="#2D3748" />
            
            {/* Smile */}
            <path d="M190 185 Q200 195 210 185" stroke="#2D3748" strokeWidth="1.5" fill="none" />
            
            {/* Body */}
            <rect x="185" y="205" width="30" height="50" rx="15" fill="#38BDF8" />
            
            {/* Arms */}
            <circle cx="170" cy="230" r="8" fill="#F7FAFC" />
            <circle cx="230" cy="230" r="8" fill="#F7FAFC" />
            
            {/* Floating books */}
            <rect x="80" y="100" width="40" height="30" rx="4" fill="#4299E1" opacity="0.7" />
            <rect x="280" y="120" width="35" height="25" rx="3" fill="#48BB78" opacity="0.7" />
            <rect x="90" y="320" width="30" height="20" rx="3" fill="#ED8936" opacity="0.7" />
            <rect x="300" y="280" width="45" height="35" rx="4" fill="#9F7AEA" opacity="0.7" />
            
            {/* Sparkles */}
            <circle cx="150" cy="80" r="3" fill="#F6E05E" opacity="0.8" />
            <circle cx="320" cy="60" r="2" fill="#F6E05E" opacity="0.8" />
            <circle cx="60" cy="200" r="2.5" fill="#F6E05E" opacity="0.8" />
            <circle cx="350" cy="350" r="3" fill="#F6E05E" opacity="0.8" />
          </svg>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-sky-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </div>
  );
}