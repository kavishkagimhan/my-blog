'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                FreeDevTemplates
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Home
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Templates
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Components
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Blog
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                About
                            </a>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                            <Download size={16} />
                            Download
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 p-2"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            <a href="#" className="text-gray-900 block px-3 py-2 text-base font-medium">
                                Home
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Templates
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Components
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Blog
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                About
                            </a>
                            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                <Download size={16} />
                                Download
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}