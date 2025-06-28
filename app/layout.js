import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Improves font loading performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Enhanced SEO metadata
export const metadata = {
  metadataBase: new URL('https://freedevtemplate.com'),
  
  // Basic SEO
  title: {
    default: "FreeDevTemplate - Premium Free Web Templates & Components for Developers",
    template: "%s | FreeDevTemplate"
  },
  description: "Download beautiful, responsive, and modern web templates, UI components, and development resources. Free premium-quality templates for React, Next.js, Vue.js, and more. Perfect for developers, designers, and agencies.",
  
  // Keywords for better search visibility
  keywords: [
    "free web templates",
    "react templates",
    "nextjs templates", 
    "vue templates",
    "tailwind css templates",
    "responsive templates",
    "ui components",
    "web development",
    "frontend templates",
    "free download",
    "premium templates",
    "developer resources",
    "modern web design",
    "landing page templates",
    "portfolio templates",
    "saas templates"
  ],
  
  // Author and site info
  authors: [{ name: "FreeDevTemplate Team" }],
  creator: "FreeDevTemplate",
  publisher: "FreeDevTemplate",
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freedevtemplate.com',
    siteName: 'FreeDevTemplate',
    title: 'FreeDevTemplate - Premium Free Web Templates & Components',
    description: 'Download beautiful, responsive web templates and UI components. Free premium-quality resources for developers and designers.',
    images: [
      {
        url: '/og-image.jpg', // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'FreeDevTemplate - Free Web Templates and Components',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg', // Square version for some platforms
        width: 1200,
        height: 1200,
        alt: 'FreeDevTemplate Logo',
        type: 'image/jpeg',
      }
    ],
  },
  
  // Twitter/X Cards
  twitter: {
    card: 'summary_large_image',
    site: '@freedevtemplate', // Add your Twitter handle
    creator: '@freedevtemplate',
    title: 'FreeDevTemplate - Premium Free Web Templates & Components',
    description: 'Download beautiful, responsive web templates and UI components. Free premium-quality resources for developers and designers.',
    images: ['/twitter-image.jpg'], // Add this image to your public folder
  },
  
  // Additional meta tags
  other: {
    'application-name': 'FreeDevTemplate',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'FreeDevTemplate',
    'format-detection': 'telephone=no',
    'theme-color': '#2563eb', // Your brand blue color
    'color-scheme': 'light',
  },
  
  // Verification tags (add your actual verification codes)
  verification: {
    google: 'your-google-verification-code', // Replace with actual Google Search Console verification
    yandex: 'your-yandex-verification-code', // If targeting Russian market
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code', // Bing Webmaster Tools
      'p:domain_verify': 'your-pinterest-verification-code', // Pinterest
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://freedevtemplate.com',
    languages: {
      'en-US': 'https://freedevtemplate.com',
      'en-GB': 'https://freedevtemplate.com/gb',
      // Add more language versions if available
    },
  },
  
  // App-specific metadata
  appleWebApp: {
    title: 'FreeDevTemplate',
    statusBarStyle: 'default',
    capable: true,
  },
  
  // Category for app stores
  category: 'technology',
};

// Structured Data for Rich Snippets
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FreeDevTemplate',
  description: 'Premium free web templates and components for developers',
  url: 'https://freedevtemplate.com',
  logo: 'https://freedevtemplate.com/logo.png',
  sameAs: [
    'https://twitter.com/freedevtemplate',
    'https://github.com/freedevtemplate',
    'https://linkedin.com/company/freedevtemplate',
  ],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://freedevtemplate.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  },
  publisher: {
    '@type': 'Organization',
    name: 'FreeDevTemplate',
    logo: {
      '@type': 'ImageObject',
      url: 'https://freedevtemplate.com/logo.png'
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Viewport and Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Geo targeting (if relevant) */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Copyright */}
        <meta name="copyright" content="© 2025 FreeDevTemplate. All rights reserved." />
        
        {/* Preload critical resources */}
        {/* <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/critical.css" as="style" /> */}
      </head>
      
      <body 
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <div id="main-content">
          {children}
        </div>
        
        {/* Analytics Scripts (add your tracking IDs) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics 4 */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'GA_MEASUREMENT_ID', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
            
            {/* Additional analytics or tracking scripts can go here */}
          </>
        )}
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'production') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                  })
                  .then(function(registration) {
                    console.log('✅ Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', function() {
                      const newWorker = registration.installing;
                      newWorker.addEventListener('statechange', function() {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                          // New content is available, show update prompt
                          if (confirm('New version available! Click OK to update.')) {
                            newWorker.postMessage({ type: 'SKIP_WAITING' });
                            window.location.reload();
                          }
                        }
                      });
                    });
                  })
                  .catch(function(error) {
                    console.warn('⚠️ Service Worker registration failed:', error);
                    // Don't block the app if SW fails
                  });
                });
              } else if ('serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'development') {
                // Unregister service worker in development to avoid caching issues
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}