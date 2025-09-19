'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    areaOfInterest: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="drop-shadow-lg"
          >
            {/* Stack of books */}
            <rect x="120" y="280" width="160" height="20" rx="4" fill="#059669" />
            <rect x="125" y="260" width="150" height="20" rx="4" fill="#0891B2" />
            <rect x="130" y="240" width="140" height="20" rx="4" fill="#7C3AED" />
            <rect x="135" y="220" width="130" height="20" rx="4" fill="#DC2626" />
            
            {/* Open book on top */}
            <path d="M200 200 L160 220 L160 180 L200 160 L240 180 L240 220 Z" fill="#FFFFFF" stroke="#374151" strokeWidth="2" />
            <line x1="200" y1="160" x2="200" y2="220" stroke="#374151" strokeWidth="1" />
            
            {/* Book pages */}
            <line x1="170" y1="190" x2="190" y2="190" stroke="#9CA3AF" strokeWidth="1" />
            <line x1="170" y1="200" x2="190" y2="200" stroke="#9CA3AF" strokeWidth="1" />
            <line x1="210" y1="190" x2="230" y2="190" stroke="#9CA3AF" strokeWidth="1" />
            <line x1="210" y1="200" x2="230" y2="200" stroke="#9CA3AF" strokeWidth="1" />
            
            {/* Character - Student with backpack */}
            <circle cx="200" cy="120" r="25" fill="#F7FAFC" stroke="#10B981" strokeWidth="3" />
            
            {/* Hair */}
            <path d="M180 105 Q200 90 220 105 Q215 85 200 85 Q185 85 180 105 Z" fill="#F59E0B" />
            
            {/* Eyes */}
            <circle cx="193" cy="115" r="2" fill="#374151" />
            <circle cx="207" cy="115" r="2" fill="#374151" />
            
            {/* Smile */}
            <path d="M190 125 Q200 135 210 125" stroke="#374151" strokeWidth="1.5" fill="none" />
            
            {/* Backpack */}
            <rect x="170" y="90" width="15" height="25" rx="7" fill="#10B981" />
            <rect x="215" y="90" width="15" height="25" rx="7" fill="#10B981" />
            <rect x="185" y="85" width="30" height="35" rx="8" fill="#059669" />
            
            {/* Body */}
            <rect x="185" y="145" width="30" height="50" rx="15" fill="#34D399" />
            
            {/* Graduation cap */}
            <rect x="175" y="95" width="50" height="3" fill="#374151" />
            <rect x="190" y="88" width="20" height="10" rx="2" fill="#374151" />
            <circle cx="210" cy="93" r="2" fill="#F59E0B" />
            
            {/* Floating elements - knowledge symbols */}
            <circle cx="120" cy="80" r="15" fill="#EBF8FF" stroke="#3B82F6" strokeWidth="2" />
            <text x="120" y="85" textAnchor="middle" className="text-sm font-bold" fill="#3B82F6">A</text>
            
            <circle cx="300" cy="100" r="12" fill="#F0FDF4" stroke="#10B981" strokeWidth="2" />
            <text x="300" y="105" textAnchor="middle" className="text-xs font-bold" fill="#10B981">∑</text>
            
            <circle cx="80" cy="250" r="10" fill="#FEF3E2" stroke="#F59E0B" strokeWidth="2" />
            <text x="80" y="255" textAnchor="middle" className="text-xs font-bold" fill="#F59E0B">π</text>
            
            <circle cx="320" cy="280" r="13" fill="#FAE8FF" stroke="#A855F7" strokeWidth="2" />
            <text x="320" y="285" textAnchor="middle" className="text-xs font-bold" fill="#A855F7">♪</text>
            
            {/* Light bulb - idea symbol */}
            <circle cx="280" cy="180" r="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
            <rect x="276" y="188" width="8" height="4" fill="#F59E0B" />
            
            {/* Stars */}
            <path d="M150 40 L152 46 L158 46 L153 50 L155 56 L150 52 L145 56 L147 50 L142 46 L148 46 Z" fill="#F59E0B" opacity="0.8" />
            <path d="M320 40 L321 44 L325 44 L322 47 L323 51 L320 49 L317 51 L318 47 L315 44 L319 44 Z" fill="#10B981" opacity="0.8" />
          </svg>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-300 rounded-full blur-3xl"></div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
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
              Ready to start your success story?
            </h1>
            <p className="text-gray-600 mb-8">
              Sign up to our website and start leafing through your favorite literature today!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>

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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="areaOfInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  Area of Interest
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                >
                  <option value="">Select your interest</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="mystery">Mystery & Thriller</option>
                  <option value="romance">Romance</option>
                  <option value="sci-fi">Science Fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="biography">Biography</option>
                  <option value="history">History</option>
                  <option value="poetry">Poetry</option>
                </select>
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
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-400 focus:ring-emerald-400 border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-emerald-500 hover:text-emerald-600 transition-colors">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-emerald-400 text-white py-3 rounded-lg font-medium hover:bg-emerald-500 transition-colors duration-200"
              >
                Sign up
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-emerald-500 hover:text-emerald-600 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}