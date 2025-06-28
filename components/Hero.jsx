import Link from 'next/link';
import {  Download, Code } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Beautiful{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Free Templates
                        </span>
                        <br />
                        for Developers
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Download premium-quality, responsive web templates and components built with modern technologies.
                        Perfect for developers, designers, and agencies looking to kickstart their projects.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg">
                            <Download size={20} />
                            Browse Templates
                        </button>
                        <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center gap-3">
                            <Code size={20} />
                            View Components
                        </button>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Responsive Design</span>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">SEO Optimized</span>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Modern Stack</span>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Free Forever</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                            <div className="text-gray-600">Templates</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
                            <div className="text-gray-600">Components</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                            <div className="text-gray-600">Downloads</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">5K+</div>
                            <div className="text-gray-600">Developers</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </section>
    );
}