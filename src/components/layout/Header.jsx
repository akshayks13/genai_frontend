'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  TrendingUp, 
  Target, 
  Map, 
  Home 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
  { name: 'Skills', href: '/skills', icon: Target },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-grey-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-grey-900">CareerAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-grey-600 hover:text-grey-900 hover:bg-grey-100"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop user menu */}
            <div className="relative hidden md:flex">
              <button
                aria-label="Open user menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-grey-100"
              >
                <User className="h-5 w-5" />
              </button>
              {/* Dropdown (renders when toggled) */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onMouseDown={(e) => e.preventDefault()}>
                  <nav className="py-1">
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-grey-700 hover:bg-grey-50"
                      onMouseDown={() => {
                        router.push('/profile');
                        setUserMenuOpen(false);
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-grey-700 hover:bg-grey-50"
                      onMouseDown={() => {
                        setUserMenuOpen(false);
                      }}
                    >
                      Settings
                    </button>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setUserMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </nav>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-grey-200 py-4"
          >
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-grey-600 hover:text-grey-900 hover:bg-grey-100"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="border-t border-grey-200 pt-2 mt-2">
                <Link
                  href="/profile"
                  className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-grey-600 hover:text-grey-900 hover:bg-grey-100"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}