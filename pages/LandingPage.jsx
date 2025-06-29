'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import TemplateCard from '@/components/TemplateCard';
import BlogCard from '@/components/BlogCard';
import { Download, Code, Smartphone, ArrowRight, Eye, Star, ExternalLink, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

// Cache configuration
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for landing page
const API_CACHE = new Map();

// Cache utilities
const getCacheKey = (endpoint, params = {}) => {
  return `${endpoint}?${new URLSearchParams(params).toString()}`;
};

const getCachedData = (key) => {
  const cached = API_CACHE.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  API_CACHE.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Custom hook for API data fetching with caching
const useApiData = (endpoint, params = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cacheKey = getCacheKey(endpoint, params);
      const cachedData = getCachedData(cacheKey);

      if (cachedData) {
        setData(cachedData);
        setIsLoading(false);
        return;
      }

      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${endpoint}?${queryParams.toString()}`, {
        headers: {
          'Cache-Control': 'max-age=600', // 10 minutes
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Cache the response
      setCachedData(cacheKey, result);
      setData(result);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, isLoading, error, refetch: fetchData };
};

// Blog posts hook with pagination
const useBlogPosts = (initialLimit = 6) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: initialLimit,
    total: 0,
    pages: 1
  });

  const { data, isLoading, error, refetch } = useApiData(
    '/api/post/list',
    {
      page: pagination.page,
      limit: pagination.limit,
      status: '',
      sortBy: 'newest'
    },
    [pagination.page, pagination.limit]
  );

  useEffect(() => {
    if (data?.pagination) {
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
        pages: data.pagination.pages
      }));
    }
  }, [data]);

  const posts = data?.posts || [];

  const loadMore = useCallback(() => {
    if (pagination.page < pagination.pages) {
      setPagination(prev => ({
        ...prev,
        page: prev.page + 1,
        limit: prev.limit + initialLimit
      }));
    }
  }, [pagination.page, pagination.pages, initialLimit]);

  const goToPage = useCallback((page) => {
    setPagination(prev => ({
      ...prev,
      page: Math.max(1, Math.min(page, prev.pages))
    }));
  }, []);

  return {
    posts,
    isLoading,
    error,
    pagination,
    loadMore,
    goToPage,
    refetch,
    hasMore: pagination.page < pagination.pages
  };
};

// SEO component
const SEOHead = ({ title, description, keywords, canonicalUrl, ogImage }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={canonicalUrl} />
    
    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:site_name" content="Your Site Name" />
    
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    
    {/* Additional SEO tags */}
    <meta name="author" content="Your Company Name" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    
    {/* Structured data for blog posts */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Your Site Name",
          "description": description,
          "url": canonicalUrl
        })
      }}
    />
  </Head>
);

// Loading skeleton component
const BlogSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-6">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
);

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange, hasMore, onLoadMore, showLoadMore = false }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {showLoadMore && hasMore && (
        <button
          onClick={onLoadMore}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Load More Posts
        </button>
      )}
      
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </nav>

      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

// Error boundary component
const ErrorFallback = ({ error, onRetry }) => (
  <div className="text-center py-12">
    <div className="text-red-500 mb-4">
      <ExternalLink size={48} className="mx-auto" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load blog posts</h3>
    <p className="text-gray-600 mb-4">{error}</p>
    <button 
      onClick={onRetry}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const LandingPage = () => {
  const {
    posts,
    isLoading: postsLoading,
    error: postsError,
    pagination,
    loadMore,
    goToPage,
    refetch: refetchPosts,
    hasMore
  } = useBlogPosts(6);

  // Static templates data (you can also fetch this from API)
  const templates = [
    {
      type: "SaaS Landing Page",
      name: "Modern SaaS Template",
      description: "A complete SaaS landing page with pricing, features, and testimonials sections.",
      views: "2.4k",
      downloads: "1.2k",
      tags: ["React", "Tailwind", "Next.js"],
      price: "FREE",
      priceColor: "bg-green-500",
      buttonText: "Download",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      gradientFrom: "from-blue-400",
      gradientTo: "to-purple-500",
      icon: <Code size={32} />,
      thumbnail: "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_960_720.jpg"
    },
    {
      type: "Mobile App Landing",
      name: "App Showcase Template",
      description: "Perfect for showcasing mobile apps with feature highlights and download links.",
      views: "1.8k",
      downloads: "950",
      tags: ["Vue.js", "Tailwind", "Nuxt"],
      price: "FREE",
      priceColor: "bg-green-500",
      buttonText: "Download",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-cyan-500",
      icon: <Smartphone size={32} />,
      thumbnail: "https://cdn.pixabay.com/photo/2016/11/29/08/41/apple-1868496_960_720.jpg"
    },
    {
      type: "Portfolio Template",
      name: "Creative Portfolio",
      description: "Stunning portfolio template for designers, developers, and creative professionals.",
      views: "3.1k",
      rating: "4.9",
      tags: ["React", "Framer", "GSAP"],
      price: "PRO",
      priceColor: "bg-yellow-500",
      buttonText: "Get Pro",
      buttonColor: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
      gradientFrom: "from-pink-400",
      gradientTo: "to-rose-500",
      icon: <Zap size={32} />,
      thumbnail: "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_960_720.jpg"
    }
  ];

  // SEO data
  const seoData = {
    title: "Premium Web Templates & Development Blog | Your Site Name",
    description: "Discover premium web templates, latest web development tutorials, and insights from industry experts. Free and pro templates for React, Next.js, and more.",
    keywords: "web templates, React templates, Next.js templates, web development blog, frontend development, UI components",
    canonicalUrl: "https://yoursite.com/",
    ogImage: "https://yoursite.com/og-image.jpg"
  };

  // Transform API posts to match BlogCard component format
  const transformedPosts = useMemo(() => {
    return posts.map(post => ({
      category: post.category || "Blog",
      date: new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      author: post.author || "Admin",
      title: post.title,
      excerpt: post.excerpt || post.description,
      readTime: `${Math.ceil((post.content?.length || 1000) / 200)} min read`,
      thumbnail: post.featuredImage || 'https://cdn.pixabay.com/photo/2023/09/28/07/25/technology-8280863_960_720.jpg',
      categoryBg: post.categoryColor || "#2563eb",
      imageWidth: 800,
      imageHeight: 450,
      slug: post.slug,
      id: post._id
    }));
  }, [posts]);

  const blogData = {
    title: "Latest from Our Blog",
    description: "Stay updated with the latest web development trends, tutorials, and insights from our team of experts.",
    buttonText: "View All Posts",
    posts: transformedPosts
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero />

        {/* Template Card Section */}
        <TemplateCard
          title="Premium Templates Collection"
          description="Browse our professionally designed templates to kickstart your next project."
          buttonText="Explore All Templates"
          templates={templates}
        />

        {/* Blog Section */}
        <section className="py-16 bg-gray-50" id="blog">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {blogData.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {blogData.description}
              </p>
            </div>

            {/* Loading State */}
            {postsLoading && pagination.page === 1 && <BlogSkeleton />}

            {/* Error State */}
            {postsError && !postsLoading && (
              <ErrorFallback error={postsError} onRetry={refetchPosts} />
            )}

            {/* Blog Posts */}
            {!postsError && transformedPosts.length > 0 && (
              <>
                <BlogCard
                  title=""
                  description=""
                  posts={transformedPosts}
                  buttonText={blogData.buttonText}
                  showHeader={false}
                />

                {/* Pagination */}
                <div className="mt-12">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    onPageChange={goToPage}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                    showLoadMore={true}
                  />
                </div>
              </>
            )}

            {/* Empty State */}
            {!postsError && !postsLoading && transformedPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <ExternalLink size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-600">
                  Check back later for new content, or explore our template collection above.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Additional Loading for Pagination */}
        {postsLoading && pagination.page > 1 && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BlogSkeleton />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LandingPage;