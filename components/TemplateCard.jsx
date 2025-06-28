import { Download, Code, Smartphone, ArrowRight, Eye, Star, ExternalLink, Zap } from 'lucide-react';
import Image from 'next/image';

const TemplateCard = ({
    title = "Featured Templates",
    description = "Discover our handpicked collection of premium templates. Each one is crafted with attention to detail and modern best practices.",
    buttonText = "View All Templates",
    templates = []
}) => {
    return (
        <section className="py-20 bg-gray-50">
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
                    {templates.map((template, index) => (
                        <TemplateItem key={index} {...template} />
                    ))}
                </div>

                <div className="text-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
                        {buttonText}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

const TemplateItem = ({
    type = "SaaS Landing Page",
    name = "Modern SaaS Template",
    description = "A complete SaaS landing page with pricing, features, and testimonials sections.",
    views = "2.4k",
    downloads = "1.2k",
    rating,
    tags = ["React", "Tailwind", "Next.js"],
    price = "FREE",
    priceColor = "bg-green-500",
    buttonText = "Download",
    buttonColor = "bg-blue-600 hover:bg-blue-700",
    gradientFrom = "from-blue-400",
    gradientTo = "to-purple-500",
    icon = <Code size={32} />,
    thumbnail = "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_960_720.jpg",
    demoLink = "#"
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="relative">
                <div className="h-48 relative overflow-hidden">
                    <Image
                        src={thumbnail}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-90`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                {icon}
                            </div>
                            <h4 className="font-semibold">{type}</h4>
                        </div>
                    </div>
                </div>
                <div className="absolute top-4 right-4">
                    <span className={`${priceColor} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                        {price}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                <p className="text-gray-600 mb-4">
                    {description}
                </p>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Eye size={16} />
                        <span>{views} views</span>
                    </div>
                    {downloads ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Download size={16} />
                            <span>{downloads} downloads</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Star size={16} className="text-yellow-500 fill-current" />
                            <span>{rating}</span>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 mb-4 flex-wrap">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex gap-3">
                    <button className={`flex-1 ${buttonColor} text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}>
                        <Download size={16} />
                        {buttonText}
                    </button>
                    <a
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-gray-300 hover:border-blue-600 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <ExternalLink size={16} className="text-gray-600" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TemplateCard;