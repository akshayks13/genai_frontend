'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset request for:', email);
    setIsSubmitted(true);
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
            {!isSubmitted ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Forgot your password?
                </h1>
                <p className="text-gray-600 mb-8">
                  No worries! Enter your email address and we'll send you a link to reset your password and get back to your literary adventures.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-purple-400 text-white py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors duration-200"
                  >
                    Send reset link
                  </motion.button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Remember your password?{' '}
                    <Link
                      href="/auth/login"
                      className="text-purple-500 hover:text-purple-600 font-medium transition-colors"
                    >
                      Back to sign in
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Check your email
                  </h1>
                  <p className="text-gray-600 mb-8">
                    We've sent a password reset link to{' '}
                    <span className="font-medium text-gray-900">{email}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-purple-500 hover:text-purple-600 font-medium transition-colors underline"
                    >
                      try another email address
                    </button>
                  </p>

                  <Link
                    href="/auth"
                    className="inline-block text-purple-500 hover:text-purple-600 font-medium transition-colors"
                  >
                    ← Back to sign in
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="drop-shadow-lg"
          >
            {/* Key - main element */}
            <circle cx="200" cy="180" r="35" fill="none" stroke="#8B5CF6" strokeWidth="6" />
            <rect x="235" y="175" width="80" height="10" rx="5" fill="#8B5CF6" />
            
            {/* Key teeth */}
            <rect x="305" y="170" width="8" height="8" fill="#8B5CF6" />
            <rect x="295" y="170" width="8" height="12" fill="#8B5CF6" />
            <rect x="285" y="170" width="8" height="8" fill="#8B5CF6" />
            
            {/* Keyhole in the key ring */}
            <circle cx="200" cy="180" r="8" fill="#FFFFFF" />
            
            {/* Lock */}
            <rect x="160" y="280" width="80" height="60" rx="8" fill="#374151" />
            <rect x="185" y="300" width="30" height="20" rx="4" fill="#6B7280" />
            
            {/* Lock shackle */}
            <path d="M180 280 Q180 250 200 250 Q220 250 220 280" stroke="#374151" strokeWidth="8" fill="none" />
            
            {/* Keyhole in lock */}
            <circle cx="200" cy="310" r="4" fill="#9CA3AF" />
            <rect x="198" y="310" width="4" height="8" fill="#9CA3AF" />
            
            {/* Character - confused person */}
            <circle cx="120" cy="140" r="25" fill="#F7FAFC" stroke="#8B5CF6" strokeWidth="3" />
            
            {/* Hair */}
            <path d="M100 125 Q120 110 140 125 Q135 105 120 105 Q105 105 100 125 Z" fill="#DC2626" />
            
            {/* Eyes - confused expression */}
            <circle cx="113" cy="135" r="2" fill="#374151" />
            <circle cx="127" cy="135" r="2" fill="#374151" />
            <path d="M108 128 Q120 125 132 128" stroke="#374151" strokeWidth="1" fill="none" />
            
            {/* Question mark above head */}
            <circle cx="140" cy="100" r="2" fill="#8B5CF6" />
            <path d="M140 95 Q145 90 145 85 Q145 80 140 80 Q135 80 135 85" stroke="#8B5CF6" strokeWidth="2" fill="none" />
            
            {/* Body */}
            <rect x="105" y="165" width="30" height="50" rx="15" fill="#A78BFA" />
            
            {/* Arms - reaching gesture */}
            <circle cx="90" cy="180" r="8" fill="#F7FAFC" />
            <circle cx="150" cy="180" r="8" fill="#F7FAFC" />
            
            {/* Email envelope - floating */}
            <rect x="280" y="100" width="50" height="35" rx="4" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M280 100 L305 120 L330 100" stroke="#8B5CF6" strokeWidth="2" fill="none" />
            
            {/* @ symbol on envelope */}
            <circle cx="305" cy="117" r="8" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
            <circle cx="305" cy="117" r="3" fill="#8B5CF6" />
            
            {/* Flying effect lines */}
            <path d="M270 90 Q275 85 280 90" stroke="#C4B5FD" strokeWidth="2" fill="none" />
            <path d="M275 95 Q280 90 285 95" stroke="#C4B5FD" strokeWidth="2" fill="none" />
            <path d="M340 110 Q345 105 350 110" stroke="#C4B5FD" strokeWidth="2" fill="none" />
            <path d="M345 115 Q350 110 355 115" stroke="#C4B5FD" strokeWidth="2" fill="none" />
            
            {/* Books scattered around */}
            <rect x="60" y="250" width="30" height="20" rx="3" fill="#EF4444" opacity="0.7" />
            <rect x="320" y="280" width="35" height="25" rx="3" fill="#10B981" opacity="0.7" />
            <rect x="80" y="80" width="25" height="18" rx="2" fill="#3B82F6" opacity="0.7" />
            
            {/* Magical sparkles */}
            <circle cx="250" cy="60" r="3" fill="#F59E0B" opacity="0.8" />
            <circle cx="350" cy="200" r="2" fill="#F59E0B" opacity="0.8" />
            <circle cx="50" cy="180" r="2.5" fill="#F59E0B" opacity="0.8" />
            <circle cx="370" cy="330" r="3" fill="#F59E0B" opacity="0.8" />
            
            {/* Reset symbol - circular arrow */}
            <path d="M80 320 Q70 300 90 300 Q110 300 100 320 Q95 340 75 340 Q55 340 65 320" stroke="#8B5CF6" strokeWidth="3" fill="none" />
            <path d="M95 305 L100 300 L105 305" stroke="#8B5CF6" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-300 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </div>
  );
}