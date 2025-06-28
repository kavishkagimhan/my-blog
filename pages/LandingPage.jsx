import React from 'react';
import Hero from '@/components/Hero';
import TemplateCard from '@/components/TemplateCard';
import BlogCard from '@/components/BlogCard';
import { Download, Code, Smartphone, ArrowRight, Eye, Star, ExternalLink, Zap } from 'lucide-react';

const LandingPage = () => {

    const blogData = {
        title: "Latest from Our Blog",
        description: "Stay updated with the latest web development trends, tutorials, and insights from our team of experts.",
        buttonText: "View All Posts",
        posts: [
            {
                category: "Tutorial",
                date: "Mar 15, 2025",
                author: "John Doe",
                title: "Building Responsive Components with Tailwind CSS",
                excerpt: "Learn how to create beautiful, responsive components using Tailwind CSS utility classes. This comprehensive guide covers best practices and real-world examples.",
                readTime: "5 min read",
                thumbnail: 'https://cdn.pixabay.com/photo/2023/09/28/07/25/technology-8280863_960_720.jpg',
                categoryBg: "#2563eb",
                imageWidth: 800,
                imageHeight: 450
            },
            {
                category: "Best Practices",
                date: "Mar 12, 2025",
                author: "Sarah Wilson",
                title: "Next.js 15: What's New and How to Upgrade",
                excerpt: "Explore the latest features in Next.js 15 and learn how to upgrade your existing projects. Discover performance improvements and new development patterns.",
                readTime: "8 min read",
                thumbnail: 'https://cdn.pixabay.com/photo/2020/02/25/09/25/connection-technology-4878379_1280.png',
                categoryBg: "#059669",
                imageWidth: 800,
                imageHeight: 450
            },
            {
                category: "Design",
                date: "Mar 10, 2025",
                author: "Mike Chen",
                title: "Creating Stunning Animations with Framer Motion",
                excerpt: "Master the art of web animations using Framer Motion. From simple transitions to complex orchestrated animations that enhance user experience.",
                readTime: "12 min read",
                thumbnail: 'https://cdn.pixabay.com/photo/2024/05/21/19/58/code-8779047_960_720.jpg',
                categoryBg: "#ea580c",
                imageWidth: 800,
                imageHeight: 450
            }
        ]
    };

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

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <Hero />

            {/* Template Card  */}
            <TemplateCard
                title="Premium Templates Collection"
                description="Browse our professionally designed templates to kickstart your next project."
                buttonText="Explore All Templates"
                templates={templates}
            />

            {/* Blog Section */}
            <BlogCard
                title={blogData.title}
                description={blogData.description}
                posts={blogData.posts}
                buttonText={blogData.buttonText}
            />
        </div>
    );
};

export default LandingPage;