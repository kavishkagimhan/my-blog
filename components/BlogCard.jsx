import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

function BlogCard({ title, description, posts, buttonText }) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {posts.map((post, index) => (
                        <BlogPost key={index} {...post} />
                    ))}
                </div>

                <div className="text-center">
                    <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
                        {buttonText}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}

function BlogPost({ 
    category, 
    date, 
    author, 
    title, 
    excerpt, 
    readTime, 
    thumbnail, 
    categoryBg,
    imageWidth = 400,
    imageHeight = 192
}) {
    return (
        <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="h-48 relative overflow-hidden">
                <Image
                    src={thumbnail}
                    alt={title}
                    width={imageWidth}
                    height={imageHeight}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                    quality={80}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <span 
                        className="text-white px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: categoryBg }}
                    >
                        {category}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{author}</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {excerpt}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{readTime}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group">
                        Read More
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </article>
    );
}

export default BlogCard;